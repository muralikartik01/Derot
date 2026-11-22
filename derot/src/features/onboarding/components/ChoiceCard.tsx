import type { OnboardingOption } from '../types/onboarding'

type ChoiceCardProps = {
  option: OnboardingOption
  selected: boolean
  onSelect: (option: OnboardingOption) => void
}

export function ChoiceCard({ option, selected, onSelect }: ChoiceCardProps) {
  return (
    <button className={`choice-card${selected ? ' selected' : ''}`} type="button" aria-pressed={selected} onClick={() => onSelect(option)}>
      <span>{option.icon}</span>
      <b>{option.label}</b>
      <small>{option.detail}</small>
      <i>✓</i>
    </button>
  )
}
