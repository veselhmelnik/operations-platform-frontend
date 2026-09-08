'use client'

import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

const listeners = new Set<() => void>()

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  return () => {
    listeners.delete(onChange)
  }
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains('light') ? 'light' : 'dark'
}

function getServerSnapshot(): Theme {
  return 'dark'
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleTheme = useCallback(() => {
    const isLight = document.documentElement.classList.toggle('light')
    try {
      localStorage.setItem('theme', isLight ? 'light' : 'dark')
    } catch {
    }
    listeners.forEach((notify) => notify())
  }, [])

  return { theme, toggleTheme }
}
