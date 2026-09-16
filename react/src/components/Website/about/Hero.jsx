import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import "../../../css/Website/about/hero.css";
import Arhamimage from "../../../assets/Arhamimage.jpeg";

const AboutHero = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3],
  );

  // Resume states
  const [resumeUrl, setResumeUrl] = useState("");
  const [downloadLoading, setDownloadLoading] = useState(false);

  useEffect(() => {
    fetch(`${window.API_BASE}/api/settings/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.resume_url) {
          setResumeUrl(data.resume_url);
        }
      })
      .catch(() => {});
  }, []);
  const handleDownload = () => {
    if (!resumeUrl) return;
    setDownloadLoading(true);

    try {
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = "Arham_Raza_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setTimeout(() => setDownloadLoading(false), 1000);
    }
  };
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

  return (
    <section className="about-hero-section" ref={sectionRef}>
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
        className="about-hero-container"
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="about-hero-grid-layout">
          <motion.div className="about-hero-left" variants={fadeUpVariants}>
            <div className="about-image-composition">
              <div className="about-main-image-wrapper">
                <div className="about-image-frame">
                  <img
                    src={Arhamimage}
                    alt="Profile"
                    className="about-main-image"
                  />
                  <div className="about-image-inner-shadow" />
                </div>
                <div className="about-image-accent accent-1" />
                <div className="about-image-accent accent-2" />
              </div>

              <motion.div
                className="floating-tech-icon tech-icon-1"
                animate={{ y: [-8, 8, -8] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <i className="fa-brands fa-react"></i>
              </motion.div>

              <motion.div
                className="floating-tech-icon tech-icon-2"
                animate={{ y: [8, -8, 8] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <i className="fa-brands fa-python"></i>
              </motion.div>

              <motion.div
                className="floating-tech-icon tech-icon-3"
                animate={{ y: [-6, 6, -6] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <i className="fa-solid fa-database"></i>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content Section */}
          <motion.div className="about-hero-right" variants={fadeUpVariants}>
            <motion.div className="about-greeting" variants={fadeUpVariants}>
              <span className="greeting-text">HELLO THERE</span>
              <span className="greeting-line" />
            </motion.div>

            <motion.h1 className="about-name" variants={fadeUpVariants}>
              I'm <span className="name-highlight">Arham Raza</span>
            </motion.h1>

            <motion.p className="about-description" variants={fadeUpVariants}>
              I'm a passionate Software Developer building AI-powered software
              solutions for education businesses. I turn ideas into simple,
              smart, and reliable digital solutions using modern technology.
            </motion.p>

            <motion.div className="about-quick-info" variants={fadeUpVariants}>
              <div className="quick-info-item">
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <span className="quick-info-label">Location</span>
                  <span className="quick-info-value">Punjab, Pakistan</span>
                </div>
              </div>
              <div className="quick-info-item">
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <span className="quick-info-label">Email</span>
                  <span className="quick-info-value">
                    arhamraza1805@gmail.com
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div className="about-actions" variants={fadeUpVariants}>
              <motion.a
                href="#contact"
                className="about-btn primary-btn"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fa-solid fa-paper-plane"></i>
                Let's Work Together
                <span className="btn-shine" />
              </motion.a>
              <motion.a
                href="#"
                className="about-btn secondary-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleDownload();
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {downloadLoading ? (
                  <>
                    <span
                      className="about-spinner"
                      style={{
                        width: "16px",
                        height: "16px",
                        borderWidth: "2px",
                      }}
                    ></span>
                    Downloading...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-file-arrow-down"></i>
                    Download Resume
                  </>
                )}
              </motion.a>
            </motion.div>

            <motion.div
              className="about-social-proof"
              variants={fadeUpVariants}
            >
              <div className="proof-item">
                <span className="proof-number">10+</span>
                <span className="proof-label">Projects Done</span>
              </div>
              <div className="proof-divider" />
              <div className="proof-item">
                <span className="proof-number">10+</span>
                <span className="proof-label">Happy Clients</span>
              </div>
              <div className="proof-divider" />
              <div className="proof-item">
                <span className="proof-number">15+</span>
                <span className="proof-label">Technologies</span>
              </div>
            </motion.div>
          </motion.div>
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

export default AboutHero;
