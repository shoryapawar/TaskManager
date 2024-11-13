import React, { useState } from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [completionFilter, setCompletionFilter] = useState("All");

  // Filter tasks by both priority and completion status
  const filteredTasks = tasks.filter((task) => {
    // Filter by priority
    if (priorityFilter !== "All" && task.priority !== priorityFilter) {
      return false;
    }
    // Filter by completion status
    if (completionFilter === "Completed" && !task.completed) {
      return false;
    }
    if (completionFilter === "Pending" && task.completed) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-background mx-auto w-3/2 p-4 rounded-lg shadow-lg">
      <div className="mb-4 flex space-x-4">
        <div>
          <label className="font-semibold mr-2">Filter by Priority:</label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label className="font-semibold mr-2">Filter by Status:</label>
          <select
            value={completionFilter}
            onChange={(e) => setCompletionFilter(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
