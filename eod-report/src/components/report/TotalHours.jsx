import { Clock } from '../icons'

export default function TotalHours({ tasks }) {
  const total = tasks.reduce((sum, t) => sum + (Number(t.hours) || 0), 0)

  return (
    <div className="flex items-center gap-2 text-gray-700">
      <Clock className="w-5 h-5 text-indigo-500" />
      <span className="text-sm font-medium">Total Hours:</span>
      <span className="text-lg font-semibold text-indigo-600">{total}</span>
      <span className="text-sm text-gray-400">hrs</span>
    </div>
  )
}
