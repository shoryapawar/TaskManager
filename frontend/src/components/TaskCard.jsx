import React, { useState } from "react";
import { MdEdit } from "react-icons/md";

const TaskCard = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  // Toggle completion
  const toggleCompletion = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  // Handle edit/save button
  const handleSave = () => {
    updateTask(editedTask); // Update task with edited values
    setIsEditing(false); // Exit edit mode
  };

  // Handle cancel button
  const handleCancel = () => {
    setEditedTask({ ...task }); // Reset edits
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div
      className={`border p-6 mb-4 rounded-lg shadow-md 
        ${task.completed ? "bg-green-100" : "bg-white"}`}
    >
      {isEditing && !task.completed ? (
        <div className="bg-white-100">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            className="w-full p-2 mb-2 border rounded bg-gray-100" // Update background color
            placeholder="Title"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="w-full p-2 mb-2 border rounded bg-gray-100" // Update background color
            placeholder="Description"
          />
          <input
            type="date"
            value={editedTask.dueDate}
            onChange={(e) =>
              setEditedTask({ ...editedTask, dueDate: e.target.value })
            }
            className="w-full p-2 mb-2 border rounded bg-gray-100" // Update background color
          />
          <select
            value={editedTask.priority}
            onChange={(e) =>
              setEditedTask({ ...editedTask, priority: e.target.value })
            }
            className="w-full p-2 mb-2 border rounded bg-gray-100" // Update background color
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      ) : (
        // View-only fields
        <>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {task.title}
          </h3>
          <p className="text-gray-600 mb-2">{task.description}</p>
          <p className="text-sm text-gray-500 mb-1">Due: {task.dueDate}</p>
          <p className="text-sm text-gray-500 mb-1">
            Priority:
            <span
              className={`${
                task.priority === "High"
                  ? "text-red-600"
                  : task.priority === "Medium"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {task.priority}
            </span>
          </p>
          <p className="text-sm font-medium mb-4">
            Status:
            {task.completed ? (
              <span className="text-green-600">Completed</span>
            ) : (
              <span className="text-red-600">Pending</span>
            )}
          </p>
        </>
      )}

      <div className="flex space-x-2">
        {isEditing && !task.completed ? (
          // Edit mode buttons
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </button>
          </>
        ) : (
          // View mode buttons
          <>
            <button
              onClick={() => !task.completed && setIsEditing(true)} // Disable editing if completed
              className={`px-4 py-2 text-sm font-medium rounded transition-colors duration-300 ${
                task.completed
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-cyan-500 text-white hover:bg-cyan-600"
              }`}
              disabled={task.completed} // Disable button if task is completed
            >
              Edit
            </button>
            <button
              onClick={toggleCompletion}
              className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
            >
              {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
