document.addEventListener("DOMContentLoaded", () => {
  const session = initLayout("students");
  if (!session) return;

  const state = {
    query: "",
    status: "all",
    sortKey: "name",
    sortDir: "asc",
    page: 1,
    pageSize: 8,
  };

  const searchInput = document.getElementById("studentSearch");
  const statusFilter = document.getElementById("statusFilter");
  const tbody = document.getElementById("studentsBody");
  const emptyState = document.getElementById("studentsEmpty");
  const tableWrap = document.getElementById("studentsTableWrap");
  const pageInfo = document.getElementById("pageInfo");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");

  function getFiltered() {
    let rows = [...PulseData.customers];

    if (state.status !== "all") {
      rows = rows.filter((r) => r.status === state.status);
    }

    if (state.query) {
      const q = state.query.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          r.plan.toLowerCase().includes(q)
      );
    }

    rows.sort((a, b) => {
      let av = a[state.sortKey];
      let bv = b[state.sortKey];
      if (typeof av === "string") av = av.toLowerCase();
      if (typeof bv === "string") bv = bv.toLowerCase();
      if (av < bv) return state.sortDir === "asc" ? -1 : 1;
      if (av > bv) return state.sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return rows;
  }

  function badgeClass(status) {
    const map = {
      active: "badge-active",
      trial: "badge-trial",
      paused: "badge-paused",
      churned: "badge-churned",
      placed: "badge-placed",
    };
    return `badge ${map[status] || "badge-trial"}`;
  }

  function render() {
    const filtered = getFiltered();
    const totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;

    const start = (state.page - 1) * state.pageSize;
    const pageRows = filtered.slice(start, start + state.pageSize);

    if (filtered.length === 0) {
      tableWrap?.classList.add("hidden");
      emptyState?.classList.remove("hidden");
      pageInfo.textContent = "No students found";
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    tableWrap?.classList.remove("hidden");
    emptyState?.classList.add("hidden");

    tbody.innerHTML = pageRows
      .map(
        (r) => `
      <tr>
        <td>${r.id}</td>
        <td><strong>${r.name}</strong></td>
        <td>${r.email}</td>
        <td>${r.plan}</td>
        <td><span class="${badgeClass(r.status)}">${r.status}</span></td>
        <td>${r.mrr ? r.mrr + " days" : "—"}</td>
        <td>${r.joined}</td>
      </tr>
    `
      )
      .join("");

    const from = start + 1;
    const to = start + pageRows.length;
    pageInfo.textContent = `Showing ${from}–${to} of ${filtered.length}`;
    prevBtn.disabled = state.page <= 1;
    nextBtn.disabled = state.page >= totalPages;

    document.querySelectorAll(".data-table th[data-sort]").forEach((th) => {
      const indicator = th.querySelector(".sort-indicator");
      if (!indicator) return;
      if (th.dataset.sort === state.sortKey) {
        indicator.textContent = state.sortDir === "asc" ? "↑" : "↓";
      } else {
        indicator.textContent = "";
      }
    });
  }

  searchInput?.addEventListener("input", () => {
    state.query = searchInput.value.trim();
    state.page = 1;
    render();
  });

  statusFilter?.addEventListener("change", () => {
    state.status = statusFilter.value;
    state.page = 1;
    render();
  });

  document.querySelectorAll(".data-table th[data-sort]").forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.dataset.sort;
      if (state.sortKey === key) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        state.sortKey = key;
        state.sortDir = "asc";
      }
      render();
    });
  });

  prevBtn?.addEventListener("click", () => {
    if (state.page > 1) {
      state.page -= 1;
      render();
    }
  });

  nextBtn?.addEventListener("click", () => {
    state.page += 1;
    render();
  });

  render();
});
