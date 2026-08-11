//Look more into this npm library I imported for dates formatting
import {format} from 'date-fns';

export class TodoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = format(new Date (dueDate), "MM/dd/yyyy");
        this.priority = priority;
    }
    editTodoItem(newTitle, newDescription, newDueDate, newPriority) {
        this.title = newTitle;
        this.description = newDescription;
        this.dueDate = newDueDate;
        this.priority = newPriority;
    }
}