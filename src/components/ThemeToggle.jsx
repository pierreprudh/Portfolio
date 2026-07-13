import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

// Compact inline toggle, lives in the navbar.
export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    const dark = storedTheme === "dark"
    setIsDarkMode(dark)
    document.documentElement.classList.toggle("dark", dark)
  }, [])

  const toggleTheme = () => {
    const next = !isDarkMode
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
    setIsDarkMode(next)
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-foreground/5 transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
};
