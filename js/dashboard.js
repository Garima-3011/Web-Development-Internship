document.addEventListener("DOMContentLoaded", () => {
  const session = initLayout("dashboard");
  if (!session) return;

  const k = PulseData.kpis;

  document.getElementById("kpiStudents").textContent = formatNumber(k.totalStudents.value);
  document.getElementById("kpiStudentsDelta").textContent = `+${k.totalStudents.delta}% vs last month`;
  document.getElementById("kpiStudentsDelta").className = `kpi-delta ${k.totalStudents.direction}`;

  document.getElementById("kpiCourses").textContent = formatNumber(k.activeCourses.value);
  document.getElementById("kpiCoursesDelta").textContent = `+${k.activeCourses.delta} new tracks`;
  document.getElementById("kpiCoursesDelta").className = `kpi-delta ${k.activeCourses.direction}`;

  document.getElementById("kpiProjects").textContent = formatNumber(k.completedProjects.value);
  document.getElementById("kpiProjectsDelta").textContent = `+${k.completedProjects.delta}% vs last month`;
  document.getElementById("kpiProjectsDelta").className = `kpi-delta ${k.completedProjects.direction}`;

  document.getElementById("kpiPlacements").textContent = formatNumber(k.internshipPlacements.value);
  document.getElementById("kpiPlacementsDelta").textContent = `+${k.internshipPlacements.delta}% vs last quarter`;
  document.getElementById("kpiPlacementsDelta").className = `kpi-delta ${k.internshipPlacements.direction}`;

  setTimeout(() => {
    createWeeklyProgressChart("progressChart", "30d");
    createCoursePopularityChart("popularityChart");
  }, 350);

  renderActivityFeed("activityFeed");
  renderDeadlines("deadlineList");
  renderEnrollments("enrollmentList");
});
