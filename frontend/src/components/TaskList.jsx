import React, { useState } from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, updateTask, deleteTask, showFilters }) => {
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [completionFilter, setCompletionFilter] = useState("All");

  // Filter tasks by both priority and completion status
  const filteredTasks = tasks.filter((task) => {
    if (priorityFilter !== "All" && task.priority !== priorityFilter) {
      return false;
    }
    if (completionFilter === "Completed" && !task.completed) {
      return false;
    }
    if (completionFilter === "Pending" && task.completed) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-primaryText mx-auto w-3/2 p-4 rounded-lg shadow-lg">
      {/* Conditionally render filters if showFilters prop is true */}
      {showFilters && (
        <div className="mb-4 flex space-x-4">
          <div>
            <label className="font-semibold mr-2 text-background">Filter by Priority:</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="p-2 border rounded-md bg-secondaryText text-white"
            >
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="font-semibold mr-2 text-background">Filter by Status:</label>
            <select
              value={completionFilter}
              onChange={(e) => setCompletionFilter(e.target.value)}
              className="p-2 border rounded-md bg-secondaryText text-white"
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      )}

      {/* Display filtered tasks */}
      <div>
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
