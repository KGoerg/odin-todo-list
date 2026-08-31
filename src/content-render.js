import { TodoItem } from "./todos.js";

const contentContainer = document.querySelector("#content");

export const projectTitle = document.createElement("h1");
export const projectDescription = document.createElement("h2");
contentContainer.appendChild(projectTitle);
contentContainer.appendChild(projectDescription);

const todosContainer = document.querySelector(".todos-container");

const todosFormSubmitButton = document.getElementById("todos-submit").addEventListener("click", function(event) {
    const todosFormTitle = document.getElementById("todo_name").value;
    const todosFormDescription = document.getElementById("todo_description").value;
    const todoDueDate = document.getElementById("todo_due_date").value;
    const todoPriorityLevel = document.getElementById("priority").value;
    const newTodo = new TodoItem(todosFormTitle, todosFormDescription, todoDueDate, todoPriorityLevel);
    console.log(newTodo);
})