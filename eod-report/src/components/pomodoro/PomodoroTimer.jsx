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
    focus: 'Focus',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  }[sessionType]

  const isBreak = sessionType !== 'focus'

  return (
    <div className="max-w-sm mx-auto text-center space-y-6">
      <div className="flex items-center justify-center gap-2">
        <Clock className="w-5 h-5 text-indigo-500" />
        <h2 className="text-lg font-semibold text-gray-900">Focus Timer</h2>
      </div>

      <div className="relative inline-flex items-center justify-center">
        <TimerRing timeRemaining={timeRemaining} totalTime={totalTime} />
        <div className="absolute">
          <div className={`text-4xl font-bold tracking-tight ${isBreak ? 'text-teal-600' : 'text-gray-900'}`}>
            {formatTime(timeRemaining)}
          </div>
          <div className="text-sm text-gray-400 mt-1">{sessionLabel}</div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          Session {sessionCount + 1} of {settings.longBreakInterval}
        </span>
      </div>

      <TimerControls mode={mode} onToggle={toggle} onReset={reset} />

      <PomodoroSettings settings={settings} onSave={setSettings} />
    </div>
  )
}
