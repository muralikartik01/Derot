import { Brand } from '../../../shared/components'

type LandingFooterProps = { onHome: () => void }

export function LandingFooter({ onHome }: LandingFooterProps) {
  return (
    <footer className="landing-footer glass-panel">
      <div className="footer-main">
        <div><Brand onClick={onHome} /><h2>Less autopilot.<br />More of what matters.</h2><p>A calmer relationship with social media, one intentional choice at a time.</p></div>
        <nav aria-label="Footer navigation">
          <div><b>Product</b><a href="#how-it-works">How it works</a><a href="#experience">Features</a><a href="#download">Download</a></div>
          <div><b>Resources</b><a href="#help">Help center</a><a href="#guides">Guides</a><a href="#community">Community</a></div>
          <div><b>Company</b><a href="#about">About</a><a href="#careers">Careers</a><a href="#contact">Contact</a></div>
        </nav>
      </div>
      <div className="footer-bottom"><span>© 2026 Derot. All rights reserved.</span><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#accessibility">Accessibility</a></div></div>
    </footer>
  )
}
