const PulseData = {
  kpis: {
    totalStudents: { value: 2486, delta: 14.2, direction: "up" },
    activeCourses: { value: 18, delta: 2, direction: "up" },
    completedProjects: { value: 934, delta: 11.5, direction: "up" },
    internshipPlacements: { value: 312, delta: 9.8, direction: "up" },
  },

  weeklyProgress: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: {
      "30d": [62, 70, 68, 75, 82, 58, 45],
      "90d": [55, 60, 64, 70, 74, 50, 42],
      "12m": [48, 52, 58, 65, 72, 46, 38],
    },
  },

  // kept for analytics range compatibility
  revenueTrend: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: {
      "30d": [62, 70, 68, 75, 82, 58, 45],
      "90d": [55, 60, 64, 70, 74, 50, 42],
      "12m": [48, 52, 58, 65, 72, 46, 38],
    },
  },

  coursePopularity: {
    labels: ["Web Dev", "Data Basics", "UI Design", "Python", "SQL", "React"],
    enrollments: [420, 310, 265, 240, 198, 176],
  },

  channelSplit: {
    labels: ["College referral", "Instagram", "WhatsApp", "Campus fest", "Email"],
    data: [32, 24, 18, 16, 10],
  },

  monthlyComparison: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    signups: [180, 210, 195, 250, 280, 320],
    conversions: [42, 58, 51, 72, 88, 104],
  },

  engagement: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    dau: [420, 460, 490, 475, 520, 310, 280],
    sessions: [890, 940, 1010, 980, 1100, 620, 540],
  },

  funnel: {
    labels: ["Visitors", "Roadmap signup", "Started sprint", "Placed"],
    data: [5200, 2100, 1180, 312],
  },

  activity: [
    { title: "Ananya completed Web Dev Day 18", detail: "Portfolio project submitted for review", time: "12 min ago", type: "success" },
    { title: "New enrollment — Data Basics", detail: "Rohit K. joined the 30-day sprint", time: "35 min ago", type: "info" },
    { title: "Mentor feedback pending", detail: "3 UI Design projects await review", time: "1 hr ago", type: "warning" },
    { title: "Internship offer logged", detail: "Mira S. placed at Harbor Soft", time: "2 hr ago", type: "success" },
    { title: "Deadline approaching", detail: "React sprint milestone due tomorrow", time: "4 hr ago", type: "danger" },
    { title: "Campus batch started", detail: "42 BCA students from City College", time: "Yesterday", type: "info" },
  ],

  deadlines: [
    { title: "Web Dev — Capstone review", course: "Web Development", due: "Tomorrow", priority: "high" },
    { title: "UI Design — Wireframe critique", course: "UI Design", due: "Wed", priority: "medium" },
    { title: "Data Basics — Quiz 3", course: "Data Basics", due: "Fri", priority: "medium" },
    { title: "Python — Mini project submit", course: "Python", due: "Mon", priority: "low" },
    { title: "Internship mock interviews", course: "Career Prep", due: "Next week", priority: "high" },
  ],

  recentEnrollments: [
    { name: "Rohit Kapoor", track: "Data Basics", when: "35 min ago" },
    { name: "Sneha Patel", track: "Web Development", when: "1 hr ago" },
    { name: "Arjun Mehta", track: "UI Design", when: "2 hr ago" },
    { name: "Kavya Nair", track: "React", when: "3 hr ago" },
    { name: "Devansh Gupta", track: "Python", when: "5 hr ago" },
    { name: "Ishita Bose", track: "SQL", when: "Yesterday" },
  ],

  customers: [
    { id: "S-1001", name: "Ananya Reddy", email: "ananya@college.edu", plan: "Web Dev", status: "active", mrr: 18, joined: "2026-01-12" },
    { id: "S-1002", name: "Rohit Kapoor", email: "rohit.k@uni.edu", plan: "Data Basics", status: "active", mrr: 12, joined: "2026-06-03" },
    { id: "S-1003", name: "Mira Sharma", email: "mira.s@mail.com", plan: "UI Design", status: "placed", mrr: 0, joined: "2025-11-03" },
    { id: "S-1004", name: "Kabir Singh", email: "kabir@city.edu", plan: "Python", status: "active", mrr: 15, joined: "2026-03-22" },
    { id: "S-1005", name: "Sneha Patel", email: "sneha.p@college.edu", plan: "Web Dev", status: "trial", mrr: 0, joined: "2026-07-01" },
    { id: "S-1006", name: "Arjun Mehta", email: "arjun@mail.com", plan: "UI Design", status: "active", mrr: 12, joined: "2026-04-18" },
    { id: "S-1007", name: "Kavya Nair", email: "kavya.n@uni.edu", plan: "React", status: "paused", mrr: 0, joined: "2025-12-05" },
    { id: "S-1008", name: "Devansh Gupta", email: "devansh@college.edu", plan: "Python", status: "active", mrr: 15, joined: "2026-02-27" },
    { id: "S-1009", name: "Ishita Bose", email: "ishita@mail.com", plan: "SQL", status: "trial", mrr: 0, joined: "2026-07-10" },
    { id: "S-1010", name: "Vikram Rao", email: "vikram@city.edu", plan: "Web Dev", status: "placed", mrr: 0, joined: "2025-08-17" },
    { id: "S-1011", name: "Neha Joshi", email: "neha.j@uni.edu", plan: "Data Basics", status: "active", mrr: 12, joined: "2026-05-09" },
    { id: "S-1012", name: "Aditya Verma", email: "aditya@college.edu", plan: "React", status: "active", mrr: 18, joined: "2026-01-30" },
    { id: "S-1013", name: "Pooja Iyer", email: "pooja@mail.com", plan: "UI Design", status: "churned", mrr: 0, joined: "2025-02-14" },
    { id: "S-1014", name: "Sahil Khan", email: "sahil.k@uni.edu", plan: "SQL", status: "active", mrr: 10, joined: "2026-03-11" },
    { id: "S-1015", name: "Riya Das", email: "riya.d@college.edu", plan: "Web Dev", status: "paused", mrr: 0, joined: "2025-09-30" },
    { id: "S-1016", name: "Harsh Malhotra", email: "harsh@city.edu", plan: "Python", status: "placed", mrr: 0, joined: "2025-10-21" },
  ],
};

function formatNumber(n) {
  return new Intl.NumberFormat("en-IN").format(n);
}

function formatCurrency(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatPercent(n) {
  return `${n}%`;
}
