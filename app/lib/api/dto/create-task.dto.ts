import { TaskPriority } from "@/app/types/enums"

export type CreateTaskPayload = {
    title: string
    description?: string
    assigneeId?: string
    priority?: TaskPriority
}