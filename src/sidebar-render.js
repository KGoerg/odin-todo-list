import { Project } from "./projects.js";

const projectsContainer = document.querySelector(".projects-container");

//Creates button with project's name
export function renderNewProject(project) {
    const newProject = project;

    const newProjectContainer = document.createElement("div");
    newProjectContainer.classList.add("project");
    projectsContainer.appendChild(newProjectContainer);

    const newProjectHeader = document.createElement("button");
    newProjectHeader.textContent = newProject.title;
    newProjectContainer.appendChild(newProjectHeader);

    // Add edit buttons
    const editButton = document.createElement("button");
    editButton.id = project.id;
    editButton.classList.add("edit");
    editButton.textContent = "Edit";
    newProjectContainer.appendChild(editButton);
    console.log(editButton);

    // Add delete buttons
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    newProjectContainer.appendChild(deleteButton);
};

// On-click of the Default Project button, generate the project title, description below title, and todo items, in the content section. Need to figure out how to organize code in order to do this.