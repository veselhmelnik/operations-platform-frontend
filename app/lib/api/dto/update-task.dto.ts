import { TaskStatus } from "@/app/types/enums"

export type UpdateTaskPayload = {
    title?: string
    description?: string | null
    status?: TaskStatus
    assigneeId?: string | null
}