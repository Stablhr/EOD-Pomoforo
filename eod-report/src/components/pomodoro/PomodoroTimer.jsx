import { useEffect } from 'react'
import { Clock } from '../icons'
import TimerRing from './TimerRing'
import TimerControls from './TimerControls'
import PomodoroSettings from './PomodoroSettings'
import { TimerDeco, DecoDots } from '../illustrations'
import { usePomodoro } from '../../hooks/usePomodoro'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const DEFAULTS = { focus: 25, shortBreak: 5, longBreak: 15, longBreakInterval: 4 }

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function PomodoroTimer({ onStateChange }) {
  const [settings, setSettings] = useLocalStorage('pomodoro_settings', DEFAULTS)
  const { mode, sessionType, sessionCount, timeRemaining, totalTime, toggle, reset } = usePomodoro(settings)


  useEffect(() => {
    if (onStateChange) {
      if (mode === 'running') {
        onStateChange(sessionType === 'focus' ? 'focused' : 'sleepy')
      } else {
        onStateChange('idle')
      }
    }
    return () => onStateChange?.('idle')
  }, [mode, sessionType, onStateChange])

  const sessionLabel = {
    focus: 'Focus Time',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  }[sessionType]

  const isBreak = sessionType !== 'focus'

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 sm:p-8 max-w-sm mx-auto text-center relative overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="absolute inset-0 pointer-events-none">
        <TimerDeco className="w-full h-full" />
      </div>
      <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
        <Clock className="w-5 h-5 text-indigo-500" />
        <h2 className="text-base font-semibold text-gray-800">Focus Timer</h2>
      </div>

      <div className="relative inline-flex items-center justify-center mb-4 sm:mb-6 max-w-full">
        <TimerRing timeRemaining={timeRemaining} totalTime={totalTime} />
        <div className="absolute">
          <div className={`text-4xl sm:text-5xl font-bold tracking-tight ${isBreak ? 'text-teal-600' : 'text-gray-900'}`}>
            {formatTime(timeRemaining)}
          </div>
          <div className="text-sm font-medium text-gray-400 mt-1.5">{sessionLabel}</div>
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
          isBreak ? 'bg-teal-100/50 text-teal-700' : 'bg-indigo-100/50 text-indigo-700'
        }`}>
          Session {sessionCount + 1} of {settings.longBreakInterval}
        </span>
      </div>

      <TimerControls mode={mode} onToggle={toggle} onReset={reset} />

      <div className="mt-4 sm:mt-6 pt-4 border-t border-stone-100">
        <DecoDots className="w-full h-3 mb-3" />
        <PomodoroSettings settings={settings} onSave={setSettings} />
      </div>
    </div>
  )
}
