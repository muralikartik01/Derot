import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import type { AuthMode, AuthPayload } from '../../features/auth/types/auth'
import type { OnboardingAnswers } from '../../features/onboarding/types/onboarding'
import { localRepository } from '../data/localRepository'
import type { ActivityEvent, ActivityEventType, DailyMetrics, DerotState, UserProfile } from '../types/product'
import { AppDataContext, type EventInput } from './AppDataContext'

function makeId(prefix: string) {
  return `${prefix}_${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(16).slice(2)}`}`
}

function createEvent(type: ActivityEventType, input: EventInput = {}): ActivityEvent {
  return { id: makeId('event'), type, occurredAt: new Date().toISOString(), ...input }
}

function dateKey(date: Date) {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Kolkata',
  }).format(date)
}

function calculateMetrics(state: DerotState): DailyMetrics {
  const today = dateKey(new Date())
  const todaysEvents = state.events.filter((event) => dateKey(new Date(event.occurredAt)) === today)
  const completed = todaysEvents.filter((event) => event.type === 'content_completed')
  const reclaimedMinutes = completed.reduce((sum, event) => sum + Number(event.metadata?.durationMinutes ?? 2), 0)
  const goalMinutes = state.user?.dailyGoal ?? 60
  const calmDays = new Set(
    state.events
      .filter((event) => event.type === 'content_completed')
      .filter((event) => Date.now() - new Date(event.occurredAt).getTime() < 7 * 24 * 60 * 60 * 1000)
      .map((event) => dateKey(new Date(event.occurredAt))),
  ).size

  return {
    reclaimedMinutes,
    urgesRedirected: todaysEvents.filter((event) => event.type === 'reset_started').length,
    goalMinutes,
    goalProgress: Math.min(100, Math.round((reclaimedMinutes / goalMinutes) * 100)),
    ideasLearned: new Set(completed.map((event) => event.contentId).filter(Boolean)).size,
    savedIdeas: state.savedContentIds.length,
    intentionalSessions: todaysEvents.filter((event) => event.type === 'reset_started').length,
    helpfulResponses: todaysEvents.filter((event) => event.type === 'content_feedback' && event.metadata?.helpful === true).length,
    calmDays,
  }
}

function createProfile(payload: AuthPayload, previous: UserProfile | null): UserProfile {
  const firstName = payload.firstName?.trim() || previous?.firstName || payload.email.split('@')[0]
  const lastName = payload.lastName?.trim() || previous?.lastName || ''
  const fullName = [firstName, lastName].filter(Boolean).join(' ')

  return {
    id: previous?.id ?? makeId('user'),
    firstName,
    lastName,
    fullName,
    username: previous?.username ?? payload.email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, ''),
    email: payload.email,
    phone: previous?.phone ?? '',
    bio: previous?.bio ?? 'Learning to use technology with intention.',
    timezone: previous?.timezone ?? 'Asia/Kolkata',
    visibility: previous?.visibility ?? 'private',
    instagramUrl: previous?.instagramUrl ?? '',
    websiteUrl: previous?.websiteUrl ?? '',
    dailyGoal: previous?.dailyGoal ?? 60,
    intervention: previous?.intervention ?? 'balanced',
    weeklySummary: previous?.weeklySummary ?? true,
    twoFactor: previous?.twoFactor ?? false,
    createdAt: previous?.createdAt ?? new Date().toISOString(),
  }
}

export function AppDataProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<DerotState>(() => localRepository.load())

  useEffect(() => localRepository.save(state), [state])

  const trackEvent = useCallback((type: ActivityEventType, input: EventInput = {}) => {
    setState((current): DerotState => {
      const previous = current.events.at(-1)
      const isDuplicateView = type === 'content_viewed'
        && previous?.type === type
        && previous.contentId === input.contentId
        && Date.now() - new Date(previous.occurredAt).getTime() < 1500
      if (isDuplicateView) return current

      return {
        ...current,
        events: [...current.events, createEvent(type, input)].slice(-1000),
      }
    })
  }, [])

  const authenticate = useCallback((mode: AuthMode, payload: AuthPayload) => {
    setState((current): DerotState => {
      const user = createProfile(payload, current.user?.email === payload.email ? current.user : null)
      return {
        ...current,
        user,
        events: [...current.events, createEvent(mode === 'signup' ? 'account_created' : 'signed_in')].slice(-1000),
      }
    })
  }, [])

  const completeOnboarding = useCallback((answers: OnboardingAnswers) => {
    setState((current): DerotState => ({
      ...current,
      preferences: { ...answers, completedAt: new Date().toISOString() },
      events: [...current.events, createEvent('onboarding_completed')].slice(-1000),
    }))
  }, [])

  const updateProfile = useCallback((profile: Partial<UserProfile>, answers: OnboardingAnswers) => {
    setState((current): DerotState => ({
      ...current,
      user: current.user ? { ...current.user, ...profile } : null,
      preferences: { ...answers, completedAt: current.preferences?.completedAt ?? new Date().toISOString() },
      events: [...current.events, createEvent('profile_updated')].slice(-1000),
    }))
  }, [])

  const toggleSavedContent = useCallback((contentId: string) => {
    setState((current): DerotState => {
      const isSaved = current.savedContentIds.includes(contentId)
      return {
        ...current,
        savedContentIds: isSaved
          ? current.savedContentIds.filter((id) => id !== contentId)
          : [...current.savedContentIds, contentId],
        events: [...current.events, createEvent(isSaved ? 'content_unsaved' : 'content_saved', { contentId })].slice(-1000),
      }
    })
  }, [])

  const metrics = useMemo(() => calculateMetrics(state), [state])
  const isContentSaved = useCallback((contentId: string) => state.savedContentIds.includes(contentId), [state.savedContentIds])
  const value = useMemo(() => ({
    state, metrics, authenticate, completeOnboarding, updateProfile, trackEvent, toggleSavedContent, isContentSaved,
  }), [state, metrics, authenticate, completeOnboarding, updateProfile, trackEvent, toggleSavedContent, isContentSaved])

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}
