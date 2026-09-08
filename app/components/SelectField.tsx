'use client'

import { ChevronDown } from 'lucide-react'

type SelectFieldProps = {
  label?: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  children: React.ReactNode
}

export default function SelectField({
  label,
  value,
  onChange,
  disabled,
  children,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="px-1 text-3xs font-semibold tracking-[0.13em] uppercase text-faint">
          {label}
        </span>
      )}
      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer appearance-none rounded-lg border border-border bg-muted py-2 pr-7.5 pl-2.5 text-sm font-medium text-foreground outline-none transition-[border-color,background-color] hover:border-primary-line hover:bg-elevated focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-2.75 -translate-y-1/2 text-faint" />
      </div>
    </div>
  )
}
