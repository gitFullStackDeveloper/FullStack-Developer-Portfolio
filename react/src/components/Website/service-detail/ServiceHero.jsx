import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import "../../../css/Website/servicesDetail/serviceHero.css";

const ServiceHero = ({ service }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionRef = useRef(null);
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
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const galleryImages = [service.image, ...(service.images || [])].filter(
    Boolean,
  );

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (galleryImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  return (
    <section className="service-hero-section" ref={sectionRef}>
      {/* Background shapes */}
      <div className="sh-bg-shapes">
        {[
          { size: 150, x: "10%", y: "20%", color: "rgba(8, 145, 255, 0.12)" },
          { size: 200, x: "80%", y: "30%", color: "rgba(8, 145, 255, 0.08)" },
          { size: 120, x: "60%", y: "70%", color: "rgba(8, 145, 255, 0.1)" },
          { size: 100, x: "20%", y: "80%", color: "rgba(8, 145, 255, 0.06)" },
          { size: 80, x: "50%", y: "50%", color: "rgba(8, 145, 255, 0.15)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="sh-shape"
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
              duration: 6 + i,
              delay: i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="sh-grid">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="sh-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 0.04 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="sh-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.04 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      <div className="sh-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="sh-particle"
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
        className="sh-container"
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="sh-back" variants={fadeUpVariants}>
          <Link to="/home" className="sh-back-btn">
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </Link>
        </motion.div>

        <div className="sh-hero">
          {/* Automatic Image Slider */}
          <motion.div className="sh-hero-image" variants={fadeUpVariants}>
            <div className="sh-image-slider">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={galleryImages[activeImage]}
                  alt={`${service.title} - ${activeImage + 1}`}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="sh-slider-img"
                />
              </AnimatePresence>
              {/* Dots indicator */}
              {galleryImages.length > 1 && (
                <div className="sh-slider-dots">
                  {galleryImages.map((_, i) => (
                    <button
                      key={i}
                      className={`sh-slider-dot ${activeImage === i ? "active" : ""}`}
                      onClick={() => setActiveImage(i)}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="sh-hero-overlay" />
            <div className="sh-hero-icon">
              <i className={service.icon}></i>
            </div>
          </motion.div>

          <motion.div className="sh-hero-content">
            <motion.div className="sh-hero-badge" variants={fadeUpVariants}>
              <motion.span
                className="badge-dot"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              {service.subtitle}
            </motion.div>
            <motion.h1 className="sh-hero-title" variants={fadeUpVariants}>
              <span className="title-line">
                {service.title.split(" ")[0]}{" "}
                <span className="highlight-wrapper">
                  <span className="highlight-text">
                    {service.title.split(" ").slice(1).join(" ")}
                  </span>
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
            </motion.h1>
            <motion.p className="sh-hero-desc" variants={fadeUpVariants}>
              {service.overview}
            </motion.p>
            <motion.div className="sh-hero-actions" variants={fadeUpVariants}>
              <motion.a
                href="#contact"
                className="sh-hero-btn primary"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(8, 145, 255, 0.7)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Started</span>
                <motion.span
                  className="cta-icon"
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
              <motion.a
                href="#process"
                className="sh-hero-btn secondary"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(8, 145, 255, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fa-solid fa-diagram-project"></i>Our Process
              </motion.a>
            </motion.div>
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

export default ServiceHero;
