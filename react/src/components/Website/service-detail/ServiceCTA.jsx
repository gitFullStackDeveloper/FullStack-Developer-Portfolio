import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../../../css/Website/servicesDetail/serviceCTA.css";

const ServiceCTA = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section className="cta-section" ref={sectionRef}>
      {/* Background Shapes */}
      <div className="sc-bg-shapes">
        {[
          { size: 250, x: "50%", y: "50%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 200, x: "80%", y: "20%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="sc-shape"
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

      {/* Grid Lines */}
      <div className="sc-grid-lines">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="sc-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 0.03 } : {}}
            transition={{ delay: 0.3 + i * 0.1, duration: 1 }}
          />
        ))}
      </div>

      {/* Particles */}
      <div className="sc-particles">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="sc-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{ y: [0, -70], opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div className="sc-container">
        <motion.div
          className="sc-card"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to Start Your Project?</h2>
          <p>
            Let's discuss your requirements and create something amazing
            together.
          </p>
          <motion.a
            href="#contact"
            className="sc-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fa-solid fa-paper-plane"></i>Get In Touch
          </motion.a>
        </motion.div>
      </motion.div>

      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />
    </section>
  );
};

export default ServiceCTA;
