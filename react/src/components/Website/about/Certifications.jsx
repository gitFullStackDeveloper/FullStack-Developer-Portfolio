import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "../../../css/Website/about/certifications.css";

const API_BASE = `${window.API_BASE}/api/certificates`;

const Certifications = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/`);
        if (!res.ok) throw new Error("Failed to load certificates");
        const data = await res.json();
        setCertificates(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);
  const copyShareLink = (certId) => {
    const url = `${window.location.origin}/certificate/${certId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setToast("Link copied to clipboard!");
        setTimeout(() => setToast(""), 3000);
      })
      .catch(() => {
        setToast("Failed to copy link");
        setTimeout(() => setToast(""), 3000);
      });
  };
  return (
    <section className="certifications-section" ref={sectionRef}>
      {/* Background shapes, grid lines, particles (unchanged) */}
      <div className="certifications-bg-shapes">
        {[
          { size: 280, x: "5%", y: "25%", color: "rgba(8, 145, 255, 0.06)" },
          { size: 220, x: "85%", y: "15%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 200, x: "50%", y: "75%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 160, x: "20%", y: "60%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="cert-bg-shape"
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
      {/* ... same for grid lines and particles ... */}

      <div className="certifications-container">
        <motion.div
          className="certifications-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="cert-header-icon">
            <i className="fa-solid fa-award"></i>
          </div>
          <h3 className="certifications-title">My Certifications</h3>
          <p className="certifications-subtitle">
            Professional certifications that validate my expertise and skills
          </p>
        </motion.div>

        {loading ? (
          <div className="cert-loading">
            <i className="fa-solid fa-spinner fa-spin"></i> Loading...
          </div>
        ) : certificates.length === 0 ? (
          <div className="cert-empty">No certificates added yet.</div>
        ) : (
          <div className="certifications-grid">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="cert-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -5,
                  borderColor: `${cert.color}60`,
                  boxShadow: `0 15px 40px ${cert.color}15`,
                }}
              >
                <div
                  className="cert-icon-wrapper"
                  style={{ borderColor: `${cert.color}30` }}
                >
                  <div
                    className="cert-icon-circle"
                    style={{ background: `${cert.color}15` }}
                  >
                    <i className={cert.icon} style={{ color: cert.color }}></i>
                  </div>
                </div>
                <h4 className="cert-title">{cert.title}</h4>
                <span className="cert-issuer">{cert.issuer}</span>
                <div
                  className="cert-accent"
                  style={{
                    background: `linear-gradient(90deg, ${cert.color}, transparent)`,
                  }}
                />

                {/* Action buttons */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.6rem",
                    marginTop: "1rem",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    to={`/certificate/${cert.id}`}
                    className="cert-view-btn"
                  >
                    View Certificate <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                  <button
                    className="cert-share-btn"
                    onClick={() => copyShareLink(cert.id)}
                    title="Copy share link"
                  >
                    <i className="fa-solid fa-link"></i>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <AnimatePresence>
        {toast && (
          <motion.div
            className="cert-toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
