import React, { useState } from 'react';
import trashIcon from './assets/trash.png';
import pencilIcon from './assets/pencil.png';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask(event) {
        event.preventDefault();
        if (newTask.trim() !== "") {
            setTasks([...tasks, { text: newTask, completed: false, isEditing: false }]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function toggleTask(index) {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function toggleEdit(index) {
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, isEditing: !task.isEditing } : task
      );
      setTasks(updatedTasks);
    }
    
    function updateTaskText(index, newText) {
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, text: newText } : task
      );
      setTasks(updatedTasks);
    }

    return (
        <div className="to-do-list">
            <h1>To Do List</h1>
            
            <input
                type="text"
                value={newTask}
                onChange={handleInputChange}
                placeholder="Enter a new task"
            />
            <button className="add-button" onClick={addTask}>Add Task</button>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(index)}
                        />
                        {task.isEditing ? (
                          <input
                            type="text"
                            value={task.text}
                            onChange={(e) => updateTaskText(index, e.target.value)}
                            onBlur={() => toggleEdit(index)} // save on blur
                            onKeyDown={(e) => {
                              if (e.key === "Enter") toggleEdit(index);
                            }}
                            className="edit-input"
                            autoFocus
                          />
                        ) : (
                          <span
                            className={`text ${task.completed ? "completed" : ""}`}
                            onDoubleClick={() => toggleEdit(index)}
                          >
                            {task.text}
                          </span>
                        )}

                        <button className="edit-button" onClick={() => toggleEdit(index)}>
                          <img src={pencilIcon} alt="Delete" className="icon" />
                        </button>

                        <button className="delete-button" onClick={() => deleteTask(index)}>
                          <img src={trashIcon} alt="Delete" className="icon" />
                        </button>

                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
