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

  const handleDateChange = (e) => {
    let dateValue = e.target.value;

    const [year, month, day] = dateValue.split("-");
    if (year && year.length > 4) {
      dateValue = `${year.slice(0, 4)}-${month || ""}-${day || ""}`;
    }
    if (month && month.length > 2) {
      dateValue = `${year || ""}-${month.slice(0, 2)}-${day || ""}`;
    }
    if (day && day.length > 2) {
      dateValue = `${year || ""}-${month || ""}-${day.slice(0, 2)}`;
    }

    // Validate
    const date = new Date(dateValue);
    if (date && !isNaN(date)) {
      setTask({ ...task, dueDate: dateValue });
    } else {
      setTask({ ...task, dueDate: "" });
    }
  };

  return (
    <form className="space-y-4 bg-white p-4 mt-4 rounded shadow-md max-w-4xl mx-auto text-black">
      <input
        type="text"
        placeholder="Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        required
        className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A1A1A6] bg-[#F1F1F1] text-[#2E2E30]"
      />

      <textarea
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A1A1A6] bg-[#F1F1F1] text-[#1a1a1b]"
        rows="4"
      ></textarea>

      <div className="flex space-x-4">
        <input
          type="date"
          value={task.dueDate}
          onChange={handleDateChange}
          required
          className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A1A1A6] bg-[#F1F1F1] text-[#1a1a1b]"
          style={{
            WebkitAppearance: "none",
            MozAppearance: "none",
          }}
        />

        <style jsx>{`
          input[type="date"]::-webkit-calendar-picker-indicator {
            background-color: black; /* Set icon background to black */
            filter: invert(1); /* Adjust color inversion to achieve #F1F1F1 */
          }

          input[type="date"]::-webkit-calendar-picker-indicator:hover {
            background-color: black; /* Keep black background on hover */
          }
        `}</style>

        <select
          value={task.priority}
          placeholder="Priority"
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
          className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A1A1A6] bg-[#F1F1F1]  text-[#1a1a1b]"
        >
          <option
            value="High"
            className="bg-white text-black  hover:text-white"
          >
            High
          </option>
          <option
            value="Medium"
            className="bg-white text-black  hover:text-white"
          >
            Medium
          </option>
          <option value="Low" className="bg-white text-black  hover:text-white">
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
