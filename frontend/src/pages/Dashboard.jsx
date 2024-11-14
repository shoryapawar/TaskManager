import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = ({ tasks, addTask, updateTask, deleteTask }) => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  // Filter tasks into categories
  const upcomingTasks = tasks.filter(
    (task) => !task.completed && task.dueDate > today
  );
  const overdueTasks = tasks.filter(
    (task) => !task.completed && task.dueDate < today
  );
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="w-[100%] mx-auto p-4 bg-tertiaryButton rounded-lg mt-12">
      <TaskForm addTask={addTask} />
      {/* Task Lists Layout */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-blue-600 text-center mb-4">
             <Link to="/UpcomingTask">
                  <a href="#"> Upcoming Tasks</a>
              </Link>
          </h2>
          <TaskList
            tasks={upcomingTasks.slice(0, 3)}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
          {upcomingTasks.length > 3 && (
            <button
              onClick={() => navigate("/UpcomingTask")}
              className="text-blue-600 hover:underline mt-4"
            >
              More
            </button>
          )}
        </div>

        {/* Overdue Tasks */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-red-600 text-center mb-4">
          <Link to="/OverDueTask">
                  <a href="#"> OverDue Tasks</a>
              </Link>
          </h2>
          <TaskList
            tasks={overdueTasks.slice(0, 3)}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
          {overdueTasks.length > 3 && (
            <button
              onClick={() => navigate("/OverDueTask")}
              className="text-red-600 hover:underline mt-4"
            >
              More
            </button>
          )}
        </div>

        {/* Completed Tasks */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-green-600 text-center mb-4">
          <Link to="/CompletedTask">
                  <a href="#"> Completed Tasks</a>
              </Link>
          </h2>
          <TaskList
            tasks={completedTasks.slice(0, 3)}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
          {completedTasks.length > 3 && (
            <button
              onClick={() => navigate("/CompletedTask")}
              className="text-green-600 hover:underline mt-4"
            >
              More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
