import React from "react";
import TaskList from "../components/TaskList";

const UpcomingTask = ({ tasks, addTask, updateTask, deleteTask }) => {
  const today = new Date().toISOString().split("T")[0];
  const upcomingTasks = tasks.filter(
    (task) => !task.completed && task.dueDate > today
  );
  console.log(tasks);

  return (
    <div className="mt-10">
     <h1 className="text-white text-2xl font-semibold py-4">Upcoming Task</h1>
      <div >
        <TaskList
         showFilters = "true"
          tasks={upcomingTasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        ></TaskList>
      </div>
    </div>
  );
};

export default UpcomingTask;
