import { Trash, ChevronRight } from '../icons'
import { formatDate } from '../../utils/formatDate'
import { formatHours } from '../../utils/formatHours'

export default function HistoryItem({ report, onLoad, onDelete }) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5 hover:bg-indigo-50/50 rounded-xl transition-all duration-200 group cursor-pointer" onClick={() => onLoad(report)}>
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-all duration-200">
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-indigo-600 transition-all duration-200" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-gray-700 truncate">
            {formatDate(report.date)}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">
            {report.tasks.length} task{report.tasks.length !== 1 ? 's' : ''} · {formatHours(report.totalHours)}
          </div>
        </div>
      </div>
      <button
        onClick={e => { e.stopPropagation(); onDelete(report.id) }}
        className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-100/50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 shrink-0"
        aria-label="Delete report"
      >
        <Trash className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
