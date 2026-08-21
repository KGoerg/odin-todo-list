import { Project } from "./projects.js";

const projectsContainer = document.querySelector(".projects-container");
let editButtonsArray = [];
const editButtonModal = document.querySelector("#edit-project");
  
//Creates DOM buttons for project's name, edit, and delete
export function renderNewProject(project) {
    const newProject = project;

    const newProjectContainer = document.createElement("div");
    newProjectContainer.classList.add("project");
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

    // editButtonsArray.forEach(button => {
    editButton.addEventListener("click", (event) => {
      let selectedButton = event.target;
      let selectedButtonID = selectedButton.id;
      let selectedProject = Project.allProjects.find(element => element.id === selectedButtonID);
      console.log(selectedProject.title);
      selectedButton.style.color = "blue";
      editButtonModal.showModal();
      
      //Need to figure out why it's updating more than just the current project's button text
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
    deleteButton.textContent = "Delete";
    newProjectContainer.appendChild(deleteButton);
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

//Resets the form field after submitting
export const formReset = document.querySelector("form");
formReset.addEventListener("submit", function() {
  formReset.reset();
});

// On-click of the Default Project button, generate the project title, description below title, and todo items, in the content section. Need to figure out how to organize code in order to do this.