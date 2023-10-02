"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonTaskCollection = void 0;
const TaskCollection_1 = require("./TaskCollection");
const TaskItem_1 = require("./TaskItem");
const lowdb_1 = __importDefault(require("lowdb"));
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
class JsonTaskCollection extends TaskCollection_1.TaskCollection {
    constructor(username, taskItems = []) {
        super(username, []);
        this.username = username;
        this.database = (0, lowdb_1.default)(new FileSync_1.default("Tasks.json"));
        if (this.database.has('task').value()) {
            let dbItems = this.database.get('task').value;
            dbItems.forEach(item => this.taskMap.set(item.id, new TaskItem_1.TaskItem(item.id, item.task, item.complete)));
        }
        else {
            this.database.set('tasks', taskItems).write();
            taskItems.forEach(item => this.taskMap.set(item.id, item));
        }
    }
    addTask(task) {
        let result = super.addTask(task);
        return result;
    }
    storeTask() {
        this.database.set('tasks', [...this.taskMap.values()]).write();
    }
}
exports.JsonTaskCollection = JsonTaskCollection;
