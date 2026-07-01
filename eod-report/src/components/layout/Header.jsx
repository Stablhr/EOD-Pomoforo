import { HistoryIcon } from '../icons'

export default function Header({ onHistoryToggle }) {
  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <line x1="9" y1="14" x2="9" y2="17" />
              <line x1="12" y1="11" x2="12" y2="17" />
              <line x1="15" y1="13" x2="15" y2="17" />
            </svg>
          </div>
          <h1 className="text-base font-semibold text-gray-800">EOD Report</h1>
        </div>
        <button
          onClick={onHistoryToggle}
          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-100/50 rounded-xl transition-all duration-200 active:scale-95"
          aria-label="Toggle history"
        >
          <HistoryIcon className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
