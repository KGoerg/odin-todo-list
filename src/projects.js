import { TodoItem } from "./todos.js";

let deletedTodoItemArray = [];
let completedProjectArray = [];

class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.projectArray = [];
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
        this.projectArray.push(todoItem);
    }

    deleteTodoItem(todoItem) {
        const todoIndex = this.projectArray.indexOf(todoItem);
        const deletedTodoItemArray = this.projectArray.splice(todoIndex, 1);
    }

    markTodoComplete(todoItem) {
        const todoIndex = this.projectArray.indexOf(todoItem);
        completedProjectArray = this.projectArray.splice(todoIndex, 1);
    }
}

const clean = new Project("Clean", "A list of things that need cleaning!");

const cleanLitterBox = new TodoItem("Clean Litter Box", "Empty, scrub, rinse, and refill box.", "August 11 2026", "High");
const cleanKitchenFloor = new TodoItem("Clean Kitchen Floor", "Sweep and Swiffer Wet mop the floor.", "August 11 2026", "Medium")
const cleanBathroomFloors = new TodoItem("Clean Bathroom Floor", "Sweep and Swiffer Wet mop the floors", "August 11 2026", "Medium");

clean.addTodoItem(cleanLitterBox);
clean.addTodoItem(cleanKitchenFloor);
clean.addTodoItem(cleanBathroomFloors);

// cleanKitchenFloor.editTodoItem("Clean Kitchen Floor", "", "August 18 2026", "High");

clean.markTodoComplete(cleanKitchenFloor);
console.log(completedProjectArray);
clean.deleteTodoItem(cleanLitterBox);

clean.editProject("", "Clean up!");

console.log(clean);