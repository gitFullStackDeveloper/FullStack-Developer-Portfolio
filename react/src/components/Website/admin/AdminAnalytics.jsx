import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import "../../../css/Website/admin/admin.css";
import { useAuth } from "./AuthContext";
import AdminTopBar from "./AdminTopBar";
const AdminAnalytics = () => {
  const { token } = useAuth();
  const [dailyData, setDailyData] = useState(null);
  const [monthlySeries, setMonthlySeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Recent activity
  const [recentServices, setRecentServices] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);

  // Filter state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [interval, setInterval] = useState("day");

  // Fetch analytics + recent data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const headers = { Authorization: `Bearer ${token}` };
        const params = new URLSearchParams();
        if (startDate) params.append("start_date", startDate);
        if (endDate) params.append("end_date", endDate);
        params.append("interval", interval);

        const dailyRes = await fetch(
          `/api/analytics/summary?${params.toString()}`,
          { headers },
        );
        if (!dailyRes.ok) throw new Error("Failed to load analytics");
        const dailyJson = await dailyRes.json();
        setDailyData(dailyJson);

        const monthlyParams = new URLSearchParams();
        if (startDate) monthlyParams.append("start_date", startDate);
        if (endDate) monthlyParams.append("end_date", endDate);
        monthlyParams.append("interval", "month");
        const monthlyRes = await fetch(
          `/api/analytics/summary?${monthlyParams.toString()}`,
          { headers },
        );
        const monthlyJson = await monthlyRes.json();
        setMonthlySeries(monthlyJson.time_series || []);

        const [svcRes, projRes, conRes] = await Promise.all([
          fetch(`${window.API_BASE}/api/services/`, { headers }),
          fetch(`${window.API_BASE}/api/projects/`, { headers }),
          fetch(`${window.API_BASE}/api/contacts/`, { headers }),
        ]);
        const services = await svcRes.json();
        const projects = await projRes.json();
        const contacts = await conRes.json();

        setRecentServices(services.slice(0, 4));
        setRecentProjects(projects.slice(0, 4));
        setRecentContacts(contacts.slice(0, 4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchAnalytics();
  }, [token, startDate, endDate, interval]);

  const setLast7Days = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6);
    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
    setInterval("day");
  };

  const setLast30Days = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 29);
    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
    setInterval("day");
  };

  const setThisMonth = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(now.toISOString().split("T")[0]);
    setInterval("day");
  };

  const setThisYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(now.toISOString().split("T")[0]);
    setInterval("month");
  };

  const maxDaily = dailyData?.time_series?.length
    ? Math.max(...dailyData.time_series.map((d) => d.count), 1)
    : 1;
  const maxMonthly = monthlySeries?.length
    ? Math.max(...monthlySeries.map((d) => d.count), 1)
    : 1;
  const maxServiceViews = dailyData?.top_services?.length
    ? Math.max(...dailyData.top_services.map((s) => s.views), 1)
    : 1;
  const maxTopPages = dailyData?.top_pages?.length
    ? Math.max(...dailyData.top_pages.map((p) => p.views), 1)
    : 1;

  const donutColors = [
    "#0891ff",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ef4444",
    "#ec4899",
    "#14b8a6",
    "#f97316",
  ];
  const totalDistribution =
    dailyData?.page_type_distribution?.reduce(
      (acc, item) => acc + item.count,
      0,
    ) || 1;

  return (
    <div className="admin-layout">
      <div className="pfg-bg-shapes">...</div>
      <div className="pfg-grid-lines">...</div>
      <div className="pfg-particles">...</div>
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="admin-main">
        <div className="pfg-container">
          <div className="admin-header-row">
            <div className="admin-title-area">
              <motion.div className="section-badge">
                <motion.span
                  className="badge-dot"
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                Admin Panel
              </motion.div>
              <h2 className="admin-page-title">Analytics Dashboard</h2>
            </div>
            <AdminTopBar />
          </div>

          {loading ? (
            <div className="admin-empty">
              <span className="admin-spinner"></span> Loading analytics...
            </div>
          ) : error ? (
            <div className="admin-empty">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <p>{error}</p>
            </div>
          ) : (
            <>
              {/* Four Stat Cards */}
              <div className="admin-stat-cards">
                <div className="admin-stat-card">
                  <div
                    className="admin-stat-icon"
                    style={{
                      background: "rgba(8,145,255,0.15)",
                      color: "#0891ff",
                    }}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </div>
                  <div>
                    <span className="admin-stat-value">
                      {dailyData.total_views}
                    </span>
                    <span className="admin-stat-label">Total Views</span>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div
                    className="admin-stat-icon"
                    style={{
                      background: "rgba(16,185,129,0.15)",
                      color: "#10b981",
                    }}
                  >
                    <i className="fa-solid fa-chart-simple"></i>
                  </div>
                  <div>
                    <span className="admin-stat-value">
                      {dailyData.avg_views_per_period}
                    </span>
                    <span className="admin-stat-label">
                      Avg Views / {interval === "day" ? "Day" : "Month"}
                    </span>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div
                    className="admin-stat-icon"
                    style={{
                      background: "rgba(245,158,11,0.15)",
                      color: "#f59e0b",
                    }}
                  >
                    <i className="fa-solid fa-briefcase"></i>
                  </div>
                  <div>
                    <span className="admin-stat-value">
                      {dailyData.top_services?.[0]?.title || "—"}
                    </span>
                    <span className="admin-stat-label">Top Service</span>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div
                    className="admin-stat-icon"
                    style={{
                      background: "rgba(139,92,246,0.15)",
                      color: "#8b5cf6",
                    }}
                  >
                    <i className="fa-solid fa-folder-open"></i>
                  </div>
                  <div>
                    <span className="admin-stat-value">
                      {dailyData.top_projects?.[0]?.title || "—"}
                    </span>
                    <span className="admin-stat-label">Top Project</span>
                  </div>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="analytics-filter-bar">
                <div className="filter-group">
                  <label>
                    <i className="fa-solid fa-calendar"></i> Start
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="filter-group">
                  <label>
                    <i className="fa-solid fa-calendar"></i> End
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="filter-group">
                  <label>
                    <i className="fa-solid fa-chart-line"></i> Interval
                  </label>
                  <select
                    value={interval}
                    onChange={(e) => setInterval(e.target.value)}
                  >
                    <option value="day">Daily</option>
                    <option value="month">Monthly</option>
                  </select>
                </div>
                <div className="quick-range-buttons">
                  <button onClick={setLast7Days}>Last 7 days</button>
                  <button onClick={setLast30Days}>Last 30 days</button>
                  <button onClick={setThisMonth}>This Month</button>
                  <button onClick={setThisYear}>This Year</button>
                </div>
              </div>

              <div className="analytics-main-graphs">
                <div className="analytics-chart-card main-graph">
                  <h4>
                    <i className="fa-solid fa-chart-line"></i> Views Over Time (
                    {interval === "day" ? "Daily" : "Monthly"})
                  </h4>
                  <div className="chart-area">
                    <svg
                      viewBox="0 0 600 220"
                      preserveAspectRatio="none"
                      style={{ width: "100%", height: "220px" }}
                    >
                      <defs>
                        <linearGradient
                          id="areaGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#0891ff"
                            stopOpacity="0.4"
                          />
                          <stop
                            offset="100%"
                            stopColor="#0891ff"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                      <polygon
                        fill="url(#areaGradient)"
                        points={`0,220 ${dailyData.time_series.map((point, i) => `${i * (600 / (dailyData.time_series.length - 1 || 1))},${220 - (point.count / maxDaily) * 180}`).join(" ")} 600,220`}
                      />
                      <polyline
                        fill="none"
                        stroke="#0891ff"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        points={dailyData.time_series
                          .map(
                            (point, i) =>
                              `${i * (600 / (dailyData.time_series.length - 1 || 1))},${220 - (point.count / maxDaily) * 180}`,
                          )
                          .join(" ")}
                      />
                      {dailyData.time_series.map((point, i) => (
                        <circle
                          key={i}
                          cx={
                            i * (600 / (dailyData.time_series.length - 1 || 1))
                          }
                          cy={220 - (point.count / maxDaily) * 180}
                          r="4"
                          fill="#fff"
                          stroke="#0891ff"
                          strokeWidth="2"
                        />
                      ))}
                    </svg>
                    <div className="chart-labels">
                      {dailyData.time_series
                        .slice(0, Math.min(7, dailyData.time_series.length))
                        .map((point, i) => (
                          <span key={i}>{point.label}</span>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="analytics-chart-card main-graph">
                  <h4>
                    <i className="fa-solid fa-chart-column"></i> Monthly
                    Progress
                  </h4>
                  <div className="vertical-bars">
                    {monthlySeries.map((point, i) => (
                      <div key={i} className="vbar-item">
                        <div className="vbar-track">
                          <div
                            className="vbar-fill"
                            style={{
                              height: `${(point.count / maxMonthly) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="vbar-label">{point.label}</span>
                        <span className="vbar-value">{point.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Graph 3: Page Type Distribution (Donut) */}
                <div className="analytics-chart-card main-graph">
                  <h4>
                    <i className="fa-solid fa-chart-pie"></i> Page Type
                    Distribution
                  </h4>
                  <div className="donut-chart-container">
                    <div
                      className="donut-chart"
                      style={{
                        background: `conic-gradient(${dailyData.page_type_distribution.map((item, i) => `${donutColors[i % donutColors.length]} ${(item.count / totalDistribution) * 360}deg`).join(", ")})`,
                      }}
                    >
                      <div className="donut-hole">
                        <span>{dailyData.total_views}</span>
                        <small>views</small>
                      </div>
                    </div>
                    <div className="donut-legend">
                      {dailyData.page_type_distribution.map((item, i) => (
                        <div key={i} className="legend-item">
                          <span
                            className="legend-color"
                            style={{
                              background: donutColors[i % donutColors.length],
                            }}
                          ></span>
                          <span>{item.page_type}</span>
                          <span>{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="analytics-chart-card main-graph">
                  <h4>
                    <i className="fa-solid fa-chart-bar"></i> Top Services
                  </h4>
                  <div className="service-rank-list">
                    {dailyData.top_services.map((service, i) => (
                      <div key={i} className="service-rank-item">
                        <div className="service-rank-icon">
                          <i
                            className={service.icon || "fa-solid fa-briefcase"}
                          ></i>
                        </div>
                        <div className="service-rank-content">
                          <div className="service-rank-header">
                            <span className="service-rank-name">
                              {service.title}
                            </span>
                            <span className="service-rank-views">
                              {service.views} views
                            </span>
                          </div>
                          <div className="service-rank-bar-track">
                            <div
                              className="service-rank-bar-fill"
                              style={{
                                width: `${(service.views / maxServiceViews) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="analytics-chart-card top-pages-full">
                <h4>
                  <i className="fa-solid fa-globe"></i> Top Pages
                </h4>
                <div className="horizontal-bars">
                  {dailyData.top_pages.map((page, i) => (
                    <div key={i} className="bar-item">
                      <span className="bar-label">{page.path}</span>
                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{
                            width: `${(page.views / maxTopPages) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="bar-value">{page.views}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="analytics-recent-grid">
                <div className="recent-card">
                  <h4>
                    <i className="fa-solid fa-briefcase"></i> Recent Services
                  </h4>
                  <div className="dashboard-list">
                    {recentServices.length === 0 ? (
                      <p className="no-data">No services yet</p>
                    ) : (
                      recentServices.map((svc) => (
                        <div key={svc.id} className="dashboard-list-item">
                          <div>
                            <strong>{svc.title}</strong>
                            <p>{svc.category}</p>
                          </div>
                          <span style={{ color: "#10b981" }}>{svc.icon}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="recent-card">
                  <h4>
                    <i className="fa-solid fa-folder-open"></i> Recent Projects
                  </h4>
                  <div className="dashboard-list">
                    {recentProjects.length === 0 ? (
                      <p className="no-data">No projects yet</p>
                    ) : (
                      recentProjects.map((proj) => (
                        <div key={proj.id} className="dashboard-list-item">
                          <div>
                            <strong>{proj.title}</strong>
                            <p>{proj.category}</p>
                          </div>
                          <span style={{ color: "#0891ff" }}>
                            {proj.featured ? "Featured" : "Normal"}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="recent-card">
                  <h4>
                    <i className="fa-solid fa-envelope"></i> Recent Contacts
                  </h4>
                  <div className="dashboard-list">
                    {recentContacts.length === 0 ? (
                      <p className="no-data">No contacts yet</p>
                    ) : (
                      recentContacts.map((contact) => (
                        <div key={contact.id} className="dashboard-list-item">
                          <div>
                            <strong>{contact.name || "Unknown"}</strong>
                            <p>{contact.email}</p>
                          </div>
                          <span className={`contact-status ${contact.status}`}>
                            {contact.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminAnalytics;
