import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

let todos = initialTodos;
const todoCounter = new TodoCounter(initialTodos, ".counter__text");
const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const section = new Section({
  items: todos,
  renderer: (item) => {
    return generateTodo(item);
  },
  containerSelector: ".todos__list",
});
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    const todoElement = generateTodo(values);
    section.addItem(todoElement);
    todoCounter.updateTotal(true);
    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed, todoData) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleDelete, handleCheck);
  const todoElement = todo.getView();
  return todoElement;
};

section.renderItems();
addTodoPopup.setEventListeners();
newTodoValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
