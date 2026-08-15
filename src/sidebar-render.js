import { Project } from "./projects.js";

export function createDefaultProject() {
    const defaultProject = new Project("Default Project", "A default space to put any tasks you haven't sorted yet!");

    const projectsContainer = document.querySelector(".projects-container");
    const defaultProjectContainer = document.createElement("div");
    defaultProjectContainer.classList.add("project");
    projectsContainer.appendChild(defaultProjectContainer);

    const defaultProjectHeader = document.createElement("h2");
    defaultProjectHeader.textContent = defaultProject.title;
    defaultProjectContainer.appendChild(defaultProjectHeader);
}