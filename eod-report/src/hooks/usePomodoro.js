import { useState, useRef, useCallback, useEffect } from 'react'

const DEFAULTS = { focus: 25, shortBreak: 5, longBreak: 15, longBreakInterval: 4 }

export function usePomodoro(settings = DEFAULTS) {
  const [mode, setMode] = useState('idle')
  const [sessionType, setSessionType] = useState('focus')
  const [sessionCount, setSessionCount] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(settings.focus * 60)
  const [totalTime, setTotalTime] = useState(settings.focus * 60)

  const modeRef = useRef(mode)
  const sessionTypeRef = useRef(sessionType)
  const sessionCountRef = useRef(sessionCount)
  const endTimeRef = useRef(0)
  const intervalRef = useRef(null)
  const settingsRef = useRef(settings)

  useEffect(() => { modeRef.current = mode }, [mode])
  useEffect(() => { sessionTypeRef.current = sessionType }, [sessionType])
  useEffect(() => { sessionCountRef.current = sessionCount }, [sessionCount])
  useEffect(() => { settingsRef.current = settings }, [settings])

  const getDuration = useCallback((type) => {
    switch (type) {
      case 'focus': return settings.focus * 60
      case 'shortBreak': return settings.shortBreak * 60
      case 'longBreak': return settings.longBreak * 60
      default: return settings.focus * 60
    }
  }, [settings])

  const advanceSession = useCallback(() => {
    const s = settingsRef.current
    const currentType = sessionTypeRef.current

    if (currentType === 'focus') {
      const newCount = sessionCountRef.current + 1
      setSessionCount(newCount)
      if (newCount % s.longBreakInterval === 0) {
        setSessionType('longBreak')
        setTotalTime(s.longBreak * 60)
        setTimeRemaining(s.longBreak * 60)
      } else {
        setSessionType('shortBreak')
        setTotalTime(s.shortBreak * 60)
        setTimeRemaining(s.shortBreak * 60)
      }
    } else {
      setSessionType('focus')
      setTotalTime(s.focus * 60)
      setTimeRemaining(s.focus * 60)
    }
  }, [])

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    endTimeRef.current = Date.now() + timeRemaining * 1000

    intervalRef.current = setInterval(() => {
      const remaining = Math.max(0, (endTimeRef.current - Date.now()) / 1000)
      setTimeRemaining(remaining)
      if (remaining <= 0) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        setMode('idle')
        advanceSession()
      }
    }, 100)
  }, [timeRemaining, advanceSession])

  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setMode('paused')
    }
  }, [])

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setMode('idle')
    setSessionType('focus')
    setSessionCount(0)
    const dur = settings.focus * 60
    setTotalTime(dur)
    setTimeRemaining(dur)
  }, [settings])

  const toggle = useCallback(() => {
    if (modeRef.current === 'running') {
      pauseTimer()
    } else {
      setMode('running')
    }
  }, [pauseTimer])

  useEffect(() => {
    if (mode === 'running' && !intervalRef.current) {
      startTimer()
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [mode, startTimer])

  return {
    mode,
    sessionType,
    sessionCount,
    timeRemaining,
    totalTime,
    toggle,
    reset: resetTimer,
  }
}
