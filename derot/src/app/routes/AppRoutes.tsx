import type { ReactNode } from 'react'
import { BrowserRouter, Navigate as RouterRedirect, Route, Routes, useNavigate } from 'react-router-dom'
import { useAppData } from '../providers/AppDataContext'
import { AuthPage } from '../../features/auth'
import { HomePage, LearnPage } from '../../features/feed'
import { LandingPage } from '../../features/landing'
import { OnBoardingPage } from '../../features/onboarding'
import { SettingsPage } from '../../features/settings'
import type { AppRoute, Navigate } from '../../shared/types/navigation'

const routePaths: Record<AppRoute, string> = {
  landing: '/',
  auth: '/auth',
  onboarding: '/onboarding',
  home: '/home',
  learn: '/learn',
  settings: '/settings',
}

function RequireUser({ children, onboardingRequired = true }: { children: ReactNode, onboardingRequired?: boolean }) {
  const { state } = useAppData()
  if (!state.user) return <RouterRedirect to="/auth" replace />
  if (onboardingRequired && !state.preferences) return <RouterRedirect to="/onboarding" replace />
  return children
}

function RoutedPages() {
  const routerNavigate = useNavigate()
  const navigate: Navigate = (route) => routerNavigate(routePaths[route])

  return (
    <Routes>
      <Route path="/" element={<LandingPage navigate={navigate} />} />
      <Route path="/auth" element={<AuthPage navigate={navigate} />} />
      <Route path="/onboarding" element={<RequireUser onboardingRequired={false}><OnBoardingPage navigate={navigate} /></RequireUser>} />
      <Route path="/home" element={<RequireUser><HomePage navigate={navigate} /></RequireUser>} />
      <Route path="/learn" element={<RequireUser><LearnPage navigate={navigate} /></RequireUser>} />
      <Route path="/settings" element={<RequireUser><SettingsPage navigate={navigate} /></RequireUser>} />
      <Route path="*" element={<RouterRedirect to="/" replace />} />
    </Routes>
  )
}

export function AppRoutes() {
  return <BrowserRouter><RoutedPages /></BrowserRouter>
}
