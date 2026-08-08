document.addEventListener("DOMContentLoaded", () => {
  const session = initLayout("settings");
  if (!session) return;

  const nameInput = document.getElementById("profileName");
  const emailInput = document.getElementById("profileEmail");
  const roleInput = document.getElementById("profileRole");
  const themeToggle = document.getElementById("themeToggle");
  const form = document.getElementById("profileForm");
  const alertBox = document.getElementById("settingsAlert");

  nameInput.value = session.name || "";
  emailInput.value = session.email || "";
  roleInput.value = session.role || "User";

  const currentTheme = localStorage.getItem("skillsprint_theme") || "light";
  themeToggle.checked = currentTheme === "dark" || currentTheme === "contrast";

  themeToggle?.addEventListener("change", () => {
    applyTheme(themeToggle.checked ? "dark" : "light");
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const result = updateProfile({
      name: nameInput.value,
      email: emailInput.value,
    });

    if (!result.ok) {
      showAlert(result.error || "Could not save profile.", "error");
      return;
    }

    const nameEl = document.getElementById("userName");
    const emailEl = document.getElementById("userEmail");
    const avatarEl = document.getElementById("userAvatar");
    if (nameEl) nameEl.textContent = result.session.name;
    if (emailEl) emailEl.textContent = result.session.email;
    if (avatarEl) avatarEl.textContent = getInitials(result.session.name);

    showAlert("Profile saved to your local session.", "success");
  });

  document.getElementById("resetDemo")?.addEventListener("click", () => {
    if (!confirm("Clear session and return to login?")) return;
    logout();
  });

  function showAlert(message, type) {
    if (!alertBox) return;
    alertBox.className = `alert alert-${type === "error" ? "error" : "success"}`;
    alertBox.textContent = message;
    alertBox.classList.remove("hidden");
    setTimeout(() => alertBox.classList.add("hidden"), 3500);
  }
});
