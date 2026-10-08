import { TodoItem , formatDate} from "./todos.js";
import { currentProject } from "./sidebar-render.js";
import {format} from 'date-fns';
import { saveProjectArray } from "./localstorage.js";
import { Project } from "./projects.js";

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
    console.log(currentProject.todoItemsArray);
    console.log(saveProjectArray("projects", Project.allProjects));
    renderTodoItem(currentTodo);
});

//Function to set the todo item's complete button color to reflect whatever priority level it has
function setCompleteButtonColor(todo, button) {
    if (todo.priority === "high") {
        button.style.backgroundColor = "rgba(213, 94, 0, 1)";
    } else if (todo.priority === "medium") {
        button.style.backgroundColor = "rgba(240, 228, 66, 1)";
    } else if (todo.priority === "low") {
        button.style.backgroundColor = "rgba(0, 158, 115, 1)";
    };
};

//Renders todo items to the page along with complete button, show more/less, and edit and delete buttons
function renderTodoItem(todo) {
    const todoItemContainer = document.createElement("div");
    todoItemContainer.classList.add("todo-item-container");
    todosContainer.appendChild(todoItemContainer);

    const todoItemCompleteButton = document.createElement("button");
    todoItemCompleteButton.classList.add("todo-complete-button");
    todoItemCompleteButton.id = "complete-button";

    //Sets button color depending on priority level
    setCompleteButtonColor(todo, todoItemCompleteButton);
    
    //Adds functionality to complete button on-click
    todoItemCompleteButton.addEventListener("click", () => {
        const todoStatus = todo.complete === true ? todo.complete = false : todo.complete = true;

        saveProjectArray("projects", Project.allProjects);
        
        if (todoStatus === true) {
            addCompletedItemIndicators()
            todoItemCompleteButton.textContent = "✓";
        } else if (todoStatus === false) {
            todoItemCompleteButton.textContent = "";
            removeCompletedItemIndicators();
        }

        console.log(todoStatus);
    });

    //Changes color of complete button on mouseenter/mouseleave
    todoItemCompleteButton.addEventListener("mouseenter", () => {
        todoItemCompleteButton.style.backgroundColor = "rgb(165, 165, 165)";
    });
    todoItemCompleteButton.addEventListener("mouseleave", () => {
        setCompleteButtonColor(todo, todoItemCompleteButton);
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
    showMoreLess.classList.add("show-more");

    showMoreLess.addEventListener("click", () => {
        if (todoHiddenInformation.style.display === "none") {
            todoHiddenInformation.style.display = "flex";
        } else {
            todoHiddenInformation.style.display = "none";
        }
    });

    //Creates and gives functionality to edit button and its submit button
    const todoEditButton = document.createElement("button");
    todoEditButton.classList.add("edit");
    todoEditButton.id = todo.id;

    todoEditButton.addEventListener("click", (event) => {
        todosEditModal.showModal();
        const todoEditSubmitButton = document.querySelector('button[id="todos-edit-submit"]').addEventListener("click", function(event) {
            selectedTodoItem = currentProject.todoItemsArray.find(element => element.id === todoEditButton.id);
            console.log(selectedTodoItem);
            console.log(currentProject.todoItemsArray);
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

            setCompleteButtonColor(todo, todoItemCompleteButton);
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
    todoDeleteButton.id = todo.id;
    todoDeleteButton.classList.add("delete");
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

    function addCompletedItemIndicators() {
            leftTodoVisibleInformation.classList.add("reduce-opacity");
            todoHiddenInformation.classList.add("reduce-opacity");
            showMoreLess.classList.add("reduce-opacity")
            todoEditButton.classList.add("reduce-opacity");
            todoItemName.classList.add("strike-through");todoDescription.classList.add("strike-through"); todoDueDate.classList.add("strike-through");
        }

        function removeCompletedItemIndicators() {
            leftTodoVisibleInformation.classList.remove("reduce-opacity");
            todoHiddenInformation.classList.remove("reduce-opacity");
            showMoreLess.classList.remove("reduce-opacity")
            todoEditButton.classList.remove("reduce-opacity");
            todoItemName.classList.remove("strike-through");todoDescription.classList.remove("strike-through"); todoDueDate.classList.remove("strike-through");
        }

    if (todo.complete === true) {
            addCompletedItemIndicators()
            todoItemCompleteButton.textContent = "✓";
        } else if (todo.complete === false) {
            todoItemCompleteButton.textContent = "";
            removeCompletedItemIndicators();
        }
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
            renderTodoItem(todo);
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
            contentContainer.removeChild(todosContainer);
        }
};