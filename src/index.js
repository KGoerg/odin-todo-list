// src/index.js
import "./styles.css";
import {deletedTodoItemsArray, completedTodoItemsArray, deletedProjectsArray, Project} from "./projects.js";
import {TodoItem, formatDate} from "./todos.js";
import {renderProjectButtons, saveProject } from "./sidebar-render.js";
import { renderContent } from "./content-render.js";
import { saveProjectArray } from "./localstorage.js";

//Testing

console.log(Project.allProjects);

// localStorage.clear();