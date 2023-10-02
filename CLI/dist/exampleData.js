"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = void 0;
const TaskItem_1 = require("./models/TaskItem");
exports.tasks = [
    new TaskItem_1.TaskItem(1, 'Task1'),
    new TaskItem_1.TaskItem(2, 'Task2'),
    new TaskItem_1.TaskItem(3, 'Task3'),
    new TaskItem_1.TaskItem(4, 'Task4', true),
];
