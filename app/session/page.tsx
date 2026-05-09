'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function Session() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [pomodoros, setPomodoros] = useState(0)
  const intervalRef = useRef<any>(null)
  const router = useRouter()

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev === 0) {
            setMinutes(m => {
              if (m === 0) {
                clearInterval(intervalRef.current)
                setIsRunning(false)
                if (!isBreak) {
                  setPomodoros(p => p + 1)
                  setIsBreak(true)
                  setMinutes(5)
                } else {
                  setIsBreak(false)
                  setMinutes(25)
                }
                return m
              }
              return m - 1
            })
            return 59
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning, isBreak])

  const toggle = () => setIsRunning(!isRunning)

  const reset = () => {
    setIsRunning(false)
    setIsBreak(false)
    setMinutes(25)
    setSeconds(0)
  }

  const progress = isBreak
    ? ((5 * 60 - (minutes * 60 + seconds)) / (5 * 60)) * 100
    : ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100

  return (
    <main className="min-h-screen bg-[#0F1117] text-white flex flex-col items-center justify-center">

      {/* Back */}
      <button
        onClick={() => router.push('/dashboard')}
        className="absolute top-6 left-8 text-gray-400 hover:text-white transition"
      >
        ← العودة
      </button>

      {/* Status */}
      <p className="text-[#4F6EF7] font-medium mb-8 text-lg">
        {isBreak ? '☕ وقت الراحة' : '🎯 وقت الدراسة'}
      </p>

      {/* Timer Circle */}
      <div className="relative w-64 h-64 mb-10">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#1A1F2E" strokeWidth="8"/>
          <circle
            cx="50" cy="50" r="45" fill="none"
            stroke={isBreak ? '#059669' : '#4F6EF7'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className="text-gray-500 text-sm mt-2">
            {isBreak ? 'استرح قليلاً' : 'ركّز على دراستك'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={toggle}
          className="bg-[#4F6EF7] text-white px-10 py-4 rounded-2xl text-lg font-bold hover:bg-[#3d5ce0] transition"
        >
          {isRunning ? '⏸ إيقاف' : '▶ ابدأ'}
        </button>
        <button
          onClick={reset}
          className="border border-[#2A3050] text-gray-400 px-6 py-4 rounded-2xl hover:bg-[#1A1F2E] transition"
        >
          ↺ إعادة
        </button>
      </div>

      {/* Pomodoros */}
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full ${i < pomodoros % 4 ? 'bg-[#4F6EF7]' : 'bg-[#1A1F2E]'}`}
          />
        ))}
      </div>
      <p className="text-gray-600 text-sm mt-3">{pomodoros} Pomodoro مكتمل اليوم</p>

    </main>
  )
}