// src/index.js
import "./styles.css";
import {deletedTodoItemsArray, completedTodoItemsArray, deletedProjectsArray, Project} from "./projects.js";
import {TodoItem} from "./todos.js";
import {renderNewProject } from "./sidebar-render.js";


//Testing
const defaultProject = new Project("Default Project", "A default space to put any tasks you haven't sorted yet!");

renderNewProject(defaultProject);

const clean = new Project("Clean", "A list of things that need cleaning!");
const powerPointProject = new Project("PowerPoint", "A deck made for our new client.")

renderNewProject(clean);

// powerPointProject.deleteProject(powerPointProject);
console.log(Project.allProjects);

// //Create todo items
const cleanLitterBox = new TodoItem("Clean Litter Box", "Empty, scrub, rinse, and refill box.", "August 11 2026", "High");
const cleanKitchenFloor = new TodoItem("Clean Kitchen Floor", "Sweep and Swiffer Wet mop the floor.", "August 11 2026", "Medium")
const cleanBathroomFloors = new TodoItem("Clean Bathroom Floor", "Sweep and Swiffer Wet mop the floors", "August 11 2026", "Medium");

// //Add todos to a project
clean.addTodoItem(cleanLitterBox);
clean.addTodoItem(cleanKitchenFloor);
clean.addTodoItem(cleanBathroomFloors);

// //Edit todos
// cleanKitchenFloor.editTodoItem("Clean Kitchen Floor", "", "August 18 2026", "High");

// //Mark complete/delete
// clean.markTodoComplete(cleanKitchenFloor);
// console.log(completedTodoItemsArray);
// clean.deleteTodoItem(cleanLitterBox);

// clean.editProject("", "Clean up!");