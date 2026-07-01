import { useState, useEffect } from "react";

function Home() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
        pinned: false,
      },
    ]);

    setTask("");
  };

  // Complete Task
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  // Pin Task
  const togglePin = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, pinned: !item.pinned }
          : item
      )
    );
  };

  // Show pinned tasks first
  const sortedTasks = [...tasks].sort(
    (a, b) => Number(b.pinned) - Number(a.pinned)
  );

  return (
    <div className="container">
      <h1>⭐ Advanced Task Manager</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      {sortedTasks.map((item) => (
        <div className="task-card" key={item.id}>
          <p
            style={{
              textDecoration: item.completed
                ? "line-through"
                : "none",
            }}
          >
            {item.pinned && "⭐ "}
            {item.text}
          </p>

          <div className="button-group">
            <button
              className="pin-btn"
              onClick={() => togglePin(item.id)}
            >
              {item.pinned ? "⭐ Unpin" : "📌 Pin"}
            </button>

            <button
              onClick={() => toggleComplete(item.id)}
            >
              {item.completed ? "Undo" : "Done"}
            </button>

            <button
              onClick={() => deleteTask(item.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;