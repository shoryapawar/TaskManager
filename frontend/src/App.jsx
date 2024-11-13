import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import SideNav from "./components/SideNav";
import { Route, Routes } from "react-router-dom";
import UpcomingTask from "./pages/UpcomingTask";
import OverDue from "./pages/OverDue";
import Completed from "./pages/Completed";
function App() {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage only once when the component mounts
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  const [searchQuery, setSearchQuery] = useState("");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handle search query update
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery) ||
      task.description.toLowerCase().includes(searchQuery)
  );

  // Task management functions
  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  return (
    <div className="min-h-screen font-georgia bg-background flex flex-col items-center p-6">
      <SideNav className="mb-12 p-7 font-sourgummy" onSearch={handleSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              className="mt-12"
              tasks={filteredTasks}
              addTask={addTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          }
        />
        <Route
          path="/UpcomingTask"
          element={
            <UpcomingTask
              tasks={filteredTasks}
              addTask={addTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          }
        />
        <Route
          path="/OverDueTask"
          element={
            <OverDue
              tasks={filteredTasks}
              addTask={addTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          }
        /><Route
        path="/CompletedTask"
        element={
          <Completed
            tasks={filteredTasks}
            addTask={addTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        }
      />
      </Routes>
    </div>
  );
}

export default App;
