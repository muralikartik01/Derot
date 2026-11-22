import dashboardGarden from '../../../assets/derot/dashboard-garden.png'
import { useAppData } from '../../../app/providers/AppDataContext'
import { AppShell } from '../../../shared/components'
import type { Navigate } from '../../../shared/types/navigation'
import { KpiCard } from '../components/KpiCard'

type HomePageProps = { navigate: Navigate }

export function HomePage({ navigate }: HomePageProps) {
  const { metrics, state, trackEvent } = useAppData()
  const dateLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(new Date()).toUpperCase()
  const firstName = state.user?.firstName || 'there'
  const kpis = [
    { icon: '◷', value: String(metrics.reclaimedMinutes), unit: 'min', title: 'Time reclaimed', note: 'Time spent on intentional resets today', meta: 'Today', featured: true },
    { icon: '↗', value: String(metrics.urgesRedirected), title: 'Urges redirected', note: 'Automatic opens turned into a choice', meta: 'Today' },
    { icon: '◎', value: String(metrics.goalProgress), unit: '%', title: 'Daily focus goal', note: `${metrics.reclaimedMinutes} of ${metrics.goalMinutes} minutes`, meta: `${metrics.reclaimedMinutes} of ${metrics.goalMinutes} min`, progress: metrics.goalProgress },
    { icon: '✦', value: String(metrics.ideasLearned), title: 'Ideas learned', note: 'Approved content completed today', meta: metrics.savedIdeas ? `${metrics.savedIdeas} saved` : 'Today' },
    { icon: '▶', value: String(metrics.intentionalSessions), title: 'Intentional sessions', note: 'Resets you chose to begin today', meta: 'Today' },
    { icon: '◌', value: String(metrics.calmDays), unit: '/7', title: 'Calm days', note: 'Days with an intentional reset this week', meta: 'This week', progress: Math.round((metrics.calmDays / 7) * 100) },
  ]

  const startReset = () => {
    trackEvent('reset_started', { metadata: { source: 'dashboard' } })
    navigate('learn')
  }

  return (
    <AppShell active="home" navigate={navigate}>
      <header className="workspace-header"><div><small>{dateLabel}</small><h1>Welcome back, {firstName}.</h1></div><button type="button" onClick={() => navigate('settings')}>{`${state.user?.firstName?.[0] ?? ''}${state.user?.lastName?.[0] ?? ''}`.toUpperCase() || 'DR'}</button></header>
      <section className="dashboard-hero glass-panel">
        <div>
          <span className="eyebrow"><i />TODAY'S ATTENTION</span>
          <h2>A calmer day is<br /><em>taking root.</em></h2>
          <p>{metrics.intentionalSessions ? `You chose ${metrics.intentionalSessions} intentional ${metrics.intentionalSessions === 1 ? 'pause' : 'pauses'} today and reclaimed ${metrics.reclaimedMinutes} minutes.` : 'Your next automatic scroll can become a small moment you choose.'}</p>
          <button className="primary-button" type="button" onClick={startReset}>Start a 2-minute reset <span>→</span></button>
        </div>
        <img src={dashboardGarden} alt="Derot dinosaur watering an attention garden" />
      </section>
      <section className="kpi-section">
        <header><div><i /> <h2>Your attention today</h2></div><button type="button">Today ⌄</button></header>
        <div className="kpi-grid">{kpis.map((kpi) => <KpiCard key={kpi.title} {...kpi} />)}</div>
      </section>
    </AppShell>
  )
}
