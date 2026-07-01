import { Clock } from '../icons'
import { formatHours } from '../../utils/formatHours'

export default function TotalHours({ tasks }) {
  const total = tasks.reduce((sum, t) => sum + (Number(t.hours) || 0), 0)

  return (
    <div className="flex items-center gap-2.5 px-4 py-3 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
      <Clock className="w-5 h-5 text-indigo-500" />
      <span className="text-sm font-medium text-gray-600">Total:</span>
      <span className="text-lg font-bold text-indigo-600">{formatHours(total)}</span>
    </div>
  )
}
