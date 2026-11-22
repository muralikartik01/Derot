import { createContext, useContext } from 'react'
import type { AuthMode, AuthPayload } from '../../features/auth/types/auth'
import type { OnboardingAnswers } from '../../features/onboarding/types/onboarding'
import type { ActivityEventType, DailyMetrics, DerotState, UserProfile } from '../types/product'

export type EventInput = {
  contentId?: string
  metadata?: Record<string, string | number | boolean>
}

export type AppDataContextValue = {
  state: DerotState
  metrics: DailyMetrics
  authenticate: (mode: AuthMode, payload: AuthPayload) => void
  completeOnboarding: (answers: OnboardingAnswers) => void
  updateProfile: (profile: Partial<UserProfile>, answers: OnboardingAnswers) => void
  trackEvent: (type: ActivityEventType, input?: EventInput) => void
  toggleSavedContent: (contentId: string) => void
  isContentSaved: (contentId: string) => boolean
}

export const AppDataContext = createContext<AppDataContextValue | null>(null)

export function useAppData() {
  const context = useContext(AppDataContext)
  if (!context) throw new Error('useAppData must be used within AppDataProvider')
  return context
}
