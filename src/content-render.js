import { TodoItem } from "./todos.js";
import { currentProject } from "./sidebar-render.js";

const contentContainer = document.querySelector("#content");

export const projectTitle = document.createElement("h1");
export const projectDescription = document.createElement("h2");

const todosContainer = document.querySelector(".todos-container");

//Get data from the todos form and create a new todo item
const todosFormSubmitButton = document.getElementById("todos-submit").addEventListener("click", function(event) {
    const todosFormTitle = document.getElementById("todo_name").value;
    const todosFormDescription = document.getElementById("todo_description").value;
    const todoDueDate = document.getElementById("todo_due_date").value;
    const todoPriorityLevel = document.getElementById("priority").value;
    const newTodo = new TodoItem(todosFormTitle, todosFormDescription, todoDueDate, todoPriorityLevel);
    currentProject.addTodoItem(newTodo);
});

const todosModal = document.querySelector("#todo-dialog");

const newTodoButton = document.createElement("button");
let currentTodoButton;
export function renderContent(project) {
    newTodoButton.textContent = "New To-do Item";
    currentTodoButton = newTodoButton;

    projectTitle.textContent = project.title;
    contentContainer.appendChild(projectTitle);
    
    projectDescription.textContent = project.description;
    contentContainer.appendChild(projectDescription);
    
    contentContainer.appendChild(newTodoButton);
    contentContainer.appendChild(todosContainer);

    //Open todos modal on click
    newTodoButton.addEventListener("click", function(event) {
        todosModal.showModal();
    })
};

export function deleteRenderedContent(title, description, button) {
    title.textContent = "";
    description.textContent = "";
    if (currentTodoButton != null) {
        currentTodoButton.remove();
    }
};