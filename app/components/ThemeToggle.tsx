'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      }
      className="grid size-7.5 cursor-pointer place-items-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors hover:border-primary-line hover:text-primary"
    >
      <Sun className="size-3.5 light:hidden" />
      <Moon className="hidden size-3.5 light:block" />
    </button>
  )
}
