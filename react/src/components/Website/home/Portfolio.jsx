import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import "../../../css/Website/home/portfolio.css";
const API_BASE = `${window.API_BASE}/api/projects`;

const Portfolio = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [currentPage, setCurrentPage] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---------- Fetch real projects from API ----------
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_BASE}/`);
        if (!res.ok) throw new Error("Failed to load projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
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

  const projectsPerPage = 2;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const nextPage = () => {
    if (totalPages === 0) return;
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    if (totalPages === 0) return;
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage,
  );

  return (
    <section className="portfolio-section" ref={sectionRef}>
      {/* Background Shapes */}
      <div className="portfolio-bg-shapes">
        {[
          { size: 220, x: "8%", y: "20%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 190, x: "85%", y: "55%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 170, x: "50%", y: "75%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="portfolio-shape"
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
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid Lines */}
      <div className="portfolio-grid">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="portfolio-grid-line vertical"
            style={{ left: `${(i + 1) * 16.66}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={
              isInView
                ? { scaleY: 1, opacity: 0.03 }
                : { scaleY: 0, opacity: 0 }
            }
            transition={{ delay: 0.3 + i * 0.1, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="portfolio-grid-line horizontal"
            style={{ top: `${(i + 1) * 20}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              isInView
                ? { scaleX: 1, opacity: 0.03 }
                : { scaleX: 0, opacity: 0 }
            }
            transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
          />
        ))}
      </div>

      {/* Particle Effect */}
      <div className="portfolio-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="portfolio-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              y: [0, -80],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="portfolio-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* Section Header */}
        <motion.div className="portfolio-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Portfolio
          </motion.div>

          <motion.h2 className="section-title">
            <span className="title-line">
              My Recent <span className="highlight-text">Projects</span>
            </span>
          </motion.h2>

          <motion.p className="section-description" variants={fadeUpVariants}>
            Showcasing some of my best work and creative solutions
          </motion.p>
        </motion.div>

        {/* Explore All Button */}
        <motion.div
          className="explore-all-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.a
            href="/portfolio"
            className="explore-all-btn"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(8, 145, 255, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="explore-icon">
              <i className="fa-solid fa-folder-open"></i>
            </span>
            Explore All Projects
            <motion.span
              className="explore-arrow"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
        <br />
        <br />

        {/* Portfolio Carousel */}
        {loading ? (
          <div
            className="pfg-no-results"
            style={{ textAlign: "center", padding: "2rem" }}
          >
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>Loading projects...</p>
          </div>
        ) : error ? (
          <div
            className="pfg-no-results"
            style={{ textAlign: "center", padding: "2rem" }}
          >
            <i className="fa-solid fa-triangle-exclamation"></i>
            <p>{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div
            className="pfg-no-results"
            style={{ textAlign: "center", padding: "2rem" }}
          >
            <i className="fa-solid fa-folder-open"></i>
            <p>No projects yet. Add your first project from the admin panel!</p>
          </div>
        ) : (
          <div className="portfolio-carousel">
            <motion.button
              className="carousel-arrow prev"
              onClick={prevPage}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(8, 145, 255, 0.2)",
              }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </motion.button>

            <motion.button
              className="carousel-arrow next"
              onClick={nextPage}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(8, 145, 255, 0.2)",
              }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.button>

            {/* Projects Display */}
            <div className="projects-grid">
              <AnimatePresence mode="wait">
                {currentProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="project-card"
                    initial={{ opacity: 0, x: 100, rotateY: -15 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    exit={{ opacity: 0, x: -100, rotateY: 15 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {/* Project Image */}
                    <div className="project-image-wrapper">
                      <img
                        src={
                          project.image ||
                          "https://via.placeholder.com/800x500/0a0a0f/0891ff?text=No+Image"
                        }
                        alt={project.title}
                        className="project-image"
                        loading="lazy"
                      />
                      <div className="project-image-overlay" />

                      {/* Category Badge */}
                      <div className="project-category-badge">
                        {project.category || project.type}
                      </div>

                      {/* Hover Overlay */}
                      <motion.div
                        className="project-hover-overlay"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.a
                          href={`/project/${project.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-view-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
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
                          View Project
                        </motion.a>
                      </motion.div>
                    </div>

                    {/* Project Info */}
                    <div className="project-info">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">
                        {project.desc || project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="project-tech-stack">
                        {Array.isArray(project.tech) &&
                          project.tech.map((tech, i) => (
                            <span key={i} className="project-tech-tag">
                              {tech}
                            </span>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {/* Pagination Dots */}
            <div className="carousel-pagination">
              {Array.from({ length: totalPages }).map((_, index) => (
                <motion.button
                  key={index}
                  className={`pagination-dot ${index === currentPage ? "active" : ""}`}
                  onClick={() => setCurrentPage(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={
                    index === currentPage ? { scale: 1.2 } : { scale: 1 }
                  }
                >
                  {index === currentPage && (
                    <motion.div
                      className="active-dot-inner"
                      layoutId="activeDot"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Page Counter */}
            <div className="carousel-counter">
              <span className="counter-current">
                {String(currentPage + 1).padStart(2, "0")}
              </span>
              <span className="counter-separator">/</span>
              <span className="counter-total">
                {String(totalPages).padStart(2, "0")}
              </span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Corner Decorations */}
      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />
    </section>
  );
};

export default Portfolio;
