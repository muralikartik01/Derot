export function AttentionPreview() {
  return (
    <div className="landing-attention glass-panel" aria-label="Derot attention preview">
      <div className="landing-preview-top"><span>Today’s attention</span><b>9:41</b></div>
      <div className="landing-preview-orbit" aria-hidden="true">
        <div><span>✦</span></div>
        <i className="preview-note note-one">12 min<small>reclaimed</small></i>
        <i className="preview-note note-two">4 ideas<small>learned</small></i>
      </div>
      <div className="landing-preview-intent">
        <span><i />Your intention</span>
        <b>Learn something worth keeping.</b>
        <strong>↗</strong>
      </div>
    </div>
  )
}
