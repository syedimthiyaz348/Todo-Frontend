import React from "react";
import "./index.css";
import { useState, useEffect } from "react";
import TodoTask from "../TodoTask";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [addedTask, setAddedTask] = useState("");
  const [uiRendering, setUIRendering] = useState(false);

  useEffect(() => {
    const callingApi = async () => {
      const url = "https://todobackend-virid.vercel.app/todos";
      const response = await fetch(url);
      const data = await response.json();
      const fetchedData = data.map((eachTodo) => ({
        id: eachTodo._id,
        todoTask: eachTodo.todo,
        status: eachTodo.status,
      }));
      setTodoList(fetchedData);
    };
    callingApi();
  }, [uiRendering]);

  const enteringTodoTask = (event) => {
    setAddedTask(event.target.value);
  };

  const todoContainer = () => {
    return (
      <ul>
        {todoList.map((eachItem) => (
          <TodoTask taskDetails={eachItem} setUIRendering={setUIRendering} />
        ))}
      </ul>
    );
  };

  const addingTodo = async () => {
    if (addedTask !== "") {
      const todoDetails = { todo: addedTask };
      const addingUrl = "https://todobackend-virid.vercel.app/addtodo";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(todoDetails),
      };
      const response = await fetch(addingUrl, options);
      const data = await response.json();
      alert(`Added Task : ${data.todo}`);
      setUIRendering((prevState) => !prevState);
      setAddedTask("");
    } else {
      alert("Please Enter Your Task");
    }
  };

  return (
    <div>
      <h1>TODO TASKS</h1>
      <div className="task-input-container">
        <input
          placeholder="Add Task"
          onChange={enteringTodoTask}
          className="task-input"
          type="text"
          value={addedTask}
        />
        <button onClick={addingTodo} className="add-button">
          ADD
        </button>
      </div>
      <hr />
      <div className="tasks-container">
        <div className="created-task-cont">
          <h1>Created Tasks</h1>
          {todoContainer()}
        </div>
      </div>
    </div>
  );
};

export default Todo;
