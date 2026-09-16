import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import "../../../css/Website/admin/admin.css";
import AdminTopBar from "./AdminTopBar";
const API_BASE = `${window.API_BASE}/api/services`;
const ADMIN_API = `${API_BASE}/admin/full`;

const initialFormData = {
  title: "",
  subtitle: "",
  overview: "",
  description: "",
  category: "",
  icon: "",
  image: "",
  images: [],
  tags: "",
  techStack: "",
  slug: "",
  features: [],
  process: [],
};

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(ADMIN_API);
      if (!res.ok) {
        const text = await res.text();
        console.error("Admin services fetch failed:", res.status, text);
        throw new Error(`Server error ${res.status}`);
      }
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".admin-dropdown-menu")) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const filteredServices = services.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.title?.toLowerCase().includes(q) ||
      s.category?.toLowerCase().includes(q)
    );
  });

  const openCreateModal = () => {
    setFormData(initialFormData);
    setPreviewImages([]);
    setMainImagePreview("");
    setEditingId(null);
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    const formatted = {
      ...service,
      tags: Array.isArray(service.tags)
        ? service.tags.join(", ")
        : service.tags || "",
      techStack: Array.isArray(service.techStack)
        ? service.techStack.join(", ")
        : service.techStack || "",
    };
    setFormData(formatted);

    const additionalImages = (service.images || []).filter(
      (img) => img !== service.image,
    );
    setPreviewImages(additionalImages);
    setMainImagePreview(service.image || "");

    setEditingId(service.id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setMainImagePreview("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const uploadToBackend = async (file) => {
    if (!file) throw new Error("No file selected");
    if (file.size > 10 * 1024 * 1024)
      throw new Error("File too large (max 10 MB)");

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch(`${window.API_BASE}/api/upload/`, {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      let detail = `HTTP ${res.status}`;
      try {
        const j = await res.json();
        detail = j.detail || JSON.stringify(j);
      } catch {
        detail = (await res.text().catch(() => "")) || detail;
      }
      console.error("Service image upload failed:", res.status, detail);
      throw new Error(detail);
    }

    const { url } = await res.json();
    if (url.startsWith("data:") || url.startsWith("http")) return url;
    return `${window.API_BASE}${url}`;
  };

  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsSubmitting(true);
      const url = await uploadToBackend(file);
      setFormData((prev) => ({ ...prev, image: url }));
      setMainImagePreview(url);
    } catch (err) {
      console.error(err);
      alert("Image upload failed:\n\n" + err.message);
    } finally {
      setIsSubmitting(false);
      e.target.value = "";
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    try {
      setIsSubmitting(true);
      const urls = await Promise.all(files.map(uploadToBackend));
      setPreviewImages((prev) => [...prev, ...urls]);
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
    } catch (err) {
      console.error(err);
      alert("Upload failed:\n\n" + err.message);
    } finally {
      setIsSubmitting(false);
      e.target.value = "";
    }
  };

  const removePreviewImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleJSONField = (field, value) => {
    try {
      const parsed = JSON.parse(value);
      setFormData((prev) => ({ ...prev, [field]: parsed }));
    } catch {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let slug = formData.slug.trim();
    if (!slug) {
      slug = generateSlug(formData.title);
    }

    const tagsArray =
      typeof formData.tags === "string"
        ? formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : formData.tags;

    const techStackArray =
      typeof formData.techStack === "string"
        ? formData.techStack
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : formData.techStack;

    const safeArray = (val) => (Array.isArray(val) ? val : []);
    const safeJsonArray = (val) => {
      if (Array.isArray(val)) return val;
      try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    };

    const featuresArray = safeJsonArray(formData.features);
    const processArray = safeJsonArray(formData.process);

    const imagesWithoutMain = safeArray(formData.images).filter(
      (img) => img !== formData.image,
    );
    const finalImages = formData.image
      ? [formData.image, ...imagesWithoutMain]
      : imagesWithoutMain;

    const serviceData = {
      ...formData,
      slug,
      tags: tagsArray,
      techStack: techStackArray,
      images: finalImages,
      features: featuresArray,
      process: processArray,
    };

    try {
      const url = editingId ? `${API_BASE}/${editingId}` : `${API_BASE}/`;
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });
      if (!res.ok) throw new Error("Failed to save service");
      const saved = await res.json();
      if (editingId) {
        setServices((prev) =>
          prev.map((s) => (s.id === editingId ? saved : s)),
        );
      } else {
        setServices((prev) => [...prev, saved]);
      }
      closeModal();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteTargetId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteTargetId(null);
  };

  const confirmDelete = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/${deleteTargetId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setServices((prev) => prev.filter((s) => s.id !== deleteTargetId));
      closeDeleteModal();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDropdownAction = (action, service) => {
    setOpenDropdownId(null);
    if (action === "edit") openEditModal(service);
    else if (action === "delete") openDeleteModal(service.id);
  };

  const total = services.length;
  const categories = [
    ...new Set(services.map((s) => s.category).filter(Boolean)),
  ].length;

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
          {/* Header */}
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
              <h2 className="admin-page-title">Services</h2>
            </div>
            <AdminTopBar />
          </div>

          {/* Stat cards */}
          <div className="admin-stat-cards">
            {[
              {
                icon: "fa-solid fa-briefcase",
                value: total,
                label: "Total Services",
                color: "#0891ff",
              },
              {
                icon: "fa-solid fa-layer-group",
                value: categories,
                label: "Categories",
                color: "#10b981",
              },
              {
                icon: "fa-solid fa-eye",
                value: "890",
                label: "Total Views",
                color: "#8b5cf6",
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

          {/* Search & Add */}
          <div className="admin-actions-row">
            <div className="admin-search-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="admin-add-btn" onClick={openCreateModal}>
              <i className="fa-solid fa-plus"></i> Add Service
            </button>
          </div>

          {/* Services Grid */}
          {loading ? (
            <div className="admin-empty">
              <span className="admin-spinner"></span> Loading services...
            </div>
          ) : error ? (
            <div className="admin-empty">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <p>{error}</p>
            </div>
          ) : (
            <motion.div className="pfg-grid" layout>
              <AnimatePresence mode="wait">
                {filteredServices.length === 0 ? (
                  <motion.div
                    className="pfg-no-results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <i className="fa-solid fa-folder-open"></i>
                    <p>
                      {services.length === 0
                        ? "No services yet."
                        : "No results found."}
                    </p>
                  </motion.div>
                ) : (
                  filteredServices.map((service) => (
                    <motion.div
                      key={service.id}
                      className="pfg-card"
                      layout
                      whileHover={{
                        y: -8,
                        borderColor: "rgba(8,145,255,0.5)",
                        boxShadow: "0 25px 70px rgba(8,145,255,0.12)",
                      }}
                    >
                      <div className="pfg-card-image">
                        <img
                          src={
                            service.image ||
                            "https://via.placeholder.com/800x500/0a0a0f/0891ff?text=No+Image"
                          }
                          alt={service.title}
                        />
                        <div className="pfg-card-overlay" />
                        <div className="pfg-type-badge">{service.category}</div>
                        <div className="admin-card-menu">
                          <button
                            className="admin-menu-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(
                                openDropdownId === service.id
                                  ? null
                                  : service.id,
                              );
                            }}
                          >
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </button>
                          {openDropdownId === service.id && (
                            <div className="admin-dropdown-menu-card">
                              <button
                                onClick={() =>
                                  handleDropdownAction("edit", service)
                                }
                              >
                                <i className="fa-solid fa-pen"></i> Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleDropdownAction("delete", service)
                                }
                              >
                                <i className="fa-solid fa-trash"></i> Delete
                              </button>
                              {service.slug && (
                                <a
                                  href={`/service/${service.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="admin-dropdown-item"
                                >
                                  <i className="fa-solid fa-eye"></i> View
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                        <motion.div
                          className="pfg-card-hover"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <button
                            className="pfg-hover-btn primary"
                            onClick={() => openEditModal(service)}
                          >
                            <i className="fa-solid fa-pen"></i> Edit
                          </button>
                          <button
                            className="pfg-hover-btn secondary"
                            onClick={() => openDeleteModal(service.id)}
                          >
                            <i className="fa-solid fa-trash"></i> Delete
                          </button>
                        </motion.div>
                      </div>
                      <div className="pfg-card-info">
                        <h3 className="pfg-card-title">
                          {service.title || "Untitled"}
                        </h3>
                        <p className="pfg-card-desc">
                          {service.description || "No description."}
                        </p>
                        <div className="pfg-card-tech">
                          {Array.isArray(service.tags) &&
                          service.tags.length > 0 ? (
                            service.tags.map((t, i) => (
                              <span key={i} className="pfg-tech-tag">
                                {t}
                              </span>
                            ))
                          ) : (
                            <span className="pfg-tech-tag">No tags</span>
                          )}
                        </div>
                        {service.slug && (
                          <a
                            href={`/service/${service.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pfg-card-link"
                            style={{
                              marginTop: "0.8rem",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.4rem",
                              color: "var(--accent, #0891ff)",
                              textDecoration: "none",
                              fontSize: "0.9rem",
                              fontWeight: 500,
                            }}
                          >
                            View Details{" "}
                            <i className="fa-solid fa-arrow-right"></i>
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingId ? "Edit Service" : "Add Service"}</h3>
              <button className="admin-modal-close" onClick={closeModal}>
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
                  <label>
                    Slug <small>(auto‑generated if empty)</small>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="Leave blank to auto‑generate"
                  />
                </div>
              </div>
              <div className="admin-row">
                <div className="admin-input-group">
                  <label>Subtitle</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                  />
                </div>
                <div className="admin-input-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Design">Designing</option>
                    <option value="Development">Development</option>
                    <option value="AI">AI & Automation</option>
                  </select>
                </div>
              </div>
              <div className="admin-row">
                <div className="admin-input-group">
                  <label>Icon (FontAwesome class)</label>
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    placeholder="fa-solid fa-code"
                  />
                </div>
                <div className="admin-input-group">
                  <label>Main Image</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Enter image URL or upload below"
                  />
                  <div className="admin-main-image-upload">
                    <label className="admin-main-image-btn">
                      <i className="fa-solid fa-upload"></i> Upload Local Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageUpload}
                        style={{ display: "none" }}
                      />
                    </label>
                    {mainImagePreview && (
                      <div className="admin-main-image-preview">
                        <img src={mainImagePreview} alt="Main preview" />
                        <button
                          type="button"
                          onClick={() => {
                            setMainImagePreview("");
                            setFormData((prev) => ({ ...prev, image: "" }));
                          }}
                        >
                          <i className="fa-solid fa-times"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="admin-input-group full">
                <label>Overview</label>
                <textarea
                  name="overview"
                  value={formData.overview}
                  onChange={handleChange}
                  rows="3"
                  placeholder="High‑level summary of the service"
                ></textarea>
              </div>
              <div className="admin-input-group full">
                <label>Short Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="2"
                ></textarea>
              </div>
              <div className="admin-input-group full">
                <label>Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="React, Node.js"
                />
              </div>
              <div className="admin-input-group full">
                <label>Tech Stack (comma separated)</label>
                <input
                  type="text"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleChange}
                  placeholder="React, Node.js"
                />
              </div>

              {/* Additional Images Upload */}
              <div className="admin-input-group full">
                <label>Upload Additional Images</label>
                <div className="admin-upload-area">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="admin-file-input"
                  />
                  <div className="admin-upload-placeholder">
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                    <p>Click or drag images here</p>
                  </div>
                </div>
                {previewImages.length > 0 && (
                  <div className="admin-image-previews">
                    {previewImages.map((src, i) => (
                      <div key={i} className="admin-preview-item">
                        <img src={src} alt={`preview ${i}`} />
                        <button
                          type="button"
                          className="admin-preview-remove"
                          onClick={() => removePreviewImage(i)}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="admin-input-group full">
                <label>Features (JSON array of {`{title, description}`})</label>
                <textarea
                  value={
                    typeof formData.features === "string"
                      ? formData.features
                      : JSON.stringify(formData.features, null, 2)
                  }
                  onChange={(e) => handleJSONField("features", e.target.value)}
                  rows="5"
                ></textarea>
              </div>
              <div className="admin-input-group full">
                <label>
                  Process (JSON array of {`{step, title, description}`})
                </label>
                <textarea
                  value={
                    typeof formData.process === "string"
                      ? formData.process
                      : JSON.stringify(formData.process, null, 2)
                  }
                  onChange={(e) => handleJSONField("process", e.target.value)}
                  rows="5"
                ></textarea>
              </div>

              <button
                type="submit"
                className="admin-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="admin-spinner"></span>{" "}
                    {editingId ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{editingId ? "Update Service" : "Add Service"}</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="admin-modal-overlay" onClick={closeDeleteModal}>
          <div
            className="admin-modal admin-delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h3>Confirm Delete</h3>
              <button className="admin-modal-close" onClick={closeDeleteModal}>
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
                Are you sure you want to delete this service? This action cannot
                be undone.
              </p>
              <div className="admin-row" style={{ gap: "1rem" }}>
                <button
                  className="admin-submit-btn"
                  onClick={closeDeleteModal}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
