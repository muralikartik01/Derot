export type ExperienceVariant = 'personalize' | 'intercept' | 'learn' | 'reflect'

export type Experience = {
  number: string
  label: string
  title: string
  description: string
  route: 'onboarding' | 'learn' | 'home'
  variant: ExperienceVariant
}
