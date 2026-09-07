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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Activity Log</h1>
        {activities.length > 0 && (
          <button
            onClick={handleDeleteAll}
            disabled={deleteAllActivities.isPending}
            className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors text-sm font-medium disabled:opacity-50"
          >
            {deleteAllActivities.isPending ? 'Deleting...' : 'Delete all activities'}
          </button>
        )}
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <ul className="divide-y divide-border">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-muted/50"
            >
              <span className="text-sm">{formatActivityMessage(activity)}</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatRelativeTime(activity.createdAt)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {activities.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No activity yet.
        </div>
      )}
    </div>
  )
}

export default ActivityPage
