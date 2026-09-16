import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import "../../../css/Website/admin/admin.css";
import AdminTopBar from "./AdminTopBar";
const API_BASE = `${window.API_BASE}/api/projects`;
const ADMIN_API = `${API_BASE}/admin/full`;

const initialFormData = {
  title: "",
  type: "",
  category: "",
  image: "",
  images: [],
  tech: "",
  liveLink: "",
  codeLink: "",
  featured: false,
  badge: "",
  price: "",
  originalPrice: "",
  techStack: "",
  features: [],
  includes: [],
  faqs: [],
  description: "",
  isForSale: true,
  showPrice: true,
  hidden: false,
};
const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(ADMIN_API);
      if (!res.ok) {
        const text = await res.text();
        console.error("Admin fetch failed:", res.status, text);
        throw new Error(`Server error ${res.status}`);
      }
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
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

  const filteredProjects = projects.filter((project) => {
    const q = searchQuery.toLowerCase();
    return (
      project.title?.toLowerCase().includes(q) ||
      project.category?.toLowerCase().includes(q)
    );
  });

  const openCreateModal = () => {
    setFormData(initialFormData);
    setPreviewImages([]);
    setMainImagePreview("");
    setEditingId(null);
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    const formattedProject = {
      ...project,
      tech: Array.isArray(project.tech)
        ? project.tech.join(", ")
        : project.tech || "",
      techStack: Array.isArray(project.techStack)
        ? project.techStack.join(", ")
        : project.techStack || "",
    };
    setFormData(formattedProject);

    const additionalImages = (project.images || []).filter(
      (img) => img !== project.image,
    );
    setPreviewImages(additionalImages);
    setMainImagePreview(project.image || "");

    setEditingId(project.id);
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

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File too large (max 5 MB)");
    }

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
      console.error("Upload failed:", res.status, detail);
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
      console.error("Main image upload failed:", err);
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
      console.error("Gallery upload failed:", err);
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

    const techArray =
      typeof formData.tech === "string"
        ? formData.tech
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : formData.tech;
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
    const includesArray = safeJsonArray(formData.includes)
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object")
          return item.text || item.title || item.label || "";
        return String(item);
      })
      .filter(Boolean);
    const featuresArray = safeJsonArray(formData.features)
      .map((item) => {
        if (typeof item === "string") return { title: item, description: "" };
        if (item && typeof item === "object") return item;
        return { title: "", description: "" };
      })
      .filter((item) => item.title);

    const faqsArray = safeJsonArray(formData.faqs)
      .map((item) => {
        if (typeof item === "string") return { q: item, a: "" };
        if (item && typeof item === "object") return item;
        return { q: "", a: "" };
      })
      .filter((item) => item.q);

    const imagesWithoutMain = safeArray(formData.images).filter(
      (img) => img !== formData.image,
    );
    const finalImages = formData.image
      ? [formData.image, ...imagesWithoutMain]
      : imagesWithoutMain;

    const projectData = {
      ...formData,
      tech: techArray,
      techStack: techStackArray,
      images: finalImages,
      features: featuresArray,
      includes: includesArray,
      faqs: faqsArray,
      isForSale: Boolean(formData.isForSale),
      showPrice: Boolean(formData.showPrice),
      hidden: Boolean(formData.hidden),
    };
    try {
      const url = editingId ? `${API_BASE}/${editingId}` : `${API_BASE}/`;
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      if (!res.ok) throw new Error("Failed to save project");
      const saved = await res.json();

      if (editingId) {
        setProjects((prev) =>
          prev.map((p) => (p.id === editingId ? saved : p)),
        );
      } else {
        setProjects((prev) => [...prev, saved]);
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
      setProjects((prev) => prev.filter((p) => p.id !== deleteTargetId));
      closeDeleteModal();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDropdownAction = async (action, project) => {
    setOpenDropdownId(null);
    if (action === "edit") openEditModal(project);
    else if (action === "delete") openDeleteModal(project.id);
    else if (action === "toggle-hidden") {
      try {
        const res = await fetch(`${API_BASE}/${project.id}/toggle-hidden`, {
          method: "PATCH",
        });
        if (!res.ok) throw new Error("Failed to toggle visibility");
        const updated = await res.json();
        setProjects((prev) =>
          prev.map((p) => (p.id === project.id ? updated : p)),
        );
      } catch (err) {
        alert("Error: " + err.message);
      }
    }
  };
  const totalProjects = projects.length;
  const featuredCount = projects.filter((p) => p.featured).length;
  const categories = [
    ...new Set(projects.map((p) => p.category).filter(Boolean)),
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
              <h2 className="admin-page-title">Projects</h2>
            </div>
            <AdminTopBar />
          </div>

          <div className="admin-stat-cards">
            {[
              {
                icon: "fa-solid fa-folder-open",
                value: totalProjects,
                label: "Total Projects",
                color: "#0891ff",
              },
              {
                icon: "fa-solid fa-star",
                value: featuredCount,
                label: "Featured",
                color: "#f59e0b",
              },
              {
                icon: "fa-solid fa-layer-group",
                value: categories,
                label: "Categories",
                color: "#10b981",
              },
              {
                icon: "fa-solid fa-eye",
                value: "1.2k",
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

          <div className="admin-actions-row">
            <div className="admin-search-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="admin-add-btn" onClick={openCreateModal}>
              <i className="fa-solid fa-plus"></i> Add Project
            </button>
          </div>

          {loading ? (
            <div className="admin-empty">
              <span className="admin-spinner"></span> Loading projects...
            </div>
          ) : error ? (
            <div className="admin-empty">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <p>{error}</p>
            </div>
          ) : (
            <motion.div className="pfg-grid" layout>
              <AnimatePresence mode="wait">
                {filteredProjects.length === 0 ? (
                  <motion.div
                    className="pfg-no-results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <i className="fa-solid fa-folder-open"></i>
                    <p>
                      {projects.length === 0
                        ? "No projects yet. Add your first project!"
                        : "No results found."}
                    </p>
                  </motion.div>
                ) : (
                  filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
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
                            project.image ||
                            "https://via.placeholder.com/800x500/0a0a0f/0891ff?text=No+Image"
                          }
                          alt={project.title}
                        />
                        <div className="pfg-card-overlay" />
                        <div className="pfg-type-badge">
                          {project.type || project.category}
                        </div>
                        {project.featured && (
                          <div className="pfg-featured-badge">
                            <i className="fa-solid fa-star"></i> Featured
                          </div>
                        )}
                        {project.hidden && (
                          <div
                            className="pfg-featured-badge"
                            style={{
                              background: "#ef4444",
                              top: project.featured ? "3.5rem" : "1rem",
                            }}
                          >
                            <i className="fa-solid fa-eye-slash"></i> Hidden
                          </div>
                        )}
                        <div className="admin-card-menu">
                          <button
                            className="admin-menu-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(
                                openDropdownId === project.id
                                  ? null
                                  : project.id,
                              );
                            }}
                          >
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </button>
                          {openDropdownId === project.id && (
                            <div className="admin-dropdown-menu-card">
                              <button
                                onClick={() =>
                                  handleDropdownAction("edit", project)
                                }
                              >
                                <i className="fa-solid fa-pen"></i> Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleDropdownAction("delete", project)
                                }
                              >
                                <i className="fa-solid fa-trash"></i> Delete
                              </button>
                              <button
                                onClick={() =>
                                  handleDropdownAction("toggle-hidden", project)
                                }
                              >
                                <i
                                  className={`fa-solid ${project.hidden ? "fa-eye" : "fa-eye-slash"}`}
                                ></i>
                                {project.hidden ? " Unhide" : " Hide"}
                              </button>
                              <a
                                href={`/project/${project.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="admin-dropdown-item"
                              >
                                <i className="fa-solid fa-eye"></i> View
                              </a>
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
                            onClick={() => openEditModal(project)}
                          >
                            <i className="fa-solid fa-pen"></i> Edit
                          </button>
                          <button
                            className="pfg-hover-btn secondary"
                            onClick={() => openDeleteModal(project.id)}
                          >
                            <i className="fa-solid fa-trash"></i> Delete
                          </button>
                        </motion.div>
                      </div>
                      <div className="pfg-card-info">
                        <h3 className="pfg-card-title">
                          {project.title || "Untitled Project"}
                        </h3>
                        <p className="pfg-card-desc">
                          {project.desc || "No description yet."}
                        </p>
                        <div className="pfg-card-tech">
                          {Array.isArray(project.tech) &&
                          project.tech.length > 0 ? (
                            project.tech.map((t, i) => (
                              <span key={i} className="pfg-tech-tag">
                                {t}
                              </span>
                            ))
                          ) : (
                            <span className="pfg-tech-tag">No tech</span>
                          )}
                        </div>
                        <a
                          href={`/project/${project.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pfg-card-link"
                        >
                          View Details{" "}
                          <i className="fa-solid fa-arrow-right"></i>
                        </a>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      {modalOpen && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingId ? "Edit Project" : "Add Project"}</h3>
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
                  <label>Type</label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="admin-row">
                <div className="admin-input-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="design">Design</option>
                    <option value="development">Development</option>
                    <option value="ai">AI & Automation</option>
                    <option value="other">Other</option>
                  </select>
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
              <div className="admin-row">
                <div className="admin-input-group">
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="admin-input-group">
                  <label>Original Price</label>
                  <input
                    type="text"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="admin-row">
                <div className="admin-input-group">
                  <label>Badge</label>
                  <input
                    type="text"
                    name="badge"
                    value={formData.badge}
                    onChange={handleChange}
                  />
                </div>
                <div className="admin-input-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                    />{" "}
                    Featured
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="isForSale"
                      checked={formData.isForSale}
                      onChange={handleChange}
                    />{" "}
                    For Sale
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="showPrice"
                      checked={formData.showPrice}
                      onChange={handleChange}
                    />{" "}
                    Show Price
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="hidden"
                      checked={formData.hidden}
                      onChange={handleChange}
                    />{" "}
                    Hidden (hide from site)
                  </label>
                </div>
              </div>
              <div className="admin-row">
                <div className="admin-input-group">
                  <label>Live Link</label>
                  <input
                    type="url"
                    name="liveLink"
                    value={formData.liveLink}
                    onChange={handleChange}
                  />
                </div>
                <div className="admin-input-group">
                  <label>Code Link</label>
                  <input
                    type="url"
                    name="codeLink"
                    value={formData.codeLink}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="admin-input-group full">
                <label>Short Description</label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  rows="2"
                ></textarea>
              </div>
              <div className="admin-input-group full">
                <label>Full Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>
              <div className="admin-input-group full">
                <label>Tech Stack (comma separated)</label>
                <input
                  type="text"
                  name="tech"
                  value={formData.tech}
                  onChange={handleChange}
                  placeholder="React, Node.js"
                />
              </div>
              <div className="admin-input-group full">
                <label>Detailed Tech Stack (comma separated)</label>
                <input
                  type="text"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleChange}
                  placeholder="React, Node.js"
                />
              </div>

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
                <label>Features (JSON)</label>
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
                <label>Includes (JSON array)</label>
                <textarea
                  value={
                    typeof formData.includes === "string"
                      ? formData.includes
                      : JSON.stringify(formData.includes, null, 2)
                  }
                  onChange={(e) => handleJSONField("includes", e.target.value)}
                  rows="3"
                ></textarea>
              </div>
              <div className="admin-input-group full">
                <label>FAQs (JSON array)</label>
                <textarea
                  value={
                    typeof formData.faqs === "string"
                      ? formData.faqs
                      : JSON.stringify(formData.faqs, null, 2)
                  }
                  onChange={(e) => handleJSONField("faqs", e.target.value)}
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
                  <>{editingId ? "Update Project" : "Add Project"}</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

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
                Are you sure you want to delete this project? This action cannot
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

export default AdminProjects;
