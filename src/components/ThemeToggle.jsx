import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "../lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
  const storedTheme = localStorage.getItem("theme")
  if (storedTheme === "dark"){
    setIsDarkMode(true)
    document.documentElement.classList.add("dark")
  } else {
    setIsDarkMode(false)
    document.documentElement.classList.remove("dark")
  }
  }, [])

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDarkMode(false)
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDarkMode(true)
    }
  }

  return (
    <button onClick={toggleTheme} className={cn(
      "fixed z-50 p-2 rounded-full transition-colors duration-300",
      "top-14 right-5 max-sm:top-auto max-sm:bottom-6 max-sm:right-6",
      "bg-white/10 dark:bg-gray-800/10 backdrop-blur-md shadow-md",
      "focus:outline-hidden"
    )}>

      {isDarkMode ? ( <Sun className="h-6 w-6 text-yellow-300" /> )
      :
      (<Moon className="h-6 w-6 text-blue-900" />)

    }
    </button>
  );
};