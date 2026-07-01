import { ChevronLeft, HistoryIcon } from '../icons'
import HistoryItem from './HistoryItem'

export default function HistoryDrawer({ open, reports, onLoad, onDelete, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/20 z-10" onClick={onClose} />
      )}
      <div
        className={`fixed top-14 left-0 bottom-0 w-72 bg-stone-50 border-r border-stone-200 z-20 transform transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 h-12 border-b border-stone-200/50">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <HistoryIcon className="w-4 h-4 text-indigo-500" />
            History
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-all duration-200"
            aria-label="Close history"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-48px)] p-2">
          {reports.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              No saved reports yet
            </p>
          ) : (
            reports.map(r => (
              <HistoryItem
                key={r.id}
                report={r}
                onLoad={onLoad}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}
