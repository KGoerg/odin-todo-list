//Look more into this npm library I imported for dates formatting
import {format} from 'date-fns';

export let defaultTodosArray = [];

export class TodoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = format(new Date (dueDate), "MM/dd/yyyy");
        this.priority = priority;
    }
}

export const cleanLitterBox = new TodoItem("Clean Litter Box", "Empty, scrub, rinse, and refill box.", "January 8 2024", "High");

defaultTodosArray.push(cleanLitterBox);