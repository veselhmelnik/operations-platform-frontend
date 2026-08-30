import { TaskStatus } from "@/app/types/enums"

export type MoveTaskPayload = {
    status: TaskStatus
    position: number
}