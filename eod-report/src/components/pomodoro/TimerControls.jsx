import { Play, Pause, Reset } from '../icons'

export default function TimerControls({ mode, onToggle, onReset }) {
  return (
    <div className="flex items-center justify-center gap-5">
      <button
        onClick={onToggle}
        className="flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
        aria-label={mode === 'running' ? 'Pause' : 'Start'}
      >
        {mode === 'running' ? (
          <Pause className="w-7 h-7" />
        ) : (
          <Play className="w-7 h-7 ml-0.5" />
        )}
      </button>
      <button
        onClick={onReset}
        className="flex items-center justify-center w-11 h-11 text-gray-400 hover:text-gray-600 hover:bg-stone-100 rounded-full active:scale-95 transition-all duration-200"
        aria-label="Reset"
      >
        <Reset className="w-5 h-5" />
      </button>
    </div>
  )
}
