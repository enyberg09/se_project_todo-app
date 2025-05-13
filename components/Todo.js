class Todo {
  constructor(data, selector, handleDelete, handleCheck) {
    if (typeof handleDelete !== "function") {
      throw new Error("handleDelete must be a function");
    }

    if (!(typeof data === "object" && data !== null)) {
      throw new Error("data must be an object");
    }

    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleDeleteTodo = handleDelete;
    this._handleCheck = handleCheck;
  }

  _setEventListeners() {
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._handleDeleteTodo(this._data.completed, this._data);
    });
    this._todoCheckboxEl.addEventListener("change", () => {
      this.toggleComplete();
      this._handleCheck(this._data.completed);
    });
  }

  toggleComplete() {
    this._data.completed = !this._data.completed;
  }

  _generateCheckBoxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoElement.setAttribute("data-todo-id", this._data.id);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._data.name;
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._generateCheckBoxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
