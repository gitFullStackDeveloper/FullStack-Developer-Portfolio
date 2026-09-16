import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import "../../../css/Website/contact/contactHero.css";

const ContactHero = () => {
  const sectionRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const benefits = [
    { icon: "fa-solid fa-bolt", text: "Fast Turnaround" },
    { icon: "fa-solid fa-shield-alt", text: "Quality Guaranteed" },
    { icon: "fa-solid fa-comments", text: "Clear Communication" },
    { icon: "fa-solid fa-wallet", text: "Fair Pricing" },
  ];

  return (
    <section className="contact-hero-section" ref={sectionRef}>
      {/* Background */}
      <div className="ch-bg-shapes">
        {[
          { size: 400, x: "55%", y: "35%", color: "rgba(8, 145, 255, 0.06)" },
          { size: 300, x: "8%", y: "65%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 250, x: "75%", y: "8%", color: "rgba(8, 145, 255, 0.05)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="ch-shape"
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

      <div className="ch-grid">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="ch-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 0.04 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="ch-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.04 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      <div className="ch-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="ch-particle"
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
        className="ch-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="ch-layout">
          {/* Left - Content */}
          <div className="ch-left">
            {/* Badge */}
            <br /> <br /> <br /> <br /> <br />
            <motion.div className="ch-badge" variants={fadeUpVariants}>
              <motion.span
                className="badge-dot"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Available for Projects
            </motion.div>
            <motion.h1 className="ch-title" variants={fadeUpVariants}>
              <span>
                {" "}
                Let's Create{" "}
                <span className="ch-title-highlight">Something Great</span>{" "}
              </span>{" "}
              Together
            </motion.h1>
            <motion.p className="ch-description" variants={fadeUpVariants}>
              Turn your ideas into reality with a developer who cares about your
              success. Let's build something amazing.
            </motion.p>
            <motion.div className="ch-benefits" variants={fadeUpVariants}>
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  className="ch-benefit-item"
                  whileHover={{ x: 5 }}
                >
                  <div className="ch-benefit-icon">
                    <i className={benefit.icon}></i>
                  </div>
                  <span className="ch-benefit-text">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>
            {/* CTA Buttons */}
            <motion.div className="ch-buttons" variants={fadeUpVariants}>
              <button
                type="button"
                className="ch-btn-primary"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  document
                    .getElementById("contact-form-section")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }}
              >
                Start Your Project
                <i className="fa-solid fa-arrow-right"></i>
              </button>{" "}
              <button
                type="button"
                className="ch-btn-secondary"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  document
                    .getElementById("contact-form-section")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }}
              >
                <i className="fa-solid fa-envelope"></i>
                Quick Email
              </button>
            </motion.div>
            {/* Social Proof */}
            <motion.div className="ch-social-proof" variants={fadeUpVariants}>
              <div className="ch-avatars">
                {[1, 2, 3, 4].map((_, i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/40?img=${i + 10}`}
                    alt="Client"
                    className="ch-avatar"
                  />
                ))}
              </div>
              <span className="ch-social-text">
                <strong>10+</strong> happy clients served
              </span>
            </motion.div>
          </div>

          {/* Right - Video */}
          <motion.div className="ch-right" variants={fadeUpVariants}>
            <div className="ch-video-composition">
              <div className="ch-video-bg-glow" />
              <motion.div
                className="ch-decorative-ring ring-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="ch-decorative-ring ring-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              />

              <div className="ch-video-frame">
                <div className="ch-video-top-bar">
                  <div className="ch-video-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <span className="ch-video-title">Watch Introduction</span>
                </div>

                <div
                  className="ch-video-container"
                  onClick={() => setIsPlaying(true)}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&showinfo=0&rel=0${isPlaying ? "&autoplay=1" : ""}`}
                    title="Introduction"
                    className="ch-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                  />
                  <div className="ch-video-overlay" />

                  {!isPlaying && (
                    <motion.div
                      className="ch-play-btn"
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="ch-play-icon-wrapper">
                        <i className="fa-solid fa-play"></i>
                      </div>
                      <div className="ch-play-ripple" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                className="ch-floating-badge"
                animate={{ y: [-6, 6, -6] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <i className="fa-solid fa-circle-check"></i>
                <span>Trusted Partner</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />
    </section>
  );
};

export default ContactHero;
