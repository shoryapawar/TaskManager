import React from "react";
import TaskList from "../components/TaskList";

const Completed = ({ tasks, addTask, updateTask, deleteTask }) => {
  const today = new Date().toISOString().split("T")[0];
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="mt-10">
      <h1 className="text-white text-2xl font-semibold py-4">Completed Task</h1>
      <TaskList
        showFilters="true"
        tasks={completedTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default Completed;
