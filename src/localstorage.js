import { Project } from "./projects.js";

export function saveProjectArray(arrayName, array) {
  localStorage.setItem(arrayName, JSON.stringify(array));
};

export function deleteProjectStorage(projectName, project) {
  localStorage.removeItem(projectName, project);
  saveProjectArray("projects", Project.allProjects);
};

export const savedProjectArray = localStorage.getItem("projects");
export const rehydratedProjectsArray = JSON.parse(savedProjectArray);
console.log(rehydratedProjectsArray);