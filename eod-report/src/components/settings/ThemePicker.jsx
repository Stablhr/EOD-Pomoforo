import { useState, useRef, useEffect } from 'react'
import { THEMES, getTheme } from '../../themes'

export default function ThemePicker({ theme, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = getTheme(theme)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 border border-stone-200 rounded-xl text-xs font-medium text-gray-500 hover:text-gray-700 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-200 active:scale-95"
      >
        <img
          src={current.mascot}
          alt=""
          className="w-5 h-5 rounded-md object-cover"
        />
        {current.name}
      </button>

      {open && (
        <div className="absolute top-full mt-1.5 right-0 w-48 max-w-[90vw] bg-white rounded-xl shadow-lg border border-stone-200 p-1.5 z-50 animate-fade-in-up">
          {THEMES.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => { onChange(t.id); setOpen(false) }}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                theme === t.id
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-gray-600 hover:bg-stone-50 hover:text-gray-800'
              }`}
            >
              <img
                src={t.mascot}
                alt=""
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-stone-200"
              />
              <span>{t.name}</span>
              {theme === t.id && (
                <svg className="w-4 h-4 ml-auto text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
