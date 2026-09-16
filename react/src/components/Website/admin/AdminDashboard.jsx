import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';
import '../../../css/Website/admin/admin.css';

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
const API_BASE = `${window.API_BASE}`;
  const [stats, setStats] = useState({ projects: 0, services: 0, contacts: 0, views: 0 });
  const [dailySeries, setDailySeries] = useState([]);
  const [monthlySeries, setMonthlySeries] = useState([]);
  const [pageTypeDistribution, setPageTypeDistribution] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        // Fetch projects count
        const projectsRes = await fetch(`${API_BASE}/api/projects/`);
        const projects = await projectsRes.json();
        setStats(prev => ({ ...prev, projects: projects.length }));

        // Fetch services count
        const servicesRes = await fetch(`${API_BASE}/api/services/`);
        const services = await servicesRes.json();
        setStats(prev => ({ ...prev, services: services.length }));

        // Fetch contacts count
        const contactsRes = await fetch(`${API_BASE}/api/contacts/`, { headers });
        const contacts = await contactsRes.json();
        setStats(prev => ({ ...prev, contacts: contacts.length }));

        // Fetch daily analytics
        const dailyRes = await fetch(`${API_BASE}/api/analytics/summary?interval=day`, { headers });
        const daily = await dailyRes.json();
        setStats(prev => ({ ...prev, views: daily.total_views || 0 }));
        setDailySeries(daily.time_series || []);
        setPageTypeDistribution(daily.page_type_distribution || []);
        setTopServices(daily.top_services || []);

        // Fetch monthly analytics
        const monthlyRes = await fetch(`${API_BASE}/api/analytics/summary?interval=month`, { headers });
        const monthly = await monthlyRes.json();
        setMonthlySeries(monthly.time_series || []);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [token]);

  const maxDaily = dailySeries.length ? Math.max(...dailySeries.map(d => d.count), 1) : 1;
  const maxMonthly = monthlySeries.length ? Math.max(...monthlySeries.map(d => d.count), 1) : 1;
  const maxServiceViews = topServices.length ? Math.max(...topServices.map(s => s.views), 1) : 1;
  const totalDistribution = pageTypeDistribution.reduce((acc, item) => acc + item.count, 0) || 1;

  const donutColors = ['#0891ff', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899', '#14b8a6', '#f97316'];

  return (
    <div className="admin-layout">
      <div className="pfg-bg-shapes">...</div>
      <div className="pfg-grid-lines">...</div>
      <div className="pfg-particles">...</div>
      <AdminSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className="admin-main">
        <div className="pfg-container">
          {/* Header */}
          <div className="admin-header-row">
            <div className="">
              <motion.div className="section-badge">
                <motion.span className="badge-dot" animate={{ opacity: [1,0.3,1], scale: [1,1.3,1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                Dashboard
              </motion.div>
              <h2 className="admin-page-title">Welcome back, {user?.full_name || user?.email}</h2>
            </div>
            <AdminTopBar />
          </div>

          {loading ? (
            <div className="admin-empty"><span className="admin-spinner"></span> Loading dashboard...</div>
          ) : (
            <>
              {/* Stat Cards – 4 boxes */}
              <div className="admin-stat-cards">
                {[
                  { icon: 'fa-solid fa-folder-open', value: stats.projects, label: 'Total Projects', color: '#0891ff' },
                  { icon: 'fa-solid fa-briefcase', value: stats.services, label: 'Total Services', color: '#10b981' },
                  { icon: 'fa-solid fa-envelope', value: stats.contacts, label: 'Contacts', color: '#f59e0b' },
                  { icon: 'fa-solid fa-eye', value: stats.views, label: 'Total Views', color: '#8b5cf6' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="admin-stat-card dashboard-stat-card"
                    whileHover={{ y: -5, borderColor: `${stat.color}50` }}
                  >
                    <div className="admin-stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                      <i className={stat.icon}></i>
                    </div>
                    <div>
                      <span className="admin-stat-value">{stat.value}</span>
                      <span className="admin-stat-label">{stat.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* GRAPHS GRID – 4 boxes */}
              <div className="dashboard-charts-grid">
                {/* 1. Daily Views Line Chart */}
                <div className="dashboard-chart-card">
                  <h4><i className="fa-solid fa-chart-line"></i> Daily Views (7 Days)</h4>
                  <div className="chart-area">
                    <svg viewBox="0 0 600 200" preserveAspectRatio="none" style={{ width: '100%', height: '160px' }}>
                      <polyline
                        fill="none"
                        stroke="#0891ff"
                        strokeWidth="2"
                        points={dailySeries.map((point, i) => `${i * (600 / (dailySeries.length - 1 || 1))},${200 - (point.count / maxDaily) * 170}`).join(' ')}
                      />
                      {dailySeries.map((point, i) => (
                        <circle
                          key={i}
                          cx={i * (600 / (dailySeries.length - 1 || 1))}
                          cy={200 - (point.count / maxDaily) * 170}
                          r="3"
                          fill="#0891ff"
                        />
                      ))}
                    </svg>
                    <div className="chart-labels">
                      {dailySeries.slice(0, 7).map((point, i) => (
                        <span key={i}>{point.label}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Monthly Views Bar Chart */}
                <div className="dashboard-chart-card">
                  <h4><i className="fa-solid fa-chart-column"></i> Monthly Progress</h4>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: '160px' }}>
                    {monthlySeries.map((point, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                        <div style={{
                          width: '100%',
                          height: `${(point.count / maxMonthly) * 130}px`,
                          background: 'linear-gradient(180deg, #10b981, #059669)',
                          borderRadius: '4px',
                          minHeight: '3px',
                          transition: 'height 0.5s ease'
                        }} />
                        <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)' }}>{point.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Page Type Distribution Donut */}
                <div className="dashboard-chart-card">
                  <h4><i className="fa-solid fa-chart-pie"></i> Page Type Distribution</h4>
                  <div className="donut-chart-container">
                    <div
                      className="donut-chart"
                      style={{
                        background: `conic-gradient(${pageTypeDistribution.map((item, i) => `${donutColors[i % donutColors.length]} ${(item.count / totalDistribution) * 360}deg`).join(', ')})`
                      }}
                    >
                      <div className="donut-hole">
                        <span>{stats.views}</span>
                        <small>views</small>
                      </div>
                    </div>
                    <div className="donut-legend">
                      {pageTypeDistribution.map((item, i) => (
                        <div key={i} className="legend-item">
                          <span className="legend-color" style={{ background: donutColors[i % donutColors.length] }}></span>
                          <span>{item.page_type}</span>
                          <span>{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
{/* 4. Bubble Scatter Chart – Top Services */}
<div className="dashboard-chart-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '300px' }}>
  <h4 style={{ marginBottom: '0.5rem' }}><i className="fa-solid fa-circle-dot"></i> Top Services Scatter</h4>
  <div className="bubble-scatter-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 0, margin: 0 }}>
    <svg viewBox="0 0 400 320" className="bubble-scatter-svg" style={{ width: '100%', maxWidth: '400px', height: 'auto', margin: 0, padding: 0 }}>
      {/* Grid lines */}
      {[60, 100, 140, 180, 220, 260].map((y) => (
        <line key={y} x1="50" y1={y} x2="370" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      {topServices.map((_, i) => {
        const x = 80 + i * (260 / (topServices.length - 1 || 1));
        return <line key={i} x1={x} y1="60" x2={x} y2="280" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
      })}

      {/* Axis labels */}
      <text x="20" y="170" fill="rgba(255,255,255,0.5)" fontSize="12" transform="rotate(-90 20 170)" textAnchor="middle">
        Views
      </text>
      <text x="210" y="310" fill="rgba(255,255,255,0.5)" fontSize="12" textAnchor="middle">
        Services
      </text>

      {/* Bubbles */}
      {topServices.map((service, i) => {
        const x = 80 + i * (260 / (topServices.length - 1 || 1));
        const y = 250 - (service.views / maxServiceViews) * 180;
        const radius = 25 + (service.views / maxServiceViews) * 25; 
        return (
          <motion.g key={i}>
            {/* Connector line */}
            <line x1={x} y1={y + radius + 4} x2={x} y2={280} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Outer glow */}
            <motion.circle
              cx={x}
              cy={y}
              r={radius + 6}
              fill={donutColors[i % donutColors.length]}
              fillOpacity="0.15"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            />
            {/* Main bubble */}
            <motion.circle
              cx={x}
              cy={y}
              r={radius}
              fill={`url(#bubbleGradient${i})`}
              fillOpacity="0.9"
              stroke="#fff"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            />
            {/* Inner highlight */}
            <ellipse
              cx={x - radius * 0.25}
              cy={y - radius * 0.3}
              rx={radius * 0.5}
              ry={radius * 0.3}
              fill="rgba(255,255,255,0.25)"
              transform={`rotate(-30 ${x - radius * 0.25} ${y - radius * 0.3})`}
            />
            {/* Service title label */}
            <text
              x={x}
              y={y + radius + 20}
              fill="rgba(255,255,255,0.9)"
              fontSize="12"
              fontWeight="700"
              textAnchor="middle"
            >
              {service.title}
            </text>
            <text
              x={x}
              y={y + radius + 38}
              fill="rgba(255,255,255,0.7)"
              fontSize="11"
              textAnchor="middle"
            >
              {service.views} views
            </text>
            <defs>
              <linearGradient id={`bubbleGradient${i}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={donutColors[i % donutColors.length]} stopOpacity="0.9" />
                <stop offset="100%" stopColor={donutColors[(i + 1) % donutColors.length]} stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </motion.g>
        );
      })}
    </svg>
    <p className="bubble-scatter-legend-text" style={{ margin: '0.3rem 0 0', fontSize: '0.8rem' }}>
      Bubble size & height = relative views.
    </p>
  </div>
</div>
              </div>

              {/* View Analytics Page Button */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <Link to="/admin/analytics" className="dashboard-analytics-btn">
                  <i className="fa-solid fa-chart-pie"></i> View Full Analytics Page
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;