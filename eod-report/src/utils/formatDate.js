export function formatDate(date) {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date + 'T00:00:00') : new Date(date)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
