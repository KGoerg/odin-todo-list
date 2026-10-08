// src/index.js
import "./styles.css";
import {deletedTodoItemsArray, completedTodoItemsArray, deletedProjectsArray, Project} from "./projects.js";
import {TodoItem} from "./todos.js";
import {renderProjectButtons, saveProject } from "./sidebar-render.js";
import { renderContent } from "./content-render.js";

//Testing

console.log(Project.allProjects);
// renderProjectButtons(defaultProject);

// localStorage.clear();