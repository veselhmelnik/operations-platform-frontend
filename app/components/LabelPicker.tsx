'use client'

import { useRef, useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import { TaskLabel } from '@/app/types/task'
import { labelChipStyle } from '@/app/utils/helpers/task.helper'
import { fieldInput, fieldLabel } from '@/app/utils/tailwind-constants'

const COLOR_PRESETS = [
  '#c9a2f0',
  '#ff6b6b',
  '#4dabf7',
  '#51cf66',
  '#ffd93d',
  '#ff922b',
  '#a78bfa',
  '#ec4899',
]

type LabelPickerProps = {
  selectedIds: string[]
  availableLabels: TaskLabel[]
  onToggle: (labelId: string) => void
  onCreateLabel: (name: string, color: string) => Promise<void>
  isLoading?: boolean
}

export function LabelPicker({
  selectedIds,
  availableLabels,
  onToggle,
  onCreateLabel,
  isLoading,
}: LabelPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [newLabelName, setNewLabelName] = useState('')
  const [newLabelColor, setNewLabelColor] = useState(COLOR_PRESETS[0])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  const selectedLabels = availableLabels.filter((l) => selectedIds.includes(l.id))

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
        setIsCreating(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCreateLabel = async () => {
    if (!newLabelName.trim()) return

    setIsSubmitting(true)
    try {
      await onCreateLabel(newLabelName, newLabelColor)
      setNewLabelName('')
      setNewLabelColor(COLOR_PRESETS[0])
      setIsCreating(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1.5">
      <span className={fieldLabel}>Labels</span>

      <div className="flex flex-wrap gap-1.5">
        {selectedLabels.map((label) => (
          <button
            key={label.id}
            type="button"
            onClick={() => onToggle(label.id)}
            style={labelChipStyle(label.color)}
            className="flex items-center gap-1 rounded-full border px-2 py-1 text-2xs font-medium text-foreground transition-opacity hover:opacity-75"
          >
            {label.name}
            <X className="size-3" />
          </button>
        ))}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading}
          className="flex cursor-pointer items-center gap-1 rounded-full border border-dashed border-border bg-muted px-2 py-1 text-2xs font-medium text-muted-foreground transition-colors hover:border-primary-line hover:bg-primary-soft hover:text-primary disabled:opacity-50"
        >
          <Plus className="size-3" />
          Add label
        </button>
      </div>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute top-full left-0 z-40 mt-1.5 w-56 rounded-lg border border-border bg-card p-3 shadow-lg"
        >
          {isCreating ? (
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-foreground">
                Create new label
              </h3>

              <label className="flex flex-col gap-1">
                <span className={fieldLabel}>Name</span>
                <input
                  type="text"
                  value={newLabelName}
                  onChange={(e) => setNewLabelName(e.target.value)}
                  placeholder="Label name"
                  autoFocus
                  className={fieldInput}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className={fieldLabel}>Color</span>
                <div className="grid grid-cols-4 gap-1.5">
                  {COLOR_PRESETS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewLabelColor(color)}
                      className={`size-7 rounded-lg border-2 transition-all ${
                        newLabelColor === color
                          ? 'border-primary'
                          : 'border-transparent hover:border-border'
                      }`}
                      style={{ background: color }}
                    />
                  ))}
                </div>
              </label>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false)
                    setNewLabelName('')
                    setNewLabelColor(COLOR_PRESETS[0])
                  }}
                  className="flex-1 rounded-lg px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateLabel}
                  disabled={isSubmitting || !newLabelName.trim()}
                  className="flex-1 rounded-lg bg-primary px-2 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating…' : 'Create'}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Labels
                </h3>
              </div>

              {availableLabels.length > 0 ? (
                <div className="max-h-48 overflow-y-auto flex flex-col gap-1">
                  {availableLabels.map((label) => {
                    const isSelected = selectedIds.includes(label.id)
                    return (
                      <button
                        key={label.id}
                        type="button"
                        onClick={() => onToggle(label.id)}
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted"
                      >
                        <div
                          className={`size-4 shrink-0 rounded border-2 flex items-center justify-center ${
                            isSelected
                              ? 'border-primary bg-primary'
                              : 'border-border'
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="size-3 text-primary-foreground"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                            >
                              <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 1 1-1.06-1.06L12.72 4.22a.75.75 0 0 1 1.06 0Z" />
                            </svg>
                          )}
                        </div>
                        <span
                          className="size-2 rounded-full shrink-0"
                          style={{ background: label.color }}
                        />
                        <span className="truncate font-medium text-foreground">
                          {label.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <p className="text-2xs text-faint py-2">
                  No labels yet. Create your first one below.
                </p>
              )}

              <button
                type="button"
                onClick={() => setIsCreating(true)}
                className="mt-1 flex items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-transparent px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary-line hover:bg-primary-soft hover:text-primary"
              >
                <Plus className="size-3.5" />
                Create new label
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
