import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import "../../../css/Website/portfolio/featuredProject.css";

const FeaturedProject = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const project = {
    title: "E-Commerce Platform Pro",
    type: "Featured Project",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop",
    description:
      "A full-featured e-commerce platform built with modern technologies. Features include real-time inventory management, Stripe payment integration, advanced admin dashboard with analytics, order tracking, multi-vendor support, and responsive design optimized for all devices.",
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Stripe",
      "Redux",
      "Tailwind CSS",
      "JWT Auth",
      "AWS S3",
    ],
    highlights: [
      { icon: "fa-solid fa-cart-shopping", text: "Advanced Shopping Cart" },
      { icon: "fa-solid fa-credit-card", text: "Stripe Payment Gateway" },
      { icon: "fa-solid fa-chart-line", text: "Real-time Analytics" },
      { icon: "fa-solid fa-users", text: "Multi-Vendor Support" },
      { icon: "fa-solid fa-mobile-screen", text: "Fully Responsive" },
      { icon: "fa-solid fa-shield-halved", text: "Secure Authentication" },
    ],
    stats: [
      { value: "1.2k+", label: "Lines of Code" },
      { value: "40+", label: "Components" },
      { value: "15+", label: "API Endpoints" },
      { value: "100%", label: "Responsive" },
    ],
    liveLink: "#",
    codeLink: "#",
  };

  return (
    <section className="fps-section" ref={sectionRef}>
      {/* Background */}
      <div className="fps-bg-shapes">
        {[
          { size: 350, x: "5%", y: "25%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 280, x: "80%", y: "50%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 220, x: "40%", y: "75%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="fps-shape"
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

      <div className="fps-grid-lines">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="fps-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="fps-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      <div className="fps-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="fps-particle"
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
        className="fps-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="fps-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Featured Work
          </motion.div>
          <motion.h2 className="section-title">
            <span className="title-line">
              Project <span className="highlight-text">Showcase</span>
            </span>
          </motion.h2>
          <motion.p className="section-description">
            A deep dive into one of my best projects
          </motion.p>
        </motion.div>

        {/* Featured Project Card */}
        <motion.div className="fps-card" variants={fadeUpVariants}>
          <div className="fps-card-grid">
            {/* Left - Image */}
            <motion.div
              className="fps-image-wrapper"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <img src={project.image} alt={project.title} />
              <div className="fps-image-overlay" />
              <div className="fps-image-badge">
                <i className="fa-solid fa-star"></i> {project.type}
              </div>
            </motion.div>

            {/* Right - Content */}
            <div className="fps-content">
              <motion.div
                className="fps-content-header"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="fps-project-title">{project.title}</h3>
                <p className="fps-project-desc">{project.description}</p>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                className="fps-tech-stack"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h4>
                  <i className="fa-solid fa-microchip"></i> Tech Stack
                </h4>
                <div className="fps-tech-grid">
                  {project.tech.map((t, i) => (
                    <span key={i} className="fps-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Highlights */}
              <motion.div
                className="fps-highlights"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <h4>
                  <i className="fa-solid fa-list-check"></i> Key Highlights
                </h4>
                <div className="fps-highlights-grid">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="fps-highlight-item">
                      <i className={h.icon}></i>
                      <span>{h.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                className="fps-stats-row"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                {project.stats.map((stat, i) => (
                  <div key={i} className="fps-stat">
                    <span className="fps-stat-value">{stat.value}</span>
                    <span className="fps-stat-label">{stat.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="fps-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <a
                  href={project.liveLink}
                  className="fps-btn primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>{" "}
                  Live Demo
                </a>
                <a
                  href={project.codeLink}
                  className="fps-btn secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-github"></i> View Source Code
                </a>
              </motion.div>
            </div>
          </div>
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

export default FeaturedProject;
