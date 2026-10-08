import { Project } from "./projects.js";

export function saveProjectArray(arrayName, array) {
  localStorage.setItem(arrayName, JSON.stringify(array));
};

export function deleteProjectStorage(projectName, project) {
  localStorage.removeItem(projectName, project);
  saveProjectArray("projects", Project.allProjects);
};

let json;
let rehydrated;

if(localStorage.getItem("projects") !== "undefined") {
  json = localStorage.getItem("projects");
  rehydrated = JSON.parse(json);
} else {
  json = null;
  rehydrated = null;
};

export const savedProjectArray = json;
export const rehydratedProjectsArray = rehydrated;
console.log(rehydratedProjectsArray);