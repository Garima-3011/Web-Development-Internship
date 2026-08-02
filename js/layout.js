function initLayout(activePage) {
  const session = requireAuth();
  if (!session) return null;

  const nameEl = document.getElementById("userName");
  const emailEl = document.getElementById("userEmail");
  const avatarEl = document.getElementById("userAvatar");

  if (nameEl) nameEl.textContent = session.name;
  if (emailEl) emailEl.textContent = session.email;
  if (avatarEl) avatarEl.textContent = getInitials(session.name);

  document.querySelectorAll(".nav-link[data-page]").forEach((link) => {
    if (link.dataset.page === activePage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  function closeSidebar() {
    sidebar?.classList.remove("open");
    overlay?.classList.remove("visible");
  }

  function openSidebar() {
    sidebar?.classList.add("open");
    overlay?.classList.add("visible");
  }

  menuToggle?.addEventListener("click", () => {
    if (sidebar?.classList.contains("open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  overlay?.addEventListener("click", closeSidebar);

  document.getElementById("logoutBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeSidebar();
  });

  return session;
}

function renderActivityFeed(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = PulseData.activity
    .map(
      (item) => `
      <li class="activity-item">
        <span class="activity-dot ${item.type}" aria-hidden="true"></span>
        <div class="activity-body">
          <strong>${item.title}</strong>
          <span>${item.detail} · ${item.time}</span>
        </div>
      </li>
    `
    )
    .join("");
}

function renderDeadlines(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = PulseData.deadlines
    .map(
      (d) => `
      <li class="list-row">
        <div>
          <strong>${d.title}</strong>
          <span class="text-muted">${d.course}</span>
        </div>
        <span class="badge badge-${d.priority === "high" ? "danger" : d.priority === "medium" ? "warning" : "info"}">${d.due}</span>
      </li>
    `
    )
    .join("");
}

function renderEnrollments(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = PulseData.recentEnrollments
    .map(
      (e) => `
      <li class="list-row">
        <div>
          <strong>${e.name}</strong>
          <span class="text-muted">${e.track}</span>
        </div>
        <span class="text-muted" style="font-size:0.8rem;white-space:nowrap">${e.when}</span>
      </li>
    `
    )
    .join("");
}
