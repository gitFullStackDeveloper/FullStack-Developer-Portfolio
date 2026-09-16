import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import "../../../css/Website/home/services.css";

const API_BASE = `${window.API_BASE}/api/services`;

const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---------- Fetch real services ----------
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 0.7,
        ease: "backOut",
      },
    }),
  };

  return (
    <section className="services-section" ref={sectionRef}>
      {/* Background Shapes */}
      <div className="services-bg-shapes">
        {[
          { size: 180, x: "10%", y: "15%", color: "rgba(8, 145, 255, 0.06)" },
          { size: 220, x: "85%", y: "40%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 160, x: "45%", y: "75%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 130, x: "70%", y: "10%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="services-shape"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
              background: shape.color,
            }}
            animate={{
              y: [-35, 35, -35],
              x: [-18, 18, -18],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 9 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid Lines */}
      <div className="services-grid">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="services-grid-line vertical"
            style={{ left: `${(i + 1) * 16.66}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={
              isInView
                ? { scaleY: 1, opacity: 0.03 }
                : { scaleY: 0, opacity: 0 }
            }
            transition={{ delay: 0.3 + i * 0.12, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="services-grid-line horizontal"
            style={{ top: `${(i + 1) * 20}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              isInView
                ? { scaleX: 1, opacity: 0.03 }
                : { scaleX: 0, opacity: 0 }
            }
            transition={{ delay: 0.5 + i * 0.12, duration: 1 }}
          />
        ))}
      </div>

      {/* Particle Effect */}
      <div className="services-particles">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="services-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              y: [0, -90],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="services-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="services-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            My Services
          </motion.div>

          <motion.h2 className="section-title">
            <span className="title-line">
              What I <span className="highlight-text">Offer</span>
            </span>
          </motion.h2>

          <motion.p className="section-description" variants={fadeUpVariants}>
            Comprehensive development services tailored to bring your ideas to
            life
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        {loading ? (
          <div
            className="pfg-no-results"
            style={{ textAlign: "center", padding: "2rem" }}
          >
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>Loading services...</p>
          </div>
        ) : error ? (
          <div
            className="pfg-no-results"
            style={{ textAlign: "center", padding: "2rem" }}
          >
            <i className="fa-solid fa-triangle-exclamation"></i>
            <p>{error}</p>
          </div>
        ) : services.length === 0 ? (
          <div
            className="pfg-no-results"
            style={{ textAlign: "center", padding: "2rem" }}
          >
            <i className="fa-solid fa-folder-open"></i>
            <p>No services yet. Add your first service from the admin panel!</p>
          </div>
        ) : (
          <motion.div
            className="services-grid-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "2rem",
            }}
          >
            {services.slice(0, 4).map((service, i) => (
              <motion.div
                key={service.id}
                className="service-card"
                custom={i}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  borderColor: "rgba(8, 145, 255, 0.5)",
                  boxShadow:
                    "0 25px 70px rgba(8, 145, 255, 0.15), 0 0 100px rgba(8, 145, 255, 0.05)",
                }}
              >
                <div className="service-image-wrapper">
                  <img
                    src={
                      service.image ||
                      "https://via.placeholder.com/800x500/0a0a0f/0891ff?text=No+Image"
                    }
                    alt={service.title}
                    className="service-image"
                    loading="lazy"
                  />
                  <div className="service-image-overlay" />

                  <div className="service-icon-badge">
                    <i className={service.icon || "fa-solid fa-code"}></i>
                  </div>

                  <motion.div
                    className="service-hover-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={`/service/${service.slug}`}
                      className="service-view-btn"
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
                  </motion.div>

                  {/* Image Glow Effect */}
                  <motion.div
                    className="service-image-glow"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* Card Content */}
                <div className="service-card-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>

                  {/* Tags */}
                  <div className="service-tags">
                    {(service.tags || []).map((tag, j) => (
                      <span key={j} className="service-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/service/${service.slug}`}
                    className="service-link"
                  >
                    <motion.span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                      whileHover={{ x: 5 }}
                    >
                      Learn More
                      <motion.span
                        className="link-arrow"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Explore More Button */}
        <motion.div
          className="explore-more-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link to="/services" className="explore-more-btn">
            <span className="explore-icon">
              <i className="fa-solid fa-folder-open"></i>
            </span>
            Explore More Services
            <motion.span
              className="explore-arrow"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />
    </section>
  );
};

export default Services;
