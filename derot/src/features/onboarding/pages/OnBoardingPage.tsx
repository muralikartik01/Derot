import { useMemo, useState } from 'react'
import { useAppData } from '../../../app/providers/AppDataContext'
import { AmbientBackground, Brand } from '../../../shared/components'
import type { Navigate } from '../../../shared/types/navigation'
import { ChoiceCard } from '../components/ChoiceCard'
import type { OnboardingAnswers, OnboardingOption, OnboardingStep } from '../types/onboarding'

const steps: OnboardingStep[] = [
  {
    key: 'interests', eyebrow: 'STEP 1 · INTERESTS', title: 'What would you rather', emphasis: 'grow?',
    lead: 'Choose one or more things Derot should offer when the urge to scroll shows up.', multi: true,
    options: [
      { id: 'mindfulness', icon: '◌', label: 'Mindfulness', detail: 'Pause & reset', symbol: '◌', motion: 'breathe' },
      { id: 'knowledge', icon: '✦', label: 'Knowledge', detail: 'Learn something new', symbol: '✦', motion: 'orbit' },
      { id: 'language', icon: 'Aa', label: 'Language', detail: 'Build vocabulary', symbol: 'Aa', motion: 'float' },
      { id: 'creativity', icon: '✎', label: 'Creativity', detail: 'Make, don’t consume', symbol: '✎', motion: 'draw' },
    ],
  },
  {
    key: 'trigger', eyebrow: 'STEP 2 · YOUR PATTERN', title: 'When does the scroll usually', emphasis: 'find you?',
    lead: 'This helps Derot offer the right interruption at the right moment.', multi: false,
    options: [
      { id: 'morning', icon: '☀', label: 'Mornings', detail: 'Before the day begins', symbol: '☀', motion: 'rise' },
      { id: 'breaks', icon: '☕', label: 'Work breaks', detail: 'Between focused tasks', symbol: '☕', motion: 'float' },
      { id: 'evening', icon: '◒', label: 'Evenings', detail: 'While winding down', symbol: '◒', motion: 'moon' },
      { id: 'bedtime', icon: '☾', label: 'Bedtime', detail: 'When sleep should start', symbol: '☾', motion: 'moon' },
    ],
  },
  {
    key: 'replacement', eyebrow: 'STEP 3 · YOUR RESET', title: 'What should replace that first', emphasis: 'scroll?',
    lead: 'Pick the experience Derot should try first. You can explore the others anytime.', multi: false,
    options: [
      { id: 'quick-facts', icon: '✦', label: 'Quick facts', detail: '1–2 minute discoveries', symbol: '✦', motion: 'orbit' },
      { id: 'micro-lessons', icon: '▤', label: 'Micro lessons', detail: 'Learn in small steps', symbol: '▤', motion: 'float' },
      { id: 'mindful-reset', icon: '◌', label: 'Mindful reset', detail: 'Breathe and recenter', symbol: '◌', motion: 'breathe' },
      { id: 'creative-prompt', icon: '✎', label: 'Creative prompt', detail: 'Make something small', symbol: '✎', motion: 'draw' },
    ],
  },
]

const emptyAnswers: OnboardingAnswers = { interests: [], trigger: [], replacement: [] }

type OnBoardingPageProps = { navigate: Navigate }

export function OnBoardingPage({ navigate }: OnBoardingPageProps) {
  const { completeOnboarding, state } = useAppData()
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<OnboardingAnswers>(() => state.preferences ?? emptyAnswers)
  const [activeVisual, setActiveVisual] = useState<OnboardingOption | null>(null)
  const step = steps[stepIndex]
  const selected = answers[step.key]
  const canContinue = selected.length > 0

  const selectionCopy = useMemo(() => {
    if (!selected.length) return step.multi ? 'Choose one or more' : 'Choose one option'
    return step.multi ? `${selected.length} selected · choose as many as you like` : 'Selected · you can change this later'
  }, [selected.length, step.multi])

  const selectOption = (option: OnboardingOption) => {
    setAnswers((current) => {
      const values = current[step.key]
      return {
        ...current,
        [step.key]: step.multi
          ? values.includes(option.id) ? values.filter((value) => value !== option.id) : [...values, option.id]
          : [option.id],
      }
    })
    setActiveVisual(option)
  }

  const continueFlow = () => {
    if (!canContinue) return
    if (stepIndex < steps.length - 1) {
      setStepIndex((index) => index + 1)
      setActiveVisual(null)
      return
    }
    completeOnboarding(answers)
    navigate('home')
  }

  const goBack = () => {
    if (stepIndex === 0) return
    setStepIndex((index) => index - 1)
    setActiveVisual(null)
  }

  return (
    <div className="onboarding-page">
      <AmbientBackground />
      <main className="onboarding-shell">
        <header><Brand onClick={() => navigate('landing')} /><span>{stepIndex + 1} of {steps.length}</span></header>
        <section className="onboarding-content">
          <div className={`onboarding-orb motion-${activeVisual?.motion ?? 'idle'}`} aria-hidden="true">
            <span className="orbit orbit-one" /><span className="orbit orbit-two" />
            <div>{activeVisual?.symbol ?? '✦'}</div>
          </div>
          <div className="onboarding-copy">
            <span className="eyebrow"><i />{step.eyebrow}</span>
            <h1>{step.title}<br /><em>{step.emphasis}</em></h1>
            <p>{step.lead}</p>
          </div>
          <div className="choice-panel">
            <div className="choice-grid">
              {step.options.map((option) => <ChoiceCard key={option.id} option={option} selected={selected.includes(option.id)} onSelect={selectOption} />)}
            </div>
            <p>{selectionCopy}</p>
          </div>
        </section>
        <footer className="onboarding-actions">
          <button className="secondary-button" type="button" onClick={goBack} disabled={stepIndex === 0}>← Back</button>
          <span>✦ Your answers can be changed later</span>
          <button className="primary-button" type="button" onClick={continueFlow} disabled={!canContinue}>
            {stepIndex === steps.length - 1 ? 'Build my Derot' : 'Continue'} <span>→</span>
          </button>
        </footer>
      </main>
    </div>
  )
}
