//Look more into this npm library I imported for dates formatting
import _ from 'date-fns';

export let todosArray = [];

export class TodoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export const cleanLitterBox = new TodoItem("Clean Litter Box", "Empty, scrub, rinse, and refill box.", "July 8, 2026", "High");

todosArray.push(cleanLitterBox);