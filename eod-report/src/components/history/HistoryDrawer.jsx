import { ChevronLeft, HistoryIcon } from '../icons'
import HistoryItem from './HistoryItem'

export default function HistoryDrawer({ open, reports, onLoad, onDelete, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/20 z-10" onClick={onClose} />
      )}
      <div
        className={`fixed top-14 left-0 bottom-0 w-72 bg-white/95 backdrop-blur-sm border-r border-stone-200 shadow-lg z-20 transform transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 h-12 border-b border-stone-200/50">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center">
              <HistoryIcon className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            History
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-stone-100 rounded-lg transition-all duration-200"
            aria-label="Close history"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-48px)] p-3">
          {reports.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <HistoryIcon className="w-5 h-5 text-stone-400" />
              </div>
              <p className="text-sm font-medium text-gray-400">No saved reports yet</p>
              <p className="text-xs text-gray-300 mt-1">Save a report to see it here</p>
            </div>
          ) : (
            <div className="space-y-0.5">
              {reports.map(r => (
                <HistoryItem
                  key={r.id}
                  report={r}
                  onLoad={onLoad}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
