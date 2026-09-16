import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../../../css/Website/projects/whyBuyBenefits.css";

const WhyBuyBenefits = () => {
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
      transition: { delay: 0.4 + i * 0.15, duration: 0.7, ease: "backOut" },
    }),
  };

  const benefits = [
    {
      icon: "fa-solid fa-rocket",
      title: "Instant Launch",
      description:
        "Skip months of development. Purchase, deploy, and launch your project within hours, not months.",
      highlights: ["Ready to Deploy", "Quick Setup", "No Development Wait"],
    },
    {
      icon: "fa-solid fa-piggy-bank",
      title: "Cost Effective",
      description:
        "Save up to 80% compared to custom development. Get premium quality at a fraction of the cost.",
      highlights: ["Save Thousands", "One-Time Payment", "No Hidden Fees"],
    },
    {
      icon: "fa-solid fa-circle-check",
      title: "Proven & Tested",
      description:
        "Every project is thoroughly tested, documented, and ready for production with zero bugs.",
      highlights: ["Bug-Free Code", "Full Documentation", "Production Ready"],
    },
    {
      icon: "fa-solid fa-paint-brush",
      title: "Fully Customizable",
      description:
        "100% source code included. Modify, extend, and customize everything to match your brand.",
      highlights: ["Full Source Code", "Easy to Modify", "No Restrictions"],
    },
  ];

  return (
    <section className="wbb-section" ref={sectionRef}>
      {/* Background */}
      <div className="wbb-bg-shapes">
        {[
          { size: 280, x: "5%", y: "25%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 220, x: "85%", y: "40%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 200, x: "45%", y: "70%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="wbb-shape"
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

      <div className="wbb-grid-lines">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="wbb-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="wbb-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      <div className="wbb-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="wbb-particle"
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
        className="wbb-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="wbb-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Why Buy Ready-Made
          </motion.div>
          <motion.h2 className="section-title">
            <span className="title-line">
              Benefits of{" "}
              <span className="highlight-text">Instant Purchase</span>
            </span>
          </motion.h2>
          <motion.p className="section-description">
            Smart developers buy, don't build. Here's why ready-made projects
            are the better choice
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="wbb-grid">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              className="wbb-card"
              custom={i}
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              {/* Top Accent Line */}
              <div className="wbb-card-accent" />

              {/* Icon */}
              <div className="wbb-card-icon-wrapper">
                <motion.div
                  className="wbb-card-icon"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <i className={benefit.icon}></i>
                </motion.div>
                <div className="wbb-icon-glow" />
              </div>

              {/* Content */}
              <h3 className="wbb-card-title">{benefit.title}</h3>
              <p className="wbb-card-desc">{benefit.description}</p>

              {/* Highlights */}
              <div className="wbb-card-tags">
                {benefit.highlights.map((tag, j) => (
                  <span key={j} className="wbb-tag">
                    <i className="fa-solid fa-circle-check"></i> {tag}
                  </span>
                ))}
              </div>
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

export default WhyBuyBenefits;
