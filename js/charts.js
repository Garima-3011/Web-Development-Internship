const ChartTheme = {
  primary: "#0c6e72",
  primarySoft: "rgba(12, 110, 114, 0.15)",
  accent: "#c45c26",
  info: "#0369a1",
  warning: "#b45309",
  success: "#0f766e",
  muted: "#94a3b8",
  grid: "#dce8ee",
  text: "#3a4a57",
  palette: ["#0c6e72", "#0369a1", "#c45c26", "#0f766e", "#7c6f64"],
};

Chart.defaults.font.family = "'Sora', system-ui, sans-serif";
Chart.defaults.color = ChartTheme.text;
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.boxWidth = 8;
Chart.defaults.plugins.legend.labels.padding = 16;

function hideSkeleton(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("hidden");
}

function createWeeklyProgressChart(canvasId, rangeKey = "30d") {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const labels = PulseData.weeklyProgress.labels;
  const data = PulseData.weeklyProgress.datasets[rangeKey] || PulseData.weeklyProgress.datasets["30d"];

  hideSkeleton(`${canvasId}-skeleton`);

  return new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Avg. completion %",
          data,
          borderColor: ChartTheme.primary,
          backgroundColor: ChartTheme.primarySoft,
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2.5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (c) => ` ${c.parsed.y}% completed`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
        },
        y: {
          beginAtZero: true,
          max: 100,
          grid: { color: ChartTheme.grid },
          border: { display: false },
          ticks: {
            callback: (v) => `${v}%`,
          },
        },
      },
    },
  });
}

/** Alias used by analytics date-range refresh */
function createRevenueChart(canvasId, rangeKey = "30d") {
  return createWeeklyProgressChart(canvasId, rangeKey);
}

function createCoursePopularityChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  hideSkeleton(`${canvasId}-skeleton`);

  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: PulseData.coursePopularity.labels,
      datasets: [
        {
          label: "Enrollments",
          data: PulseData.coursePopularity.enrollments,
          backgroundColor: ChartTheme.primary,
          borderRadius: 6,
          maxBarThickness: 36,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
        },
        y: {
          beginAtZero: true,
          grid: { color: ChartTheme.grid },
          border: { display: false },
        },
      },
    },
  });
}

function createChannelChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  hideSkeleton(`${canvasId}-skeleton`);

  return new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: PulseData.channelSplit.labels,
      datasets: [
        {
          data: PulseData.channelSplit.data,
          backgroundColor: ChartTheme.palette,
          borderWidth: 0,
          hoverOffset: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "62%",
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
          callbacks: {
            label: (c) => ` ${c.label}: ${c.parsed}%`,
          },
        },
      },
    },
  });
}

function createComparisonChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  hideSkeleton(`${canvasId}-skeleton`);

  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: PulseData.monthlyComparison.labels,
      datasets: [
        {
          label: "New enrollments",
          data: PulseData.monthlyComparison.signups,
          backgroundColor: ChartTheme.primary,
          borderRadius: 6,
          maxBarThickness: 28,
        },
        {
          label: "Projects completed",
          data: PulseData.monthlyComparison.conversions,
          backgroundColor: ChartTheme.accent,
          borderRadius: 6,
          maxBarThickness: 28,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top", align: "end" },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
        },
        y: {
          beginAtZero: true,
          grid: { color: ChartTheme.grid },
          border: { display: false },
        },
      },
    },
  });
}

function createEngagementChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  hideSkeleton(`${canvasId}-skeleton`);

  return new Chart(ctx, {
    type: "line",
    data: {
      labels: PulseData.engagement.labels,
      datasets: [
        {
          label: "Active learners",
          data: PulseData.engagement.dau,
          borderColor: ChartTheme.primary,
          backgroundColor: "transparent",
          tension: 0.3,
          borderWidth: 2.5,
          pointRadius: 3,
        },
        {
          label: "Study sessions",
          data: PulseData.engagement.sessions,
          borderColor: ChartTheme.info,
          backgroundColor: "transparent",
          tension: 0.3,
          borderWidth: 2.5,
          pointRadius: 3,
          borderDash: [5, 4],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { position: "top", align: "end" },
      },
      scales: {
        x: { grid: { display: false }, border: { display: false } },
        y: {
          beginAtZero: true,
          grid: { color: ChartTheme.grid },
          border: { display: false },
        },
      },
    },
  });
}

function createFunnelChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  hideSkeleton(`${canvasId}-skeleton`);

  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: PulseData.funnel.labels,
      datasets: [
        {
          label: "Students",
          data: PulseData.funnel.data,
          backgroundColor: [
            "rgba(12, 110, 114, 0.95)",
            "rgba(12, 110, 114, 0.75)",
            "rgba(12, 110, 114, 0.55)",
            "rgba(12, 110, 114, 0.35)",
          ],
          borderRadius: 8,
          maxBarThickness: 48,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: ChartTheme.grid },
          border: { display: false },
        },
        y: {
          grid: { display: false },
          border: { display: false },
        },
      },
    },
  });
}
