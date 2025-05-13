class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._total = todos.length;
    this._completed = todos.filter((todo) => todo.completed).length;
    this._updateText();
  }

  updateCompleted = (increment) => {
    if (increment) {
      this._completed++;
    } else {
      this._completed--;
    }
    this._updateText();
  };

  updateTotal = (increment) => {
    if (increment) {
      this._total++;
    } else {
      this._total--;
    }
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
