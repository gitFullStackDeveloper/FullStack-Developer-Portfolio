import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import "../../../css/Website/home/hero.css";
import Arhamimage from "../../../assets/Arhamimage.jpeg";

const Hero = () => {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.3 });

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
    hidden: { opacity: 0, y: 40, rotateX: -10 },
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.4,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 30 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.8 + i * 0.15,
        duration: 0.6,
        ease: "backOut",
      },
    }),
  };

  const floatingShapes = [
    {
      size: 80,
      x: "15%",
      y: "20%",
      delay: 0,
      duration: 6,
      color: "rgba(8, 145, 255, 0.15)",
    },
    {
      size: 120,
      x: "75%",
      y: "15%",
      delay: 1.5,
      duration: 8,
      color: "rgba(8, 145, 255, 0.1)",
    },
    {
      size: 60,
      x: "85%",
      y: "60%",
      delay: 3,
      duration: 7,
      color: "rgba(8, 145, 255, 0.12)",
    },
    {
      size: 100,
      x: "10%",
      y: "70%",
      delay: 2,
      duration: 9,
      color: "rgba(8, 145, 255, 0.08)",
    },
    {
      size: 50,
      x: "50%",
      y: "80%",
      delay: 4,
      duration: 5,
      color: "rgba(8, 145, 255, 0.2)",
    },
  ];

  return (
    <section className="hero" ref={heroRef}>
      {/* Animated Background Shapes */}
      <div className="hero-bg-shapes">
        {floatingShapes.map((shape, index) => (
          <motion.div
            key={index}
            className="floating-shape"
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
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid Lines Effect */}
      <div className="hero-grid">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 0.04 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.04 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      {/* Particle Effect */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content - Split Layout */}
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Left Column - Text Content */}
        <div className="hero-left">
          {/* Badge */}
          <motion.div className="hero-badge" variants={fadeUpVariants}>
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Available for Projects
          </motion.div>
          <br />
          <br />

          <motion.h1 className="hero-title" variants={fadeUpVariants}>
            <span className="title-line">
              AI-Powered{" "}
              <span className="highlight-wrapper">
                <span className="highlight-text">Software</span>
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

            <span className="title-line">
              <span className="highlight-text">Solutions </span>
              for Education{" "}
            </span>
          </motion.h1>

          <motion.p className="hero-description" variants={fadeUpVariants}>
            Hi, I’m Arham Raza, a Software Developer building AI-powered
            websites, web apps, and software for education. I help education
            businesses automate tasks, save time, and work better.{" "}
          </motion.p>
          {/* CTA Buttons */}
          <motion.div className="hero-cta-group" variants={fadeUpVariants}>
            <motion.button
              className="hero-cta primary"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 0 40px rgba(8, 145, 255, 0.7), 0 0 80px rgba(8, 145, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Your Project</span>
              <motion.span
                className="cta-icon"
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>

            <motion.button
              className="hero-cta secondary"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(8, 145, 255, 0.8)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="play-icon"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                ▶
              </motion.span>
              Watch Reel
            </motion.button>
          </motion.div>

          {/* Stats - Inline Flex */}
          <motion.div className="hero-stats" variants={fadeUpVariants}>
            {[
              { number: "10+", label: "Projects Delivered" },
              { number: "99.9%", label: "Client Satisfaction" },
              { number: "2+", label: "Years Experience" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="stat-item"
                custom={i}
                variants={statVariants}
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(8, 145, 255, 0.6)",
                }}
              >
                <motion.span
                  className="stat-number"
                  whileInView={{
                    opacity: [0, 1],
                    transition: { duration: 1, delay: i * 0.2 },
                  }}
                >
                  {stat.number}
                </motion.span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column - Modern Image Design */}
        <motion.div className="hero-right" variants={imageVariants}>
          <div className="hero-image-wrapper">
            <motion.div
              className="outer-ring"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="outer-ring-2"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="image-main-container"
              animate={{
                y: [-8, 8, -8],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="image-frame">
                <img src={Arhamimage} alt="Arham-Full Stack Developer" />
                <div className="image-overlay" />
              </div>
            </motion.div>

            <motion.div
              className="tech-dot dot-1"
              animate={{
                y: [-5, 5, -5],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="tech-dot dot-2"
              animate={{
                y: [5, -5, 5],
                opacity: [1, 0.4, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="tech-dot dot-3"
              animate={{
                y: [-3, 3, -3],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
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

export default Hero;
