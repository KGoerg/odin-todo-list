import { TodoItem } from "./todos.js";

class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.projectArray = []
    }

    addTodoItem(todoItem) {
        this.projectArray.push(todoItem);
    }

    removeTodoItem(todoItem) {
        const todoIndex = this.projectArray.indexOf(todoItem);
        const splicedProjectArray = this.projectArray.splice(todoIndex, 1);
        return splicedProjectArray;
    }
}

const clean = new Project("Clean", "A list of things that need cleaning!");

const cleanLitterBox = new TodoItem("Clean Litter Box", "Empty, scrub, rinse, and refill box.", "August 11 2026", "High");
const cleanKitchenFloor = new TodoItem("Clean Kitchen Floor", "Sweep and Swiffer Wet mop the floor.", "August 11 2026", "Medium")
const cleanBathroomFloors = new TodoItem("Clean Bathroom Floor", "Sweep and Swiffer Wet mop the floors", "August 11 2026", "Medium");

clean.addTodoItem(cleanLitterBox);
clean.addTodoItem(cleanKitchenFloor);
clean.addTodoItem(cleanBathroomFloors);

cleanKitchenFloor.editTodoItem("Clean Kitchen Floor", "Sweep floor", "August 18 2026", "High");

console.log(clean);