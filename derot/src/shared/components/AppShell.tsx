import type { PropsWithChildren } from 'react'
import { useAppData } from '../../app/providers/AppDataContext'
import type { AppRoute, Navigate } from '../types/navigation'
import { AmbientBackground } from './AmbientBackground'
import { Brand } from './Brand'

type AppShellProps = PropsWithChildren<{
  active: AppRoute
  navigate: Navigate
}>

export function AppShell({ active, navigate, children }: AppShellProps) {
  const { state } = useAppData()
  const initials = `${state.user?.firstName?.[0] ?? ''}${state.user?.lastName?.[0] ?? ''}`.toUpperCase() || 'DR'
  return (
    <div className="app-page">
      <AmbientBackground />
      <main className="app-shell">
        <aside className="app-nav glass-panel">
          <Brand compact onClick={() => navigate('home')} />
          <nav aria-label="Primary navigation">
            <button className={active === 'home' ? 'active' : ''} type="button" onClick={() => navigate('home')}>
              <span>⌂</span><small>Home</small>
            </button>
            <button className={active === 'learn' ? 'active' : ''} type="button" onClick={() => navigate('learn')}>
              <span>✦</span><small>Learn</small>
            </button>
          </nav>
          <button className={`profile-nav${active === 'settings' ? ' active' : ''}`} type="button" onClick={() => navigate('settings')} aria-label="Profile settings">{initials}</button>
        </aside>
        <div className="app-workspace">{children}</div>
      </main>
    </div>
  )
}
