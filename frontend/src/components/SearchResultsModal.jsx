import React, { useState } from "react";
import TaskCard from "./TaskCard";

const SearchResultsModal = ({
  onSearch,
  tasks,
  onClose,
  updateTask,
  deleteTask,
}) => {
  const [priorityFilter, setPriorityFilter] = useState(""); // State for priority filter
  const [statusFilter, setStatusFilter] = useState(""); // State for status filter

  // Filter tasks based on selected priority and status
  const filteredTasks = tasks.filter((task) => {
    const matchesPriority =
      priorityFilter === "" || task.priority === priorityFilter;
    const matchesStatus =
      statusFilter === "" ||
      (statusFilter === "completed" && task.completed) ||
      (statusFilter === "pending" && !task.completed);

    return matchesPriority && matchesStatus;
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-96 overflow-y-auto relative z-10">
        {/* Search and Filters Container */}
        <div className="flex items-center mb-4 space-x-4">
          {/* Search Input on Left */}
          <input
            type="text"
            placeholder="Search tasks..."
            onChange={(e) => onSearch(e.target.value)}
            className="bg-inputField text-primaryText p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-200 w-full"
          />

          {/* Filters Container on Right */}
          <div className="flex space-x-4 items-center">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
            <button onClick={onClose} className="btn btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4">Search Results</h2>

        {/* Displaying Filtered Tasks */}
        {filteredTasks.length > 0 ? (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            ))}
          </div>
        ) : (
          <p>No tasks found matching the search criteria.</p>
        )}
      </div>

      {/* Modal Background Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-0"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default SearchResultsModal;
