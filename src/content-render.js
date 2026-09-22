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

//Function to set the todo item's complete button color to reflect whatever priority level it has
function setCompleteButtonColor(todo, button) {
    if (todo.priority === "high") {
        button.style.backgroundColor = "rgba(213, 94, 0, 1)";
    } else if (currentTodo.priority === "medium") {
        button.style.backgroundColor = "rgba(240, 228, 66, 1)";
    } else if (currentTodo.priority === "low") {
        button.style.backgroundColor = "rgba(0, 158, 115, 1)";
    };
};

//Renders todo items to the page along with complete button, show more/less, and edit and delete buttons
function renderCurrentTodoItem(todo) {
    const todoItemContainer = document.createElement("div");
    todoItemContainer.classList.add("todo-item-container");
    todosContainer.appendChild(todoItemContainer);

    const todoItemCompleteButton = document.createElement("button");
    todoItemCompleteButton.classList.add("todo-complete-button");
    todoItemCompleteButton.id = "complete-button";

    //Sets button color depending on priority level
    setCompleteButtonColor(currentTodo, todoItemCompleteButton);

    //Adds functionality to complete button on-click
    todoItemCompleteButton.addEventListener("click", () => {
        if (todoItemCompleteButton.textContent === "") {
            todoItemCompleteButton.textContent = "✓";
        } else if (todoItemCompleteButton.textContent === "✓") {
            todoItemCompleteButton.textContent = "";
        };

        leftTodoVisibleInformation.classList.toggle("reduce-opacity");
        todoHiddenInformation.classList.toggle("reduce-opacity");
        showMoreLess.classList.toggle("reduce-opacity")
        todoEditButton.classList.toggle("reduce-opacity");
        todoItemName.classList.toggle("strike-through");todoDescription.classList.toggle("strike-through"); todoDueDate.classList.toggle("strike-through");
    });

    //Changes color of complete button on mouseenter/mouseleave
    todoItemCompleteButton.addEventListener("mouseenter", () => {
        todoItemCompleteButton.style.backgroundColor = "rgb(165, 165, 165)";
    });
    todoItemCompleteButton.addEventListener("mouseleave", () => {
        setCompleteButtonColor(currentTodo, todoItemCompleteButton);
    });

    //Separates visible todo item information into left and right sides for styling purposes
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

    //Sets up "hidden" info for todos that will appear on a "Show More" button click
    const todoHiddenInformation = document.createElement("div");
    todoHiddenInformation.classList.add("hidden-information");
    todoHiddenInformation.style.display = "none";
    const todoDescription = document.createElement("p");
    todoDescription.textContent = `Description: ${todo.description}`;

    //Creates and sets up event listener for "Show More/Less"
    const showMoreLess = document.createElement("button");
    showMoreLess.textContent = "Show Details";

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

    //Creates and gives functionality to edit button and its submit button
    const todoEditButton = document.createElement("button");
    todoEditButton.textContent = "Edit";
    todoEditButton.classList.add("edit");
    todoEditButton.id = todo.id;

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
    
    //Attached complete button, left and right side visible info, todo item buttons, and hidden info, to the DOM
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

    //Delete button functionality
    todoDeleteButton.addEventListener("click", () => {
        currentProject.deleteTodoItem(selectedTodoItem);
        console.log(currentProject.todoItemsArray);
        todoDeleteButton.closest(".todo-item-container").remove();
    })

    todoItemContainer.appendChild(todoHiddenInformation);
    todoHiddenInformation.appendChild(todoDescription);

    let selectedTodoItem;
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

//Deletes rendered content
export function deleteRenderedContent(deleter, container) {
    console.log(deleter.id);
    console.log(container.id);
        if (deleter.id === container.id) {
            projectTitle.textContent = "";
            projectDescription.textContent = "";
            contentContainer.removeChild(newTodoButton);
        }
};