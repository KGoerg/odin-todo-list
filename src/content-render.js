import { TodoItem } from "./todos.js";
import { currentProject } from "./sidebar-render.js";

export const contentContainer = document.querySelector("#content");

export let projectTitle = document.createElement("h1");
export let projectDescription = document.createElement("h2");

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
    const todoItemContainer = document.createElement("div");
    todoItemContainer.classList.add("todo-item-container");
    todosContainer.appendChild(todoItemContainer);

    const todoListItemName = document.createElement("li");
    todoListItemName.classList.add("todo-list-item");
    todoListItemName.textContent = `${todo.title}`;

    const todoListDueDate = document.createElement("p");
    todoListDueDate.classList.add("todo-list-item");
    todoListDueDate.textContent = `Due Date: ${todo.dueDate}`;

    todoItemContainer.appendChild(todoListItemName);
    todoItemContainer.appendChild(todoListDueDate);
};

const todosModal = document.querySelector("#todo-dialog");

const newTodoButton = document.createElement("button");

//The below function is used when clicking on the project's name in the sidebar to load everything into the content panel at once.
export function renderContent(project) {
    newTodoButton.textContent = "New To-do Item";

    projectTitle.textContent = project.title;
    contentContainer.appendChild(projectTitle);
    
    projectDescription.textContent = project.description;
    contentContainer.appendChild(projectDescription);
    
    if (newTodoButton !== null) {
        contentContainer.appendChild(newTodoButton);
    }
    contentContainer.appendChild(todosContainer);

    //Open todos modal on click
    newTodoButton.addEventListener("click", function(event) {
        todosModal.showModal();
    })
};

export function deleteRenderedContent(deleter, container) {
    console.log(deleter.id);
    console.log(container.id);
        if (deleter.id === container.id) {
            projectTitle.textContent = "";
            projectDescription.textContent = "";
            contentContainer.removeChild(newTodoButton);
        }
};