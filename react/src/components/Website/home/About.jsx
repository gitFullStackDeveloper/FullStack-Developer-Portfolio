import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import "../../../css/Website/home/about.css";

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="about-section" ref={sectionRef}>
      {/* Background Shapes */}
      <div className="about-bg-shapes">
        {[
          { size: 200, x: "5%", y: "20%", color: "rgba(8, 145, 255, 0.06)" },
          { size: 180, x: "85%", y: "60%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 150, x: "50%", y: "80%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 120, x: "30%", y: "10%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="about-shape"
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
      <div className="about-grid">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="about-grid-line vertical"
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
            className="about-grid-line horizontal"
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

      {/* Particle Effect */}
      <div className="about-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="about-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
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
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="about-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            About Me
          </motion.div>

          <motion.h2 className="section-title">
            <span className="title-line">
              Get To Know <span className="highlight-text">About Me</span>
            </span>
          </motion.h2>

          <motion.p className="section-description" variants={fadeUpVariants}>
            A passionate developer who loves crafting beautiful and functional
            digital experiences
          </motion.p>
        </motion.div>

        {/* Split Layout */}
        <div className="about-content">
          {/* Left Column - Content */}
          <motion.div className="about-left" variants={fadeUpVariants}>
            <motion.h3 className="about-subtitle">
              Hi 🙌, I'm Arham Raza, a passionate Software Developer building
              AI-powered solutions for education businesses.
            </motion.h3>

            <motion.p className="about-description" variants={fadeUpVariants}>
              I build modern websites, web apps, and software that solve real
              business problems. I focus on creating clean, reliable, and
              easy-to-use solutions for education businesses.
            </motion.p>

            <motion.p
              className="about-description secondary"
              variants={fadeUpVariants}
            >
              I also use AI and automation to reduce repetitive work, save time,
              and make software smarter. My goal is to turn real business needs
              into simple and useful digital solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="about-cta-group"
              variants={fadeUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.a
                href="#contact"
                className="about-cta primary"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(8, 145, 255, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="cta-icon">
                  <i className="fa fa-book-open" aria-hidden="true"></i>
                </span>
                Learn More About Me
              </motion.a>
              <motion.a
                href="#"
                className="about-cta secondary"
                onClick={(e) => {
                  e.preventDefault();
                  handleDownload();
                }}
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(8, 145, 255, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
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
                    <span className="cta-icon">
                      <i
                        className="fa-solid fa-download"
                        aria-hidden="true"
                      ></i>
                    </span>
                    Download CV
                  </>
                )}
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div className="about-right" variants={fadeUpVariants}>
            <div className="video-wrapper">
              <motion.div
                className="video-ring ring-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="video-ring ring-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />

              {/* Video Container */}
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="About Me Video"
                  className="about-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                />

                {/* Video Overlay */}
                <div className="video-overlay" />

                {/* Corner Accents */}
                <div className="video-corner top-left" />
                <div className="video-corner top-right" />
                <div className="video-corner bottom-left" />
                <div className="video-corner bottom-right" />

                {/* Glow Effect */}
                <motion.div
                  className="video-glow"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>

            {/* Tech Stack Badges */}
            <motion.div
              className="tech-stack"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {["Designing", "Development", "AI Automations"].map((tech, i) => (
                <motion.span
                  key={i}
                  className="tech-badge"
                  whileHover={{
                    scale: 1.1,
                    borderColor: "rgba(8, 145, 255, 0.8)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
                >
                  {tech}
                </motion.span>
              ))}
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

export default About;
