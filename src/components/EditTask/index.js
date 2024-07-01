import { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import './index.css'

const EditTask = props => {
    const [newTask, setNewTask] = useState('')
    const {closingPopup, id, taskTodo, setUIRendering} = props
    const handlingSubmit = () => {
        closingPopup()
    }

    const submitingTodo = async () => {
        const updatingUrl = `https://todobackend-virid.vercel.app/updatetodo/${id}`
        const newTaskDetails = {todo : newTask}
        const options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(newTaskDetails),
          };

        const response = await fetch(updatingUrl, options)
        if (newTask !== ''){
            if (response.ok === true){
                setNewTask('')
                setUIRendering((prevState) => !prevState);;
                closingPopup()
            }
            }else{
                alert("Not Allowed")
        }
else{
                alert("Not Allowed")
        }
        
    }

    const enteringNewTask = (event) => {
        setNewTask(event.target.value)
    }

    return(
        <div className="edit-container">
            <RxCross2 className='cross-mark' onClick={handlingSubmit}/>
            <h1>Update Your Task</h1>
            <p>Previous Task: {taskTodo}</p>
            <input value={newTask} onChange={enteringNewTask} className='submit-input' type='text' placeholder={taskTodo}/>
            <br/>
            <button className='submit-button' onClick={submitingTodo} >Submit</button>
        </div>
    )
}

export default EditTask