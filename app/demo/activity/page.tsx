'use client'

import { useDemoWorkspace } from '../demo-workspace-context'
import { formatActivityMessage } from '@/app/utils/helpers/activity.helper'
import { formatRelativeTime } from '@/app/utils/helpers/time.helper'

const DemoActivityPage = () => {
  const { activity } = useDemoWorkspace()

  return (
    <div className="animate-fade-up flex flex-col gap-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-lg font-semibold tracking-[-0.015em]">
          Activity log
        </h1>
        {activity.length > 0 && (
          <div className="rounded-lg bg-secondary/50 px-3 py-1.5 text-2xs text-muted-foreground">
            Demo mode: delete disabled
          </div>
        )}
      </div>

      {activity.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-border-soft bg-card">
          <ul className="divide-y divide-border-soft">
            {activity.map((item) => (
              <li
                key={item.id}
                className="flex flex-col items-start gap-1 px-3 py-3 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:px-4"
              >
                <span className="text-sm">
                  {formatActivityMessage(item)}
                </span>
                <span className="text-2xs whitespace-nowrap text-faint">
                  {formatRelativeTime(item.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-faint">
          No activity yet. Try creating or editing a task to see activity appear here.
        </div>
      )}
    </div>
  )
}

export default DemoActivityPage
