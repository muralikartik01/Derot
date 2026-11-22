import type { DerotState } from '../types/product'

const STORAGE_KEY = 'derot_app_state_v1'
const LEGACY_PREFERENCES_KEY = 'derot_onboarding_preferences_v1'

export const emptyDerotState: DerotState = {
  user: null,
  preferences: null,
  events: [],
  savedContentIds: [],
}

function readLegacyPreferences(): DerotState['preferences'] {
  try {
    const value = JSON.parse(window.localStorage.getItem(LEGACY_PREFERENCES_KEY) ?? 'null') as {
      interests?: string[]
      trigger?: string[]
      replacement?: string[]
    } | null

    if (!value?.interests?.length || !value.trigger?.length || !value.replacement?.length) return null
    return { ...value, completedAt: new Date().toISOString() } as DerotState['preferences']
  } catch {
    return null
  }
}

export const localRepository = {
  load(): DerotState {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (!stored) return { ...emptyDerotState, preferences: readLegacyPreferences() }
      const parsed = JSON.parse(stored) as Partial<DerotState>
      return {
        user: parsed.user ?? null,
        preferences: parsed.preferences ?? readLegacyPreferences(),
        events: Array.isArray(parsed.events) ? parsed.events : [],
        savedContentIds: Array.isArray(parsed.savedContentIds) ? parsed.savedContentIds : [],
      }
    } catch {
      return { ...emptyDerotState }
    }
  },

  save(state: DerotState) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  },
}
