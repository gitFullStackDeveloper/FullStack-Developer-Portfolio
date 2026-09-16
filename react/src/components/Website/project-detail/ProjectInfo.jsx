import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import "../../../css/Website/project-detail/projectInfo.css";

const ProjectInfo = ({ project }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Fallbacks
  const price = project.price || "0";
  const originalPrice = project.originalPrice || "";
  const description =
    project.description || project.desc || "No description available.";
  const techStack = project.techStack?.length
    ? project.techStack
    : project.tech || [];

  // For sale flag (default true for old projects)
  const isForSale = project.isForSale === undefined ? true : project.isForSale;
  const formatText = (text) => {
    if (!text) return "";
    // Escape HTML special characters
    const escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
    return escaped.replace(/\n/g, "<br>");
  };
  return (
    <section className="pdi-section" ref={sectionRef}>
      {/* Background unchanged */}
      <div className="pdi-bg-shapes">
        {[
          { size: 250, x: "80%", y: "30%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 200, x: "10%", y: "60%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="pdi-shape"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
              background: shape.color,
            }}
            animate={{ y: [-30, 30, -30], scale: [1, 1.05, 1] }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="pdi-grid-lines">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="pdi-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="pdi-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      <div className="pdi-particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="pdi-particle"
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

      <div className="pdi-container">
        <motion.div
          className="pdi-info"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="pdi-category-badge"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <span className="category-dot" /> {project.category || "Project"}
          </motion.div>

          <motion.h1
            className="pdi-title"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            {project.title}
          </motion.h1>
          <motion.p
            className="pdi-desc"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            dangerouslySetInnerHTML={{ __html: formatText(description) }}
          />
          {/* Price Card or Showcase Card */}
          {isForSale ? (
            <motion.div
              className="pdi-price-card"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              whileHover={{
                borderColor: "rgba(8, 145, 255, 0.4)",
                boxShadow: "0 15px 50px rgba(8, 145, 255, 0.08)",
              }}
            >
              {project.showPrice && (
                <div className="pdi-price-left">
                  <div className="pdi-price-header">
                    <i className="fa-solid fa-tag"></i> One-Time Purchase
                  </div>
                  <div className="pdi-price-main">
                    <span className="pdi-currency">$</span>
                    <span className="pdi-amount">{price.replace("$", "")}</span>
                  </div>
                  {originalPrice && (
                    <div className="pdi-price-sub">
                      <span className="pdi-original">{originalPrice}</span>
                      <span className="pdi-save">
                        Save{" "}
                        {Math.round(
                          ((parseInt(
                            originalPrice.replace("$", "").replace(",", ""),
                          ) -
                            parseInt(price.replace("$", "").replace(",", ""))) /
                            parseInt(
                              originalPrice.replace("$", "").replace(",", ""),
                            )) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                  )}
                </div>
              )}
              <div className="pdi-price-right">
                <Link to="/contact" className="pdi-buy-now-btn">
                  <i className="fa-solid fa-bolt"></i> Buy Now{" "}
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <div className="pdi-guarantee">
                  <i className="fa-solid fa-shield-halved"></i> 30-Day Money
                  Back
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="pdi-showcase-card"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <i className="fa-solid fa-lock-open"></i>
              <div>
                <h4>Showcase Project</h4>
                <p>
                  This project is available for viewing only. Contact me to
                  discuss a similar solution.
                </p>
                {project.showPrice && (
                  <div
                    className="showcase-price"
                    style={{ marginTop: "0.8rem" }}
                  >
                    <span className="pdi-currency">$</span>
                    <span className="pdi-amount" style={{ fontSize: "1.5rem" }}>
                      {price.replace("$", "")}
                    </span>
                  </div>
                )}
              </div>
              <Link
                to="/contact"
                className="pdi-buy-now-btn"
                style={{ marginLeft: "auto" }}
              >
                <i className="fa-solid fa-envelope"></i> Contact Me
              </Link>
            </motion.div>
          )}

          <motion.div
            className="pdi-general-info"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <div className="pdi-info-item">
              <i className="fa-solid fa-code"></i>
              <div>
                <span className="info-label">Technologies</span>
                <span className="info-value">{techStack.length} used</span>
              </div>
            </div>
            <div className="pdi-info-item">
              <i className="fa-solid fa-tags"></i>
              <div>
                <span className="info-label">Category</span>
                <span className="info-value">
                  {project.category || "General"}
                </span>
              </div>
            </div>
            <div className="pdi-info-item">
              <i className="fa-solid fa-circle-info"></i>
              <div>
                <span className="info-label">Status</span>
                <span className="info-value">
                  {isForSale ? "Available for Purchase" : "Showcase Only"}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="pdi-tech-section"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <div className="pdi-tech-header">
              <i className="fa-solid fa-microchip"></i>
              <h4>Tech Stack</h4>
            </div>
            <div className="pdi-tech-grid">
              {techStack.map((tech, i) => (
                <motion.span
                  key={i}
                  className="pdi-tech-tag"
                  whileHover={{
                    scale: 1.05,
                    background: "rgba(8, 145, 255, 0.15)",
                    borderColor: "rgba(8, 145, 255, 0.5)",
                    color: "#0891ff",
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectInfo;
