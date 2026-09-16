import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import "../../../css/Website/about/certificateView.css";

const API_BASE = `${window.API_BASE}/api/certificates`;

const CertificateView = () => {
  const { id } = useParams();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const fetchCert = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/${id}`);
        if (!res.ok) throw new Error("Certificate not found");
        const data = await res.json();
        setCert(data);
      } catch (err) {
        console.error(err);
        setCert(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCert();
  }, [id]);

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setToast("Link copied!");
        setTimeout(() => setToast(""), 3000);
      })
      .catch(() => {
        setToast("Failed to copy");
        setTimeout(() => setToast(""), 3000);
      });
  };

  const openModal = () => {
    setZoom(1);
    setIsFullscreen(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setZoom(1);
    setIsFullscreen(false);
  };

  const zoomIn = () => setZoom((z) => Math.min(3, z + 0.5));
  const zoomOut = () => setZoom((z) => Math.max(1, z - 0.5));
  const resetZoom = () => setZoom(1);

  const toggleFullscreen = () => setIsFullscreen((f) => !f);

  if (loading)
    return (
      <div className="cert-view-loading">
        <i className="fa-solid fa-spinner fa-spin"></i> Loading...
      </div>
    );
  if (!cert)
    return <div className="cert-view-error">Certificate not found.</div>;

  const isImage =
    cert.credential_url &&
    (cert.credential_url.startsWith("data:image") ||
      /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(cert.credential_url));

  return (
    <div className="cert-view-page">
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="cert-view-details">
        <h2>{cert.title}</h2>
        <p>{cert.issuer}</p>
      </div>
      <div className="cert-frame" onClick={isImage ? openModal : undefined}>
        {isImage ? (
          <img
            src={cert.credential_url}
            alt={cert.title}
            className="cert-frame-img"
          />
        ) : (
          <div className="cert-frame-noimg">
            <a
              href={cert.credential_url}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-external-link"
            >
              <i className="fa-solid fa-external-link"></i> View Credential
            </a>
          </div>
        )}
        {/* Decorative corner accents */}
        <div className="cert-corner cert-corner-tl"></div>
        <div className="cert-corner cert-corner-tr"></div>
        <div className="cert-corner cert-corner-bl"></div>
        <div className="cert-corner cert-corner-br"></div>
      </div>
      <br />
      <br />

      {/* Modal overlay */}
      <AnimatePresence>
        {modalOpen && isImage && (
          <motion.div
            className={`cert-modal-overlay ${isFullscreen ? "cert-fullscreen" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="cert-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal toolbar */}
              <div className="cert-modal-toolbar">
                <div className="cert-modal-toolbar-left">
                  <button onClick={closeModal} className="cert-modal-btn">
                    <i className="fa-solid fa-times"></i>
                  </button>
                </div>
                <div className="cert-modal-toolbar-right">
                  <button onClick={zoomOut} className="cert-modal-btn">
                    <i className="fa-solid fa-magnifying-glass-minus"></i>
                  </button>
                  <button onClick={zoomIn} className="cert-modal-btn">
                    <i className="fa-solid fa-magnifying-glass-plus"></i>
                  </button>
                  <button onClick={resetZoom} className="cert-modal-btn">
                    <i className="fa-solid fa-expand"></i>
                  </button>
                  <button onClick={toggleFullscreen} className="cert-modal-btn">
                    <i
                      className={`fa-solid ${isFullscreen ? "fa-compress" : "fa-maximize"}`}
                    ></i>
                  </button>
                  <button onClick={copyLink} className="cert-modal-btn">
                    <i className="fa-solid fa-link"></i>
                  </button>
                </div>
              </div>
              {/* Image container */}
              <div className="cert-modal-img-container">
                <img
                  src={cert.credential_url}
                  alt={cert.title}
                  style={{ transform: `scale(${zoom})` }}
                  className="cert-modal-img"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="cert-toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertificateView;
