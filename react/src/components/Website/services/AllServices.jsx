import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import "../../../css/Website/services/allServices.css";

const API_BASE = window.API_BASE + "/api/services";

const AllServices = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeFilter, setActiveFilter] = useState("all");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_BASE + "/");
        if (!res.ok) throw new Error("Failed to load services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filters = [
    { id: "all", label: "All Services", icon: "fa-solid fa-grid-2" },
    { id: "design", label: "Design", icon: "fa-solid fa-palette" },
    { id: "development", label: "Development", icon: "fa-solid fa-code" },
    { id: "ai", label: "AI & Automation", icon: "fa-solid fa-robot" },
  ];

  const filteredServices =
    activeFilter === "all"
      ? services
      : services.filter((service) => service.category === activeFilter);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "backOut" },
    },
  };

  return (
    <section
      className="all-services-section"
      id="all-services"
      ref={sectionRef}
    >
      {/* Background shapes */}
      <div className="as-bg-shapes">
        {[
          { size: 250, x: "5%", y: "20%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 200, x: "85%", y: "40%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 180, x: "50%", y: "70%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="as-shape"
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

      <div className="as-grid-lines">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="as-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="as-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      <div className="as-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="as-particle"
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
        className="as-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div className="as-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            What I Offer
          </motion.div>
          <motion.h2 className="section-title">
            <span className="title-line">
              My <span className="highlight-text">Services</span>
            </span>
          </motion.h2>
          <motion.p className="section-description">
            Comprehensive solutions tailored to your business needs
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div className="as-filters" variants={fadeUpVariants}>
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              className={`as-filter-btn ${activeFilter === filter.id ? "active" : ""}`}
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
            className="as-no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>Loading services...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            className="as-no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <i className="fa-solid fa-triangle-exclamation"></i>
            <p>{error}</p>
          </motion.div>
        ) : (
          <motion.div className="as-grid" layout>
            {filteredServices.length === 0 ? (
              <motion.div
                className="as-no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
                <p>No services found in this category</p>
              </motion.div>
            ) : (
              filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  className="as-card"
                  variants={cardVariants}
                  layout
                  whileHover={{
                    y: -8,
                    borderColor: "rgba(8, 145, 255, 0.5)",
                    boxShadow: "0 20px 60px rgba(8, 145, 255, 0.12)",
                  }}
                >
                  <div className="as-card-image">
                    <img
                      src={
                        service.image ||
                        "https://via.placeholder.com/800x500/0a0a0f/0891ff?text=No+Image"
                      }
                      alt={service.title}
                      loading="lazy"
                    />
                    <div className="as-card-overlay" />
                    <div className="as-card-icon">
                      <i className={service.icon}></i>
                    </div>
                    <motion.div
                      className="as-card-hover-overlay"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.slug ? (
                        <Link
                          to={`/service/${service.slug}`}
                          className="as-card-view-btn"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          View Details
                        </Link>
                      ) : (
                        <span
                          className="as-card-view-btn"
                          style={{ cursor: "not-allowed", opacity: 0.7 }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          No Slug
                        </span>
                      )}
                    </motion.div>
                  </div>

                  <div className="as-card-content">
                    <h3 className="as-card-title">{service.title}</h3>
                    <p className="as-card-desc">{service.description}</p>
                    <div className="as-card-tags">
                      {service.tags && service.tags.length > 0 ? (
                        service.tags.map((tag, i) => (
                          <span key={i} className="as-tag">
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="as-tag">No tags</span>
                      )}
                    </div>
                    {service.slug ? (
                      <Link
                        to={`/service/${service.slug}`}
                        className="as-card-link"
                      >
                        Learn More <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    ) : (
                      <span
                        className="as-card-link"
                        style={{ opacity: 0.5, cursor: "default" }}
                      >
                        Learn More <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </motion.div>

      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />
    </section>
  );
};

export default AllServices;
