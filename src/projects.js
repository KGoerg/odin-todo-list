import { TodoItem } from "./todos.js";

let deletedTodoItemsArray = [];
let completedTodoItemsArray = [];
let deletedProjectsArray = [];

class Project {
    static allProjects = [];

    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.todoItemsArray = [];
        Project.allProjects.push(this);
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

    deleteProject(project) {
        const projectIndex = Project.allProjects.indexOf(project);
        deletedProjectsArray = Project.allProjects.splice(projectIndex, 1);
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

//Testing
const clean = new Project("Clean", "A list of things that need cleaning!");
const powerPointProject = new Project("PowerPoint", "A deck made for our new client.")

powerPointProject.deleteProject(powerPointProject);
console.log(Project.allProjects);

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