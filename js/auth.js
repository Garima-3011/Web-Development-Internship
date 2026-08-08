const SESSION_KEY = "skillsprint_session";
const THEME_KEY = "skillsprint_theme";
const REMEMBER_KEY = "skillsprint_remember";

const DEMO_USERS = [
  {
    email: "admin@skillsprint.edu",
    password: "admin123",
    name: "Admin Mentor",
    role: "Administrator",
  },
  {
    email: "mentor@skillsprint.edu",
    password: "mentor123",
    name: "Priya Sharma",
    role: "Mentor",
  },
];

function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function isAuthenticated() {
  const session = getSession();
  return Boolean(session && session.email && session.loggedInAt);
}

function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = "index.html";
    return null;
  }
  return getSession();
}

function redirectIfAuthenticated() {
  if (isAuthenticated()) {
    window.location.href = "dashboard.html";
  }
}

function login(email, password, remember) {
  const normalized = email.trim().toLowerCase();
  const user = DEMO_USERS.find(
    (u) => u.email === normalized && u.password === password
  );

  if (!user) {
    return { ok: false, error: "Invalid email or password. Try the demo credentials." };
  }

  const session = {
    name: user.name,
    email: user.email,
    role: user.role,
    loggedInAt: new Date().toISOString(),
  };

  setSession(session);

  if (remember) {
    localStorage.setItem(REMEMBER_KEY, normalized);
  } else {
    localStorage.removeItem(REMEMBER_KEY);
  }

  return { ok: true, session };
}

function logout() {
  clearSession();
  window.location.href = "index.html";
}

function updateProfile({ name, email }) {
  const session = getSession();
  if (!session) return { ok: false, error: "Not logged in." };

  const next = {
    ...session,
    name: name.trim() || session.name,
    email: email.trim() || session.email,
  };
  setSession(next);
  return { ok: true, session: next };
}

function getRememberedEmail() {
  return localStorage.getItem(REMEMBER_KEY) || "";
}

function applyTheme(theme) {
  // Migrate legacy "contrast" preference to dark mode
  let value = theme === "dark" || theme === "contrast" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", value);
  localStorage.setItem(THEME_KEY, value);
  return value;
}

function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY) || "light";
  return applyTheme(saved);
}

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || "")
    .join("");
}

loadTheme();
