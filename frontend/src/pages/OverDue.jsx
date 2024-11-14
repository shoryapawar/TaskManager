import React from "react";
import TaskList from "../components/TaskList";

const OverDue = ({ tasks, addTask, updateTask, deleteTask }) => {
  const today = new Date().toISOString().split("T")[0];

  const overdueTasks = tasks.filter(
    (task) => !task.completed && task.dueDate < today
  );

  return (
   <div className="mt-10">
    <h1 className="text-white text-2xl font-semibold py-4">OverDue Task</h1>
    <TaskList
     showFilters = "true"
      tasks={overdueTasks}
      updateTask={updateTask}
      deleteTask={deleteTask}
    />
   </div>
  );
};

export default OverDue;
