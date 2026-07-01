import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import SearchBar from "./components/SearchBar";
import Stats from "./components/Stats";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const [tasks, setTasks] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    return saved || [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const addTask = () => {
    if (task.trim() === "") {
      toast.warning("Please enter a task!");
      return;
    }

    if (editingId) {
      setTasks(
        tasks.map((item) =>
          item.id === editingId
            ? {
                ...item,
                text: task,
                priority,
                dueDate,
              }
            : item
        )
      );

      toast.success("Task Updated Successfully!");
      setEditingId(null);
    } else {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: task,
          priority,
          dueDate,
          completed: false,
          pinned: false,
        },
      ]);

      toast.success("Task Added Successfully!");
    }

    setTask("");
    setPriority("Medium");
    setDueDate("");
  };

  const toggleComplete = (id) => {
    const clickedTask = tasks.find((item) => item.id === id);

    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );

    if (clickedTask.completed) {
      toast.info("Task marked as Pending!");
    } else {
      toast.success("Task Completed!");
    }
  };

  const togglePin = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, pinned: !item.pinned }
          : item
      )
    );

    toast.info("Pin Updated!");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
    toast.error("Task Deleted!");
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((item) => item.id === id);

    setTask(taskToEdit.text);
    setPriority(taskToEdit.priority);
    setDueDate(taskToEdit.dueDate || "");
    setEditingId(id);
  };

  const filteredTasks = tasks.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  const displayedTasks = filteredTasks.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "pending") return !item.completed;
    return true;
  });

  const sortedTasks = [...displayedTasks].sort(
    (a, b) => Number(b.pinned) - Number(a.pinned)
  );

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className={`container ${theme}`}>
      <h1>🚀 Advanced Task Manager</h1>

      <ThemeToggle
        theme={theme}
        setTheme={setTheme}
      />

      <TaskForm
        task={task}
        setTask={setTask}
        dueDate={dueDate}
        setDueDate={setDueDate}
        priority={priority}
        setPriority={setPriority}
        addTask={addTask}
        editingId={editingId}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <div className="button-group">
        <button onClick={() => setFilter("all")}>
          All
        </button>

        <button onClick={() => setFilter("completed")}>
          Completed
        </button>

        <button onClick={() => setFilter("pending")}>
          Pending
        </button>
      </div>

      <Stats
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
      />

      {sortedTasks.map((item) => (
        <TaskCard
          key={item.id}
          item={item}
          togglePin={togglePin}
          toggleComplete={toggleComplete}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      ))}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme={theme}
      />
    </div>
  );
}

export default App;