import dino from '../../assets/derot/dino.png'

type BrandProps = {
  compact?: boolean
  onClick?: () => void
}

export function Brand({ compact = false, onClick }: BrandProps) {
  return (
    <button className={`brand${compact ? ' brand--compact' : ''}`} type="button" onClick={onClick} aria-label="Derot home">
      <span className="brand__mark"><img src={dino} alt="" /></span>
      {!compact && <span>Derot</span>}
    </button>
  )
}
