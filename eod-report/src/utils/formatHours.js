export function formatHours(decimal) {
  const totalMin = Math.round(Number(decimal) * 60)
  if (totalMin === 0) return '0 hrs'
  const h = Math.floor(totalMin / 60)
  const m = totalMin % 60
  const parts = []
  if (h > 0) parts.push(`${h} hr${h > 1 ? 's' : ''}`)
  if (m > 0) parts.push(`${m} min`)
  return parts.join(' ')
}
