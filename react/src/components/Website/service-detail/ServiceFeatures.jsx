import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../../../css/Website/servicesDetail/serviceFeatures.css";

const ServiceFeatures = ({ features }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.4 + i * 0.1, duration: 0.7, ease: "backOut" },
    }),
  };

  return (
    <section className="features-section" ref={sectionRef}>
      {/* ... background shapes, grid lines, particles same as before ... */}
      <div className="sf-bg-shapes">
        {[
          { size: 180, x: "10%", y: "30%", color: "rgba(8, 145, 255, 0.06)" },
          { size: 150, x: "85%", y: "60%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 130, x: "50%", y: "20%", color: "rgba(8, 145, 255, 0.05)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="sf-shape"
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

      <div className="sf-grid-lines">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="sf-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="sf-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      <div className="sf-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="sf-particle"
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
        className="sf-container"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="sf-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Features
          </motion.div>
          <motion.h2 className="section-title">
            <span className="title-line">
              Key <span className="highlight-text">Features</span>
            </span>
          </motion.h2>
          <motion.p className="section-description">
            What makes this service stand out from the rest
          </motion.p>
        </motion.div>

        <div className="sf-grid">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="sf-card"
              custom={i}
              variants={cardVariants}
              whileHover={{
                y: -8,
                borderColor: "rgba(8, 145, 255, 0.5)",
                boxShadow: "0 20px 60px rgba(8, 145, 255, 0.15)",
              }}
            >
              <div className="sf-icon-wrapper">
                <motion.div
                  className="sf-icon"
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(8,145,255,0)",
                      "0 0 0 8px rgba(8,145,255,0.1)",
                      "0 0 0 0 rgba(8,145,255,0)",
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <i className="fa-solid fa-circle-check"></i>
                </motion.div>
              </div>
              <h4 className="sf-card-title">{feature.title}</h4>
              <p className="sf-card-desc">
                {feature.description || feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />
    </section>
  );
};

export default ServiceFeatures;
