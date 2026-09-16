import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import "../../../css/Website/services/faq.css";

const FAQ = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };
  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "I provide web development, frontend and backend development, database solutions, UI/UX implementation, AI automation, and custom software solutions tailored to your project needs.",
      icon: "fa-solid fa-list-check",
    },
    {
      question: "How long does a project take?",
      answer:
        "The timeline depends on the project scope and complexity. After understanding your requirements, I provide a clear estimated timeline and keep you updated throughout the development process.",
      icon: "fa-solid fa-clock",
    },
    {
      question: "How do you determine the project price?",
      answer:
        "Pricing depends on the features, complexity, technology, and overall project requirements. I discuss your needs first and provide transparent pricing based on the actual scope of work.",
      icon: "fa-solid fa-tag",
    },
    {
      question: "Do you provide post-launch support?",
      answer:
        "Yes. I can provide post-launch support for bug fixes, maintenance, updates, and improvements to help keep your project running smoothly.",
      icon: "fa-solid fa-headset",
    },
    {
      question: "Can you work with an existing project?",
      answer:
        "Yes. I can work with existing codebases to add new features, fix issues, improve performance, or integrate new technologies without rebuilding the entire project.",
      icon: "fa-solid fa-code-merge",
    },
    {
      question: "What technologies do you work with?",
      answer:
        "I work with modern technologies including React, JavaScript, Node.js, Express.js, PHP, Laravel, Python, FastAPI, MySQL, MongoDB, and AI automation tools.",
      icon: "fa-solid fa-microchip",
    },
    {
      question: "How do you ensure project quality?",
      answer:
        "I focus on clean code, responsive design, testing, performance, security, and best development practices to deliver reliable and maintainable solutions.",
      icon: "fa-solid fa-shield-check",
    },
    {
      question: "Can I request changes during development?",
      answer:
        "Yes. I maintain clear communication throughout the project so requirements and feedback can be discussed and incorporated during development.",
      icon: "fa-solid fa-rotate",
    },
  ];
  return (
    <section className="faq-section" ref={sectionRef}>
      {/* Background Shapes */}
      <div className="faq-bg-shapes">
        {[
          { size: 220, x: "10%", y: "25%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 200, x: "85%", y: "45%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 180, x: "45%", y: "75%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="faq-shape"
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
      <div className="faq-grid">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="faq-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="faq-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      {/* Particles */}
      <div className="faq-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="faq-particle"
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

      <motion.div
        className="faq-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="faq-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            FAQ
          </motion.div>
          <motion.h2 className="section-title">
            <span className="title-line">
              Frequently <span className="highlight-text">Asked Questions</span>
            </span>
          </motion.h2>
          <motion.p className="section-description">
            Clear answers about my services, process, and projects
          </motion.p>
        </motion.div>

        {/* FAQ Content */}
        <div className="faq-content">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={`faq-item ${openIndex === index ? "active" : ""}`}
                variants={fadeUpVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{ x: 3 }}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="faq-question-left">
                    <div className="faq-icon-wrapper">
                      <i className={faq.icon}></i>
                    </div>
                    <span className="faq-question-text">{faq.question}</span>
                  </div>
                  <motion.div
                    className="faq-arrow"
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="faq-answer-content">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Side Info Card */}
          <motion.div
            className="faq-side-card"
            variants={fadeUpVariants}
            whileHover={{ y: -5 }}
          >
            <div className="faq-side-icon">
              <i className="fa-solid fa-message"></i>
            </div>

            <h3 className="faq-side-title">Still Have Questions?</h3>

            <p className="faq-side-desc">
              Have a project in mind or need more information? Feel free to get
              in touch.
            </p>
            <motion.a
              href="/contact"
              className="faq-side-btn"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(8, 145, 255, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fa-solid fa-paper-plane"></i>
              Contact Me
              <motion.span
                className="btn-arrow"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
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

export default FAQ;
