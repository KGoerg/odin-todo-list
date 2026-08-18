import { Project } from "./projects.js";
import { renderNewProject } from "./sidebar-render.js";

// Uses renderNewProject() when clicking the Submit button on the form.
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