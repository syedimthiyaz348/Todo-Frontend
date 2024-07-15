import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import "./index.css";
import { useState, useEffect } from "react";
import EditTask from "../EditTask";

const TodoTask = (props) => {
  const { taskDetails, setUIRendering } = props;
  const { id, todoTask, status } = taskDetails;
  const [toDisplayDelete, setToDisplayDelete] = useState("");
  const [toEnableUpdate, setToEnableUpdate] = useState(false);
  const strikeOffCss = toDisplayDelete ? "strike-off" : "";
  

  useEffect(() => {
    if (toDisplayDelete){
      updatingStatus();
    }
  });

  const updatingStatus = async () => {
    const updatingStatusUrl = `https://todobackend-virid.vercel.app/updatetodo/${id}`;
      const newTaskDetails = { status: "completed" };
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newTaskDetails),
      };
    const response = await fetch(updatingStatusUrl, options);
    setUIRendering(prevState => !prevState)
  };

  const deleteHandler = async () => {
    const url = `https://todobackend-virid.vercel.app/deletetodo/${id}`;
    const options = {
      method: "DELETE",
    };
    const response = await fetch(url, options);
    setUIRendering((prevState) => !prevState);
  };

  const handlingCheckbox = event => {
    setToDisplayDelete(event.target.checked)
    setUIRendering(prevState => !prevState)
  }

  const editHandler = () => {
    setToEnableUpdate(true);
  };

  const closingPopup = () => {
    setToEnableUpdate(false);
  };

  return (
    <>
      <li className="todo-task-cont" key={id}>
        <input onChange={handlingCheckbox} type="checkbox" id={id} />
        <div className="todo-label">
          <label className={`input-text ${strikeOffCss}`} htmlFor={id}>
            {todoTask}
          </label>
          <MdEditNote onClick={editHandler} />
          <MdDeleteOutline
              onClick={deleteHandler}
              aria-label="close"
              className="delete-item"
            />
        </div>
      </li>
      {toEnableUpdate && (
        <div className="edit-container">
          <EditTask
            setUIRendering={setUIRendering}
            id={id}
            closingPopup={closingPopup}
            taskTodo={todoTask}
          />
        </div>
      )}
    </>
  );
};

export default TodoTask;
