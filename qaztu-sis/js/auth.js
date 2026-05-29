const DEMO_USERS = {
  admin: { password: "admin123", role: "admin", name: "Askar Bekmukhanov", title: "System Administrator" },
  student: { password: "student123", role: "student", name: "Aibek Seitkali", title: "Student" },
  teacher: { password: "teacher123", role: "teacher", name: "Gulnara Bekturova", title: "Senior Lecturer" },
};

const ROLE_PATHS = {
  admin: "admin/dashboard.html",
  student: "student/dashboard.html",
  teacher: "teacher/dashboard.html",
};

function getBasePath() {
  const path = window.location.pathname;
  if (path.includes("/admin/") || path.includes("/student/") || path.includes("/teacher/")) {
    return "../";
  }
  return "";
}

function saveSession(user) {
  sessionStorage.setItem(
    "qaztu_session",
    JSON.stringify({
      username: user.username,
      role: user.role,
      name: user.name,
      title: user.title,
    })
  );
}

function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem("qaztu_session"));
  } catch {
    return null;
  }
}

function logout() {
  sessionStorage.removeItem("qaztu_session");
  window.location.href = getBasePath() + "index.html";
}

function requireRole(allowedRoles) {
  const session = getSession();
  if (!session || !allowedRoles.includes(session.role)) {
    window.location.href = getBasePath() + "index.html";
    return null;
  }
  return session;
}

function handleLogin(e) {
  e.preventDefault();
  const form = e.target;
  const username = form.username.value.trim().toLowerCase();
  const password = form.password.value;
  const errorEl = document.getElementById("loginError");

  const user = DEMO_USERS[username];
  if (!user || user.password !== password) {
    if (errorEl) {
      errorEl.textContent =
        "Invalid credentials. Try: admin/admin123, student/student123, teacher/teacher123";
      errorEl.classList.add("is-visible");
    }
    return;
  }

  const remember = form.querySelector('[name="remember"]');
  if (remember?.checked) {
    localStorage.setItem("qaztu_remember", "1");
    localStorage.setItem("qaztu_username", username);
  } else {
    localStorage.removeItem("qaztu_remember");
    localStorage.removeItem("qaztu_username");
  }

  if (errorEl) errorEl.classList.remove("is-visible");
  saveSession({ username, ...user });
  const base = getBasePath();
  window.location.href = base + ROLE_PATHS[user.role];
}

function initAuth() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
    if (localStorage.getItem("qaztu_remember") === "1") {
      const saved = localStorage.getItem("qaztu_username");
      if (saved) loginForm.username.value = saved;
      const remember = loginForm.querySelector('[name="remember"]');
      if (remember) remember.checked = true;
    }
  }

  document.querySelectorAll("[data-logout]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  });

  const session = getSession();
  if (session) {
    document.querySelectorAll("[data-user-name]").forEach((el) => {
      el.textContent = session.name;
    });
    document.querySelectorAll("[data-user-role]").forEach((el) => {
      el.textContent = session.title;
    });
  }
}

document.addEventListener("DOMContentLoaded", initAuth);
