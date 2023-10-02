require("esm-hook");
import inquirer from 'inquirer';
import { TaskCollection } from './models/TaskCollection';
import { tasks } from './exampleData';


const collection = new TaskCollection('Alex', tasks);
let showCompleted: boolean = true;

function displayTaskList(): void {
    console.log(`${collection.userName}'s Tasks` + `\t(${collection.getTaskCounts().incomplete} tasks to do)`);
    collection.getTaskItems(showCompleted).forEach(task => task.printDetails());
}

enum Commands {
    Add = 'Add new task',
    Complete = 'Complete task',
    Toggle = 'Show/Hide completed',
    Purge = 'Remove completed tasks',
    Quit = 'Quit'
}

async function promptAdd(): Promise<void> {
    console.clear();
    const answers = await inquirer.prompt({
        type: 'input',
        name: 'add',
        message: 'enter a task: '
    });
    if (answers['add'] !== ''){
        collection.addTask(answers['add']);
    }
    promptUser();
}
async function promptComplete(): Promise<void> {
    console.clear();
    const answers = await inquirer.prompt({
        type: 'checkbox',
        name: 'complete',
        message: 'Mark completed tasks',
        choices: collection.getTaskItems(showCompleted).map(item => ({
            name: item.task,
            value: item.id,
            checked: item.complete
        }))
    });
    let completedTasks = answers['complete'] as number[];
    collection
        .getTaskItems(true)
        .forEach(item => collection.markComplete(
            item.id,
            completedTasks.find(id => id === item.id) != undefined)
        );
    promptUser();
}


async function promptUser(){
    console.clear();
    displayTaskList();

    const answers = await inquirer.prompt({
        type: 'list',
        name: 'command',
        message: 'choose an option',
        choices: Object.values(Commands)
    });
    switch(answers["command"]) {
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
    }


promptUser();
