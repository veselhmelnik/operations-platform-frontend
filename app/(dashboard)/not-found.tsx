import Link from 'next/link'
import { routes } from '../lib/routes'
import { btnGhost } from '../utils/tailwind-constants'

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center py-16">
      <div className="animate-fade-up max-w-md text-center">
        <div className="text-3xl font-bold tracking-[-0.045em] text-primary">
          404
        </div>
        <h2 className="mt-2 text-lg font-semibold tracking-[-0.015em]">
          Page not found
        </h2>
        <p className="mt-2 text-xs text-muted-foreground">
          That page doesn&apos;t exist, or you no longer have access to it.
        </p>
        <Link href={routes.dashboard()} className={`${btnGhost} mt-5`}>
          Back to dashboard
        </Link>
      </div>
    </div>
  )
}
