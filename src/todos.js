//Look more into this npm library I imported for dates formatting
import {format} from 'date-fns';

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

const clean = new Project("Clean", "A list of things that need cleaning!")

console.log(clean);

class TodoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = format(new Date (dueDate), "MM/dd/yyyy");
        this.priority = priority;
    }
}

const cleanLitterBox = new TodoItem("Clean Litter Box", "Empty, scrub, rinse, and refill box.", "January 8 2024", "High");

console.log(cleanLitterBox);
console.log(clean.addTodoItem(cleanLitterBox));