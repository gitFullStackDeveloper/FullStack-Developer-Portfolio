import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import "../../../css/Website/portfolio/portfolioHero.css";

const PortfolioHero = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

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

  const stats = [
    { number: "10+", label: "Projects Done", icon: "fa-solid fa-folder-open" },
    { number: "10+", label: "Happy Clients", icon: "fa-solid fa-face-smile" },
    { number: "1+", label: "Years Exp.", icon: "fa-solid fa-clock" },
  ];

  return (
    <section className="pfh-section" ref={sectionRef}>
      {/* Background Shapes */}
      <div className="pfh-bg-shapes">
        {[
          { size: 350, x: "5%", y: "20%", color: "rgba(8, 145, 255, 0.06)" },
          { size: 280, x: "85%", y: "35%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 220, x: "50%", y: "65%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 180, x: "25%", y: "15%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="pfh-shape"
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

      {/* Grid Lines */}
      <div className="pfh-grid">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="pfh-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 0.04 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="pfh-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.04 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      {/* Particles */}
      <div className="pfh-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="pfh-particle"
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
        className="pfh-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="pfh-content-grid">
          {/* Left - Content */}
          <div className="pfh-left">
            <motion.div className="pfh-badge" variants={fadeUpVariants}>
              <motion.span
                className="badge-dot"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              My Portfolio
            </motion.div>

            <motion.h1 className="pfh-title" variants={fadeUpVariants}>
              <span className="title-line">Creative Work And</span>
              <span className="title-line">
                <span className="highlight-wrapper">
                  <span className="highlight-text">Proven Results</span>
                  <motion.span
                    className="highlight-glow"
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scale: [0.95, 1.05, 0.95],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </span>
              </span>
            </motion.h1>

            <motion.p className="pfh-description" variants={fadeUpVariants}>
              Explore a collection of projects that showcase my expertise in
              building
              <span className="text-highlight">
                {" "}
                modern, scalable, and impactful
              </span>{" "}
              digital solutions.
            </motion.p>

            {/* Stats */}
            <motion.div className="pfh-stats" variants={fadeUpVariants}>
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="pfh-stat-item"
                  whileHover={{ y: -5, borderColor: "rgba(8, 145, 255, 0.5)" }}
                >
                  <div className="pfh-stat-icon">
                    <i className={stat.icon}></i>
                  </div>
                  <div>
                    <span className="pfh-stat-number">{stat.number}</span>
                    <span className="pfh-stat-label">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div className="pfh-actions" variants={fadeUpVariants}>
              <a href="#portfolio-grid" className="pfh-btn primary">
                View My Work
                <motion.span
                  className="cta-icon"
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
              <Link to="/contact" className="pfh-btn secondary">
                <i className="fa-solid fa-paper-plane"></i> Start a Project
              </Link>
            </motion.div>
          </div>
          {/* Right - Portfolio Animation */}
          <motion.div className="pfh-right" variants={fadeUpVariants}>
            <div className="pfh-visual-container">
              {/* Outer Rotating Ring - Projects */}
              <motion.div
                className="pfh-ring ring-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              />

              {/* Middle Ring - Screenshots */}
              <motion.div
                className="pfh-ring ring-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />

              {/* Center Glow */}
              <motion.div
                className="pfh-center-glow"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Center Portfolio Icon */}
              <motion.div
                className="pfh-center-circle"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <i className="fa-solid fa-briefcase"></i>
              </motion.div>

              {/* Floating Project Cards */}
              <motion.div
                className="pfh-float-card card-1"
                animate={{ y: [-10, 10, -10], rotate: [0, 2, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="pfh-mini-project">
                  <div className="pfh-mini-img">
                    <i className="fa-solid fa-globe"></i>
                  </div>
                  <div className="pfh-mini-info">
                    <span className="pfh-mini-title">Education Website</span>
                    <span className="pfh-mini-tech">Modern & Responsive</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="pfh-float-card card-2"
                animate={{ y: [10, -10, 10], rotate: [0, -2, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="pfh-mini-project">
                  <div className="pfh-mini-img">
                    <i className="fa-solid fa-mobile-screen"></i>
                  </div>
                  <div className="pfh-mini-info">
                    <span className="pfh-mini-title">Learning Platform</span>
                    <span className="pfh-mini-tech">Smart & Scalable</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="pfh-float-card card-3"
                animate={{ y: [-8, 8, -8] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="pfh-mini-project">
                  <div className="pfh-mini-img">
                    <i className="fa-solid fa-chart-line"></i>
                  </div>
                  <div className="pfh-mini-info">
                    <span className="pfh-mini-title">Admin Dashboard</span>
                    <span className="pfh-mini-tech">Simple & Powerful</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="pfh-float-card card-4"
                animate={{ y: [8, -8, 8] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="pfh-mini-project">
                  <div className="pfh-mini-img">
                    <i className="fa-solid fa-robot"></i>
                  </div>
                  <div className="pfh-mini-info">
                    <span className="pfh-mini-title">AI Automation</span>
                    <span className="pfh-mini-tech">Smart & Efficient</span>
                  </div>
                </div>
              </motion.div>

              {/* Orbiting Tech Dots */}
              <motion.div
                className="pfh-orbit-dot dot-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="pfh-dot-inner" />
              </motion.div>
              <motion.div
                className="pfh-orbit-dot dot-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <div className="pfh-dot-inner" />
              </motion.div>
              <motion.div
                className="pfh-orbit-dot dot-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              >
                <div className="pfh-dot-inner" />
              </motion.div>

              {/* Pulse Rings */}
              <motion.div
                className="pfh-pulse-ring"
                animate={{ scale: [0.8, 1.5], opacity: [0.6, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <motion.div
                className="pfh-pulse-ring delay"
                animate={{ scale: [0.8, 1.5], opacity: [0.6, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 0.8,
                  ease: "easeOut",
                }}
              />
            </div>
          </motion.div>{" "}
        </div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />
    </section>
  );
};

export default PortfolioHero;
