import { useState, type FormEvent } from 'react'
import { useAppData } from '../../../app/providers/AppDataContext'
import type { UserProfile } from '../../../app/types/product'
import dino from '../../../assets/derot/dino.png'
import { AppShell } from '../../../shared/components'
import type { Navigate } from '../../../shared/types/navigation'

const interestOptions = [
  ['mindfulness', '◌', 'Mindfulness'],
  ['knowledge', '✦', 'Knowledge'],
  ['language', 'Aa', 'Language'],
  ['creativity', '✎', 'Creativity'],
] as const

type SettingsPageProps = { navigate: Navigate }

export function SettingsPage({ navigate }: SettingsPageProps) {
  const { state, updateProfile } = useAppData()
  const user = state.user!
  const [interests, setInterests] = useState<string[]>(() => state.preferences?.interests ?? [])
  const [saved, setSaved] = useState(false)
  const initials = `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`.toUpperCase() || 'DR'
  const memberSince = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(user.createdAt))
  const completionFields = [user.fullName, user.username, user.email, user.phone, user.bio, user.timezone]
  const completion = Math.round((completionFields.filter(Boolean).length / completionFields.length) * 100)

  const toggleInterest = (value: string) => {
    setSaved(false)
    setInterests((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value])
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    const data = new FormData(event.currentTarget)
    const fullName = String(data.get('fullName') ?? '').trim()
    const nameParts = fullName.split(/\s+/)
    const profile: Partial<UserProfile> = {
      fullName,
      firstName: nameParts[0] || user.firstName,
      lastName: nameParts.slice(1).join(' '),
      username: String(data.get('username') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      bio: String(data.get('bio') ?? ''),
      timezone: String(data.get('timezone') ?? 'Asia/Kolkata'),
      visibility: String(data.get('visibility') ?? 'private') as UserProfile['visibility'],
      instagramUrl: String(data.get('instagramUrl') ?? ''),
      websiteUrl: String(data.get('websiteUrl') ?? ''),
      dailyGoal: Number(data.get('dailyGoal') ?? 60),
      intervention: String(data.get('intervention') ?? 'balanced') as UserProfile['intervention'],
      weeklySummary: data.get('weeklySummary') === 'on',
      twoFactor: data.get('twoFactor') === 'on',
    }
    const onboarding = {
      interests,
      trigger: [String(data.get('trigger') ?? '')].filter(Boolean),
      replacement: [String(data.get('replacement') ?? '')].filter(Boolean),
    }
    updateProfile(profile, onboarding)
    setSaved(true)
  }

  const exportData = () => {
    const payload = state
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'derot-data.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AppShell active="settings" navigate={navigate}>
      <header className="settings-header"><div><small>YOUR DEROT ACCOUNT</small><h1>Profile & settings</h1><p>Manage your identity, attention preferences and privacy.</p></div><button className="primary-button" type="submit" form="profile-settings">{saved ? 'Saved ✓' : 'Save changes'}</button></header>
      <form id="profile-settings" className="settings-form" onSubmit={handleSubmit} onChange={() => setSaved(false)}>
        <section className="profile-summary glass-panel">
          <div className="profile-avatar">{initials}<span><img src={dino} alt="" /></span></div>
          <div><small>PERSONAL PROFILE</small><h2>{user.fullName}</h2><p>@{user.username} · Member since {memberSince}</p></div>
          <aside><div><span>Profile completion</span><b>{completion}%</b></div><i><span style={{ width: `${completion}%` }} /></i><small>{completion === 100 ? 'Your profile is complete.' : 'Add the missing details to complete your profile.'}</small></aside>
        </section>
        <div className="settings-grid">
          <div className="settings-main">
            <section className="settings-card glass-panel">
              <header><span>◎</span><div><h2>Personal information</h2><p>How you appear across Derot.</p></div></header>
              <div className="form-grid">
                <label><span>Full name</span><input name="fullName" defaultValue={user.fullName} autoComplete="name" required /></label>
                <label><span>Username</span><input name="username" defaultValue={user.username} autoComplete="username" required /></label>
                <label><span>Email address</span><input name="email" type="email" defaultValue={user.email} autoComplete="email" required /></label>
                <label><span>Phone number</span><input name="phone" type="tel" defaultValue={user.phone} placeholder="+91 98765 43210" autoComplete="tel" /></label>
                <label className="wide"><span>Bio</span><textarea name="bio" rows={3} maxLength={180} defaultValue={user.bio} /></label>
                <label><span>Timezone</span><select name="timezone" defaultValue={user.timezone}><option value="Asia/Kolkata">India Standard Time</option><option value="UTC">UTC</option></select></label>
                <label><span>Profile visibility</span><select name="visibility" defaultValue={user.visibility}><option value="private">Private</option><option value="friends">People I approve</option><option value="public">Public</option></select></label>
              </div>
            </section>
            <section className="settings-card glass-panel">
              <header><span>↗</span><div><h2>Profile links</h2><p>Optional links shown on your profile.</p></div></header>
              <div className="form-grid"><label><span>Instagram profile</span><input name="instagramUrl" type="url" defaultValue={user.instagramUrl} placeholder="https://instagram.com/username" /></label><label><span>Website or portfolio</span><input name="websiteUrl" type="url" defaultValue={user.websiteUrl} placeholder="https://yourwebsite.com" /></label></div>
            </section>
            <section className="settings-card glass-panel">
              <header><span>✦</span><div><h2>Your onboarding choices</h2><p>These shape what Derot offers during an impulse.</p></div><button type="button" onClick={() => navigate('onboarding')}>Redo onboarding</button></header>
              <fieldset><legend>Interests</legend><div className="interest-chips">{interestOptions.map(([value, icon, label]) => <button key={value} className={interests.includes(value) ? 'selected' : ''} type="button" aria-pressed={interests.includes(value)} onClick={() => toggleInterest(value)}><span>{icon}</span>{label}<i>✓</i></button>)}</div></fieldset>
              <div className="radio-grid"><fieldset><legend>Most common trigger</legend>{[['morning','☀','Mornings'],['breaks','☕','Work breaks'],['evening','◒','Evenings'],['bedtime','☾','Bedtime']].map(([value, icon, label]) => <label key={value}><input type="radio" name="trigger" value={value} defaultChecked={value === (state.preferences?.trigger[0] ?? 'evening')} /><span>{icon}</span>{label}</label>)}</fieldset><fieldset><legend>Preferred replacement</legend>{[['quick-facts','✦','Quick facts'],['micro-lessons','▤','Micro lessons'],['mindful-reset','◌','Mindful reset'],['creative-prompt','✎','Creative prompt']].map(([value, icon, label]) => <label key={value}><input type="radio" name="replacement" value={value} defaultChecked={value === (state.preferences?.replacement[0] ?? 'quick-facts')} /><span>{icon}</span>{label}</label>)}</fieldset></div>
            </section>
          </div>
          <aside className="settings-side">
            <section className="settings-card glass-panel"><header><span>◷</span><div><h2>Attention preferences</h2><p>Control how Derot steps in.</p></div></header><label><span>Daily reclaimed-time goal</span><select name="dailyGoal" defaultValue={String(user.dailyGoal)}><option value="30">30 minutes</option><option value="60">60 minutes</option><option value="90">90 minutes</option></select></label><label><span>Intervention style</span><select name="intervention" defaultValue={user.intervention}><option value="gentle">Gentle</option><option value="balanced">Balanced</option><option value="firm">Firm</option></select></label><label className="toggle"><span><b>Weekly attention summary</b><small>Email a calm weekly recap.</small></span><input type="checkbox" name="weeklySummary" defaultChecked={user.weeklySummary} /></label></section>
            <section className="settings-card glass-panel"><header><span>◇</span><div><h2>Security</h2><p>Keep your account protected.</p></div></header><div className="action-row"><span><b>Password</b><small>Managed by your account provider</small></span><button type="button">Change</button></div><label className="toggle"><span><b>Two-factor authentication</b><small>Add an extra sign-in step.</small></span><input type="checkbox" name="twoFactor" defaultChecked={user.twoFactor} /></label></section>
            <section className="settings-card glass-panel"><header><span>□</span><div><h2>Data & privacy</h2><p>Your attention data belongs to you.</p></div></header><div className="action-row"><span><b>Export my data</b><small>Download a JSON copy.</small></span><button type="button" onClick={exportData}>Export</button></div><div className="action-row danger"><span><b>Delete account</b><small>Remove profile and history.</small></span><button type="button">Delete</button></div></section>
          </aside>
        </div>
      </form>
    </AppShell>
  )
}
