import { Project } from "./projects.js";
import { projectTitle, projectDescription, renderContent } from "./content-render.js";
import { TodoItem } from "./todos.js";

const projectsContainer = document.querySelector(".projects-container");
let editButtonsArray = [];
const editButtonModal = document.querySelector("#edit-project");

let deleteButtonsArray = [];
  
//Creates DOM buttons for project's name, edit, and delete
export function renderProjectButtons(project) {
    const newProject = project;

    const newProjectContainer = document.createElement("div");
    newProjectContainer.classList.add("project");
    newProjectContainer.id = project.id;
    projectsContainer.appendChild(newProjectContainer);

    const newProjectHeader = document.createElement("button");
    newProjectHeader.textContent = newProject.title;
    newProjectContainer.appendChild(newProjectHeader);

    //Project button functionality
    newProjectHeader.addEventListener("click", () => {
      renderContent(newProject);
    });

    // Add edit buttons & functionality
    const editButton = document.createElement("button");
    editButton.id = project.id;
    editButton.classList.add("edit");
    editButton.textContent = "Edit";
    editButtonsArray.push(editButton);
    newProjectContainer.appendChild(editButton);
    // console.log(editButtonsArray);

    editButton.addEventListener("click", (event) => {
      editButton.style.color = "blue";
      editButtonModal.showModal();
    

    //Running into a bug where the edit button is editing multiple projects at once. Once a project has been edited, it seems to be stuck in edit mode.
    const editSubmitButton = document.querySelector('button[id="edit-submit"]').addEventListener("click", function(event) {
      let selectedProject = Project.allProjects.find(element => element.id === editButton.id);
      let newFormTitle = document.getElementById("new_project_name").value;
      let newFormDescription = document.getElementById("new_project_description").value;
      selectedProject.editProject(newFormTitle, newFormDescription);
      newProjectHeader.textContent = selectedProject.title;
      projectTitle.textContent = selectedProject.title;
      projectDescription.textContent = selectedProject.description;
      }, { once: true});
      // console.log(project);
    });

    // Add delete buttons
    const deleteButton = document.createElement("button");
    deleteButton.id = project.id;
    deleteButton.classList.add("delete");
    deleteButton.textContent = "Delete";
    deleteButtonsArray.push(deleteButton);
    newProjectContainer.appendChild(deleteButton);
    // console.log(deleteButtonsArray);

    deleteButton.addEventListener("click", (event) => {
      //Remove project from Projects.allProjects array
      let selectedProject = Project.allProjects.find(element => element.id === deleteButton.id);
      selectedProject.deleteProject(selectedProject);
      console.log(Project.allProjects);
      //Remove div from DOM
      let projectNodeID = deleteButton.id;
      let projectNode = document.getElementById(projectNodeID);
      projectNode.remove();
      projectTitle.textContent = "";
      projectDescription.textContent = "";
    })

};

//Gets user input, then passes that to renderProjectButtons() when clicking the Submit button on the form to render to page and pass Project info to backend Project array.
export const newProjectSubmitButton = document.getElementById("project-submit").addEventListener("click", function(event) {
    const projectFormTitle = document.getElementById("project_name").value;
    const projectFormDescription = document.getElementById("project_description").value;
    if (projectFormTitle === "") {
    alert("You must enter a Project Name");
  } else {
    const project = new Project(projectFormTitle, projectFormDescription);
    renderProjectButtons(project);
    console.log(Project.allProjects);
}});

//Resets form fields after submitting
const formResetArray = document.querySelectorAll("form");
formResetArray.forEach(element => {
  element.addEventListener("submit", function() {
  element.reset();
})});