import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import "../../../css/Website/admin/admin.css";
import AdminTopBar from "./AdminTopBar";

const API_BASE = `${window.API_BASE}/api/contacts`;

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE + "/");
      if (!res.ok) throw new Error("Failed to fetch contacts");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.service?.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/${id}/status?status=${newStatus}`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Update failed");
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)),
      );
    } catch (err) {
      alert("Error updating status: " + err.message);
    }
  };

  const confirmDelete = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/${deleteTargetId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setContacts((prev) => prev.filter((c) => c.id !== deleteTargetId));
      setDeleteTargetId(null);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusBadge = (status) => {
    const colors = {
      new: { bg: "#0891ff20", color: "#0891ff", icon: "fa-solid fa-circle" },
      read: {
        bg: "#f59e0b20",
        color: "#f59e0b",
        icon: "fa-solid fa-envelope-open",
      },
      responded: {
        bg: "#10b98120",
        color: "#10b981",
        icon: "fa-solid fa-check-circle",
      },
    };
    const s = colors[status] || colors.new;
    return (
      <span
        style={{
          background: s.bg,
          color: s.color,
          padding: "0.3rem 0.8rem",
          borderRadius: "50px",
          fontSize: "0.8rem",
          fontWeight: 600,
          display: "inline-flex",
          alignItems: "center",
          gap: "0.3rem",
        }}
      >
        <i className={s.icon}></i> {status}
      </span>
    );
  };

  const total = contacts.length;
  const newCount = contacts.filter((c) => c.status === "new").length;
  const readCount = contacts.filter((c) => c.status === "read").length;
  const respondedCount = contacts.filter(
    (c) => c.status === "responded",
  ).length;

  return (
    <div className="admin-layout" ref={sectionRef}>
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
              <motion.div
                className="section-badge"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.span
                  className="badge-dot"
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                Admin Panel
              </motion.div>
              <h2 className="admin-page-title">Contacts</h2>
            </div>
            <AdminTopBar />
          </div>

          {/* Stats */}
          <div className="admin-stat-cards">
            {[
              {
                icon: "fa-solid fa-envelope",
                value: total,
                label: "Total Contacts",
                color: "#0891ff",
              },
              {
                icon: "fa-solid fa-circle",
                value: newCount,
                label: "New",
                color: "#0891ff",
              },
              {
                icon: "fa-solid fa-envelope-open",
                value: readCount,
                label: "Read",
                color: "#f59e0b",
              },
              {
                icon: "fa-solid fa-check-circle",
                value: respondedCount,
                label: "Responded",
                color: "#10b981",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="admin-stat-card"
                whileHover={{ y: -5, borderColor: `${stat.color}50` }}
              >
                <div
                  className="admin-stat-icon"
                  style={{ background: `${stat.color}15`, color: stat.color }}
                >
                  <i className={stat.icon}></i>
                </div>
                <div>
                  <span className="admin-stat-value">{stat.value}</span>
                  <span className="admin-stat-label">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="admin-actions-row">
            <div className="admin-search-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search by name, email, service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: "0.7rem 1.5rem",
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "50px",
                color: "#fff",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="responded">Responded</option>
            </select>
          </div>

          {/* Table */}
          {loading ? (
            <div className="admin-empty">
              <span className="admin-spinner"></span> Loading contacts...
            </div>
          ) : error ? (
            <div className="admin-empty">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <p>{error}</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="admin-empty">
                        No contacts found
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((contact) => (
                      <tr key={contact.id}>
                        <td>{contact.name}</td>
                        <td>
                          <a
                            href={`mailto:${contact.email}`}
                            style={{ color: "#0891ff" }}
                          >
                            {contact.email}
                          </a>
                        </td>
                        <td>{contact.service}</td>
                        <td>{statusBadge(contact.status)}</td>
                        <td>
                          {new Date(contact.created_at).toLocaleDateString()}
                        </td>
                        <td>
                          <div
                            className="admin-actions"
                            style={{ display: "flex", gap: "0.3rem" }}
                          >
                            <button
                              onClick={() => setSelectedContact(contact)}
                              title="View Details"
                            >
                              <i className="fa-solid fa-eye"></i>
                            </button>
                            <select
                              value={contact.status}
                              onChange={(e) =>
                                handleStatusChange(contact.id, e.target.value)
                              }
                              style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "#fff",
                                borderRadius: "4px",
                                padding: "0.2rem",
                              }}
                            >
                              <option value="new">New</option>
                              <option value="read">Read</option>
                              <option value="responded">Responded</option>
                            </select>
                            <button
                              onClick={() => setDeleteTargetId(contact.id)}
                              title="Delete"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
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
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div
            className="admin-modal-overlay"
            onClick={() => setSelectedContact(null)}
          >
            <motion.div
              className="admin-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="admin-modal-header">
                <h3>Contact Details</h3>
                <button
                  className="admin-modal-close"
                  onClick={() => setSelectedContact(null)}
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>
              <div className="admin-modal-body">
                <div className="admin-row">
                  <div>
                    <strong>Name:</strong> {selectedContact.name}
                  </div>
                  <div>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${selectedContact.email}`}>
                      {selectedContact.email}
                    </a>
                  </div>
                </div>
                <div className="admin-row">
                  <div>
                    <strong>Service:</strong> {selectedContact.service}
                  </div>
                  <div>
                    <strong>Status:</strong>{" "}
                    {statusBadge(selectedContact.status)}
                  </div>
                </div>
                {selectedContact.company && (
                  <div>
                    <strong>Company:</strong> {selectedContact.company}
                  </div>
                )}
                {selectedContact.country && (
                  <div>
                    <strong>Country:</strong> {selectedContact.country}
                  </div>
                )}
                <div>
                  <strong>Message:</strong>
                  <p style={{ whiteSpace: "pre-wrap", marginTop: "0.5rem" }}>
                    {selectedContact.message || "N/A"}
                  </p>
                </div>
                <div className="admin-row">
                  <div>
                    <strong>Project Type:</strong>{" "}
                    {selectedContact.projectType || "-"}
                  </div>
                  <div>
                    <strong>Budget:</strong>{" "}
                    {selectedContact.budgetRange || "-"}
                  </div>
                  <div>
                    <strong>Timeline:</strong> {selectedContact.timeline || "-"}
                  </div>
                </div>
                <div>
                  <strong>Description:</strong>
                  <p style={{ whiteSpace: "pre-wrap" }}>
                    {selectedContact.description || "-"}
                  </p>
                </div>
                <div>
                  <strong>Goals:</strong>
                  <p style={{ whiteSpace: "pre-wrap" }}>
                    {selectedContact.goals || "-"}
                  </p>
                </div>
                <div>
                  <strong>Features:</strong>
                  <p style={{ whiteSpace: "pre-wrap" }}>
                    {selectedContact.features || "-"}
                  </p>
                </div>
                <div className="admin-row">
                  <div>
                    <strong>Meeting Date:</strong>{" "}
                    {selectedContact.meetingDate || "-"}
                  </div>
                  <div>
                    <strong>Meeting Time:</strong>{" "}
                    {selectedContact.meetingTime || "-"}
                  </div>
                </div>
                <div>
                  <strong>Submitted:</strong>{" "}
                  {new Date(selectedContact.created_at).toLocaleString()}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteTargetId && (
          <motion.div
            className="admin-modal-overlay"
            onClick={() => setDeleteTargetId(null)}
          >
            <motion.div
              className="admin-modal admin-delete-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="admin-modal-header">
                <h3>Confirm Delete</h3>
                <button
                  className="admin-modal-close"
                  onClick={() => setDeleteTargetId(null)}
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
                  Are you sure you want to delete this contact?
                </p>
                <div className="admin-row" style={{ gap: "1rem" }}>
                  <button
                    className="admin-submit-btn"
                    onClick={() => setDeleteTargetId(null)}
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="admin-submit-btn"
                    onClick={confirmDelete}
                    disabled={isSubmitting}
                    style={{
                      background: "linear-gradient(135deg, #ef4444, #dc2626)",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="admin-spinner"></span> Deleting...
                      </>
                    ) : (
                      "Yes, Delete"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminContacts;
