import { useState, type FormEvent } from 'react'
import appleLogo from '../../../assets/derot/apple.png'
import googleLogo from '../../../assets/derot/google.png'
import type { AuthMode, AuthPayload } from '../types/auth'

type AuthFormProps = {
  mode: AuthMode
  onModeChange: (mode: AuthMode) => void
  onComplete: (mode: AuthMode, payload: AuthPayload) => void
}

export function AuthForm({ mode, onModeChange, onComplete }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    const data = new FormData(event.currentTarget)
    onComplete(mode, {
      email: String(data.get('email') ?? ''),
      password: String(data.get('password') ?? ''),
      firstName: mode === 'signup' ? String(data.get('firstName') ?? '') : undefined,
      lastName: mode === 'signup' ? String(data.get('lastName') ?? '') : undefined,
    })
  }

  return (
    <section className="auth-panel glass-panel" data-mode={mode} aria-label="Authentication">
      <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
        {(['login', 'signup'] as const).map((tab) => (
          <button key={tab} className={mode === tab ? 'active' : ''} type="button" role="tab" aria-selected={mode === tab} onClick={() => onModeChange(tab)}>
            {tab === 'login' ? 'Log in' : 'Sign up'}
          </button>
        ))}
        <i aria-hidden="true" />
      </div>

      <header className="auth-heading">
        <span>{mode === 'login' ? 'WELCOME BACK' : 'CREATE YOUR ACCOUNT'}</span>
        <h2>{mode === 'login' ? 'Good to see you again.' : 'Start reclaiming your time.'}</h2>
        <p>{mode === 'login' ? 'Log in to continue your attention journey.' : 'Create your Derot account in less than a minute.'}</p>
      </header>

      <div className="social-auth" aria-label="Social authentication">
        <button type="button" aria-label="Continue with Google"><img src={googleLogo} alt="" /></button>
        <button type="button" aria-label="Continue with Apple"><img src={appleLogo} alt="" /></button>
      </div>

      <div className="auth-divider"><span>or continue with email</span></div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <div className="name-row">
            <label><span>First name</span><input type="text" name="firstName" autoComplete="given-name" placeholder="Bruce" required /></label>
            <label><span>Last name</span><input type="text" name="lastName" autoComplete="family-name" placeholder="Wyne" required /></label>
          </div>
        )}

        <label><span>Email address</span><input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label>
        <label>
          <span>{mode === 'login' ? 'Password' : 'Create password'}</span>
          <div className="password-field">
            <input type={showPassword ? 'text' : 'password'} name="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} placeholder="At least 8 characters" minLength={8} required />
            <button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? 'Hide' : 'Show'}</button>
          </div>
        </label>

        {mode === 'login' ? (
          <div className="auth-options">
            <label className="checkbox"><input type="checkbox" name="remember" /><i />Remember me</label>
            <button type="button">Forgot password?</button>
          </div>
        ) : (
          <label className="checkbox terms"><input type="checkbox" name="terms" required /><i />I agree to the Terms and Privacy Policy.</label>
        )}

        <button className="primary-button auth-submit" type="submit">
          {mode === 'login' ? 'Log in' : 'Create account'} <span>→</span>
        </button>
      </form>

      <p className="auth-switch">
        {mode === 'login' ? 'New to Derot?' : 'Already have an account?'}{' '}
        <button type="button" onClick={() => onModeChange(mode === 'login' ? 'signup' : 'login')}>
          {mode === 'login' ? 'Create an account' : 'Log in'}
        </button>
      </p>
    </section>
  )
}
