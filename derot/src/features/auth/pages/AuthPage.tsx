import { useState } from 'react'
import { useAppData } from '../../../app/providers/AppDataContext'
import authIllustration from '../../../assets/derot/auth-illustration.png'
import { AmbientBackground, Brand } from '../../../shared/components'
import type { Navigate } from '../../../shared/types/navigation'
import { AuthForm } from '../components/AuthForm'
import type { AuthMode } from '../types/auth'

type AuthPageProps = { navigate: Navigate }

export function AuthPage({ navigate }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>('login')
  const { authenticate, state } = useAppData()

  return (
    <div className="auth-page">
      <AmbientBackground />
      <main className="auth-shell">
        <Brand onClick={() => navigate('landing')} />
        <section className="auth-story">
          <div className="auth-story-copy">
            <span className="eyebrow"><i />YOUR ATTENTION, PROTECTED</span>
            <h1>Come back to<br /><em>what matters.</em></h1>
            <p>Build a calmer relationship with social media and turn impulsive moments into something worth keeping.</p>
          </div>
          <div className="auth-illustration glass-panel" aria-hidden="true">
            <img src={authIllustration} alt="" />
            <span><b>Unstack the noise</b><small>Keep only what matters</small></span>
          </div>
          <div className="trust-row"><span>✓ No shame-based streaks</span><span>✓ Your data stays private</span></div>
        </section>
        <AuthForm
          mode={mode}
          onModeChange={setMode}
          onComplete={(completedMode, payload) => {
            authenticate(completedMode, payload)
            navigate(completedMode === 'signup' || !state.preferences ? 'onboarding' : 'home')
          }}
        />
      </main>
    </div>
  )
}
