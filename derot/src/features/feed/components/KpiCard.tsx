type KpiCardProps = {
  icon: string
  value: string
  unit?: string
  title: string
  note: string
  meta: string
  featured?: boolean
  progress?: number
}

export function KpiCard({ icon, value, unit, title, note, meta, featured = false, progress }: KpiCardProps) {
  return (
    <article className={`kpi-card glass-panel${featured ? ' featured' : ''}`}>
      <div className="kpi-top"><span>{icon}</span><small>{meta}</small></div>
      <strong>{value}{unit && <i>{unit}</i>}</strong>
      <h3>{title}</h3>
      {progress === undefined ? <p>{note}</p> : <div className="kpi-progress" aria-label={`${progress} percent`}><i style={{ width: `${progress}%` }} /></div>}
    </article>
  )
}
