import { useState } from 'react'
import { Settings } from '../icons'

export default function PomodoroSettings({ settings, onSave }) {
  const [open, setOpen] = useState(false)
  const [local, setLocal] = useState({ ...settings })

  const handleSave = () => {
    onSave(local)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200"
        aria-label="Timer settings"
      >
        <Settings className="w-4 h-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 w-56 bg-white border border-gray-200 rounded-2xl shadow-lg p-4 z-20">
            <div className="space-y-3">
              {[
                { key: 'focus', label: 'Focus (min)' },
                { key: 'shortBreak', label: 'Short Break (min)' },
                { key: 'longBreak', label: 'Long Break (min)' },
                { key: 'longBreakInterval', label: 'Long Break Every' },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-xs text-gray-500">{field.label}</label>
                  <input
                    type="number"
                    value={local[field.key]}
                    onChange={e => setLocal({ ...local, [field.key]: Number(e.target.value) })}
                    min="1"
                    className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              ))}
              <button
                onClick={handleSave}
                className="w-full py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
