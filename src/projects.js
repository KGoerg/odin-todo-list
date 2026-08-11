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
}

const clean = new Project("Clean", "A list of things that need cleaning!");

const cleanLitterBox = new TodoItem("Clean Litter Box", "Empty, scrub, rinse, and refill box.", "January 8 2024", "High");

clean.addTodoItem(cleanLitterBox);
console.log(clean);