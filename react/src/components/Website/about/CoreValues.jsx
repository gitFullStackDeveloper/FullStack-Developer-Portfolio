import "../../../css/Website/about/coreValues.css";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CoreValues = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const values = [
    {
      icon: "fa-solid fa-bullseye",
      title: "Quality First",
      description:
        "I believe in delivering nothing less than excellence. Every project is crafted with attention to detail and a commitment to the highest standards.",
      highlights: ["Clean Code", "Best Practices", "Testing"],
    },
    {
      icon: "fa-solid fa-handshake",
      title: "Integrity & Trust",
      description:
        "Building honest relationships through transparent communication and reliable delivery. Your trust is the foundation of our collaboration.",
      highlights: ["Transparency", "Reliability", "Honesty"],
    },
    {
      icon: "fa-solid fa-lightbulb",
      title: "Innovation",
      description:
        "Staying ahead with cutting-edge technologies and creative solutions. I constantly explore new ways to solve problems efficiently.",
      highlights: ["Creativity", "Modern Tech", "Problem Solving"],
    },
    {
      icon: "fa-solid fa-users",
      title: "Client Focus",
      description:
        "Your success is my priority. I take time to understand your vision and work closely with you to bring it to life exactly as imagined.",
      highlights: ["Collaboration", "Understanding", "Support"],
    },
    {
      icon: "fa-solid fa-seedling",
      title: "Continuous Growth",
      description:
        "Technology never stands still, and neither do I. Every day is an opportunity to learn, improve, and become better at what I do.",
      highlights: ["Learning", "Adaptability", "Improvement"],
    },
    {
      icon: "fa-solid fa-heart",
      title: "Passion & Purpose",
      description:
        "I genuinely love what I do. This passion fuels my dedication to creating meaningful digital experiences that make a difference.",
      highlights: ["Dedication", "Enthusiasm", "Impact"],
    },
  ];

  const quote = {
    text: "I believe great software is built with purpose, continuous learning, and AI-driven innovation to create smarter solutions and meaningful value.",
    author: "Arham Raza",
  };

  return (
    <section className="core-values-section" ref={sectionRef}>
      {/* Background Effects */}

      <div className="about-hero-bg-shapes">
        {[
          { size: 300, x: "5%", y: "20%", color: "rgba(8, 145, 255, 0.06)" },
          { size: 250, x: "85%", y: "15%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 200, x: "50%", y: "70%", color: "rgba(8, 145, 255, 0.05)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="bg-shape-common"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
              background: shape.color,
            }}
            animate={{
              y: [-40, 40, -40],
              x: [-20, 20, -20],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid Lines */}
      <div className="about-hero-grid-lines">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="grid-line-common vertical"
            style={{ left: `${(i + 1) * 16.66}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={
              isInView
                ? { scaleY: 1, opacity: 0.03 }
                : { scaleY: 0, opacity: 0 }
            }
            transition={{ delay: 0.3 + i * 0.1, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="grid-line-common horizontal"
            style={{ top: `${(i + 1) * 20}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              isInView
                ? { scaleX: 1, opacity: 0.03 }
                : { scaleX: 0, opacity: 0 }
            }
            transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
          />
        ))}
      </div>

      {/* Particles */}
      <div className="about-hero-particles-common">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle-common"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              delay: Math.random() * 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="values-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="values-header" variants={fadeUpVariants}>
          <div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            What Drives Me
          </div>
          <h2 className="section-title">
            <span className="title-line">
              My Core <span className="highlight-text">Values</span>
            </span>
          </h2>
          <p className="section-description">
            The principles that guide my work and define who I am as a developer
          </p>
        </motion.div>

        {/* Quote */}
        <motion.div className="values-quote-wrapper" variants={fadeUpVariants}>
          <div className="values-quote-card">
            <div className="quote-icon">
              <i className="fa-solid fa-quote-right"></i>
            </div>
            <blockquote className="quote-text">{quote.text}</blockquote>
            <span className="quote-author">— {quote.author}</span>
            <div className="quote-decoration" />
          </div>
        </motion.div>

        {/* Values Grid */}
        <motion.div className="values-grid" variants={containerVariants}>
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="value-card"
              variants={fadeUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{
                y: -8,
                borderColor: "rgba(8, 145, 255, 0.5)",
                boxShadow:
                  "0 20px 60px rgba(8, 145, 255, 0.15), 0 0 80px rgba(8, 145, 255, 0.05)",
              }}
            >
              {/* Top Accent */}
              <div className="value-accent-line" />

              {/* Icon */}
              <div className="value-icon-wrapper">
                <motion.div
                  className="value-icon-circle"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 40px rgba(8, 145, 255, 0.3)",
                  }}
                >
                  <i className={value.icon}></i>
                </motion.div>
              </div>

              {/* Content */}
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>

              {/* Highlights */}
              <div className="value-highlights">
                {value.highlights.map((highlight, hIndex) => (
                  <span key={hIndex} className="value-tag">
                    {highlight}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CoreValues;
