import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import "../../../css/Website/projects/howItWorks.css";

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
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

  const steps = [
    {
      step: "01",
      icon: "fa-solid fa-magnifying-glass",
      title: "Browse & Select",
      description:
        "Explore our collection of ready-made projects. Find the perfect solution that matches your business needs and requirements.",
      details: [
        "Filter by category",
        "Preview live demos",
        "Check tech stack",
        "Read documentation",
      ],
    },
    {
      step: "02",
      icon: "fa-solid fa-cart-shopping",
      title: "Secure Purchase",
      description:
        "Complete your purchase through our secure payment system. Get instant access to the full source code and documentation.",
      details: [
        "Secure checkout",
        "Instant payment confirmation",
        "License key delivery",
        "Invoice generation",
      ],
    },
    {
      step: "03",
      icon: "fa-solid fa-rocket",
      title: "Download & Launch",
      description:
        "Download your project, follow the setup guide, and launch your new business. Free 6-month support included.",
      details: [
        "Instant download",
        "Setup documentation",
        "Free 6-month support",
        "Lifetime updates",
      ],
    },
  ];

  return (
    <section className="hiw-section" ref={sectionRef}>
      {/* Background */}
      <div className="hiw-bg-shapes">
        {[
          { size: 300, x: "5%", y: "20%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 250, x: "85%", y: "45%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 200, x: "50%", y: "75%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="hiw-shape"
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

      <div className="hiw-grid-lines">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="hiw-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="hiw-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      <div className="hiw-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="hiw-particle"
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
        className="hiw-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="hiw-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Simple Process
          </motion.div>
          <motion.h2 className="section-title">
            <span className="title-line">
              How It <span className="highlight-text">Works</span>
            </span>
          </motion.h2>
          <motion.p className="section-description">
            Get your project up and running in three simple steps
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="hiw-steps">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="hiw-step-card"
              variants={fadeUpVariants}
              whileHover={{ y: -8 }}
            >
              {/* Step Number with Connector */}
              <div className="hiw-step-header">
                <div className="hiw-step-number-wrapper">
                  <div className="hiw-step-number">
                    <span>{step.step}</span>
                  </div>
                  <div className="hiw-step-icon-circle">
                    <i className={step.icon}></i>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="hiw-connector">
                    <motion.div
                      className="hiw-connector-line"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "100%" } : { width: 0 }}
                      transition={{ delay: 1 + i * 0.3, duration: 0.8 }}
                    />
                    <motion.div
                      className="hiw-connector-dot"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 1.5 + i * 0.3, duration: 0.3 }}
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="hiw-step-content">
                <h3 className="hiw-step-title">{step.title}</h3>
                <p className="hiw-step-desc">{step.description}</p>

                {/* Detail List */}
                <ul className="hiw-detail-list">
                  {step.details.map((detail, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        delay: 0.8 + i * 0.2 + j * 0.1,
                        duration: 0.4,
                      }}
                    >
                      <i className="fa-solid fa-circle-check"></i>
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div className="hiw-cta" variants={fadeUpVariants}>
          <Link to="#available-projects" className="hiw-cta-btn">
            Browse Available Projects
            <motion.span
              className="cta-icon"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />
    </section>
  );
};

export default HowItWorks;
