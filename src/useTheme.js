import { useEffect, useState } from "react";

// Light/dark theme. index.html applies the saved choice (default: dark) to
// <html data-theme="..."> before React loads; this keeps it in sync and saves changes.
export default function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return [theme, toggleTheme];
}
