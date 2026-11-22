import type { ContentItem } from '../../../app/types/product'

export const approvedContentCatalog: ContentItem[] = [
  {
    id: 'sleep-brain-cleanup',
    title: 'Your brain tidies up while you sleep.',
    body: 'During deep sleep, fluid moves through the brain and helps clear metabolic waste accumulated during the day.',
    takeaway: 'Consistent sleep supports memory and focus.',
    icon: '☾', category: 'mindfulness', format: 'quick-fact', durationMinutes: 2,
    sourceLabel: 'Derot science brief', reviewStatus: 'approved', reviewedAt: '2026-10-28T08:00:00.000Z',
  },
  {
    id: 'memory-rest',
    title: 'Memories become stronger after you rest.',
    body: 'Sleep helps reorganize new information, strengthening useful connections and letting less important details fade.',
    takeaway: 'Reviewing something once before sleep can help it stick.',
    icon: '✦', category: 'knowledge', format: 'micro-lesson', durationMinutes: 2,
    sourceLabel: 'Derot learning brief', reviewStatus: 'approved', reviewedAt: '2026-10-29T08:00:00.000Z',
  },
  {
    id: 'morning-light',
    title: 'Morning light can reset your inner clock.',
    body: 'Natural light early in the day gives your body a strong timing signal, supporting alertness now and sleepiness later.',
    takeaway: 'A short morning walk does more than wake you up.',
    icon: '☀', category: 'mindfulness', format: 'quick-fact', durationMinutes: 2,
    sourceLabel: 'Derot wellbeing brief', reviewStatus: 'approved', reviewedAt: '2026-10-30T08:00:00.000Z',
  },
  {
    id: 'word-petrichor',
    title: 'There is a word for the smell after rain.',
    body: 'Petrichor describes the earthy scent released when rain lands on dry soil. The term combines Greek roots for stone and divine fluid.',
    takeaway: 'New words give familiar experiences sharper edges.',
    icon: 'Aa', category: 'language', format: 'micro-lesson', durationMinutes: 2,
    sourceLabel: 'Derot language brief', reviewStatus: 'approved', reviewedAt: '2026-10-30T10:00:00.000Z',
  },
  {
    id: 'one-line-sketch',
    title: 'Draw what is nearest without lifting your finger.',
    body: 'Choose one object in reach and trace its outline in a single continuous line. Accuracy is irrelevant; attention is the exercise.',
    takeaway: 'Making something small can interrupt passive consumption.',
    icon: '✎', category: 'creativity', format: 'creative-prompt', durationMinutes: 3,
    sourceLabel: 'Derot creative prompt', reviewStatus: 'approved', reviewedAt: '2026-10-31T08:00:00.000Z',
  },
  {
    id: 'box-breathing',
    title: 'Take four slow, equal breaths.',
    body: 'Breathe in for four counts, pause for four, breathe out for four, and pause again. Repeat gently without forcing the breath.',
    takeaway: 'A deliberate pause creates room between an urge and an action.',
    icon: '◌', category: 'mindfulness', format: 'mindful-reset', durationMinutes: 2,
    sourceLabel: 'Derot mindful reset', reviewStatus: 'approved', reviewedAt: '2026-10-31T09:00:00.000Z',
  },
]

export function curateContent(interests: string[]) {
  if (!interests.length) return approvedContentCatalog
  return [...approvedContentCatalog].sort((left, right) => {
    return Number(interests.includes(right.category)) - Number(interests.includes(left.category))
  })
}
