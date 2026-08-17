import { Project } from "./projects.js";

export function renderDefaultProject() {
    const defaultProject = new Project("Default Project", "A default space to put any tasks you haven't sorted yet!");

    const projectsContainer = document.querySelector(".projects-container");
    const defaultProjectContainer = document.createElement("div");
    defaultProjectContainer.classList.add("project");
    projectsContainer.appendChild(defaultProjectContainer);

    const defaultProjectHeader = document.createElement("button");
    defaultProjectHeader.textContent = defaultProject.title;
    defaultProjectContainer.appendChild(defaultProjectHeader);
}

// On-click of the Default Project button, generate the project title, description below title, and todo items, in the content section. Need to figure out how to organize code in order to do this.