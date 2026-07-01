import { Play, Pause, Reset } from '../icons'

export default function TimerControls({ mode, onToggle, onReset }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-center w-14 h-14 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-sm transition-all duration-200"
        aria-label={mode === 'running' ? 'Pause' : 'Start'}
      >
        {mode === 'running' ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Play className="w-6 h-6 ml-0.5" />
        )}
      </button>
      <button
        onClick={onReset}
        className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-stone-200/50 rounded-full transition-all duration-200"
        aria-label="Reset"
      >
        <Reset className="w-5 h-5" />
      </button>
    </div>
  )
}
