import Icon from "./Icon.jsx";
import { navLinks } from "../data.js";

export default function Nav({ theme, onToggleTheme }) {
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
        onClick={onToggleTheme}
      >
        <Icon name="sun" className="icon-sun" />
        <Icon name="moon" className="icon-moon" />
      </button>
    </header>
  );
}
