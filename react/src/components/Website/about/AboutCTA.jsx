import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import "../../../css/Website/about/aboutcta.css";

const AboutCTA = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
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
    <section className="about-cta-section" ref={sectionRef}>
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

      {/* Floating Particles */}
      <div className="cta-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="cta-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
            }}
            animate={{
              y: [0, -60],
              opacity: [0, 0.8, 0],
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

      {/* Main Content */}
      <motion.div
        className="about-cta-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="about-cta-header" variants={fadeUpVariants}>
          <div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Let's Connect
          </div>
          <h2 className="section-title">
            <span className="title-line">
              Ready to Start{" "}
              <span className="highlight-text">Your Project?</span>
            </span>
          </h2>
          <p className="section-description">
            Let’s bring your ideas to life. I’m just a message away!
          </p>
        </motion.div>

        {/* Large CTA Card */}
        <motion.div className="cta-hero-card" variants={fadeUpVariants}>
          <div className="cta-rings">
            <motion.div
              className="cta-ring ring-1"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="cta-ring ring-2"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="cta-hero-content">
            <div className="cta-hero-left">
              <motion.div className="cta-badge" variants={fadeUpVariants}>
                <span className="cta-badge-dot" />
                Available for Projects
              </motion.div>

              <motion.h2 className="cta-hero-title" variants={fadeUpVariants}>
                Let's Build Something
                <span className="cta-title-highlight"> Amazing Together</span>
              </motion.h2>

              <motion.p className="cta-hero-desc" variants={fadeUpVariants}>
                I'm currently open to freelance projects, full-time positions,
                and exciting collaborations. Have an idea? Let's make it happen!
              </motion.p>

              <motion.div className="cta-hero-btns" variants={fadeUpVariants}>
                <motion.a
                  href="/contact"
                  className="cta-hero-btn primary"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(8, 145, 255, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fa-solid fa-hand-sparkles"></i>
                  Start a Project
                  <span className="btn-shine" />
                </motion.a>

                <motion.a
                  href="#"
                  className="cta-hero-btn secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDownload();
                  }}
                  whileHover={{ scale: 1.05 }}
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
                      <i className="fa-solid fa-file-arrow-down"></i>
                      Download CV
                    </>
                  )}
                </motion.a>
              </motion.div>
            </div>

            <div className="cta-hero-right">
              <div className="cta-visual-wrapper">
                <motion.div
                  className="cta-visual-circle"
                  animate={{
                    boxShadow: [
                      "0 0 60px rgba(8, 145, 255, 0.2)",
                      "0 0 100px rgba(8, 145, 255, 0.4)",
                      "0 0 60px rgba(8, 145, 255, 0.2)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="cta-visual-inner">
                    <motion.i
                      className="fa-solid fa-code"
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                </motion.div>

                {[
                  {
                    icon: "fa-brands fa-react",
                    top: "5%",
                    left: "10%",
                    delay: 0,
                  },
                  {
                    icon: "fa-brands fa-node-js",
                    top: "70%",
                    left: "5%",
                    delay: 0.5,
                  },
                  {
                    icon: "fa-solid fa-database",
                    top: "15%",
                    right: "8%",
                    delay: 1,
                  },
                  {
                    icon: "fa-brands fa-python",
                    bottom: "10%",
                    right: "15%",
                    delay: 1.5,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="cta-floating-icon"
                    style={{
                      top: item.top,
                      left: item.left,
                      right: item.right,
                      bottom: item.bottom,
                    }}
                    animate={{ y: [-10, 10, -10] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: item.delay,
                      ease: "easeInOut",
                    }}
                  >
                    <i className={item.icon}></i>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutCTA;
