export default function TabSwitcher({ active, onChange }) {
  const tabs = [
    { key: 'report', label: 'EOD Report' },
    { key: 'pomodoro', label: 'Focus Timer' },
  ]

  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-2xl w-fit">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
            active === tab.key
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
