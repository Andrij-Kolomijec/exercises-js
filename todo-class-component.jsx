import React, { Component } from "react";

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      inputVal: "",
      resubmitVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleResubmit = this.handleResubmit.bind(this);
    this.handleInputResubmitChange = this.handleInputResubmitChange.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.inputVal) {
      this.setState((state) => ({
        todos: [...state.todos, { id: state.inputVal, editing: false }],
        inputVal: "",
        resubmitVal: "",
      }));
    }
  }

  handleDelete(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.filter(
        (todo) => `delete-${todo.id}` !== e.target.className
      ),
    }));
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.map((todo) =>
        `edit-${todo.id}` === e.target.className
          ? { ...todo, editing: true }
          : todo
      ),
      resubmitVal: e.target.className.replace("edit-", ""),
    }));
  }

  handleResubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      ...state,
      todos: state.todos.map((todo) =>
        `edit-${todo.id}` === e.target.className
          ? { id: state.resubmitVal, editing: false }
          : todo
      ),
      resubmitVal: "",
    }));
  }

  handleInputResubmitChange(e) {
    this.setState((state) => ({
      ...state,
      resubmitVal: e.target.value,
    }));
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            id="task-entry"
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>Tasks: {this.state.todos.length}</h4>
        <ul>
          {this.state.todos.map((todo) => (
            <li id={`id-${todo.id}`} key={`key-${todo.id}`}>
              {todo.editing ? (
                <>
                  <input
                    type="text"
                    placeholder={todo.id}
                    value={this.state.resubmitVal}
                    onChange={this.handleInputResubmitChange}
                  />
                  <button
                    className={`edit-${todo.id}`}
                    onClick={this.handleResubmit}
                  >
                    Resubmit
                  </button>
                </>
              ) : (
                <>
                  {todo.id}
                  <button
                    className={`edit-${todo.id}`}
                    onClick={this.handleEdit}
                  >
                    Edit
                  </button>
                </>
              )}
              <button
                className={`delete-${todo.id}`}
                onClick={this.handleDelete}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
