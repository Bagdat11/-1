document.addEventListener("DOMContentLoaded", () => {
  const required = document.body.dataset.requireRole;
  if (required && typeof requireRole === "function") {
    requireRole(required.split(",").map((r) => r.trim()));
  }
});
