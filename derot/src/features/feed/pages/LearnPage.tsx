import { useEffect, useMemo, useState } from 'react'
import { useAppData } from '../../../app/providers/AppDataContext'
import { AppShell } from '../../../shared/components'
import type { Navigate } from '../../../shared/types/navigation'
import { curateContent } from '../data/contentCatalog'

type LearnPageProps = { navigate: Navigate }

export function LearnPage({ navigate }: LearnPageProps) {
  const { state, trackEvent, toggleSavedContent, isContentSaved } = useAppData()
  const [index, setIndex] = useState(0)
  const [feedbackGiven, setFeedbackGiven] = useState<string[]>([])
  const facts = useMemo(() => curateContent(state.preferences?.interests ?? []), [state.preferences?.interests])
  const fact = facts[index % facts.length]
  const saved = isContentSaved(fact.id)
  const preferred = state.preferences?.interests.includes(fact.category)

  useEffect(() => {
    trackEvent('content_viewed', { contentId: fact.id, metadata: { category: fact.category, format: fact.format } })
  }, [fact.category, fact.format, fact.id, trackEvent])

  const next = () => {
    trackEvent('content_completed', { contentId: fact.id, metadata: { durationMinutes: fact.durationMinutes, category: fact.category } })
    setIndex((current) => (current + 1) % facts.length)
  }

  const giveFeedback = () => {
    if (feedbackGiven.includes(fact.id)) return
    setFeedbackGiven((current) => [...current, fact.id])
    trackEvent('content_feedback', { contentId: fact.id, metadata: { helpful: true } })
  }

  return (
    <AppShell active="learn" navigate={navigate}>
      <header className="workspace-header"><div><small>CURATED FOR YOU</small><h1>A useful pause.</h1></div><span className="card-count">{(index % facts.length) + 1} of {facts.length}</span></header>
      <section className="learn-card glass-panel">
        <div className="learn-art" aria-hidden="true"><span>{fact.icon}</span><i /><i /><i /></div>
        <div className="learn-copy">
          <span className="eyebrow"><i />{fact.durationMinutes}-MINUTE {fact.format.replace('-', ' ').toUpperCase()}</span>
          <h2>{fact.title}</h2>
          <p>{fact.body}</p>
          <aside><span>✦</span><div><small>KEEP THIS</small><b>{fact.takeaway}</b></div></aside>
          <p className="recommendation-reason">{preferred ? `Recommended because you chose ${fact.category}.` : 'Included to keep your feed varied.'} · {fact.sourceLabel} · Approved</p>
          <div className="learn-utility-actions">
            <button className={saved ? 'selected' : ''} type="button" onClick={() => toggleSavedContent(fact.id)}>{saved ? '✓ Saved' : '♡ Save'}</button>
            <button className={feedbackGiven.includes(fact.id) ? 'selected' : ''} type="button" onClick={giveFeedback}>{feedbackGiven.includes(fact.id) ? '✓ Helpful' : 'Was this helpful?'}</button>
          </div>
          <div className="learn-actions"><button className="secondary-button" type="button" onClick={() => navigate('home')}>Finish reset</button><button className="primary-button" type="button" onClick={next}>Complete & continue <span>→</span></button></div>
        </div>
      </section>
    </AppShell>
  )
}
