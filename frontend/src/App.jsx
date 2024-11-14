import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import SideNav from "./components/SideNav";
import { Route, Routes } from "react-router-dom";
import UpcomingTask from "./pages/UpcomingTask";
import OverDue from "./pages/OverDue";
import Completed from "./pages/Completed";
import SearchResultsModal from "./components/SearchResultsModal";

function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // New state to control modal visibility

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery) ||
      task.description.toLowerCase().includes(searchQuery)
  );

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

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
    setSearchQuery(""); // Clear search query when modal closes
  };

  return (
    <div className="min-h-screen font-georgia bg-navbar flex flex-col items-center p-6">
      <SideNav className="p-7 font-sourgummy" onSearch={handleSearch} openSearchModal={openSearchModal} /> {/* Pass handler */}
      <div className="mt-4 w-full">
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
          />
          <Route
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
      {isSearchModalOpen && (
        <SearchResultsModal
        onSearch={handleSearch}
          tasks={filteredTasks}
          onClose={closeSearchModal}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      )}
    </div>
  );
}

export default App;
