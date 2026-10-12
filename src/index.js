// src/index.js
import "./styles.css";
import {deletedTodoItemsArray, completedTodoItemsArray, deletedProjectsArray, Project} from "./projects.js";
import {TodoItem} from "./todos.js";
import {renderProjectButtons, saveProject } from "./sidebar-render.js";
import { renderContent } from "./content-render.js";
import { saveProjectArray } from "./localstorage.js";

//Testing

console.log(Project.allProjects);

function createDefaultProject() {
    if (Project.allProjects[0] === undefined) {
        const defaultProject = new Project("Default", "A playground for testing!");
        renderProjectButtons(defaultProject);
        saveProjectArray("projects", Project.allProjects);
    }
};

createDefaultProject();

// localStorage.clear();