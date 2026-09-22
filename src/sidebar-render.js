import { Project } from "./projects.js";
import { projectTitle, projectDescription, renderContent, deleteRenderedContent, contentContainer} from "./content-render.js";
import { TodoItem } from "./todos.js";

const projectsContainer = document.querySelector(".projects-container");
let sidebarEditButtonsArray = [];
const sidebarEditButtonModal = document.querySelector("#edit-project");

let sidebarDeleteButtonsArray = [];
export let currentProject;

//Creates DOM buttons for project's name, edit, and delete
export function renderProjectButtons(project) {

    const newProjectContainer = document.createElement("div");
    newProjectContainer.classList.add("project");
    newProjectContainer.id = project.id;
    projectsContainer.appendChild(newProjectContainer);

    const newProjectHeader = document.createElement("button");
    newProjectHeader.textContent = project.title;
    newProjectHeader.classList.add("project-header");
    newProjectContainer.appendChild(newProjectHeader);

    const sidebarButtonsContainer = document.createElement("div");
    sidebarButtonsContainer.classList.add("sidebar-buttons-container");
    newProjectContainer.appendChild(sidebarButtonsContainer);

    //Project button functionality
    newProjectHeader.addEventListener("click", () => {
      renderContent(project); 
      currentProject = project;
      contentContainer.id = project.id;
      console.log(contentContainer);
    });

    // Add edit buttons & functionality
    const sidebarEditButton = document.createElement("button");
    sidebarEditButton.id = project.id;
    sidebarEditButton.classList.add("edit");
    sidebarEditButton.textContent = "Edit";
    sidebarEditButtonsArray.push(sidebarEditButton);
    sidebarButtonsContainer.appendChild(sidebarEditButton);

    sidebarEditButton.addEventListener("click", (event) => {
      sidebarEditButtonModal.showModal();

    //Running into a bug where the edit button is editing multiple projects at once. Once a project has been edited, it seems to be stuck in edit mode.
    const sidebarEditSubmitButton = document.querySelector('button[id="edit-submit"]').addEventListener("click", function(event) {
      let selectedProject = Project.allProjects.find(element => element.id === sidebarEditButton.id);
      let newFormTitle = document.getElementById("new_project_name").value;
      let newFormDescription = document.getElementById("new_project_description").value;
      selectedProject.editProject(newFormTitle, newFormDescription);
      newProjectHeader.textContent = selectedProject.title;
      if (projectTitle.textContent === "") {
        projectTitle.textContent = selectedProject.title;
      }
      if (projectDescription.textContent === "") {
        projectDescription.textContent = selectedProject.description;
      }
      }, { once: true});
    });

    // Add delete buttons
    const sidebarDeleteButton = document.createElement("button");
    sidebarDeleteButton.id = project.id;
    sidebarDeleteButton.classList.add("delete");
    sidebarDeleteButton.textContent = "Delete";
    sidebarDeleteButtonsArray.push(sidebarDeleteButton);
    sidebarButtonsContainer.appendChild(sidebarDeleteButton);

    sidebarDeleteButton.addEventListener("click", (event) => {
      //Remove project from Projects.allProjects array
      let selectedProject = Project.allProjects.find(element => element.id === sidebarDeleteButton.id);
      selectedProject.deleteProject(selectedProject);
      console.log(Project.allProjects);
      //Remove div from DOM
      sidebarDeleteButton.closest(".project").remove();
      //Remove rendered content
      deleteRenderedContent(sidebarDeleteButton, contentContainer);
    })
};

//Gets user input, then passes that to renderProjectButtons() when clicking the Submit button on the form to render to page and pass Project info to backend Project array.
export const newProjectSubmitButton = document.getElementById("project-submit").addEventListener("click", function(event) {
    const projectFormTitle = document.getElementById("project_name").value;
    const projectFormDescription = document.getElementById("project_description").value;
    if (projectFormTitle === "") {
    alert("You must enter a Project Name");
  } else {
    const newProject = new Project(projectFormTitle, projectFormDescription);
    renderProjectButtons(newProject);
    console.log(Project.allProjects);
}});

//Resets form fields after submitting
const formResetArray = document.querySelectorAll("form");
formResetArray.forEach(element => {
  element.addEventListener("submit", function() {
  element.reset();
})});