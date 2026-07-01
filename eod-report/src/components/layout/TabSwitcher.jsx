export default function TabSwitcher({ active, onChange }) {
  const tabs = [
    { key: 'report', label: 'EOD Report', icon: '📋' },
    { key: 'pomodoro', label: 'Focus Timer', icon: '⏱' },
  ]

  return (
    <div className="flex gap-1 p-1 bg-white shadow-xs border border-stone-200 rounded-2xl w-fit">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
            active === tab.key
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {active === tab.key && tab.key === 'report' && (
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <line x1="9" y1="14" x2="15" y2="14" />
              <line x1="9" y1="17" x2="13" y2="17" />
            </svg>
          )}
          {active === tab.key && tab.key === 'pomodoro' && (
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          )}
          {tab.label}
        </button>
      ))}
    </div>
  )
}
