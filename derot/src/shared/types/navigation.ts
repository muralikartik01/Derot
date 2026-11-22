export type AppRoute = 'landing' | 'auth' | 'onboarding' | 'home' | 'learn' | 'settings'

export type Navigate = (route: AppRoute) => void
