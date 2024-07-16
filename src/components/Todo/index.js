import React from "react";
import "./index.css";
import { useState, useEffect } from "react";
import TodoTask from "../TodoTask";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CompletedTask from "../CompletedTask";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [addedTask, setAddedTask] = useState("");
  const [uiRendering, setUIRendering] = useState(true);
  const [pageShifting, setPageShifting] = useState(false);
  const [userName, setUserName] = useState("");
  const completedList = todoList.filter(each => each.status === "completed")
  const pendingList = todoList.filter(each => each.status === 'pending')

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

  const todoPendingContainer = () => {
    return pendingList.length === 0 ? (
      <h3>No Tasks Available</h3>
    ) : (
      <ul>
        {pendingList.map((eachItem) => (
          <TodoTask
            key={eachItem.id}
            taskDetails={eachItem}
            setUIRendering={setUIRendering}
          />
        ))}
      </ul>
    );
  };

  const todoCompletedContainer = () => {
    return completedList.length === 0 ? (
      <h3>No Tasks Completed Yet</h3>
    ) : (
      <ul>
        {completedList.map((eachItem) => (
          <CompletedTask
            key={eachItem.id}
            taskDetails={eachItem}
            setUIRendering={setUIRendering}
          />
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

  const mainContainer = () => {
    return (
      <>
        <div className="header-container">
          <h1>TODO TASKS</h1>
          <h3>Hi {userName}, Create Your Tasks</h3>
          <div className="task-input-container">
            <TextField
              onChange={enteringTodoTask}
              value={addedTask}
              className="task-input"
              id="outlined-basic"
              size="small"
              label="Enter Your Task"
              variant="outlined"
            />
            {/* <input
          placeholder="Add Task"
          onChange={enteringTodoTask}
          className="task-input"
          type="text"
          value={addedTask}
        /> */}
            <Button
              size="small"
              margin="dense"
              onClick={addingTodo}
              className="add-button"
              variant="contained"
            >
              Add
            </Button>
            {/* <button onClick={addingTodo} className="add-button">
          ADD
        </button> */}
          </div>
        </div>
        <hr />
        <div className="tasks-container">
          <div className="created-task-cont">
            <h1>Created Tasks</h1>
            <div className="created-completed">
              <div className="each-task-container">
                <h2>Tasks</h2>
                <hr/>
                {todoPendingContainer()}
              </div>
              <div className="each-task-container">
                <h2>Completed Tasks</h2>
                <hr/>
                {todoCompletedContainer()}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const homeContainer = () => {
    const onEnteringName = (event) => {
      setUserName(event.target.value);
    };

    const handlingEnterButton = () => {
      if (userName !== "") {
        setPageShifting(true);
      } else {
        alert("Please Enter Your Name");
      }
    };
    return (
      <div>
        <h1>Hi, Please Enter Your Name</h1>
        <input
          placeholder="Please Enter Your Name"
          onChange={onEnteringName}
          type="text"
        />
        <button onClick={handlingEnterButton}>Enter</button>
      </div>
    );
  };

  return (
    <div className="main-container">
      {/* {!pageShifting && homeContainer()} */}
      {mainContainer()}
    </div>
  );
};

export default Todo;
