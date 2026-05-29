const fs = require("fs");
const path = require("path");

function rolePage(role, config) {
  const { folder, requireRole, dashboardTitle, nav, pages, dashboardBody } = config;
  const base = `../`;

  function sidebar(active) {
    return nav
      .map(
        ([href, label]) =>
          `<a href="${href}"${href === active ? ' class="is-active"' : ""}>${label}</a>`
      )
      .join("\n        ");
  }

  function shell(p, content) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.title} — QazTU</title>
  <link rel="stylesheet" href="${base}css/base.css">
  <link rel="stylesheet" href="${base}css/dashboard.css">
</head>
<body data-require-role="${requireRole}">
  <div class="app-layout">
    <aside class="sidebar">
      <div class="sidebar-brand"><div class="sidebar-logo">Q</div><span>QazTU</span></div>
      <nav class="sidebar-nav">${sidebar(p.file)}</nav>
      <div class="sidebar-footer"><button type="button" data-logout data-i18n="logout">Log out</button></div>
    </aside>
    <div class="sidebar-overlay"></div>
    <div class="main-wrap">
      <header class="top-header">
        <div class="header-left">
          <button type="button" class="menu-toggle" aria-label="Menu"><svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg></button>
          <h1 class="page-title" data-i18n="${p.i18n || ""}">${p.title}</h1>
        </div>
        <div class="header-right">
          <select id="headerLang" class="lang-select"><option value="en">EN</option><option value="ru">RU</option><option value="kz">KZ</option></select>
          <div class="user-menu">
            <div class="user-trigger" data-dropdown>
              <img src="https://i.pravatar.cc/150?u=${role}" alt="" class="user-avatar" width="40" height="40">
              <div class="user-info"><span class="name" data-user-name>Name</span><span class="role" data-user-role>Role</span></div>
            </div>
            <div class="dropdown"><a href="profile.html">Profile</a><button type="button" data-logout>Log out</button></div>
          </div>
        </div>
      </header>
      <main class="main-content">${content}</main>
    </div>
  </div>
  <script src="${base}js/auth.js"></script>
  <script src="${base}js/page-guard.js"></script>
  <script src="${base}js/i18n.js"></script>
  <script src="${base}js/nav.js"></script>
  <script src="${base}js/ui.js"></script>
