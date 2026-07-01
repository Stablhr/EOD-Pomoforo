import { Trash, ChevronRight } from '../icons'
import { formatDate } from '../../utils/formatDate'

export default function HistoryItem({ report, onLoad, onDelete }) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5 hover:bg-stone-200/50 rounded-xl transition-all duration-200 group">
      <button
        onClick={() => onLoad(report)}
        className="flex items-center gap-2 flex-1 text-left"
      >
        <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-indigo-500 transition-all duration-200" />
        <div>
          <div className="text-sm font-medium text-gray-700">
            {formatDate(report.date)}
          </div>
          <div className="text-xs text-gray-400">
            {report.tasks.length} tasks · {report.totalHours} hrs
          </div>
        </div>
      </button>
      <button
        onClick={() => onDelete(report.id)}
        className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
        aria-label="Delete report"
      >
        <Trash className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
