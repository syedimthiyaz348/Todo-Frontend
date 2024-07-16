import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import "./index.css";
import { useState, useEffect } from "react";

const CompletedTask = (props) => {
  const { taskDetails, setUIRendering } = props;
  const { id, todoTask, status } = taskDetails;
  const [showDelete, setShowDelete] = useState(false);

  const deleteHandler = async () => {
    const url = `https://todobackend-virid.vercel.app/deletetodo/${id}`;
    const options = {
      method: "DELETE",
    };
    const response = await fetch(url, options);
    setUIRendering((prevState) => !prevState);
  };

  const onChecking = (event) => {
    setShowDelete(event.target.checked);
  };

  return (
    <>
      <li className="todo-task-cont" key={id}>
        <input onChange={onChecking} type="checkbox" id={id} />
        <div className="todo-label">
          <label className="input-text" htmlFor={id}>
            {todoTask}
          </label>
          {showDelete && (
            <MdDeleteOutline
              aria-label="close"
              className="delete-item"
              onClick={deleteHandler}
            />
          )}
        </div>
      </li>
    </>
  );
};

export default CompletedTask;
