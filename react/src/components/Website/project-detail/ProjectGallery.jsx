import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import "../../../css/Website/project-detail/projectGallery.css";

const ProjectGallery = ({ project }) => {
  const galleryImages = [project.image, ...(project.images || [])]
    .filter(Boolean)
    .filter((img, index, arr) => arr.indexOf(img) === index);
  const [activeImage, setActiveImage] = useState(0);
  const [fullViewImage, setFullViewImage] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const openFullView = (index) => {
    setFullViewImage(index);
  };

  const closeFullView = () => {
    setFullViewImage(null);
  };

  return (
    <section className="pdg-section" ref={sectionRef}>
      <div className="pdg-bg-shapes">
        {[
          { size: 300, x: "5%", y: "15%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 250, x: "85%", y: "50%", color: "rgba(8, 145, 255, 0.04)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="pdg-shape"
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

      <div className="pdg-grid-lines">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="pdg-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="pdg-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      <div className="pdg-particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="pdg-particle"
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

      <div className="pdg-container">
        <br />
        <br />
        <motion.div
          className="pdg-gallery"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="pdg-main-image-container">
            <div className="pdg-main-image-wrapper">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  className="pdg-main-image"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={galleryImages[activeImage]}
                    alt={`${project.title} - ${activeImage + 1}`}
                    onClick={() => openFullView(activeImage)}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="pdg-image-gradient" />
                </motion.div>
              </AnimatePresence>

              {project.badge && (
                <motion.div
                  className="pdg-badge"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <i className="fa-solid fa-star"></i> {project.badge}
                </motion.div>
              )}

              {galleryImages.length > 1 && (
                <>
                  <button
                    className="pdg-nav-arrow prev"
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev === 0 ? galleryImages.length - 1 : prev - 1,
                      )
                    }
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button
                    className="pdg-nav-arrow next"
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev === galleryImages.length - 1 ? 0 : prev + 1,
                      )
                    }
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </>
              )}

              <div className="pdg-image-counter">
                <span className="counter-current">{activeImage + 1}</span>
                <span className="counter-separator">/</span>
                <span className="counter-total">{galleryImages.length}</span>
              </div>
            </div>
          </div>

          {galleryImages.length > 1 && (
            <div className="pdg-thumbnails-container">
              <div className="pdg-thumbnails">
                {galleryImages.map((img, i) => (
                  <motion.div
                    key={i}
                    className={`pdg-thumb ${activeImage === i ? "active" : ""}`}
                    onClick={() => setActiveImage(i)}
                    whileHover={{
                      y: -3,
                      borderColor: "rgba(8, 145, 255, 0.8)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openFullView(i);
                      }}
                    />
                    <div
                      className={`pdg-thumb-overlay ${activeImage === i ? "active" : ""}`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {fullViewImage !== null && (
          <motion.div
            className="pdg-full-view-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeFullView}
          >
            <motion.div
              className="pdg-full-view-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={galleryImages[fullViewImage]} alt="Full view" />
              <button className="pdg-full-view-close" onClick={closeFullView}>
                <i className="fa-solid fa-times"></i>
              </button>
              {galleryImages.length > 1 && (
                <>
                  <button
                    className="pdg-full-view-prev"
                    onClick={() =>
                      setFullViewImage(
                        fullViewImage === 0
                          ? galleryImages.length - 1
                          : fullViewImage - 1,
                      )
                    }
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button
                    className="pdg-full-view-next"
                    onClick={() =>
                      setFullViewImage(
                        fullViewImage === galleryImages.length - 1
                          ? 0
                          : fullViewImage + 1,
                      )
                    }
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectGallery;
