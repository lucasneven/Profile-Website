// ---------- 1. Dark mode toggle ----------
const toggle = document.getElementById("theme-toggle");
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  toggle.textContent = theme === "dark" ? "☀️" : "🌙";
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

// Use the saved choice; first-time visitors get the dark gray theme
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved === "light" || saved === "dark" ? saved : "dark");

toggle.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// ---------- 2. Fade sections in as you scroll ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ---------- 3. Put the current year in the footer ----------
document.getElementById("year").textContent = new Date().getFullYear();
