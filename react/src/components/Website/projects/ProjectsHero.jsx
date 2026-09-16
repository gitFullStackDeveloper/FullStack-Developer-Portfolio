import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import "../../../css/Website/projects/projectsHero.css";

const ProjectsHero = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3],
  );

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

  const categories = [
    { name: "Websites", icon: "fa-solid fa-globe", color: "#0891ff" },
    { name: "Web Apps", icon: "fa-solid fa-window-maximize", color: "#4dc9f6" },
    { name: "Templates", icon: "fa-solid fa-layer-group", color: "#0891ff" },
    { name: "SaaS", icon: "fa-solid fa-cloud", color: "#4dc9f6" },
  ];

  return (
    <section className="aph-section" ref={sectionRef}>
      {/* Background */}
      <div className="aph-bg-shapes">
        {[
          { size: 350, x: "5%", y: "20%", color: "rgba(8, 145, 255, 0.06)" },
          { size: 280, x: "80%", y: "40%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 220, x: "45%", y: "70%", color: "rgba(8, 145, 255, 0.05)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="aph-shape"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
              background: shape.color,
            }}
            animate={{
              y: [-25, 25, -25],
              x: [-12, 12, -12],
              rotate: [0, 180, 360],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 7 + i,
              delay: i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="aph-grid">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="aph-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 0.04 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="aph-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.04 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      <div className="aph-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="aph-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
            animate={{ y: [0, -100], opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        className="aph-container"
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="aph-content-grid">
          {/* Left - Content */}
          <div className="aph-left">
            <motion.div className="aph-badge" variants={fadeUpVariants}>
              <motion.span
                className="badge-dot"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Ready-Made Solutions
            </motion.div>

            <motion.h1 className="aph-title" variants={fadeUpVariants}>
              <span className="title-line">
                Buy & Launch
                <span className="highlight-text">Instantly</span>
              </span>
              <span className="title-line"></span>
            </motion.h1>

            <motion.p className="aph-description" variants={fadeUpVariants}>
              Skip the development wait. Purchase ready-made, fully functional
              projects with{" "}
              <span className="text-highlight">100% source code</span> and
              launch your business today.
            </motion.p>

            <motion.div className="aph-categories" variants={fadeUpVariants}>
              {categories.map((cat, i) => (
                <motion.a
                  href={`#${cat.name.toLowerCase()}`}
                  key={i}
                  className="aph-category-pill"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <i className={cat.icon}></i>
                  <span>{cat.name}</span>
                </motion.a>
              ))}
            </motion.div>

            <motion.div className="aph-actions" variants={fadeUpVariants}>
              <a href="#available-projects" className="aph-btn primary">
                Browse Projects
                <motion.span
                  className="cta-icon"
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
              <Link to="/contact" className="aph-btn secondary">
                <i className="fa-solid fa-message"></i>Request Custom
              </Link>
            </motion.div>
          </div>
          {/* Right - Professional Animation */}
          <motion.div className="aph-right" variants={fadeUpVariants}>
            <div className="aph-animation-container">
              {/* Outer Rotating Ring */}
              <motion.div
                className="aph-ring ring-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              {/* Middle Dashed Ring */}
              <motion.div
                className="aph-ring ring-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner Dotted Ring */}
              <motion.div
                className="aph-ring ring-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              />

              {/* Center Glowing Circle */}
              <motion.div
                className="aph-center-glow"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Center Package Icon */}
              <motion.div
                className="aph-center-icon"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <i className="fa-solid fa-cube"></i>
              </motion.div>

              {/* Floating Tech Icons with Different Animations */}
              <motion.div
                className="aph-float-icon icon-top"
                animate={{ y: [-15, 15, -15], rotate: [0, 10, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="aph-float-inner">
                  <i className="fa-brands fa-react"></i>
                </div>
              </motion.div>

              <motion.div
                className="aph-float-icon icon-bottom"
                animate={{ y: [15, -15, 15], rotate: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="aph-float-inner">
                  <i className="fa-solid fa-code"></i>
                </div>
              </motion.div>

              <motion.div
                className="aph-float-icon icon-left"
                animate={{ x: [-15, 15, -15] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="aph-float-inner">
                  <i className="fa-solid fa-rocket"></i>
                </div>
              </motion.div>

              <motion.div
                className="aph-float-icon icon-right"
                animate={{ x: [15, -15, 15] }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="aph-float-inner">
                  <i className="fa-solid fa-star"></i>
                </div>
              </motion.div>

              {/* Orbiting Dots */}
              <motion.div
                className="aph-orbit-dot dot-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <div className="aph-dot-inner" />
              </motion.div>
              <motion.div
                className="aph-orbit-dot dot-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="aph-dot-inner" />
              </motion.div>
              <motion.div
                className="aph-orbit-dot dot-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              >
                <div className="aph-dot-inner" />
              </motion.div>
              <motion.div
                className="aph-orbit-dot dot-4"
                animate={{ rotate: -360 }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              >
                <div className="aph-dot-inner" />
              </motion.div>

              {/* Pulse Rings */}
              <motion.div
                className="aph-pulse-ring"
                animate={{ scale: [0.8, 1.4], opacity: [0.6, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <motion.div
                className="aph-pulse-ring delay"
                animate={{ scale: [0.8, 1.4], opacity: [0.6, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 0.8,
                  ease: "easeOut",
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />
    </section>
  );
};

export default ProjectsHero;
