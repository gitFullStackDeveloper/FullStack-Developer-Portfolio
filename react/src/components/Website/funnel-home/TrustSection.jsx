import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../../../css/Website/funnel-home/trustSection.css";

const TrustSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.4 + i * 0.1, duration: 0.6, ease: "backOut" },
    }),
  };

  const stats = [
    { icon: "fa-solid fa-code", number: "15+", label: "Technologies Learned" },
    {
      icon: "fa-solid fa-diagram-project",
      number: "8+",
      label: "Personal Projects",
    },
    { icon: "fa-solid fa-clock", number: "500+", label: "Hours of Practice" },
    {
      icon: "fa-solid fa-graduation-cap",
      number: "3+",
      label: "Certifications",
    },
  ];

  const promises = [
    {
      icon: "fa-solid fa-handshake",
      title: "Your Success = My Success",
      text: "I treat every project like it’s my own business. Your goals become my priorities.",
    },
    {
      icon: "fa-solid fa-comments",
      title: "Clear, Honest Communication",
      text: "No jargon, no hidden fees. You’ll always know exactly what’s happening.",
    },
    {
      icon: "fa-solid fa-seedling",
      title: "Continuous Growth",
      text: "I’m constantly learning and improving – so your project benefits from the latest tech.",
    },
  ];

  return (
    <section className="fts-section" ref={sectionRef}>
      {/* Background */}
      <div className="fts-bg-shapes">
        {[
          { size: 280, x: "5%", y: "20%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 220, x: "85%", y: "45%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 200, x: "50%", y: "75%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="fts-shape"
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

      <div className="fts-grid-lines">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="fts-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="fts-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      <div className="fts-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="fts-particle"
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
        className="fts-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="fts-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Why Work With Me
          </motion.div>
          <motion.h2 className="section-title">
            <span className="title-line">
              Built on <span className="highlight-text">Trust & Passion</span>
            </span>
          </motion.h2>
          <motion.p className="section-description">
            I may be early in my journey, but I bring dedication, modern skills,
            and total commitment to every project
          </motion.p>
        </motion.div>

        {/* Honest Stats Row */}
        <div className="fts-stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="fts-stat-card"
              custom={i}
              variants={cardVariants}
              whileHover={{ y: -5, borderColor: "rgba(8, 145, 255, 0.5)" }}
            >
              <div className="fts-stat-icon">
                <i className={stat.icon}></i>
              </div>
              <span className="fts-stat-number">{stat.number}</span>
              <span className="fts-stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="fts-promises-grid">
          {promises.map((promise, i) => (
            <motion.div
              key={i}
              className="fts-promise-card"
              variants={fadeUpVariants}
              whileHover={{ y: -5, borderColor: "rgba(8, 145, 255, 0.4)" }}
            >
              <div className="fts-promise-icon">
                <i className={promise.icon}></i>
              </div>
              <h3 className="fts-promise-title">{promise.title}</h3>
              <p className="fts-promise-text">{promise.text}</p>
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

export default TrustSection;
