import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import AdminTopBar from "./AdminTopBar";
import "../../../css/Website/admin/admin.css";

const API_BASE = `${window.API_BASE}/api/certificates`;
const SETTINGS_API = `${window.API_BASE}/api/settings`;

const initialFormData = {
  title: "",
  issuer: "",
  icon: "fa-solid fa-award",
  color: "#0891ff",
  date: "",
  credential_url: "",
};

const AdminCertifications = () => {
  const [certificates, setCertificates] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // Resume states
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeSaving, setResumeSaving] = useState(false);
  const [resumeMessage, setResumeMessage] = useState("");

  const sectionRef = useRef(null);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/`);
      if (!res.ok) throw new Error("Failed to fetch certificates");
      const data = await res.json();
      setCertificates(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchResume = async () => {
    try {
      const res = await fetch(`${SETTINGS_API}/`);
      if (res.ok) {
        const data = await res.json();
        setResumeUrl(data.resume_url || "");
      }
    } catch (err) {
      console.error("Failed to load resume:", err);
    }
  };

  useEffect(() => {
    fetchCertificates();
    fetchResume();
  }, []);

  const openCreate = () => {
    setFormData(initialFormData);
    setPreviewImage("");
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (cert) => {
    setFormData(cert);
    setPreviewImage(
      cert.credential_url?.startsWith("data:") ? cert.credential_url : "",
    );
    setEditingId(cert.id);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setFormData((prev) => ({ ...prev, credential_url: dataUrl }));
      setPreviewImage(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingId ? `${API_BASE}/${editingId}` : `${API_BASE}/`;
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to save certificate");
      await fetchCertificates();
      setModalOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${API_BASE}/${deleteTargetId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setCertificates((prev) => prev.filter((c) => c.id !== deleteTargetId));
      setDeleteTargetId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const handleView = (cert) => {
    if (cert.credential_url) {
      window.open(cert.credential_url, "_blank");
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setResumeLoading(true);
    setResumeMessage("");
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target.result;
      setResumeUrl(dataUrl);
      setResumeSaving(true);
      try {
        const res = await fetch(`${SETTINGS_API}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resume_url: dataUrl }),
        });
        if (!res.ok) throw new Error("Failed to save resume");
        setResumeMessage("✅ Resume updated successfully");
      } catch (err) {
        setResumeMessage("❌ " + err.message);
      } finally {
        setResumeSaving(false);
        setResumeLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveResume = async () => {
    setResumeUrl("");
    setResumeSaving(true);
    try {
      const res = await fetch(`${SETTINGS_API}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_url: "" }),
      });
      if (!res.ok) throw new Error("Failed to remove resume");
      setResumeMessage("✅ Resume removed");
    } catch (err) {
      setResumeMessage("❌ " + err.message);
    } finally {
      setResumeSaving(false);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="admin-main">
        <div className="pfg-container">
          <div className="admin-header-row">
            <div className="admin-title-area">
              <h2 className="admin-page-title">Certifications</h2>
            </div>
            <AdminTopBar />
          </div>

          {/* Resume Upload Card */}
          <div
            className="admin-card"
            style={{ marginBottom: "2rem", padding: "1.5rem" }}
          >
            <h3>
              <i className="fa-solid fa-file-pdf"></i> Resume Upload
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <label className="admin-main-image-btn">
                {resumeLoading ? (
                  <>
                    <span className="admin-spinner"></span> Uploading...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-upload"></i> Upload PDF
                  </>
                )}
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeUpload}
                  style={{ display: "none" }}
                />
              </label>
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-submit-btn"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
                >
                  <i className="fa-solid fa-eye"></i> View Resume
                </a>
              )}
              {resumeUrl && (
                <button
                  className="admin-submit-btn"
                  style={{
                    background: "#ef4444",
                    padding: "0.5rem 1rem",
                    fontSize: "0.85rem",
                  }}
                  onClick={handleRemoveResume}
                >
                  <i className="fa-solid fa-trash"></i> Remove
                </button>
              )}
            </div>
            {resumeMessage && (
              <p style={{ marginTop: "0.5rem" }}>{resumeMessage}</p>
            )}
          </div>

          {/* Add Certificate Button */}
          <div className="admin-actions-row">
            <button className="admin-add-btn" onClick={openCreate}>
              <i className="fa-solid fa-plus"></i> Add Certificate
            </button>
          </div>

          {/* Certificates Table */}
          {loading ? (
            <div className="admin-empty">
              <span className="admin-spinner"></span> Loading...
            </div>
          ) : (
            <div
              className="admin-table-wrapper"
              style={{ overflow: "visible" }}
            >
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Issuer</th>
                    <th>Icon</th>
                    <th>Color</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((cert) => (
                    <tr key={cert.id}>
                      <td>{cert.title}</td>
                      <td>{cert.issuer}</td>
                      <td>
                        <i className={cert.icon}></i>
                      </td>
                      <td>
                        <span
                          style={{
                            background: cert.color,
                            width: "20px",
                            height: "20px",
                            display: "inline-block",
                            borderRadius: "4px",
                          }}
                        ></span>
                      </td>
                      <td style={{ position: "relative" }}>
                        <button
                          className="admin-menu-btn"
                          onClick={() => toggleDropdown(cert.id)}
                        >
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        {openDropdownId === cert.id && (
                          <div
                            className="admin-dropdown-menu-card"
                            style={{
                              right: "0",
                              top: "100%",
                              minWidth: "120px",
                            }}
                          >
                            <button
                              onClick={() => {
                                setOpenDropdownId(null);
                                openEdit(cert);
                              }}
                            >
                              <i className="fa-solid fa-pen"></i> Edit
                            </button>
                            <button
                              onClick={() => {
                                setOpenDropdownId(null);
                                handleView(cert);
                              }}
                            >
                              <i className="fa-solid fa-eye"></i> View
                            </button>
                            <button
                              onClick={() => {
                                setOpenDropdownId(null);
                                setDeleteTargetId(cert.id);
                              }}
                            >
                              <i className="fa-solid fa-trash"></i> Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {modalOpen && (
        <div
          className="admin-modal-overlay"
          onClick={() => setModalOpen(false)}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingId ? "Edit Certificate" : "Add Certificate"}</h3>
              <button
                className="admin-modal-close"
                onClick={() => setModalOpen(false)}
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="admin-modal-body">
              <div className="admin-row">
                <div className="admin-input-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="admin-input-group">
                  <label>Issuer</label>
                  <input
                    type="text"
                    name="issuer"
                    value={formData.issuer}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="admin-row">
                <div className="admin-input-group">
                  <label>Icon (FontAwesome)</label>
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    placeholder="fa-solid fa-award"
                  />
                </div>
                <div className="admin-input-group">
                  <label>Color</label>
                  <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="admin-row">
                <div className="admin-input-group">
                  <label>Date</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    placeholder="2025"
                  />
                </div>
                <div className="admin-input-group">
                  <label>Credential URL</label>
                  <input
                    type="url"
                    name="credential_url"
                    value={
                      formData.credential_url?.startsWith("data:")
                        ? ""
                        : formData.credential_url
                    }
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="admin-input-group full">
                <label>Upload Certificate (Offline)</label>
                <div className="admin-main-image-upload">
                  <label className="admin-main-image-btn">
                    <i className="fa-solid fa-upload"></i> Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                    />
                  </label>
                  {previewImage && (
                    <div className="admin-main-image-preview">
                      <img src={previewImage} alt="Certificate preview" />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage("");
                          setFormData((prev) => ({
                            ...prev,
                            credential_url: "",
                          }));
                        }}
                      >
                        <i className="fa-solid fa-times"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="admin-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="admin-spinner"></span> Saving...
                  </>
                ) : editingId ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {deleteTargetId && (
        <div
          className="admin-modal-overlay"
          onClick={() => setDeleteTargetId(null)}
        >
          <div
            className="admin-modal admin-delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h3>Confirm Delete</h3>
            </div>
            <div className="admin-modal-body">
              <p>Are you sure you want to delete this certificate?</p>
              <div className="admin-row">
                <button
                  className="admin-submit-btn"
                  onClick={() => setDeleteTargetId(null)}
                >
                  Cancel
                </button>
                <button
                  className="admin-submit-btn"
                  onClick={confirmDelete}
                  style={{ background: "#ef4444" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCertifications;
