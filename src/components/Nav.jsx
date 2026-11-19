import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";
import { navLinks } from "../data.js";

function getInitialTheme() {
  // index.html already applied the saved theme before React loaded
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

export default function Nav() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  return (
    <header className="nav">
      <a href="#top" className="logo">LN</a>
      <nav>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </nav>
      <button
        id="theme-toggle"
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Icon name="sun" className="icon-sun" />
        <Icon name="moon" className="icon-moon" />
      </button>
    </header>
  );
}
