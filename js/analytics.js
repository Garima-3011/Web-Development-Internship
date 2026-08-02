document.addEventListener("DOMContentLoaded", () => {
  const session = initLayout("analytics");
  if (!session) return;

  let progressChart = null;

  setTimeout(() => {
    progressChart = createWeeklyProgressChart("analyticsProgressChart", "30d");
    createComparisonChart("comparisonChart");
    createEngagementChart("engagementChart");
    createFunnelChart("funnelChart");
    createChannelChart("channelChart");
  }, 350);

  const rangeSelect = document.getElementById("dateRange");
  rangeSelect?.addEventListener("change", () => {
    const range = rangeSelect.value;
    if (progressChart) progressChart.destroy();
    progressChart = createWeeklyProgressChart("analyticsProgressChart", range);

    const note = document.getElementById("rangeNote");
    if (note) {
      const labels = { "30d": "this week pattern (30d avg)", "90d": "90-day average pattern", "12m": "12-month average pattern" };
      note.textContent = `Showing ${labels[range] || range} of mock learning progress.`;
    }
  });
});
