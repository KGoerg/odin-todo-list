//Look more into this npm library I imported for dates formatting
import {format} from 'date-fns';

export class TodoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = crypto.randomUUID();
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
};

export function formatDate(date) {
    const dateArray = date.split("-");
    console.log(dateArray);
    const year = dateArray[0];
    console.log(year);
    const month = dateArray[1];
    console.log(month);
    const day = dateArray[2];
    console.log(day);
    return format(new Date(year, month, day), "MM/dd/yyyy");
}