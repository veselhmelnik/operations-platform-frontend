'use client'

import { X } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

type ModalShellProps = {
  title: string
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function ModalShell({
  title,
  onClose,
  children,
  footer,
  onSubmit,
}: ModalShellProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (typeof document === 'undefined') return null

  /* Fields scroll, header and footer stay put — otherwise a tall modal
     (register, update task) overflows a phone viewport with no way back. */
  const body = (
    <>
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
        {children}
      </div>
      {footer && (
        <div className="flex shrink-0 justify-end gap-2 border-t border-border-soft bg-muted/50 px-4 py-3">
          {footer}
        </div>
      )}
    </>
  )

  return createPortal(
    <div
      onClick={onClose}
      className="animate-fade-in fixed inset-0 z-70 grid place-items-center bg-scrim p-3 backdrop-blur-[7px] sm:p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-spring-in flex max-h-[90dvh] w-full max-w-105 flex-col overflow-hidden rounded-2xl border border-border bg-popover shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)]"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border-soft px-4 py-3.5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="size-1.5 shrink-0 rounded-full bg-primary" />
            <h2 className="truncate text-base font-semibold tracking-[-0.015em] text-foreground">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-md border border-border bg-muted text-muted-foreground transition-[color,transform,border-color] duration-250 hover:rotate-90 hover:border-primary-line hover:text-foreground md:size-6.5"
          >
            <X className="size-3.5 md:size-3" />
          </button>
        </div>

        {onSubmit ? (
          <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
            {body}
          </form>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col">{body}</div>
        )}
      </div>
    </div>,
    document.body,
  )
}
