import { TaskItem } from "./models/TaskItem"
export const tasks: TaskItem[] = [
    new TaskItem(1, 'Task1'),
    new TaskItem(2, 'Task2'),
    new TaskItem(3, 'Task3'),
    new TaskItem(4, 'Task4', true),
]