'use client'

import { useActivities, useDeleteAllActivities } from '@/app/hooks/useActivities'
import { useOrganizationParams } from '@/app/hooks/useParams'
import { formatActivityMessage } from '@/app/utils/helpers/activity.helper'
import { formatRelativeTime } from '@/app/utils/helpers/time.helper'
import { toast } from 'sonner'

const ActivityPage = () => {
  const { organizationId } = useOrganizationParams()
  const { data: activities = [], isLoading } = useActivities(organizationId)
  const deleteAllActivities = useDeleteAllActivities(organizationId)

  const handleDeleteAll = async () => {
    if (!confirm('Are you sure you want to delete all activity logs? This cannot be undone.')) return

    try {
      await deleteAllActivities.mutateAsync()
      toast.success('All activity logs deleted')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete activity logs')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Loading activity...</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-up flex flex-col gap-3.5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-[-0.015em]">
          Activity log
        </h1>
        {activities.length > 0 && (
          <button
            onClick={handleDeleteAll}
            disabled={deleteAllActivities.isPending}
            className="cursor-pointer rounded-lg border border-destructive/40 px-3 py-2 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:pointer-events-none disabled:opacity-50"
          >
            {deleteAllActivities.isPending
              ? 'Deleting…'
              : 'Delete all activities'}
          </button>
        )}
      </div>

      {activities.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-border-soft bg-card">
          <ul className="divide-y divide-border-soft">
            {activities.map((activity) => (
              <li
                key={activity.id}
                className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-muted/50"
              >
                <span className="text-sm">
                  {formatActivityMessage(activity)}
                </span>
                <span className="text-2xs whitespace-nowrap text-faint">
                  {formatRelativeTime(activity.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-faint">
          No activity yet.
        </div>
      )}
    </div>
  )
}

export default ActivityPage
