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

  // Handle date input change with validation
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
      setEditedTask({ ...editedTask, dueDate: dateValue });
    } else {
      setEditedTask({ ...editedTask, dueDate: "" });
    }
  };

  return (
    <div
      className={`border p-6 mb-4 rounded-lg shadow-md 
        ${task.completed ? "bg-green-50 border-green-300" : "bg-white"}`}
    >
      {isEditing && !task.completed ? (
        <div className="bg-white-100 text-black">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            className="w-full p-2 mb-3 border border-gray-300 rounded-lg text-black bg-gray-50 text-lg font-medium placeholder-gray-500"
            placeholder="Title"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="w-full p-2 mb-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-500"
            placeholder="Description"
          />
          <input
            type="date"
            value={editedTask.dueDate}
            onChange={handleDateChange} 
            className="w-full p-2 mb-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-500"
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
            value={editedTask.priority}
            onChange={(e) =>
              setEditedTask({ ...editedTask, priority: e.target.value })
            }
            className="w-full p-2 mb-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      ) : (
        // View-only fields
        <>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {task.title}
          </h3>
          <p className="text-gray-700 mb-3">{task.description}</p>
          <p className="text-sm text-gray-500 mb-1 font-semibold">
            Due Date: <span className="font-normal">{task.dueDate}</span>
          </p>
          <p className="text-sm text-gray-500 mb-3 font-semibold">
            Priority:{" "}
            <span
              className={`${
                task.priority === "High"
                  ? "text-red-500 font-bold"
                  : task.priority === "Medium"
                  ? "text-yellow-500 font-bold"
                  : "text-green-500 font-bold"
              }`}
            >
              {task.priority}
            </span>
          </p>
          <p className="text-sm font-semibold mb-4">
            Status:{" "}
            {task.completed ? (
              <span className="text-green-600 font-bold">Completed</span>
            ) : (
              <span className="text-red-500 font-bold">Pending</span>
            )}
          </p>
        </>
      )}

      <div className="flex space-x-3">
        {isEditing && !task.completed ? (
          // Edit mode buttons
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300"
            >
              Cancel
            </button>
          </>
        ) : (
          // View mode buttons
          <>
            <button
              onClick={() => !task.completed && setIsEditing(true)} // Disable editing if completed
              className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-300 ${
                task.completed
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={task.completed} 
            >
              Edit
            </button>
            <button
              onClick={toggleCompletion}
              className="px-4 py-2 text-sm font-medium bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300"
            >
              {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
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
