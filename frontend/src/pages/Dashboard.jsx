import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Dashboard = ({ tasks, addTask, updateTask, deleteTask }) => {
  const today = new Date().toISOString().split('T')[0];
  const upcomingTasks = tasks.filter((task) => !task.completed && task.dueDate > today);
  const overdueTasks = tasks.filter((task) => !task.completed && task.dueDate < today);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="w-[100%] mx-auto p-4 bg-cardBackground rounded-lg">
      <TaskForm addTask={addTask} />
      {/* Task Lists Layout */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Upcoming Tasks */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-blue-600 text-center mb-4">Upcoming Tasks</h2>
          <TaskList tasks={upcomingTasks} updateTask={updateTask} deleteTask={deleteTask} />
        </div>

        {/* Overdue Tasks */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-red-600 text-center mb-4">Overdue Tasks</h2>
          <TaskList tasks={overdueTasks} updateTask={updateTask} deleteTask={deleteTask} />
        </div>

        {/* Completed Tasks */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-green-600 text-center mb-4">Completed Tasks</h2>
          <TaskList tasks={completedTasks} updateTask={updateTask} deleteTask={deleteTask} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
