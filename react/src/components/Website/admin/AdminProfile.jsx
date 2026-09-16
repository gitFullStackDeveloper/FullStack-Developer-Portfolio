import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext";
import AdminSidebar from "./AdminSidebar";
import "../../../css/Website/admin/admin.css";
import AdminTopBar from "./AdminTopBar";

const AdminProfile = () => {
  const { user, token, login } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  const [openActionId, setOpenActionId] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (user)
      setForm({
        full_name: user.full_name || "",
        email: user.email,
        password: "",
      });
  }, [user]);

  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      const res = await fetch(`${window.API_BASE}/api/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${window.API_BASE}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      login(token, updated);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const confirmDeleteUser = async () => {
    setDeleteLoading(true);
    try {
      const res = await fetch(
        `${window.API_BASE}/api/auth/users/${deleteUserId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Delete failed");
      }
      setUsers((prev) => prev.filter((u) => u.id !== deleteUserId));
      setDeleteUserId(null);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".admin-dropdown-menu")) {
        setOpenActionId(null);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

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
          {/* Header */}
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
              <h2 className="admin-page-title">Profile Settings</h2>
            </div>
            <AdminTopBar />
          </div>

          <div className="profile-layout">
            <div className="profile-left">
              <div className="profile-avatar-section">
                <div className="profile-avatar">
                  {user?.full_name?.charAt(0) || user?.email?.charAt(0) || "A"}
                </div>
                <h3>{user?.full_name || "Admin"}</h3>
                <p>{user?.email}</p>
                <span className="profile-role-badge">{user?.role}</span>
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
                    <i className="fa-solid fa-calendar-check"></i>
                  </div>
                  <div>
                    <span className="admin-stat-label">Account Created</span>
                    <span
                      className="admin-stat-value"
                      style={{ fontSize: "1rem" }}
                    >
                      {user?.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : "N/A"}
                    </span>
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
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <div>
                    <span className="admin-stat-label">Status</span>
                    <span
                      className="admin-stat-value"
                      style={{ fontSize: "1rem", color: "#10b981" }}
                    >
                      Active
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
                    <i className="fa-solid fa-users"></i>
                  </div>
                  <div>
                    <span className="admin-stat-label">Total Accounts</span>
                    <span
                      className="admin-stat-value"
                      style={{ fontSize: "1rem" }}
                    >
                      {users.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column – Edit Form */}
            <div className="profile-right">
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
                    className="fa-solid fa-pen-to-square"
                    style={{ color: "#0891ff", marginRight: "0.5rem" }}
                  ></i>
                  Edit Information
                </h3>
                <div className="admin-row" style={{ marginBottom: "1.2rem" }}>
                  <div className="admin-input-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={form.full_name}
                      onChange={(e) =>
                        setForm({ ...form, full_name: e.target.value })
                      }
                    />
                  </div>
                  <div className="admin-input-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div
                  className="admin-input-group"
                  style={{ marginBottom: "1.8rem" }}
                >
                  <label>
                    New Password{" "}
                    <small style={{ color: "rgba(255,255,255,0.4)" }}>
                      (leave blank to keep current)
                    </small>
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    placeholder="••••••••"
                  />
                </div>

                <button
                  className="admin-submit-btn"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="admin-spinner"></span> Saving...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-floppy-disk"></i> Save Changes
                    </>
                  )}
                </button>
                {message && (
                  <p
                    style={{
                      marginTop: "1rem",
                      color: message.includes("Error") ? "#ef4444" : "#10b981",
                      fontSize: "0.9rem",
                    }}
                  >
                    {message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ========== ALL ADMIN ACCOUNTS TABLE ========== */}
          <div
            className="admin-card"
            style={{
              padding: "2rem",
              marginTop: "2rem",
              background: "rgba(10,10,15,0.4)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "1.5rem" }}>
              <i
                className="fa-solid fa-users-gear"
                style={{ color: "#0891ff", marginRight: "0.5rem" }}
              ></i>
              All Admin Accounts
            </h3>
            {usersLoading ? (
              <div className="admin-empty">
                <span className="admin-spinner"></span> Loading users...
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Password</th>
                      <th>Role</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="admin-empty">
                          No users found
                        </td>
                      </tr>
                    ) : (
                      users.map((u) => (
                        <tr key={u.id}>
                          <td>{u.full_name || "—"}</td>
                          <td>{u.email}</td>
                          <td>••••••••</td>
                          <td>
                            <span
                              className="profile-role-badge"
                              style={{
                                background:
                                  u.role === "superadmin"
                                    ? "rgba(239,68,68,0.15)"
                                    : "rgba(8,145,255,0.15)",
                                color:
                                  u.role === "superadmin"
                                    ? "#ef4444"
                                    : "#0891ff",
                              }}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td>{new Date(u.created_at).toLocaleDateString()}</td>
                          <td>
                            <div style={{ position: "relative" }}>
                              <button
                                className="admin-menu-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenActionId(
                                    openActionId === u.id ? null : u.id,
                                  );
                                }}
                              >
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                              </button>
                              {openActionId === u.id && (
                                <div
                                  className="admin-dropdown-menu-card"
                                  style={{
                                    right: 0,
                                    top: "100%",
                                    minWidth: "120px",
                                  }}
                                >
                                  <button
                                    onClick={() => {
                                      setOpenActionId(null);
                                      setDeleteUserId(u.id);
                                    }}
                                  >
                                    <i className="fa-solid fa-trash"></i> Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteUserId && (
        <div
          className="admin-modal-overlay"
          onClick={() => setDeleteUserId(null)}
        >
          <div
            className="admin-modal admin-delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h3>Confirm Delete</h3>
              <button
                className="admin-modal-close"
                onClick={() => setDeleteUserId(null)}
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            <div className="admin-modal-body">
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: "1.5rem",
                }}
              >
                Are you sure you want to delete this admin account? This action
                cannot be undone.
              </p>
              <div className="admin-row" style={{ gap: "1rem" }}>
                <button
                  className="admin-submit-btn"
                  onClick={() => setDeleteUserId(null)}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  Cancel
                </button>
                <button
                  className="admin-submit-btn"
                  onClick={confirmDeleteUser}
                  disabled={deleteLoading}
                  style={{
                    background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  }}
                >
                  {deleteLoading ? (
                    <>
                      <span className="admin-spinner"></span> Deleting...
                    </>
                  ) : (
                    "Yes, Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
