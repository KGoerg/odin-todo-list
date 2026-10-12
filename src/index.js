// src/index.js
import "./styles.css";
import {deletedTodoItemsArray, completedTodoItemsArray, deletedProjectsArray, Project} from "./projects.js";
import {TodoItem, formatDate} from "./todos.js";
import {renderProjectButtons, saveProject } from "./sidebar-render.js";
import { renderContent } from "./content-render.js";
import { saveProjectArray } from "./localstorage.js";

//Testing

console.log(Project.allProjects);

function createDefaultProject() {
    if (Project.allProjects[0] === undefined) {
        const defaultProject = new Project("Default", "My first project :)");
        renderProjectButtons(defaultProject);
        let today = new Date();
        let todayYear = today.getFullYear();
        let todayMonth = today.getMonth() + 1;
        let todayDay = today.getDate();
        let currentDate = `${todayYear}-${todayMonth}-${todayDay}`;
        currentDate = formatDate(currentDate);
        const defaultTodo = new TodoItem("My First Task", "You've found the task description!", currentDate, "high");
        defaultProject.addTodoItem(defaultTodo);
        saveProjectArray("projects", Project.allProjects);
    }
};

createDefaultProject();

// localStorage.clear();