import { Project } from "./projects.js";

const projectsContainer = document.querySelector(".projects-container");
let editButtonsArray = [];
const editButtonModal = document.querySelector("#edit-project");

let deleteButtonsArray = [];
  
//Creates DOM buttons for project's name, edit, and delete
export function renderNewProject(project) {
    const newProject = project;

    const newProjectContainer = document.createElement("div");
    newProjectContainer.classList.add("project");
    newProjectContainer.id = project.id;
    projectsContainer.appendChild(newProjectContainer);

    const newProjectHeader = document.createElement("button");
    newProjectHeader.textContent = newProject.title;
    newProjectContainer.appendChild(newProjectHeader);

    // Add edit buttons & functionality
    const editButton = document.createElement("button");
    editButton.id = project.id;
    editButton.classList.add("edit");
    editButton.textContent = "Edit";
    editButtonsArray.push(editButton);
    newProjectContainer.appendChild(editButton);
    console.log(editButtonsArray);

    editButton.addEventListener("click", (event) => {
      let selectedProject = Project.allProjects.find(element => element.id === editButton.id);
      console.log(selectedProject.title);
      editButton.style.color = "blue";
      editButtonModal.showModal();
      
      const editSubmitButton = document.querySelector('button[id="edit-submit"]').addEventListener("click", function(event) {
        let newFormTitle = document.getElementById("new_project_name").value;
        let newFormDescription = document.getElementById("new_project_description").value;
        selectedProject.editProject(newFormTitle, newFormDescription);
        newProjectHeader.textContent = selectedProject.title;
        console.log(Project.allProjects);
      })
      // console.log(project);
    });
    // Add delete buttons
    const deleteButton = document.createElement("button");
    deleteButton.id = project.id;
    deleteButton.classList.add("delete");
    deleteButton.textContent = "Delete";
    deleteButtonsArray.push(deleteButton);
    newProjectContainer.appendChild(deleteButton);
    console.log(deleteButtonsArray);

    deleteButton.addEventListener("click", (event) => {
      //Remove project from Projects.allProjects array
      let selectedProject = Project.allProjects.find(element => element.id === deleteButton.id);
      selectedProject.deleteProject(selectedProject);
      console.log(Project.allProjects);
      //Remove div from DOM
      let projectNodeID = deleteButton.id;
      let projectNode = document.getElementById(projectNodeID);
      projectNode.remove();
    })

};
//Gets user input, then passes that to renderNewProject() when clicking the Submit button on the form to render to page and pass Project info to backend Project array.
export const submitButton = document.querySelector('button[type="submit"]').addEventListener("click", function(event) {
    const formTitle = document.getElementById("project_name").value;
    const formDescription = document.getElementById("project_description").value;
    if (formTitle === "" || formDescription === "") {
    submitButton.disabled = true;
  } else {
    const project = new Project(formTitle, formDescription);
    renderNewProject(project);
    console.log(Project.allProjects);
}});

//Resets form fields after submitting
const formResetArray = document.querySelectorAll("form");
formResetArray.forEach(element => {
  element.addEventListener("submit", function() {
  element.reset();
})});