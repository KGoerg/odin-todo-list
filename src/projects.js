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

export {deletedTodoItemsArray, completedTodoItemsArray, deletedProjectsArray, Project};