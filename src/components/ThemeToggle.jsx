function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
    >
      {theme === "dark"
        ? "☀️ Light Mode"
        : "🌙 Dark Mode"}
    </button>
  );
}

export default ThemeToggle;