"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("esm-hook");
const inquirer_1 = __importDefault(require("inquirer"));
const TaskCollection_1 = require("./models/TaskCollection");
const exampleData_1 = require("./exampleData");
const collection = new TaskCollection_1.TaskCollection('Alex', exampleData_1.tasks);
let showCompleted = true;
function displayTaskList() {
    console.log(`${collection.userName}'s Tasks` + `\t(${collection.getTaskCounts().incomplete} tasks to do)`);
    collection.getTaskItems(showCompleted).forEach(task => task.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Add"] = "Add new task";
    Commands["Complete"] = "Complete task";
    Commands["Toggle"] = "Show/Hide completed";
    Commands["Purge"] = "Remove completed tasks";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
function promptAdd() {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        const answers = yield inquirer_1.default.prompt({
            type: 'input',
            name: 'add',
            message: 'enter a task: '
        });
        if (answers['add'] !== '') {
            collection.addTask(answers['add']);
        }
        promptUser();
    });
}
function promptComplete() {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        const answers = yield inquirer_1.default.prompt({
            type: 'checkbox',
            name: 'complete',
            message: 'Mark completed tasks',
            choices: collection.getTaskItems(showCompleted).map(item => ({
                name: item.task,
                value: item.id,
                checked: item.complete
            }))
        });
        let completedTasks = answers['complete'];
        collection
            .getTaskItems(true)
            .forEach(item => collection.markComplete(item.id, completedTasks.find(id => id === item.id) != undefined));
        promptUser();
    });
}
function promptUser() {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        displayTaskList();
        const answers = yield inquirer_1.default.prompt({
            type: 'list',
            name: 'command',
            message: 'choose an option',
            choices: Object.values(Commands)
        });
        switch (answers["command"]) {
            case Commands.Complete:
                promptComplete();
                break;
            case Commands.Toggle:
                showCompleted = !showCompleted;
                promptUser();
                break;
            case Commands.Add:
                promptAdd();
                break;
            case Commands.Purge:
                collection.removeComplete();
                promptUser();
                break;
        }
    });
}
promptUser();
