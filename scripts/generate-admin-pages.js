const fs = require("fs");
const path = require("path");

const nav = [
  ["dashboard.html", "Dashboard"],
  ["users.html", "Users"],
  ["students.html", "Students"],
  ["teachers.html", "Teachers"],
  ["faculties.html", "Faculties"],
  ["specialties.html", "Specialties"],
  ["subjects.html", "Subjects"],
  ["schedule.html", "Schedule"],
  ["calendar.html", "Academic Calendar"],
  ["announcements.html", "Announcements"],
  ["reports.html", "Reports & Analytics"],
  ["settings.html", "System Settings"],
];

const pages = [
  {
    file: "users.html",
    title: "Users",
    cols: ["ID", "Name", "Email", "Role", "Status"],
    rows: [
      ["1", "Askar Bekmukhanov", "askar@qaztu.edu.kz", "Admin", "Active"],
      ["2", "Aibek Seitkali", "aibek@student.qaztu.edu.kz", "Student", "Active"],
      ["3", "Gulnara Bekturova", "gulnara@qaztu.edu.kz", "Teacher", "Active"],
    ],
  },
  {
    file: "students.html",
    title: "Students",
    cols: ["ID", "Name", "Faculty", "Group", "GPA"],
    rows: [
      ["1001", "Aibek Seitkali", "IT & CS", "INF-301", "3.8"],
      ["1002", "Dana Nurpeisova", "Economics", "ECO-201", "3.5"],
    ],
  },
  {
    file: "teachers.html",
    title: "Teachers",
    cols: ["ID", "Name", "Department", "Subjects", "Status"],
    rows: [
      ["T01", "Gulnara Bekturova", "IT & CS", "Algorithms", "Active"],
      ["T02", "Marat Kassymov", "Engineering", "Mechanics", "Active"],
    ],
  },
  {
    file: "faculties.html",
    title: "Faculties",
    cols: ["Code", "Name", "Dean", "Students"],
    rows: [
      ["ENG", "Engineering", "Dr. Suleimenov", "3994"],
      ["IT", "IT & CS", "Dr. Alimov", "2746"],
    ],
  },
  {
    file: "specialties.html",
    title: "Specialties",
    cols: ["Code", "Name", "Faculty", "Duration"],
    rows: [
      ["INF", "Information Systems", "IT & CS", "4 years"],
      ["SE", "Software Engineering", "IT & CS", "4 years"],
    ],
  },
  {
    file: "subjects.html",
    title: "Subjects",
    cols: ["Code", "Name", "Credits", "Faculty"],
    rows: [
      ["MATH201", "Calculus II", "5", "Engineering"],
      ["CS301", "Algorithms", "4", "IT & CS"],
    ],
  },
  {
    file: "schedule.html",
    title: "Schedule",
    cols: ["Day", "Time", "Subject", "Room", "Group"],
    rows: [
      ["Mon", "09:00", "Calculus II", "A-201", "INF-301"],
      ["Wed", "11:00", "Algorithms", "B-105", "INF-301"],
    ],
  },
  {
    file: "calendar.html",
    title: "Academic Calendar",
    cols: ["Event", "Date", "Type"],
    rows: [
      ["Fall Semester Start", "Sep 1, 2025", "Academic"],
      ["Midterm Exams", "Oct 20, 2025", "Exam"],
    ],
  },
  {
    file: "announcements.html",
    title: "Announcements",
    cols: ["Title", "Date", "Category", "Status"],
    rows: [
      ["Semester Registration Open", "May 12, 2025", "Academic", "Published"],
      ["Exam Schedule Published", "May 10, 2025", "Exams", "Published"],
    ],
  },
  {
    file: "reports.html",
    title: "Reports & Analytics",
    cols: ["Report", "Generated", "Format"],
    rows: [
      ["Enrollment Summary", "May 28, 2025", "PDF"],
      ["Faculty Performance", "May 27, 2025", "XLSX"],
    ],
  },
  {
    file: "settings.html",
    title: "System Settings",
    cols: ["Setting", "Value", "Category"],
    rows: [
      ["Academic Year", "2025-2026", "General"],
      ["Session Timeout", "30 min", "Security"],
    ],
  },
];

function sidebar(active) {
  return nav
    .map(
      ([href, label]) =>
        `<a href="${href}"${href === active ? ' class="is-active"' : ""}>${label}</a>`
    )
    .join("\n        ");
}

function table(cols, rows) {
  const head = cols.map((c) => `<th>${c}</th>`).join("");
  const body = rows
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
    .join("");
  return `<table class="data-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function page(p) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.title} — QazTU Admin</title>
  <link rel="stylesheet" href="../css/base.css">
  <link rel="stylesheet" href="../css/dashboard.css">
</head>
<body data-require-role="admin">
  <div class="app-layout">
    <aside class="sidebar">
      <div class="sidebar-brand"><div class="sidebar-logo">Q</div><span>QazTU</span></div>
      <nav class="sidebar-nav">
        ${sidebar(p.file)}
      </nav>
      <div class="sidebar-footer"><button type="button" data-logout data-i18n="logout">Log out</button></div>
    </aside>
    <div class="sidebar-overlay"></div>
    <div class="main-wrap">
      <header class="top-header">
        <div class="header-left">
          <button type="button" class="menu-toggle" aria-label="Menu"><svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg></button>
          <h1 class="page-title">${p.title}</h1>
        </div>
        <div class="header-right">
          <select id="headerLang" class="lang-select"><option value="en">EN</option><option value="ru">RU</option><option value="kz">KZ</option></select>
          <div class="user-menu">
            <div class="user-trigger" data-dropdown>
              <img src="https://i.pravatar.cc/150?u=askar" alt="" class="user-avatar" width="40" height="40">
              <div class="user-info"><span class="name" data-user-name>Askar Bekmukhanov</span><span class="role" data-user-role>System Administrator</span></div>
            </div>
            <div class="dropdown"><a href="settings.html">Profile</a><button type="button" data-logout>Log out</button></div>
          </div>
        </div>
      </header>
      <main class="main-content">
        <div class="demo-banner">Demo mode — data is for display only.</div>
        <div class="page-toolbar">
          <h2>${p.title}</h2>
          <button type="button" class="btn btn-primary" id="addRecordBtn">+ Add New</button>
        </div>
        <div class="card">${table(p.cols, p.rows)}</div>
        <form id="addRecordForm" class="sr-only"><input name="dummy" required></form>
      </main>
    </div>
  </div>
  <script src="../js/auth.js"></script>
  <script src="../js/page-guard.js"></script>
  <script src="../js/i18n.js"></script>
  <script src="../js/nav.js"></script>
  <script src="../js/ui.js"></script>
</body>
</html>`;
}

const outDir = path.join(__dirname, "..", "admin");
pages.forEach((p) => {
  fs.writeFileSync(path.join(outDir, p.file), page(p), "utf8");
  console.log("Wrote", p.file);
});
