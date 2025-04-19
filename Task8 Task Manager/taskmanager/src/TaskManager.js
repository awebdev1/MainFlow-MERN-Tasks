import React, { useState } from "react";
import "./TaskManager.css";

const TaskManagerApp = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;

    setTasks((prevTasks) => [...prevTasks, input].sort());
    setInput("");
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="TaskManager-container">
      <h2>TaskManager List</h2>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}{" "}
            <button className="delete-btn" onClick={() => removeTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManagerApp;
