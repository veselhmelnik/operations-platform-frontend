import { TaskStatus } from "./enums";
import { Task } from "./task";

export type Board = Record<TaskStatus, Task[]>