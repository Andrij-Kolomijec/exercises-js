import React, { useState } from "react";

const FunctionInput = ({ name }) => {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [resubmitVal, setResubmitVal] = useState("");

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal) {
      setTodos((prevTodos) => [...prevTodos, { id: inputVal, editing: false }]);
      setInputVal("");
      setResubmitVal("");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => `delete-${todo.id}` !== e.target.className)
    );
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const editClassName = e.target.className;
    const editedTodoId = editClassName.replace("edit-", "");

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        `edit-${todo.id}` === editClassName ? { ...todo, editing: true } : todo
      )
    );
    setResubmitVal(editedTodoId);
  };

  const handleResubmit = (e) => {
    e.preventDefault();
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        `edit-${todo.id}` === e.target.className
          ? { id: resubmitVal, editing: false }
          : todo
      )
    );
    setResubmitVal("");
  };

  const handleInputResubmitChange = (e) => {
    setResubmitVal(e.target.value);
  };

  return (
    <section>
      <h3>{name}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          id="task-entry"
          type="text"
          name="task-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h4>Tasks: {todos.length}</h4>
      <ul>
        {todos.map((todo) => (
          <li id={`id-${todo.id}`} key={`key-${todo.id}`}>
            {todo.editing ? (
              <>
                <input
                  type="text"
                  placeholder={todo.id}
                  value={resubmitVal}
                  onChange={handleInputResubmitChange}
                />
                <button className={`edit-${todo.id}`} onClick={handleResubmit}>
                  Resubmit
                </button>
              </>
            ) : (
              <>
                {todo.id}
                <button className={`edit-${todo.id}`} onClick={handleEdit}>
                  Edit
                </button>
              </>
            )}
            <button className={`delete-${todo.id}`} onClick={handleDelete}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FunctionInput;
