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

        if (newDueDate === "") {
            this.dueDate = this.dueDate;
        } else {
            this.dueDate = newDueDate;
        }

        if (newPriority === "") {
            this.priority = this.priority;
        } else {
            this.priority = newPriority;
        }
    }
}
