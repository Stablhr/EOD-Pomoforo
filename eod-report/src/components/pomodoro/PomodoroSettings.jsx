import { useState } from 'react'
import { Settings } from '../icons'

export default function PomodoroSettings({ settings, onSave }) {
  const [open, setOpen] = useState(false)
  const [local, setLocal] = useState({ ...settings })

  const handleOpen = () => {
    setLocal({ ...settings })
    setOpen(true)
  }

  const handleSave = () => {
    onSave(local)
    setOpen(false)
  }

  const update = (key, val) => {
    const num = Math.max(1, Number(val) || 1)
    setLocal({ ...local, [key]: num })
  }

  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={handleOpen}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 active:scale-95"
          aria-label="Timer settings"
        >
          <Settings className="w-3.5 h-3.5" />
          Settings
        </button>
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm animate-fade-in-up" onClick={() => setOpen(false)} />
          <div className="fixed inset-0 z-20 flex items-center justify-center p-4 pointer-events-none">
            <div className="w-full max-w-xs bg-white border border-stone-200 rounded-2xl shadow-xl p-5 pointer-events-auto animate-fade-in-up">
              <div className="text-sm font-semibold text-gray-800 mb-4 text-center">
                Timer Settings
              </div>

              <div className="space-y-3">
                {[
                  { key: 'focus', label: 'Focus', suffix: 'minutes' },
                  { key: 'shortBreak', label: 'Short Break', suffix: 'minutes' },
                  { key: 'longBreak', label: 'Long Break', suffix: 'minutes' },
                  { key: 'longBreakInterval', label: 'Long Break', suffix: 'sessions' },
                ].map(field => (
                  <div key={field.key}>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs text-gray-500">{field.label}</label>
                      <span className="text-[10px] text-gray-300">{field.suffix}</span>
                    </div>
                    <input
                      type="number"
                      value={local[field.key]}
                      onChange={e => update(field.key, e.target.value)}
                      min="1"
                      className="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 py-2 text-sm font-medium text-gray-500 bg-stone-100 hover:bg-stone-200 rounded-xl transition-all duration-200 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all duration-200 active:scale-95"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
