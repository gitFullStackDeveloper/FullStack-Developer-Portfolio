import "../../../css/Website/home/whyChooseMe.css";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const WhyChooseMe = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 0.7,
        ease: "backOut",
      },
    }),
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 30 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 1 + i * 0.15,
        duration: 0.6,
        ease: "backOut",
      },
    }),
  };

  const features = [
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Quality Focused",
      description:
        "I deliver pixel-perfect, high-quality solutions with clean code and attention to every detail.",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      title: "Fast Delivery",
      description:
        "We deliver projects on time with agile methodology and efficient project management.",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      title: "Client Focused",
      description:
        "Your satisfaction is our priority. We work closely with you to bring your vision to life.",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      title: "Modern Tech Stack",
      description:
        "We use cutting-edge technologies like React, Node.js, and cloud services for scalable solutions.",
    },
  ];

  return (
    <section className="why-choose-section" ref={sectionRef}>
      {/* Background Shapes */}
      <div className="why-choose-bg-shapes">
        {[
          { size: 150, x: "5%", y: "10%", color: "rgba(8, 145, 255, 0.08)" },
          { size: 200, x: "90%", y: "30%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 120, x: "50%", y: "70%", color: "rgba(8, 145, 255, 0.06)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="why-choose-shape"
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
      <div className="why-choose-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="why-choose-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={
              isInView
                ? { scaleY: 1, opacity: 0.04 }
                : { scaleY: 0, opacity: 0 }
            }
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="why-choose-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              isInView
                ? { scaleX: 1, opacity: 0.04 }
                : { scaleX: 0, opacity: 0 }
            }
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      {/* Particle Effect */}
      <div className="why-choose-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="why-choose-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              y: [0, -80],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
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
        className="why-choose-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="why-choose-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Why Choose Us
          </motion.div>

          <motion.h2 className="section-title">
            <span className="title-line">
              Why We're <span className="highlight-text">Different</span>
            </span>
          </motion.h2>

          <motion.p className="section-description">
            We combine technical expertise with creative thinking to deliver
            exceptional digital experiences.
          </motion.p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div className="features-grid">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="feature-card"
              custom={i}
              variants={cardVariants}
              whileHover={{
                y: -8,
                borderColor: "rgba(8, 145, 255, 0.6)",
                boxShadow:
                  "0 20px 60px rgba(8, 145, 255, 0.15), 0 0 80px rgba(8, 145, 255, 0.05)",
              }}
            >
              {/* Card Icon */}
              <motion.div
                className="feature-icon-wrapper"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-icon-glow" />
              </motion.div>

              {/* Card Content */}
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>

              {/* Learn More Link */}
              <motion.a
                href="#services"
                className="feature-link"
                whileHover={{ x: 5 }}
              >
                Learn More
                <motion.span
                  className="link-arrow"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          ))}
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

export default WhyChooseMe;
