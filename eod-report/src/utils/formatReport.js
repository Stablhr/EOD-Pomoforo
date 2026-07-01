import { formatHours } from './formatHours'

export function formatReport({ date, tasks, notes, author }) {
  const lines = []
  lines.push(`End of Day Report — ${date}`)
  lines.push('')
  lines.push('Tasks Completed:')

  const filtered = tasks.filter(t => t.name.trim())
  if (filtered.length === 0) {
    lines.push('- (no tasks logged)')
  } else {
    filtered.forEach(t => {
      const hrs = Number(t.hours) || 0
      lines.push(`- ${t.name.trim()} — ${formatHours(hrs)}`)
    })
  }

  lines.push('')
  const total = filtered.reduce((sum, t) => sum + (Number(t.hours) || 0), 0)
  lines.push(`Total Hours: ${formatHours(total)}`)

  if (notes.trim()) {
    lines.push('')
    lines.push('Notes:')
    lines.push(notes.trim())
  }

  if (author?.trim()) {
    lines.push('')
    lines.push(`— ${author.trim()}`)
  }

  return lines.join('\n')
}
