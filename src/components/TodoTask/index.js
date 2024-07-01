import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import "./index.css";
import { useState } from "react";
import EditTask from "../EditTask";

const TodoTask = (props) => {
  const { taskDetails, setUIRendering } = props;
  const { id, todoTask} = taskDetails;
  const [toDisplayDelete, setToDisplayDelete] = useState("");
  const [toEnableUpdate, setToEnableUpdate] = useState(false);
  
  const deleteHandler = async () => {
    console.log(id);
    const url = `https://todobackend-virid.vercel.app/deletetodo/${id}`;
    const options = {
      method: "DELETE",
    };
    const response = await fetch(url, options);
    console.log(response);
    setUIRendering((prevState) => !prevState);
  };

  const handlingCheckbox = (event) => {
    setToDisplayDelete(event.target.checked);
  };

  const editHandler = () => {
    setToEnableUpdate(true)
  };

  const closingPopup = () => {
    setToEnableUpdate(false)
  }


  return (
    <>
      <li className="todo-task-cont" key={id}>
        <input onChange={handlingCheckbox} type="checkbox" id={id} />
        <div className="todo-label">
          <label className="input-text" htmlFor={id}>
            {todoTask}
          </label>
          <MdEditNote onClick={editHandler} />
          {toDisplayDelete && (
            <MdDeleteOutline
              onClick={deleteHandler}
              aria-label="close"
              className="delete-item"
            />
          )}
        </div>
      </li>
      {toEnableUpdate && (
        <div className="edit-container">
          <EditTask setUIRendering={setUIRendering} id={id} closingPopup={closingPopup} taskTodo={todoTask} />
        </div>
      )}
    </>
  );
};

export default TodoTask;
