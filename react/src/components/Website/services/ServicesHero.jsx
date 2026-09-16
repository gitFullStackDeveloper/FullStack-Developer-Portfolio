import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import "../../../css/Website/services/servicesHero.css";

const ServicesHero = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const serviceHighlights = [
    { icon: "fa-solid fa-code", title: "Web Development", color: "#0891ff" },
    {
      icon: "fa-solid fa-mobile-screen",
      title: "Mobile Apps",
      color: "#4dc9f6",
    },
    { icon: "fa-solid fa-palette", title: "UI/UX Design", color: "#0891ff" },
    { icon: "fa-solid fa-cloud", title: "Cloud Solutions", color: "#4dc9f6" },
    { icon: "fa-solid fa-plug", title: "API Development", color: "#0891ff" },
    {
      icon: "fa-solid fa-magnifying-glass-chart",
      title: "SEO Optimization",
      color: "#4dc9f6",
    },
  ];

  return (
    <section className="services-hero-section" ref={sectionRef}>
      {/* Background Shapes */}
      <div className="svh-bg-shapes">
        {[
          { size: 300, x: "5%", y: "15%", color: "rgba(8, 145, 255, 0.06)" },
          { size: 250, x: "85%", y: "25%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 200, x: "50%", y: "60%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 150, x: "20%", y: "75%", color: "rgba(8, 145, 255, 0.07)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="svh-shape"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
              background: shape.color,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i,
              delay: i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid Lines */}
      <div className="svh-grid">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="svh-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 0.04 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="svh-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.04 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      {/* Particles */}
      <div className="svh-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="svh-particle"
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

      {/* Main Content */}
      <motion.div
        className="svh-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="svh-content-grid">
          {/* Left Side - Text */}
          <div className="svh-left">
            <motion.div className="svh-badge" variants={fadeUpVariants}>
              <motion.span
                className="badge-dot"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              What I Offer
            </motion.div>
            <motion.h1 className="svh-title" variants={fadeUpVariants}>
              <span className="title-line">Digital Solutions</span>
              <span className="title-line">
                <span className="highlight-wrapper">
                  <span className="highlight-text">Built to Growth</span>
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

            <motion.p className="svh-description" variants={fadeUpVariants}>
              From design and development to AI-powered solutions, I build
              <span className="text-highlight">
                {" "}
                modern, scalable, and reliable
              </span>{" "}
              digital experiences tailored to your business needs.
            </motion.p>

            <motion.div className="svh-actions" variants={fadeUpVariants}>
              <motion.a
                href="#all-services"
                className="svh-btn primary"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(8, 145, 255, 0.7)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore Services</span>
                <motion.span
                  className="cta-icon"
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
              <motion.a
                href="#contact"
                className="svh-btn secondary"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(8, 145, 255, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fa-solid fa-paper-plane"></i>Get In Touch
              </motion.a>
            </motion.div>

            {/* Stats Row */}
            <motion.div className="svh-stats" variants={fadeUpVariants}>
              {[
                { number: "10+", label: "Projects Done" },
                { number: "10+", label: "Happy Clients" },
                { number: "99.9%", label: "Satisfaction" },
              ].map((stat, i) => (
                <div key={i} className="svh-stat-item">
                  <span className="svh-stat-number">{stat.number}</span>
                  <span className="svh-stat-label">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div className="svh-right" variants={fadeUpVariants}>
            <div className="svh-visual-wrapper">
              <motion.div
                className="svh-outer-ring"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="svh-outer-ring-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              <div className="svh-center-circle">
                <motion.div
                  className="svh-center-inner"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <i className="fa-solid fa-laptop-code"></i>
                </motion.div>
                <motion.div
                  className="svh-center-glow"
                  animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </div>

              {/* Floating Service Icons */}
              {serviceHighlights.map((item, i) => (
                <motion.div
                  key={i}
                  className={`svh-floating-icon icon-${i + 1}`}
                  style={{ color: item.color, borderColor: `${item.color}40` }}
                  animate={{ y: [-8, 8, -8] }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  whileHover={{
                    scale: 1.2,
                    boxShadow: `0 0 25px ${item.color}40`,
                  }}
                  title={item.title}
                >
                  <i className={item.icon}></i>
                </motion.div>
              ))}
            </div>
          </motion.div>
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

export default ServicesHero;
