export type UserProfile = {
  id: string
  firstName: string
  lastName: string
  fullName: string
  username: string
  email: string
  phone: string
  bio: string
  timezone: string
  visibility: 'private' | 'friends' | 'public'
  instagramUrl: string
  websiteUrl: string
  dailyGoal: number
  intervention: 'gentle' | 'balanced' | 'firm'
  weeklySummary: boolean
  twoFactor: boolean
  createdAt: string
}

export type UserPreferences = {
  interests: string[]
  trigger: string[]
  replacement: string[]
  completedAt: string
}

export type ActivityEventType =
  | 'account_created'
  | 'signed_in'
  | 'onboarding_completed'
  | 'reset_started'
  | 'content_viewed'
  | 'content_completed'
  | 'content_saved'
  | 'content_unsaved'
  | 'content_feedback'
  | 'profile_updated'

export type ActivityEvent = {
  id: string
  type: ActivityEventType
  occurredAt: string
  contentId?: string
  metadata?: Record<string, string | number | boolean>
}

export type DerotState = {
  user: UserProfile | null
  preferences: UserPreferences | null
  events: ActivityEvent[]
  savedContentIds: string[]
}

export type ContentItem = {
  id: string
  title: string
  body: string
  takeaway: string
  icon: string
  category: string
  format: 'quick-fact' | 'micro-lesson' | 'mindful-reset' | 'creative-prompt'
  durationMinutes: number
  sourceLabel: string
  reviewStatus: 'approved'
  reviewedAt: string
}

export type DailyMetrics = {
  reclaimedMinutes: number
  urgesRedirected: number
  goalMinutes: number
  goalProgress: number
  ideasLearned: number
  savedIdeas: number
  intentionalSessions: number
  helpfulResponses: number
  calmDays: number
}
