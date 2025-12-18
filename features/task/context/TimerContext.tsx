'use client'

import React from 'react'
import { usePageVisibility } from 'react-page-visibility'

type TimerContextType = {
  time: number
  setTime: (ms: number) => void
  startStoper: () => void
  resetStoper: () => void
  startTimer: (ms: number) => void
  resetTimer: () => void
  runningStoper: boolean
  runningTimer: boolean
}

export const TimerContext = React.createContext<TimerContextType | null>(null)

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [time, setTime] = React.useState(0)
  const [runningStoper, setRunningStoper] = React.useState(false)
  const [runningTimer, setRunningTimer] = React.useState(false)
  const isVisible = usePageVisibility()

  const wasStoperRunning = React.useRef(false)
  const wasTimerRunning = React.useRef(false)

  React.useEffect(() => {
    if (!runningStoper) return
    const interval = setInterval(() => setTime((prev) => prev + 10), 10)
    return () => clearInterval(interval)
  }, [runningStoper])

  React.useEffect(() => {
    if (!runningTimer) return
    if (time <= 0) {
      setRunningTimer(false)
      return
    }
    const interval = setInterval(
      () => setTime((prev) => Math.max(prev - 10, 0)),
      10
    )
    return () => clearInterval(interval)
  }, [runningTimer, time])

  React.useEffect(() => {
    if (!isVisible) {
      wasStoperRunning.current = runningStoper
      wasTimerRunning.current = runningTimer
      setRunningStoper(false)
      setRunningTimer(false)
    } else {
      if (wasStoperRunning.current) setRunningStoper(true)
      if (wasTimerRunning.current) setRunningTimer(true)
    }
  }, [isVisible])

  return (
    <TimerContext.Provider
      value={{
        time,
        setTime,
        startStoper: () => {
          setRunningStoper(true)
          setRunningTimer(false)
        },
        resetStoper: () => {
          setRunningStoper(false)
          setTime(0)
        },
        startTimer: (ms: number) => {
          setTime(ms)
          setRunningTimer(true)
          setRunningStoper(false)
        },
        resetTimer: () => {
          setRunningTimer(false)
          setTime(0)
        },
        runningStoper,
        runningTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  )
}