</body>
</html>`;
  }

  function tablePage(p) {
    const head = p.cols.map((c) => `<th>${c}</th>`).join("");
    const body = p.rows
      .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
      .join("");
    const content = `
        <div class="demo-banner">Demo mode — data is for display only.</div>
        <div class="page-toolbar"><h2>${p.title}</h2><button type="button" class="btn btn-primary" id="addRecordBtn">+ Add</button></div>
        <div class="card"><table class="data-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>
        <form id="addRecordForm" class="sr-only"><input name="dummy" required></form>`;
    return shell(p, content);
  }

  const outDir = path.join(__dirname, "..", folder);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const dash = {
    file: "dashboard.html",
    title: dashboardTitle,
    i18n:
      role === "student"
        ? "studentDashboard"
        : role === "teacher"
          ? "teacherDashboard"
          : "",
  };
  fs.writeFileSync(path.join(outDir, dash.file), shell(dash, dashboardBody), "utf8");

  pages.forEach((p) => {
    if (p.file === "dashboard.html") return;
    fs.writeFileSync(path.join(outDir, p.file), tablePage(p), "utf8");
  });
  console.log("Generated", folder);
}

const studentDash = `
        <div class="stats-grid" style="grid-template-columns: repeat(4, 1fr);">
          <div class="stat-card"><div class="stat-icon blue"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13"/></svg></div><div class="stat-value">6</div><div class="stat-label">Active Courses</div></div>
          <div class="stat-card"><div class="stat-icon green"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><div class="stat-value">3.8</div><div class="stat-label">Current GPA</div></div>
          <div class="stat-card"><div class="stat-icon yellow"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><div class="stat-value">2</div><div class="stat-label">Pending Assignments</div></div>
          <div class="stat-card"><div class="stat-icon purple"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div><div class="stat-value">24</div><div class="stat-label">Credits This Semester</div></div>
        </div>
        <div class="bottom-row" style="grid-template-columns: 1fr 1fr;">
          <div class="card"><div class="card-header"><h3>Today's Schedule</h3><a href="schedule.html">View all</a></div>
            <ul class="announce-list"><li><div class="announce-icon blue"></div><div class="announce-body"><h4>Calculus II</h4><p>09:00 · Room A-201</p></div></li>
            <li><div class="announce-icon green"></div><div class="announce-body"><h4>Algorithms</h4><p>11:00 · Room B-105</p></div></li></ul>
          </div>
          <div class="card"><div class="card-header"><h3>Quick Actions</h3></div>
            <div class="quick-actions" style="grid-template-columns: repeat(2, 1fr);">
              <a href="courses.html" class="quick-action-btn qa-blue"><span class="qa-icon"></span>My Courses</a>
              <a href="grades.html" class="quick-action-btn qa-green"><span class="qa-icon"></span>View Grades</a>
              <a href="schedule.html" class="quick-action-btn qa-purple"><span class="qa-icon"></span>Schedule</a>
              <a href="announcements.html" class="quick-action-btn qa-orange"><span class="qa-icon"></span>Announcements</a>
            </div>
          </div>
        </div>`;

const teacherDash = `
        <div class="stats-grid" style="grid-template-columns: repeat(4, 1fr);">
          <div class="stat-card"><div class="stat-value">4</div><div class="stat-label">My Classes</div></div>
          <div class="stat-card"><div class="stat-value">128</div><div class="stat-label">Students</div></div>
          <div class="stat-card"><div class="stat-value">12</div><div class="stat-label">Pending Grades</div></div>
          <div class="stat-card"><div class="stat-value">3</div><div class="stat-label">Today's Lectures</div></div>
        </div>
        <div class="bottom-row" style="grid-template-columns: 1fr 1fr;">
          <div class="card"><div class="card-header"><h3>Recent Submissions</h3><a href="grades.html">View all</a></div>
            <ul class="activity-list"><li><div class="activity-avatar" style="background:#2563eb">AS</div><div class="activity-body"><p>Aibek Seitkali — Calculus II homework</p><div class="activity-time">10 min ago</div></div></li></ul>
          </div>
          <div class="card"><div class="card-header"><h3>Quick Actions</h3></div>
            <div class="quick-actions" style="grid-template-columns: repeat(2, 1fr);">
              <a href="classes.html" class="quick-action-btn qa-blue"><span class="qa-icon"></span>My Classes</a>
              <a href="grades.html" class="quick-action-btn qa-green"><span class="qa-icon"></span>Enter Grades</a>
              <a href="students.html" class="quick-action-btn qa-purple"><span class="qa-icon"></span>Students</a>
              <a href="announcements.html" class="quick-action-btn qa-orange"><span class="qa-icon"></span>Announcements</a>
            </div>
          </div>
        </div>`;

rolePage("student", {
  folder: "student",
  requireRole: "student",
  dashboardTitle: "Student Dashboard",
  nav: [
    ["dashboard.html", "Dashboard"],
    ["courses.html", "My Courses"],
    ["grades.html", "Grades"],
    ["schedule.html", "Schedule"],
    ["announcements.html", "Announcements"],
    ["profile.html", "Profile"],
  ],
  dashboardBody: studentDash,
  pages: [
    { file: "dashboard.html", title: "Student Dashboard" },
    {
      file: "courses.html",
      title: "My Courses",
      cols: ["Code", "Name", "Credits", "Instructor"],
      rows: [
        ["CS301", "Algorithms", "4", "G. Bekturova"],
        ["MATH201", "Calculus II", "5", "M. Kassymov"],
      ],
    },
    {
      file: "grades.html",
      title: "Grades",
      cols: ["Course", "Midterm", "Final", "Grade"],
      rows: [
        ["Algorithms", "85", "—", "A-"],
        ["Calculus II", "78", "—", "B+"],
      ],
    },
    {
      file: "schedule.html",
      title: "Schedule",
      cols: ["Day", "Time", "Course", "Room"],
      rows: [
        ["Mon", "09:00", "Calculus II", "A-201"],
        ["Wed", "11:00", "Algorithms", "B-105"],
      ],
    },
    {
      file: "announcements.html",
      title: "Announcements",
      cols: ["Title", "Date"],
      rows: [["Semester Registration Open", "May 12, 2025"]],
    },
    {
      file: "profile.html",
      title: "Profile",
      cols: ["Field", "Value"],
      rows: [
        ["Name", "Aibek Seitkali"],
        ["Group", "INF-301"],
        ["Faculty", "IT & CS"],
      ],
    },
  ],
});

rolePage("teacher", {
  folder: "teacher",
  requireRole: "teacher",
  dashboardTitle: "Teacher Dashboard",
  nav: [
    ["dashboard.html", "Dashboard"],
    ["classes.html", "My Classes"],
    ["students.html", "Students"],
    ["grades.html", "Grades"],
    ["schedule.html", "Schedule"],
    ["announcements.html", "Announcements"],
  ],
  dashboardBody: teacherDash,
  pages: [
    { file: "dashboard.html", title: "Teacher Dashboard" },
    {
      file: "classes.html",
      title: "My Classes",
      cols: ["Code", "Name", "Group", "Students"],
      rows: [
        ["CS301", "Algorithms", "INF-301", "32"],
        ["CS302", "Data Structures", "INF-302", "28"],
      ],
    },
    {
      file: "students.html",
      title: "Students",
      cols: ["ID", "Name", "Group", "Status"],
      rows: [["1001", "Aibek Seitkali", "INF-301", "Active"]],
    },
    {
      file: "grades.html",
      title: "Grades",
      cols: ["Student", "Assignment", "Score"],
      rows: [["Aibek Seitkali", "Homework 3", "92/100"]],
    },
    {
      file: "schedule.html",
      title: "Schedule",
      cols: ["Day", "Time", "Class", "Room"],
      rows: [["Mon", "11:00", "Algorithms INF-301", "B-105"]],
    },
    {
      file: "announcements.html",
      title: "Announcements",
      cols: ["Title", "Date"],
      rows: [["Office hours update", "May 11, 2025"]],
    },
  ],
});
