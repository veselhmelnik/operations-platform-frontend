import { TaskStatus } from "./enums"
import { User } from "./user"


export type Task = {
    id: string
    title: string
    description: string | null
    status: TaskStatus
    position: number

    projectId: string
    
    assigneeId: string | null
    assignee?: User | null

    createdAt: string
    updatedAt: string
}