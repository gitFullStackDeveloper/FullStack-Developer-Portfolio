import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../../../css/Website/funnel-home/howItWorks.css";

const HowItWorks = () => {
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
      transition: { delay: 0.4 + i * 0.15, duration: 0.6, ease: "backOut" },
    }),
  };

  const steps = [
    {
      number: "1",
      icon: "fa-solid fa-paper-plane",
      title: "Get in Touch",
      description:
        "Fill out the quick contact form and tell me about your project. I’ll reply within 24 hours.",
    },
    {
      number: "2",
      icon: "fa-solid fa-comments",
      title: "Discuss & Plan",
      description:
        "We’ll jump on a call to align on goals, timeline, and budget. Everything is transparent.",
    },
    {
      number: "3",
      icon: "fa-solid fa-rocket",
      title: "Launch & Grow",
      description:
        "I get to work, you receive regular updates, and we launch your project together.",
    },
  ];

  return (
    <section className="hiw-section" ref={sectionRef}>
      {/* Background */}
      <div className="hiw-bg-shapes">
        {[
          { size: 280, x: "5%", y: "20%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 220, x: "85%", y: "45%", color: "rgba(8, 145, 255, 0.04)" },
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
            Three easy steps to turn your idea into a finished product
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <div className="hiw-steps-grid">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="hiw-step-card"
              custom={i}
              variants={cardVariants}
              whileHover={{
                y: -8,
                borderColor: "rgba(8, 145, 255, 0.5)",
                boxShadow: "0 25px 60px rgba(8, 145, 255, 0.12)",
              }}
            >
              {/* Big Number */}
              <div className="hiw-big-number">{step.number}</div>

              {/* Icon Circle */}
              <div className="hiw-icon-circle">
                <i className={step.icon}></i>
              </div>

              {/* Text */}
              <h3 className="hiw-step-title">{step.title}</h3>
              <p className="hiw-step-description">{step.description}</p>
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

export default HowItWorks;
