import { TodoItem , formatDate} from "./todos.js";
import { currentProject } from "./sidebar-render.js";
import {format} from 'date-fns';

export const contentContainer = document.querySelector("#content");

export let projectTitle = document.createElement("h1");
export let projectDescription = document.createElement("h2");

const todosContainer = document.querySelector(".todos-container");
let currentTodo;
//Get data from the todos form and create a new todo item
const todosFormSubmitButton = document.getElementById("todos-submit").addEventListener("click", function(event) {
    const todosFormTitle = document.getElementById("todo_name").value;
    const todosFormDescription = document.getElementById("todo_description").value;
    let todoDueDate = document.getElementById("todo_due_date").value;
    console.log(todoDueDate = formatDate(todoDueDate));
    const todoPriorityLevel = document.getElementById("priority").value;
    const newTodo = new TodoItem(todosFormTitle, todosFormDescription, todoDueDate, todoPriorityLevel);
    currentTodo = newTodo;
    newTodo.id;
    currentProject.addTodoItem(newTodo);
    renderCurrentTodoItem(currentTodo);
});

function renderCurrentTodoItem(todo) {
    const todoItemContainer = document.createElement("div");
    todoItemContainer.classList.add("todo-item-container");
    todosContainer.appendChild(todoItemContainer);

    const todoItemCompleteButton = document.createElement("button");
    todoItemCompleteButton.classList.add("todo-complete-button");
    todoItemCompleteButton.textContent = "Done!";

    const todoItemName = document.createElement("li");
    todoItemName.classList.add("todo-list-item");
    todoItemName.textContent = `${todo.title}`;

    const todoDueDate = document.createElement("p");
    todoDueDate.classList.add("todo-list-item");
    todoDueDate.textContent = `Due Date: ${todo.dueDate}`;

    const todoEditButton = document.createElement("button");
    todoEditButton.textContent = "Edit";
    todoEditButton.classList.add("edit");
    todoEditButton.type = "button";
    todoEditButton.id = todo.id;

    todoItemContainer.appendChild(todoItemCompleteButton);
    todoItemContainer.appendChild(todoItemName);
    todoItemContainer.appendChild(todoDueDate);
    todoItemContainer.appendChild(todoEditButton);

    todoEditButton.addEventListener("click", (event) => {
        todosEditModal.showModal();
        console.log(selectedTodoItem.id);
        console.log(todoEditButton.id);
    });

    let selectedTodoItem = currentProject.todoItemsArray.find(element => element.id === todoEditButton.id);

//Need to figure out why this is updating every todo item, even with the "once: true" rule.
    const todoEditSubmitButton = document.querySelector('button[id="todos-edit-submit"]').addEventListener("click", function(event) {
        let newTodoTitle = document.getElementById("new_todo_name").value;
        let newTodoDescription = document.getElementById("new_todo_description").value;
        let newTodoDueDate = document.getElementById("new_todo_due_date").value;
        newTodoDueDate = formatDate(newTodoDueDate);
        let newTodoPriority = document.getElementById("new_priority").value;
        selectedTodoItem.editTodoItem(newTodoTitle, newTodoDescription, newTodoDueDate, newTodoPriority);
        todoItemName.textContent = selectedTodoItem.title;
        todoDueDate.textContent = `Due Date: ${selectedTodoItem.dueDate}`;
    });
};

const todosModal = document.querySelector("#todo-dialog");
const todosEditModal = document.querySelector("#edit-todos");

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

    todosContainer.replaceChildren();

    project.todoItemsArray.forEach((todo) => {
            renderCurrentTodoItem(todo)
        });

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