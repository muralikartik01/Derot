import { Brand } from '../../../shared/components'
import type { Navigate } from '../../../shared/types/navigation'
import { AttentionPreview } from '../components/AttentionPreview'
import { ExperienceCard } from '../components/ExperienceCard'
import { LandingFooter } from '../components/LandingFooter'
import { useScrollAmbience } from '../hooks/useScrollAmbience'
import type { Experience } from '../types/landing'
import '../landing.css'

const experiences: Experience[] = [
  { number: '01', label: 'Personalize', title: 'Choose your intention', description: 'Set a positive destination before setting limits.', route: 'onboarding', variant: 'personalize' },
  { number: '02', label: 'Intercept', title: 'Interrupt without judgement', description: 'A calm pause replaces a punishing block screen.', route: 'onboarding', variant: 'intercept' },
  { number: '03', label: 'Learn', title: 'Finish a tiny learning sprint', description: 'A few useful cards, one recall prompt, and a real ending.', route: 'learn', variant: 'learn' },
  { number: '04', label: 'Reflect', title: 'See attention, not streak pressure', description: 'Celebrate reclaimed time and genuine learning.', route: 'home', variant: 'reflect' },
]

type LandingPageProps = { navigate: Navigate }

export function LandingPage({ navigate }: LandingPageProps) {
  useScrollAmbience()

  return (
    <div className="landing-page">
      <div className="landing-ambient ambient-one" aria-hidden="true" />
      <div className="landing-ambient ambient-two" aria-hidden="true" />
      <header className="landing-header"><Brand onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} /></header>
      <main>
        <section className="landing-hero">
          <div className="landing-hero-copy">
            <h1>Attention,<br /><em>on your terms.</em></h1>
            <p>Derot turns the impulse to open Instagram into a short moment of learning—helping you choose what deserves your time.</p>
            <div><button className="primary-button" type="button" onClick={() => navigate('onboarding')}>Try the flow <span>→</span></button><button className="landing-login" type="button" onClick={() => navigate('auth')}>Log in <span>↗</span></button></div>
          </div>
          <AttentionPreview />
        </section>

        <section className="landing-principles glass-panel" id="how-it-works" aria-label="Product principles">
          <div><span>01</span><strong>Pause</strong><small>Interrupt the autopilot</small></div>
          <div><span>02</span><strong>Redirect</strong><small>Make two minutes useful</small></div>
          <div><span>03</span><strong>Choose</strong><small>Return with intention</small></div>
        </section>

        <section className="landing-experience" id="experience">
          <header><div><span>01 · CORE EXPERIENCE</span><h2>Four moments.<br />One gentler loop.</h2></div><p>Every screen is designed to interrupt autopilot without adding shame, pressure, or another endless feed.</p></header>
          <div className="experience-grid">{experiences.map((experience) => <ExperienceCard key={experience.number} experience={experience} onOpen={() => navigate(experience.route)} />)}</div>
        </section>
      </main>
      <LandingFooter onHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
    </div>
  )
}
