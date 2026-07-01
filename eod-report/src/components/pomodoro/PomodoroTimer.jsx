import { Clock } from '../icons'
import TimerRing from './TimerRing'
import TimerControls from './TimerControls'
import PomodoroSettings from './PomodoroSettings'
import { usePomodoro } from '../../hooks/usePomodoro'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const DEFAULTS = { focus: 25, shortBreak: 5, longBreak: 15, longBreakInterval: 4 }

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function PomodoroTimer() {
  const [settings, setSettings] = useLocalStorage('pomodoro_settings', DEFAULTS)
  const { mode, sessionType, sessionCount, timeRemaining, totalTime, toggle, reset } = usePomodoro(settings)

  const sessionLabel = {
    focus: 'Focus Time',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  }[sessionType]

  const isBreak = sessionType !== 'focus'

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 max-w-sm mx-auto text-center">
      <div className="flex items-center justify-center gap-2 mb-8">
        <Clock className="w-5 h-5 text-indigo-500" />
        <h2 className="text-base font-semibold text-gray-800">Focus Timer</h2>
      </div>

      <div className="relative inline-flex items-center justify-center mb-6">
        <TimerRing timeRemaining={timeRemaining} totalTime={totalTime} />
        <div className="absolute">
          <div className={`text-5xl font-bold tracking-tight ${isBreak ? 'text-teal-600' : 'text-gray-900'}`}>
            {formatTime(timeRemaining)}
          </div>
          <div className="text-sm font-medium text-gray-400 mt-1.5">{sessionLabel}</div>
        </div>
      </div>

      <div className="mb-6">
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
          isBreak ? 'bg-teal-100/50 text-teal-700' : 'bg-indigo-100/50 text-indigo-700'
        }`}>
          Session {sessionCount + 1} of {settings.longBreakInterval}
        </span>
      </div>

      <TimerControls mode={mode} onToggle={toggle} onReset={reset} />

      <div className="mt-6 pt-4 border-t border-stone-100">
        <PomodoroSettings settings={settings} onSave={setSettings} />
      </div>
    </div>
  )
}
