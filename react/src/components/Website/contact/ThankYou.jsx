import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import "../../../css/Website/contact/thankYou.css";

const ThankYou = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextSteps = [
    {
      icon: "fa-solid fa-envelope",
      title: "Check Your Email",
      desc: "You'll receive a confirmation email shortly with all the details.",
    },
    {
      icon: "fa-solid fa-calendar-check",
      title: "Meeting Scheduled",
      desc: "Your meeting has been booked. I'll send a calendar invite.",
    },
    {
      icon: "fa-solid fa-clock",
      title: "24hr Review",
      desc: "I'll review your project details and prepare for our discussion.",
    },
    {
      icon: "fa-solid fa-comments",
      title: "Let's Talk",
      desc: "We'll discuss your project in detail during our scheduled meeting.",
    },
  ];

  return (
    <section className="ty-section" ref={sectionRef}>
      {/* Background */}
      <div className="ty-bg-shapes">
        {[
          { size: 350, x: "10%", y: "25%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 280, x: "80%", y: "40%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 220, x: "50%", y: "70%", color: "rgba(8, 145, 255, 0.03)" },
          { size: 180, x: "30%", y: "15%", color: "rgba(16, 185, 129, 0.04)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="ty-shape"
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
      <div className="ty-grid-lines">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="ty-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 0.04 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="ty-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.04 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      {/* Particles */}
      <div className="ty-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="ty-particle"
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
      <div className="ty-container">
        <br />
        <br />
        <br />

        {/* Success Animation */}
        <motion.div
          className="ty-success-icon"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
        >
          <motion.div
            className="ty-check-circle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <i className="fa-solid fa-check"></i>
          </motion.div>
          <div className="ty-success-ripple" />
          <div className="ty-success-ripple delay" />
        </motion.div>

        {/* Title */}
        <motion.div
          className="ty-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span className="ty-badge">Step 6 of 6 - Complete</span>
          <h1 className="ty-title">
            Thank You! <span className="ty-wave">🎉</span>
          </h1>
          <p className="ty-description">
            Your project request has been submitted successfully. I'm excited to
            learn more about your project and discuss how we can bring it to
            life.
          </p>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          className="ty-next-steps"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="ty-steps-title">
            <i className="fa-solid fa-list-check"></i> What Happens Next
          </h3>
          <div className="ty-steps-grid">
            {nextSteps.map((step, i) => (
              <motion.div
                key={i}
                className="ty-step-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.15, duration: 0.5 }}
                whileHover={{ y: -5, borderColor: "rgba(8, 145, 255, 0.4)" }}
              >
                <div className="ty-step-icon">
                  <i className={step.icon}></i>
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="ty-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Link to="/" className="ty-btn primary">
            <i className="fa-solid fa-home"></i> Back to Home
          </Link>
          <Link to="/portfolio" className="ty-btn secondary">
            <i className="fa-solid fa-briefcase"></i> View Portfolio
          </Link>
          <Link to="/services" className="ty-btn secondary">
            <i className="fa-solid fa-tags"></i> Explore Services
          </Link>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="ty-contact-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <p>
            Need immediate assistance?{" "}
            <a href="mailto:hello@example.com">arhamraza1805@gmail.com</a>
          </p>
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />
    </section>
  );
};

export default ThankYou;
