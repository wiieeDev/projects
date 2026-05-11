const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("wiiee-theme");

if (savedTheme === "dark") {
  root.classList.add("dark");
}

function syncThemeButton() {
  if (!themeToggle) return;
  themeToggle.textContent = root.classList.contains("dark") ? "◐" : "☀";
}

syncThemeButton();

themeToggle?.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("wiiee-theme", root.classList.contains("dark") ? "dark" : "light");
  syncThemeButton();
});

document.querySelectorAll(".stat-number").forEach((item) => {
  const target = Number(item.dataset.count || 0);
  let current = 0;
  const timer = window.setInterval(() => {
    current += 1;
    item.textContent = String(current);
    if (current >= target) {
      window.clearInterval(timer);
    }
  }, 180);
});

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    document.querySelectorAll(".gallery-card").forEach((card) => {
      const shouldShow = selected === "all" || card.dataset.kind === selected;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

document.querySelectorAll("section, article").forEach((item) => {
  item.classList.add("reveal");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

const year = document.getElementById("year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}
