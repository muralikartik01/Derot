export type OnboardingOption = {
  id: string
  icon: string
  label: string
  detail: string
  symbol: string
  motion: string
}

export type OnboardingStep = {
  key: 'interests' | 'trigger' | 'replacement'
  eyebrow: string
  title: string
  emphasis: string
  lead: string
  multi: boolean
  options: OnboardingOption[]
}

export type OnboardingAnswers = Record<OnboardingStep['key'], string[]>
