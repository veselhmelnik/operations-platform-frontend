import { TaskPriority, TaskStatus } from "./enums"
import { User } from "./user"

export type TaskLabel = {
    id: string
    name: string
    color: string
}

export type Task = {
    id: string
    title: string
    description: string | null
    status: TaskStatus
    priority: TaskPriority
    position: number

    projectId: string

    labels: {
        label: TaskLabel
    }[]

    assigneeId: string | null
    assignee?: User | null

    createdAt: string
    updatedAt: string
}