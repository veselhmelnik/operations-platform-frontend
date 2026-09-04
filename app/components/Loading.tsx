import { Loader2 } from 'lucide-react'

interface LoadingProps {
  message?: string
  submessage?: string
}

export default function Loading({
  message = 'Loading…',
  submessage = 'Please wait while we prepare your workspace.',
}: LoadingProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div
        className="w-full max-w-sm rounded-xl border border-border bg-card p-8 text-center shadow-sm"
        role="status"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <Loader2
            className="h-7 w-7 animate-spin text-primary"
            aria-hidden="true"
          />
        </div>
        <h1 className="mt-6 text-lg font-semibold tracking-tight text-card-foreground">
          {message}
        </h1>
        {submessage && (
          <p className="mt-2 text-sm text-muted-foreground">{submessage}</p>
        )}
      </div>
    </div>
  )
}
