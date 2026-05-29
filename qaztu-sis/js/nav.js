function initSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const toggle = document.querySelector(".menu-toggle");
  const overlay = document.querySelector(".sidebar-overlay");

  if (toggle && sidebar) {
    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("is-open");
      overlay?.classList.toggle("is-visible");
    });
  }

  if (overlay) {
    overlay.addEventListener("click", () => {
      sidebar?.classList.remove("is-open");
      overlay.classList.remove("is-visible");
    });
  }

  const current = window.location.pathname.split("/").pop() || "dashboard.html";
  document.querySelectorAll(".sidebar-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current || (current === "" && href === "dashboard.html")) {
      link.classList.add("is-active");
    }
  });
}

document.addEventListener("DOMContentLoaded", initSidebar);
