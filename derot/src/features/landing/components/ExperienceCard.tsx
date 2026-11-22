import type { Experience } from '../types/landing'

type ExperienceCardProps = {
  experience: Experience
  onOpen: () => void
}

function MiniScreen({ variant }: { variant: Experience['variant'] }) {
  if (variant === 'personalize') return <><div className="mini-orb">✦</div><small>A BETTER DEFAULT</small><h4>What would you rather grow?</h4><div className="mini-pills"><i>◌ Mindfulness</i><i className="selected">✦ Knowledge</i><i>Aa Language</i><i>✎ Creativity</i></div></>
  if (variant === 'intercept') return <><div className="mini-ig">◎</div><small>A LITTLE PAUSE</small><h4>Instagram can wait.<br />Your curiosity is here.</h4><p>Trade three minutes of scrolling for something worth keeping?</p><div className="mini-stats"><i><b>12</b>min saved</i><i><b>4</b>ideas learned</i></div></>
  if (variant === 'learn') return <><div className="mini-progress"><i /></div><small>TODAY’S SPARK · SCIENCE</small><div className="mini-moon">☾</div><h4>Your brain tidies up while you sleep.</h4><p>Deep sleep helps clear metabolic waste built up during the day.</p></>
  return <><small>GOOD AFTERNOON</small><h4>Your attention is coming back to you.</h4><div className="mini-focus"><b>42</b><span>min reclaimed</span></div><div className="mini-bars"><i /><i /><i /><i /><i /></div></>
}

export function ExperienceCard({ experience, onOpen }: ExperienceCardProps) {
  return (
    <article className="experience-card glass-panel">
      <div className="experience-label"><span>{experience.number}</span>{experience.label}</div>
      <button className={`phone-preview preview-${experience.variant}`} type="button" onClick={onOpen} aria-label={`Open ${experience.title}`}>
        <span className="phone-island" />
        <div className="phone-screen"><div className="phone-top"><b>Derot</b><span>•••</span></div><MiniScreen variant={experience.variant} /><div className="phone-button">Continue <span>→</span></div></div>
      </button>
      <div className="experience-copy"><h3>{experience.title}</h3><p>{experience.description}</p></div>
    </article>
  )
}
