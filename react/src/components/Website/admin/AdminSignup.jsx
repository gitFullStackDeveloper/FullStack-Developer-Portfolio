import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext";
import AdminSidebar from "./AdminSidebar";
import "../../../css/Website/admin/admin.css";
import AdminTopBar from "./AdminTopBar";
const AdminSignup = () => {
  const { token } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    role: "admin",
  });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${window.API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed");
      setMessage("✅ Admin created successfully!");
      setForm({
        username: "",
        email: "",
        password: "",
        full_name: "",
        role: "admin",
      });
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setSaving(false);
    }
  };

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
            <div className="">
              <motion.div className="section-badge">
                <motion.span
                  className="badge-dot"
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                Admin Panel
              </motion.div>
              <h2 className="admin-page-title">Add New Admin</h2>
            </div>
            <AdminTopBar />
          </div>

          <div className="signup-layout">
            {/* Left – Preview Card */}
            <div className="signup-preview">
              <div
                className="admin-card"
                style={{
                  padding: "2rem",
                  background: "rgba(10,10,15,0.4)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  textAlign: "center",
                }}
              >
                <div
                  className="profile-avatar"
                  style={{ margin: "0 auto 1rem" }}
                >
                  {form.full_name
                    ? form.full_name.charAt(0)
                    : form.username
                      ? form.username.charAt(0)
                      : "?"}
                </div>
                <h3 style={{ margin: "0 0 0.2rem" }}>
                  {form.full_name || "New Admin"}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    margin: "0 0 0.8rem",
                    fontSize: "0.9rem",
                  }}
                >
                  {form.email || "email@example.com"}
                </p>
                <span
                  className="profile-role-badge"
                  style={{
                    background:
                      form.role === "superadmin"
                        ? "rgba(239,68,68,0.15)"
                        : "rgba(8,145,255,0.15)",
                    color: form.role === "superadmin" ? "#ef4444" : "#0891ff",
                  }}
                >
                  {form.role}
                </span>
              </div>
              <div
                className="admin-stat-cards"
                style={{ flexDirection: "column", marginTop: "1.5rem" }}
              >
                <div className="admin-stat-card">
                  <div
                    className="admin-stat-icon"
                    style={{
                      background: "rgba(8,145,255,0.15)",
                      color: "#0891ff",
                    }}
                  >
                    <i className="fa-solid fa-user-plus"></i>
                  </div>
                  <div>
                    <span className="admin-stat-label">Access Level</span>
                    <span
                      className="admin-stat-value"
                      style={{ fontSize: "1rem" }}
                    >
                      {form.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right – Form */}
            <div className="signup-form">
              <div
                className="admin-card"
                style={{
                  padding: "2rem",
                  background: "rgba(10,10,15,0.4)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: "1.5rem" }}>
                  <i
                    className="fa-solid fa-user-plus"
                    style={{ color: "#0891ff", marginRight: "0.5rem" }}
                  ></i>
                  Account Details
                </h3>
                <div className="admin-row" style={{ marginBottom: "1.2rem" }}>
                  <div className="admin-input-group">
                    <label>Username</label>
                    <input
                      type="text"
                      value={form.username}
                      onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                      }
                      placeholder="johndoe"
                    />
                  </div>
                  <div className="admin-input-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={form.full_name}
                      onChange={(e) =>
                        setForm({ ...form, full_name: e.target.value })
                      }
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div className="admin-row" style={{ marginBottom: "1.2rem" }}>
                  <div className="admin-input-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="admin-input-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      placeholder="Min 6 characters"
                    />
                  </div>
                </div>
                <div
                  className="admin-input-group"
                  style={{ marginBottom: "1.8rem" }}
                >
                  <label>Role</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  >
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>

                <button
                  className="admin-submit-btn"
                  onClick={handleCreate}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="admin-spinner"></span> Creating...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-user-plus"></i> Create Admin
                    </>
                  )}
                </button>
                {message && (
                  <p
                    style={{
                      marginTop: "1rem",
                      color: message.startsWith("✅") ? "#10b981" : "#ef4444",
                      fontSize: "0.9rem",
                    }}
                  >
                    {message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSignup;
