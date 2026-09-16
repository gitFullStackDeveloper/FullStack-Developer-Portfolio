import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import "../../../css/Website/projects/availableProjects.css";

const API_BASE = window.API_BASE + "/api/projects";
const AvailableProjects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeFilter, setActiveFilter] = useState("all");
  const filters = [
    { id: "all", label: "All Projects", icon: "fa-solid fa-grid-2" },
    { id: "design", label: "Design", icon: "fa-solid fa-palette" },
    { id: "development", label: "Development", icon: "fa-solid fa-code" },
    { id: "ai", label: "AI & Automation", icon: "fa-solid fa-robot" },
    { id: "other", label: "Other", icon: "fa-solid fa-folder" },
  ];

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/`); // backend filters hidden already
        if (!res.ok) throw new Error("Failed to load projects");
        const data = await res.json();
        if (!cancelled) setProjects(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProjects = useMemo(
    () =>
      activeFilter === "all"
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [projects, activeFilter],
  );
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "backOut" },
    },
  };

  return (
    <section className="avp-section" id="available-projects" ref={sectionRef}>
      {/* Background */}
      <div className="avp-bg-shapes">
        {[
          { size: 250, x: "8%", y: "25%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 200, x: "85%", y: "50%", color: "rgba(8, 145, 255, 0.03)" },
          { size: 180, x: "45%", y: "75%", color: "rgba(8, 145, 255, 0.04)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="avp-shape"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
              background: shape.color,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="avp-grid-lines">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="avp-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="avp-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      <div className="avp-particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="avp-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{ y: [0, -80], opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        className="avp-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="avp-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Available Projects
          </motion.div>
          <motion.h2 className="section-title">
            <span className="title-line">
              Ready to <span className="highlight-text">Launch</span>
            </span>
          </motion.h2>
          <motion.p className="section-description">
            Premium projects with full source code - buy once, own forever
          </motion.p>
        </motion.div>
        {/* Filter Buttons */}
        <motion.div className="avp-filters" variants={fadeUpVariants}>
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              className={`avp-filter-btn ${activeFilter === filter.id ? "active" : ""}`}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className={filter.icon}></i> {filter.label}
            </motion.button>
          ))}
        </motion.div>
        {loading ? (
          <motion.div
            className="avp-no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>Loading projects...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            className="avp-no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <i className="fa-solid fa-triangle-exclamation"></i>
            <p>{error}</p>
          </motion.div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            className="avp-no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <i className="fa-solid fa-box-open"></i>
            <p>No projects found in this category yet. Check back soon!</p>
          </motion.div>
        ) : (
          <motion.div className="avp-grid" layout>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="avp-card"
                variants={cardVariants}
                layout
                whileHover={{
                  y: -8,
                  borderColor: "rgba(8, 145, 255, 0.5)",
                  boxShadow: "0 25px 70px rgba(8, 145, 255, 0.12)",
                }}
              >
                {/* Card Image */}
                <div className="avp-card-image">
                  <img
                    src={
                      project.image ||
                      "https://via.placeholder.com/600x400/0a0a0f/0891ff?text=No+Image"
                    }
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="avp-card-overlay" />
                  {project.badge && (
                    <div
                      className="avp-card-badge"
                      style={{ background: project.badgeColor || "#0891ff" }}
                    >
                      <i className="fa-solid fa-star"></i> {project.badge}
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <motion.div
                    className="avp-card-hover"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {project.isForSale !== false ? (
                      <Link to="/contact" className="avp-buy-btn">
                        <i className="fa-solid fa-cart-shopping"></i> Buy Now
                      </Link>
                    ) : (
                      <Link to="/contact" className="avp-buy-btn">
                        <i className="fa-solid fa-envelope"></i> Contact
                      </Link>
                    )}
                    <Link
                      to={`/project/${project.id}`}
                      className="avp-detail-btn"
                    >
                      <i className="fa-solid fa-eye"></i> Preview
                    </Link>
                  </motion.div>
                </div>

                {/* Card Info */}
                <div className="avp-card-info">
                  <div className="avp-card-header">
                    <h3 className="avp-card-title">{project.title}</h3>
                    {project.price &&
                      project.showPrice !== false &&
                      project.isForSale !== false && (
                        <div className="avp-price-block">
                          <div className="avp-price-main">
                            <span className="avp-price-currency">$</span>
                            <span className="avp-price-amount">
                              {project.price.replace("$", "")}
                            </span>
                          </div>
                          {project.originalPrice && (
                            <div className="avp-price-discount">
                              <span className="avp-original-price">
                                {project.originalPrice}
                              </span>
                              <span className="avp-save-badge">
                                Save{" "}
                                {Math.round(
                                  ((parseInt(
                                    project.originalPrice
                                      .replace("$", "")
                                      .replace(",", ""),
                                  ) -
                                    parseInt(
                                      project.price
                                        .replace("$", "")
                                        .replace(",", ""),
                                    )) /
                                    parseInt(
                                      project.originalPrice
                                        .replace("$", "")
                                        .replace(",", ""),
                                    )) *
                                    100,
                                )}
                                %
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                  <p className="avp-card-desc">
                    {project.desc || project.description || "No description."}
                  </p>
                  <div className="avp-card-tech">
                    {(Array.isArray(project.tech) ? project.tech : []).map(
                      (t, i) => (
                        <span key={i} className="avp-tech-tag">
                          {t}
                        </span>
                      ),
                    )}
                  </div>
                  {project.price &&
                  project.showPrice !== false &&
                  project.isForSale !== false ? (
                    <Link to="/contact" className="avp-card-buy-btn">
                      <i className="fa-solid fa-bolt"></i> Buy Now -{" "}
                      {project.price}
                    </Link>
                  ) : (
                    <Link to="/contact" className="avp-card-buy-btn">
                      <i className="fa-solid fa-envelope"></i> Contact Me
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}{" "}
      </motion.div>

      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />
    </section>
  );
};

export default AvailableProjects;
