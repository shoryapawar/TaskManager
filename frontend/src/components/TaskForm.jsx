import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "./styled-components/Button";
import Input from "./styled-components/Input";

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    completed: false,
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (task.title && task.dueDate) {
      const newTask = { ...task, id: uuidv4() };

      // Update localStorage
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = [...savedTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      // Add task to Dashboard's state
      addTask(newTask);

      // Reset form
      setTask({
        id: "",
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
        completed: false,
      });
    } else {
      alert("Please enter a title and due date.");
    }
  };

  return (
    <form className="space-y-4 bg-white p-4 mt-4 rounded shadow-md max-w-4xl mx-auto">
      <input
        type="text"
        placeholder="Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        required
        className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3B30] bg-[#F1F1F1] text-[#2E2E30]"
      />

      <textarea
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3B30] bg-[#F1F1F1] text-[#2E2E30]"
        rows="4"
      ></textarea>

      <div className="flex space-x-4">
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          required
          className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3B30] bg-[#F1F1F1] text-[#2E2E30]"
        />
        <select
          value={task.priority}
          placeholder="Priority"
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
          className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3B30] bg-[#F1F1F1] hover:text-red-500 text-[#2E2E30]"
        >
          <option
            value="High"
            className="bg-white text-black hover:bg-red-500 hover:text-white"
          >
            High
          </option>
          <option
            value="Medium"
            className="bg-white text-black hover:bg-red-500 hover:text-white"
          >
            Medium
          </option>
          <option
            value="Low"
            className="bg-white text-black hover:bg-red-500 hover:text-white"
          >
            Low
          </option>
        </select>
      </div>

      <div className="flex justify-center mt-4">
        <Button name="Add Task" onClick={handleClick} />
      </div>
    </form>
  );
};

export default TaskForm;
