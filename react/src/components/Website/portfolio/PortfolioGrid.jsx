import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "../../../css/Website/portfolio/portfolioGrid.css";

const API_BASE = window.API_BASE + "/api/projects";
const PortfolioGrid = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/`);
        if (!res.ok) throw new Error("Failed to load projects");
        const data = await res.json();
        setProjects(data.filter((p) => !p.hidden));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filters = [
    { id: "all", label: "All Projects", icon: "fa-solid fa-grid-2" },
    { id: "design", label: "Design", icon: "fa-solid fa-palette" },
    { id: "development", label: "Development", icon: "fa-solid fa-code" },
    { id: "ai", label: "AI & Automation", icon: "fa-solid fa-robot" },
  ];
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

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
    <section className="pfg-section" id="portfolio-grid" ref={sectionRef}>
      {/* Background (unchanged) */}
      <div className="pfg-bg-shapes">
        {[
          { size: 280, x: "5%", y: "20%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 220, x: "85%", y: "45%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 200, x: "50%", y: "75%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="pfg-shape"
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

      <div className="pfg-grid-lines">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="pfg-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="pfg-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      <div className="pfg-particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="pfg-particle"
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
        className="pfg-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="pfg-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            My Work
          </motion.div>
          <motion.h2 className="section-title">
            <span className="title-line">
              Recent <span className="highlight-text">Projects</span>
            </span>
          </motion.h2>
          <motion.p className="section-description">
            Explore my latest work and creative solutions
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div className="pfg-filters" variants={fadeUpVariants}>
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              className={`pfg-filter-btn ${activeFilter === filter.id ? "active" : ""}`}
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
            className="pfg-no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>Loading projects...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            className="pfg-no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <i className="fa-solid fa-triangle-exclamation"></i>
            <p>{error}</p>
          </motion.div>
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
                  <p>No projects found in this category yet.</p>
                </motion.div>
              ) : (
                filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="pfg-card"
                    variants={cardVariants}
                    layout
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    whileHover={{
                      y: -8,
                      borderColor: "rgba(8, 145, 255, 0.5)",
                      boxShadow: "0 25px 70px rgba(8, 145, 255, 0.12)",
                    }}
                  >
                    {/* Card Image */}
                    <div className="pfg-card-image">
                      <img
                        src={
                          project.image ||
                          "https://via.placeholder.com/800x500/0a0a0f/0891ff?text=No+Image"
                        }
                        alt={project.title}
                        loading="lazy"
                      />
                      <div className="pfg-card-overlay" />

                      {/* Project Type Badge */}
                      <div className="pfg-type-badge">
                        {project.type || project.category}
                      </div>

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="pfg-featured-badge">
                          <i className="fa-solid fa-star"></i> Featured
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <AnimatePresence>
                        {hoveredProject === project.id && (
                          <motion.div
                            className="pfg-card-hover"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <a
                              href={`/project/${project.id}`}
                              className="pfg-hover-btn primary"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa-solid fa-arrow-up-right-from-square"></i>{" "}
                              View Project
                            </a>
                            <a
                              href={project.codeLink}
                              className="pfg-hover-btn secondary"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa-brands fa-github"></i> Source
                              Code
                            </a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Card Info */}
                    <div className="pfg-card-info">
                      <h3 className="pfg-card-title">{project.title}</h3>
                      <p className="pfg-card-desc">{project.desc}</p>

                      {/* Tech Stack */}
                      <div className="pfg-card-tech">
                        {(Array.isArray(project.tech) ? project.tech : []).map(
                          (t, i) => (
                            <span key={i} className="pfg-tech-tag">
                              {t}
                            </span>
                          ),
                        )}
                      </div>

                      {/* View Project Link */}
                      <Link
                        to={`/project/${project.id}`}
                        className="pfg-card-link"
                      >
                        View Details <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
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

export default PortfolioGrid;
