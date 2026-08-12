import { TodoItem } from "./todos.js";

let deletedTodoItemsArray = [];
let completedTodoItemsArray = [];

let projectsArray = [];
let deletedProjectsArray = [];

class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.todoItemsArray = [];
        this.completedProjectArray = [];
    }

    editProject(newTitle, newDescription) {
        if (newTitle === "") {
            this.title = this.title;
        } else {
            this.title = newTitle;
        }

        if (newDescription === "") {
            this.description = this.description;
        } else {
            this.description = newDescription;
        }
    }

    addTodoItem(todoItem) {
        this.todoItemsArray.push(todoItem);
    }

    deleteTodoItem(todoItem) {
        const todoIndex = this.todoItemsArray.indexOf(todoItem);
        deletedTodoItemsArray = this.todoItemsArray.splice(todoIndex, 1);
    }

    markTodoComplete(todoItem) {
        const todoIndex = this.todoItemsArray.indexOf(todoItem);
        completedTodoItemsArray = this.todoItemsArray.splice(todoIndex, 1);
    }
}

function addProject(project) {
    projectsArray.push(project);
};

function deleteProject(project) {
    const projectIndex = this.projectsArray.indexOf(project);
    const deletedProjectsArray = this.todoItemsArray.splice(todoIndex, 1);
};

//Testing
const clean = new Project("Clean", "A list of things that need cleaning!");
addProject(clean);
const powerPointProject = new Project("PowerPoint", "A deck made for our new client.")
addProject(powerPointProject);
console.log(projectsArray);

//Create todo items
const cleanLitterBox = new TodoItem("Clean Litter Box", "Empty, scrub, rinse, and refill box.", "August 11 2026", "High");
const cleanKitchenFloor = new TodoItem("Clean Kitchen Floor", "Sweep and Swiffer Wet mop the floor.", "August 11 2026", "Medium")
const cleanBathroomFloors = new TodoItem("Clean Bathroom Floor", "Sweep and Swiffer Wet mop the floors", "August 11 2026", "Medium");

//Add todos to a project
clean.addTodoItem(cleanLitterBox);
clean.addTodoItem(cleanKitchenFloor);
clean.addTodoItem(cleanBathroomFloors);

//Edit todos
cleanKitchenFloor.editTodoItem("Clean Kitchen Floor", "", "August 18 2026", "High");

//Mark complete/delete
clean.markTodoComplete(cleanKitchenFloor);
console.log(completedTodoItemsArray);
clean.deleteTodoItem(cleanLitterBox);

clean.editProject("", "Clean up!");