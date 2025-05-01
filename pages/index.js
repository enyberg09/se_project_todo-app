import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

let todos = initialTodos;

function renderTodos() {
  todosList.innerHTML = "";
  todos.forEach((item) => {
    const todo = generateTodo(item);
    todosList.append(todo);
  });
}

function handleDelete(todoId) {
  todos = todos.filter((todo) => todo.id !== todoId);
  renderTodos();
  updateCounter();
}

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const counterText = document.querySelector(".counter__text");

function updateCounter() {
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  counterText.textContent = `Showing ${completedTodos} out of ${totalTodos} completed`;
}

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleDelete, updateCounter);
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  todos.push(values);
  const todo = generateTodo(values);
  todosList.append(todo);
  newTodoValidator.resetValidation();
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

updateCounter();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeModal(addTodoPopup);
  }
});
