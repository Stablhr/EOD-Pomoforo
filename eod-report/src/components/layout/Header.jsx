import { HistoryIcon } from '../icons'

export default function Header({ onHistoryToggle }) {
  return (
    <header className="border-b border-stone-200 bg-stone-50">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">EOD Report</h1>
        <button
          onClick={onHistoryToggle}
          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-100/50 rounded-xl transition-all duration-200"
          aria-label="Toggle history"
        >
          <HistoryIcon className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
