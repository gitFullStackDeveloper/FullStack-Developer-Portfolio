import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import "../../../css/Website/portfolio/statsCounter.css";

const StatsCounter = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    commits: 0,
  });

  const stats = [
    {
      icon: "fa-solid fa-folder-open",
      value: 10,
      suffix: "+",
      label: "Projects Completed",
      countKey: "projects",
      color: "#0891ff",
    },
    {
      icon: "fa-solid fa-face-smile",
      value: 10,
      suffix: "+",
      label: "Happy Clients",
      countKey: "clients",
      color: "#0891ff",
    },
    {
      icon: "fa-solid fa-clock",
      value: 1,
      suffix: "+",
      label: "Years Experience",
      countKey: "experience",
      color: "#0891ff",
    },
    {
      icon: "fa-solid fa-code-commit",
      value: 2000,
      suffix: "+",
      label: "Code Commits",
      countKey: "commits",
      color: "#0891ff",
    },
  ];

  useEffect(() => {
    if (isInView) {
      stats.forEach((stat) => {
        const duration = 2000;
        const steps = 60;
        const increment = stat.value / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            setCounts((prev) => ({ ...prev, [stat.countKey]: stat.value }));
            clearInterval(timer);
          } else {
            setCounts((prev) => ({
              ...prev,
              [stat.countKey]: Math.floor(current),
            }));
          }
        }, duration / steps);

        return () => clearInterval(timer);
      });
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
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
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.3 + i * 0.15, duration: 0.6, ease: "backOut" },
    }),
  };

  return (
    <section className="stc-section" ref={sectionRef}>
      {/* Background */}
      <div className="stc-bg-shapes">
        {[
          { size: 300, x: "5%", y: "30%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 250, x: "80%", y: "50%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 200, x: "50%", y: "70%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="stc-shape"
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

      <div className="stc-grid-lines">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="stc-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="stc-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      <div className="stc-particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="stc-particle"
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
        className="stc-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="stc-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            By The Numbers
          </motion.div>
          <motion.h2 className="section-title">
            <span className="title-line">
              Project <span className="highlight-text">Statistics</span>
            </span>
          </motion.h2>
          <motion.p className="section-description">
            Numbers that speak for themselves
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="stc-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="stc-card"
              custom={i}
              variants={cardVariants}
              whileHover={{
                y: -8,
                borderColor: `${stat.color}50`,
                boxShadow: `0 20px 60px ${stat.color}15`,
              }}
            >
              {/* Top Accent */}
              <div
                className="stc-card-accent"
                style={{
                  background: `linear-gradient(90deg, ${stat.color}, transparent)`,
                }}
              />

              {/* Icon */}
              <div className="stc-icon-wrapper">
                <motion.div
                  className="stc-icon-circle"
                  style={{
                    borderColor: `${stat.color}30`,
                    boxShadow: `0 0 30px ${stat.color}15`,
                  }}
                  animate={isInView ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
                >
                  <i className={stat.icon} style={{ color: stat.color }}></i>
                </motion.div>
                <div
                  className="stc-icon-glow"
                  style={{
                    background: `radial-gradient(circle, ${stat.color}20, transparent 70%)`,
                  }}
                />
              </div>

              {/* Number */}
              <div className="stc-number-wrapper">
                <span className="stc-number" style={{ color: stat.color }}>
                  {counts[stat.countKey]}
                </span>
                <span className="stc-suffix">{stat.suffix}</span>
              </div>

              {/* Label */}
              <span className="stc-label">{stat.label}</span>
            </motion.div>
          ))}
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

export default StatsCounter;
