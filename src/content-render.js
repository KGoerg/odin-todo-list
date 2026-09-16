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

function setCompleteButtonColor(todo, button) {
    if (todo.priority === "high") {
        button.style.backgroundColor = "red";
    } else if (currentTodo.priority === "medium") {
        button.style.backgroundColor = "yellow";
    } else if (currentTodo.priority === "low") {
        button.style.backgroundColor = "green";
    };
};

function renderCurrentTodoItem(todo) {
    const todoItemContainer = document.createElement("div");
    todoItemContainer.classList.add("todo-item-container");
    todosContainer.appendChild(todoItemContainer);

    const todoItemCompleteButton = document.createElement("button");
    todoItemCompleteButton.classList.add("todo-complete-button");
    todoItemCompleteButton.id = "complete-button";

    todoItemCompleteButton.addEventListener("click", () => {
        todoItemContainer.style.backgroundColor = "rgba(42, 42, 42, 0.35)";
        todoItemContainer.style.opacity = .5;
    })

    const leftTodoVisibleInformation = document.createElement("div");
    leftTodoVisibleInformation.classList.add("left-visible-info");

    const todoItemName = document.createElement("p");
    todoItemName.classList.add("todo-list-item");
    todoItemName.textContent = `${todo.title}`;

    const todoDueDate = document.createElement("p");
    todoDueDate.classList.add("todo-list-item");
    todoDueDate.textContent = `Due Date: ${todo.dueDate}`;

    const rightTodoVisibleInformation = document.createElement("div");
    rightTodoVisibleInformation.classList.add("right-visible-info");

    const todoHiddenInformation = document.createElement("div");
    todoHiddenInformation.classList.add("hidden-information");
    todoHiddenInformation.style.display = "none";
    const todoDescription = document.createElement("p");
    todoDescription.textContent = `Description: ${todo.description}`;

    setCompleteButtonColor(currentTodo, todoItemCompleteButton);

    const showMoreLess = document.createElement("button");
    showMoreLess.textContent = "Show Details";

    const todoEditButton = document.createElement("button");
    todoEditButton.textContent = "Edit";
    todoEditButton.classList.add("edit");
    todoEditButton.id = todo.id;
    
    todoItemContainer.appendChild(todoItemCompleteButton);

    todoItemContainer.appendChild(leftTodoVisibleInformation);
    leftTodoVisibleInformation.appendChild(todoItemName);
    leftTodoVisibleInformation.appendChild(todoDueDate);

    todoItemContainer.appendChild(rightTodoVisibleInformation);
    rightTodoVisibleInformation.appendChild(showMoreLess);
    rightTodoVisibleInformation.appendChild(todoEditButton);
    
    const todoDeleteButton = document.createElement("button");
    todoDeleteButton.id = currentProject.id;
    todoDeleteButton.classList.add("delete");
    todoDeleteButton.textContent = "Delete";
    rightTodoVisibleInformation.appendChild(todoDeleteButton);

    todoItemContainer.appendChild(todoHiddenInformation);
    todoHiddenInformation.appendChild(todoDescription);

    showMoreLess.addEventListener("click", () => {
        if (showMoreLess.textContent === "Show Details") {
            showMoreLess.textContent = "Hide Details";
        } else {
            showMoreLess.textContent = "Show Details";
        }
        if (todoHiddenInformation.style.display === "none") {
            todoHiddenInformation.style.display = "flex";
        } else {
            todoHiddenInformation.style.display = "none";
        }
    });

    todoEditButton.addEventListener("click", (event) => {
        todosEditModal.showModal();
        const todoEditSubmitButton = document.querySelector('button[id="todos-edit-submit"]').addEventListener("click", function(event) {
            selectedTodoItem = currentProject.todoItemsArray.find(element => element.id === todoEditButton.id);
            let newTodoTitle = document.getElementById("new_todo_name").value;
            let newTodoDescription = document.getElementById("new_todo_description").value;
            let newTodoDueDate = document.getElementById("new_todo_due_date").value;
            if (newTodoDueDate !== "") {
                newTodoDueDate = formatDate(newTodoDueDate);
            }
            let newTodoPriority = document.getElementById("new_priority").value;
            selectedTodoItem.editTodoItem(newTodoTitle, newTodoDescription, newTodoDueDate, newTodoPriority);
            todoItemName.textContent = selectedTodoItem.title;
            todoDueDate.textContent = `Due Date: ${selectedTodoItem.dueDate}`;
            todoDescription.textContent = `Description: ${selectedTodoItem.description}`;

            setCompleteButtonColor(currentTodo, todoItemCompleteButton);
        }, {once: true});
    });

    let selectedTodoItem;

//Delete button

    todoDeleteButton.addEventListener("click", () => {
        currentProject.deleteTodoItem(selectedTodoItem);
        console.log(currentProject.todoItemsArray);
        todoDeleteButton.closest(".todo-item-container").remove();
    })
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
            renderCurrentTodoItem(todo);
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