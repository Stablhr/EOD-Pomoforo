import { formatHours } from './formatHours'

export function formatReport({ date, tasks, notes, author, reportStyle = 'plain' }) {
  const useEmoji = reportStyle === 'emoji'
  const lines = []

  if (useEmoji) {
    lines.push(`📋 End of Day Report — ${date}`)
    lines.push('')
    lines.push('✅ Tasks Completed:')
  } else {
    lines.push(`End of Day Report — ${date}`)
    lines.push('')
    lines.push('Tasks Completed:')
  }

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
  lines.push(`${useEmoji ? '🕒 ' : ''}Total Hours: ${formatHours(total)}`)

  if (notes.trim()) {
    lines.push('')
    lines.push(`${useEmoji ? '📝 ' : ''}Notes:`)
    lines.push(notes.trim())
  }

  if (author?.trim()) {
    lines.push('')
    lines.push(`— ${author.trim()}`)
  }

  return lines.join('\n')
}
