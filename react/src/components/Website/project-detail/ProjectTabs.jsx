import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import "../../../css/Website/project-detail/projectTabs.css";

const ProjectTabs = ({ project }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [openFaq, setOpenFaq] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "fa-solid fa-compass" },
    { id: "features", label: "Features", icon: "fa-solid fa-list-check" },
    { id: "includes", label: "What's Included", icon: "fa-solid fa-box-open" },
    { id: "faq", label: "FAQ", icon: "fa-solid fa-circle-question" },
  ];

  const features = (project.features || []).map((feature) => ({
    title: feature.title,
    desc: feature.description || feature.desc || "",
    icon: feature.icon || "fa-solid fa-check",
  }));

  const includes = (project.includes || []).map((item) =>
    typeof item === "string" ? item : item.text || item.title || "",
  );

  const faqs = (project.faqs || []).map((faq) => ({
    q: faq.question || faq.q || "",
    a: faq.answer || faq.a || "",
  }));
  const formatText = (text) => {
    if (!text) return "";
    const escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
    return escaped.replace(/\n/g, "<br>");
  };
  const tabContent = {
    overview: (
      <div className="pdt-tab-panel">
        <h3>
          <i className="fa-solid fa-file-lines"></i> Project Overview
        </h3>
        <p
          className="overview-text"
          dangerouslySetInnerHTML={{
            __html: formatText(project.description || project.desc),
          }}
        />
        <div className="overview-highlights">
          {features.slice(0, 4).map((feature, i) => (
            <div key={i} className="highlight-item">
              <div className="highlight-icon">
                <i className={feature.icon}></i>
              </div>
              <div className="highlight-content">
                <h5>{feature.title}</h5>
                <p
                  dangerouslySetInnerHTML={{ __html: formatText(feature.desc) }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    features: (
      <div className="pdt-tab-panel">
        <h3>
          <i className="fa-solid fa-list-check"></i> Key Features
        </h3>
        <div className="features-grid">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="feature-card"
              whileHover={{ y: -3, borderColor: "rgba(8, 145, 255, 0.35)" }}
            >
              <div className="feature-icon-wrapper">
                <i className={feature.icon}></i>
              </div>
              <div className="feature-info">
                <h4>{feature.title}</h4>
                <p
                  dangerouslySetInnerHTML={{ __html: formatText(feature.desc) }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
    includes: (
      <div className="pdt-tab-panel">
        <h3>
          <i className="fa-solid fa-box-open"></i> What's Included
        </h3>
        <div className="includes-grid">
          {includes.map((item, i) => (
            <motion.div key={i} className="include-item" whileHover={{ x: 5 }}>
              <div className="include-check">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    ),
    faq: (
      <div className="pdt-tab-panel">
        <h3>
          <i className="fa-solid fa-circle-question"></i> Frequently Asked
          Questions
        </h3>
        <div className="faq-collapse-list">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className={`faq-collapse-item ${openFaq === i ? "open" : ""}`}
              whileHover={{
                borderColor:
                  openFaq === i
                    ? "rgba(8, 145, 255, 0.4)"
                    : "rgba(8, 145, 255, 0.2)",
              }}
            >
              <button
                className="faq-collapse-header"
                onClick={() => toggleFaq(i)}
              >
                <div className="faq-collapse-left">
                  <div className="faq-collapse-icon">
                    <i className="fa-solid fa-question-circle"></i>
                  </div>
                  <h4>{faq.q}</h4>
                </div>
                <motion.div
                  className="faq-collapse-arrow"
                  animate={{ rotate: openFaq === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <i className="fa-solid fa-plus"></i>
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    className="faq-collapse-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="faq-collapse-content">
                      <div className="faq-answer-icon">
                        <i className="fa-solid fa-message"></i>
                      </div>
                      <p
                        dangerouslySetInnerHTML={{ __html: formatText(faq.a) }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <section className="pdt-section" ref={sectionRef}>
      {/* Background */}
      <div className="pdt-bg-shapes">
        {[
          { size: 200, x: "50%", y: "40%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="pdt-shape"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
              background: shape.color,
            }}
            animate={{ y: [-30, 30, -30], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="pdt-grid-lines">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="pdt-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="pdt-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      <div className="pdt-container">
        <motion.div
          className="pdt-tabs-section"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="pdt-tabs-nav">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                className={`pdt-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <i className={tab.icon}></i>
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    className="active-tab-indicator"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          <div className="pdt-tab-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {tabContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectTabs;
