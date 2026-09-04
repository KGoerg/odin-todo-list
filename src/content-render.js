import { TodoItem } from "./todos.js";
import { currentProject } from "./sidebar-render.js";

export const contentContainer = document.querySelector("#content");

export const projectTitle = document.createElement("h1");
export const projectDescription = document.createElement("h2");

const todosContainer = document.querySelector(".todos-container");
let currentToDo;
//Get data from the todos form and create a new todo item
const todosFormSubmitButton = document.getElementById("todos-submit").addEventListener("click", function(event) {
    const todosFormTitle = document.getElementById("todo_name").value;
    const todosFormDescription = document.getElementById("todo_description").value;
    const todoDueDate = document.getElementById("todo_due_date").value;
    const todoPriorityLevel = document.getElementById("priority").value;
    const newTodo = new TodoItem(todosFormTitle, todosFormDescription, todoDueDate, todoPriorityLevel);
    currentToDo = newTodo;
    currentProject.addTodoItem(newTodo);
    renderCurrentTodoItem(currentToDo);
});

function renderCurrentTodoItem(todo) {
    const todoListItem = document.createElement("li");
    todoListItem.classList.add("todo-list-item");
    todoListItem.textContent = `${todo.title} Due Date: ${todo.dueDate}`;
    todosContainer.appendChild(todoListItem);
};

const todosModal = document.querySelector("#todo-dialog");

const newTodoButton = document.createElement("button");
let currentTodoButton;
//The below function is used when clicking on the project's name in the sidebar to load everything into the content panel at once.
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

//Need to fix bug where, if a non-selected project is deleted, it still deletes what's rendered on the page. See most recent Mousepad with a plan to fix it using an ID on the todos-container.
export function deleteRenderedContent(title, description) {
    // if (currentProject.title === title.textContent && currentProject.description === description.textContent) {
    //     title.textContent = currentProject.title;
    //     description.textContent = currentProject.description;
    // } else {
        title.textContent = "";
        description.textContent = "";
        if (currentTodoButton != null) {
        currentTodoButton.remove();
    }
    
    // title.textContent = "";
    // description.textContent = "";
    // if (currentTodoButton != null) {
    //     currentTodoButton.remove();
    // }
    // while (todosContainer.firstChild) {
    //     todosContainer.removeChild(todosContainer.firstChild);
    // }
};