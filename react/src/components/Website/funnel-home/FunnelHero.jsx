import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import "../../../css/Website/funnel-home/funnelHero.css";

const FunnelHero = () => {
  const sectionRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3],
  );

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
    <section className="funnel-hero-section" ref={sectionRef}>
      {/* Background */}
      <div className="fh-bg-shapes">
        {[
          { size: 400, x: "55%", y: "35%", color: "rgba(8, 145, 255, 0.06)" },
          { size: 300, x: "8%", y: "65%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 250, x: "75%", y: "8%", color: "rgba(8, 145, 255, 0.05)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="fh-shape"
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

      <div className="fh-grid">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="fh-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 0.04 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="fh-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.04 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      <div className="fh-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="fh-particle"
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
        className="fh-container"
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="fh-layout">
          {/* Left - Content */}
          <div className="fh-left">
            {/* Badge */}
            <motion.div className="fh-badge" variants={fadeUpVariants}>
              <motion.span
                className="badge-dot"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Available for Projects
            </motion.div>

            {/* Inline Title */}
            <motion.h1 className="fh-title" variants={fadeUpVariants}>
              Turn Your Ideas Into
              <span className="fh-title-highlight"> Reality Today</span>
            </motion.h1>

            {/* Description */}
            <motion.p className="fh-description" variants={fadeUpVariants}>
              I help businesses build modern, high‑performing digital solutions
              that drive growth and exceed expectations.
            </motion.p>

            {/* Benefits Grid */}
            <motion.div className="fh-benefits" variants={fadeUpVariants}>
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  className="fh-benefit-item"
                  whileHover={{ x: 5 }}
                >
                  <div className="fh-benefit-icon">
                    <i className={benefit.icon}></i>
                  </div>
                  <span className="fh-benefit-text">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div className="fh-buttons" variants={fadeUpVariants}>
              <Link to="/contact" className="fh-btn-primary">
                Start Your Project
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <a href="mailto:hello@example.com" className="fh-btn-secondary">
                <i className="fa-solid fa-envelope"></i>
                Quick Email
              </a>
            </motion.div>

            {/* Social Proof */}
            <motion.div className="fh-social-proof" variants={fadeUpVariants}>
              <div className="fh-avatars">
                {[1, 2, 3, 4].map((_, i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/40?img=${i + 10}`}
                    alt="Client"
                    className="fh-avatar"
                  />
                ))}
              </div>
              <span className="fh-social-text">
                <strong>30+</strong> happy clients served
              </span>
            </motion.div>
          </div>

          {/* Right - Video */}
          <motion.div className="fh-right" variants={fadeUpVariants}>
            <div className="fh-video-composition">
              <div className="fh-video-bg-glow" />
              <motion.div
                className="fh-decorative-ring ring-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="fh-decorative-ring ring-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              />

              <div className="fh-video-frame">
                <div className="fh-video-top-bar">
                  <div className="fh-video-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <span className="fh-video-title">Watch Introduction</span>
                </div>

                <div
                  className="fh-video-container"
                  onClick={() => setIsPlaying(true)}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&showinfo=0&rel=0${isPlaying ? "&autoplay=1" : ""}`}
                    title="Introduction"
                    className="fh-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                  />
                  <div className="fh-video-overlay" />

                  {!isPlaying && (
                    <motion.div
                      className="fh-play-btn"
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="fh-play-icon-wrapper">
                        <i className="fa-solid fa-play"></i>
                      </div>
                      <div className="fh-play-ripple" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                className="fh-floating-badge"
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

export default FunnelHero;
