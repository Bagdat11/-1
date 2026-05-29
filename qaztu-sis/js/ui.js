function showModal(title, message) {
  let overlay = document.getElementById("globalModal");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "globalModal";
    overlay.className = "modal-overlay";
    overlay.innerHTML = `
      <div class="modal" role="dialog">
        <h3 id="modalTitle"></h3>
        <p id="modalMessage"></p>
        <div class="modal-actions">
          <button type="button" class="btn btn-primary" id="modalClose">OK</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector("#modalClose").addEventListener("click", () => {
      overlay.classList.remove("is-open");
    });
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.remove("is-open");
    });
  }
  overlay.querySelector("#modalTitle").textContent = title;
  overlay.querySelector("#modalMessage").textContent = message;
  overlay.classList.add("is-open");
}

function initPasswordToggle() {
  document.querySelectorAll(".toggle-password").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.closest(".input-wrap")?.querySelector("input");
      if (!input) return;
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      btn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
    });
  });
}

function initDropdowns() {
  document.querySelectorAll("[data-dropdown]").forEach((trigger) => {
    const menu = trigger.parentElement?.querySelector(".dropdown");
    if (!menu) return;
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".dropdown.is-open").forEach((d) => {
        if (d !== menu) d.classList.remove("is-open");
      });
      menu.classList.toggle("is-open");
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown.is-open").forEach((d) => d.classList.remove("is-open"));
  });
}

function initDemoButtons() {
  document.querySelectorAll("[data-demo]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      showModal("QazTU SIS", typeof t === "function" ? t("demoMsg") : "Demo mode only.");
    });
  });

  const forgot = document.getElementById("forgotPassword");
  if (forgot) {
    forgot.addEventListener("click", (e) => {
      e.preventDefault();
      showModal(
        "Password Reset",
        typeof t === "function" ? t("forgotMsg") : "Reset link would be sent to your email."
      );
    });
  }

  const itSupport = document.getElementById("itSupport");
  if (itSupport) {
    itSupport.addEventListener("click", (e) => {
      e.preventDefault();
      showModal("IT Support", "Email: support@qaztu.edu.kz | Phone: +7 (727) 000-00-00");
    });
  }
}

function initAddModal() {
  const addBtn = document.getElementById("addRecordBtn");
  const form = document.getElementById("addRecordForm");
  if (!addBtn || !form) return;

  addBtn.addEventListener("click", () => showModal("Add Record", "Form submitted successfully (demo)."));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    showModal("Success", "Record saved in demo mode.");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initPasswordToggle();
  initDropdowns();
  initDemoButtons();
  initAddModal();
});
