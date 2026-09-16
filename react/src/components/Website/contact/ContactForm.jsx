import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../../css/Website/contact/contactForm.css";

const ContactForm = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [services, setServices] = useState([]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".cf-custom-select-wrapper")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    localStorage.setItem("contactStep1", JSON.stringify(formData));
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/contact/project-details", { state: formData });
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const contactDetails = [
    {
      icon: "fa-solid fa-envelope",
      title: "Email",
      value: "arhamraza1805@gmail.com",
      link: "mailto:hello@example.com",
      color: "#0891ff",
    },
    {
      icon: "fa-solid fa-phone",
      title: "Phone",
      value: "+92 370 829-5598",
      link: "",
      // color: '#10b981'
      color: "#0891ff",
    },
    {
      icon: "fa-solid fa-location-dot",
      title: "Location",
      value: "Punjab, Pakistan",
      color: "#0891ff",
      // color: '#f59e0b'
    },
    {
      icon: "fa-solid fa-clock",
      title: "Working Hours",
      value: "Mon - Sat, 9AM - 6PM",
      color: "#0891ff",
      // color: '#8b5cf6'
    },
  ];
  const [socialLinks, setSocialLinks] = useState([
    { icon: "fa-brands fa-github", name: "GitHub", link: "#" },
    { icon: "fa-brands fa-linkedin-in", name: "LinkedIn", link: "#" },
    { icon: "fa-brands fa-twitter", name: "Twitter", link: "#" },
    { icon: "fa-brands fa-instagram", name: "Instagram", link: "#" },
    { icon: "fa-brands fa-discord", name: "Discord", link: "#" },
    { icon: "fa-brands fa-whatsapp", name: "WhatsApp", link: "#" },
  ]);

  useEffect(() => {
    fetch(`${window.API_BASE}/api/settings/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.social_links && data.social_links.length > 0) {
          setSocialLinks(data.social_links);
        }
      })
      .catch(() => {}); // fall back to defaults
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      setServicesLoading(true);
      try {
        const res = await fetch(`${window.API_BASE}/api/services/`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setServices(data.map((service) => service.title));
          }
        }
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setServicesLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section
      className="contact-form-section"
      id="contact-form-section"
      ref={sectionRef}
    >
      {/* Background */}
      <div className="cf-bg-shapes">
        {[
          { size: 250, x: "10%", y: "30%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 200, x: "80%", y: "50%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 180, x: "45%", y: "75%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="cf-shape"
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

      <div className="cf-grid-lines">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="cf-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="cf-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      <div className="cf-particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="cf-particle"
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
        className="cf-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="cf-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Get In Touch
          </motion.div>
          <motion.h2 className="section-title">
            <span className="title-line">
              Let's <span className="highlight-text">Work Together</span>
            </span>
          </motion.h2>
          <motion.p className="section-description">
            Fill out the form to book a call and discuss your project.
          </motion.p>
        </motion.div>

        <div className="cf-content-grid">
          <motion.div className="cf-left" variants={fadeUpVariants}>
            <div className="cf-contact-cards">
              {contactDetails.map((detail, i) => (
                <motion.div
                  key={i}
                  className="cf-contact-card"
                  whileHover={{ x: 5, borderColor: `${detail.color}40` }}
                >
                  <div
                    className="cf-contact-icon"
                    style={{
                      background: `${detail.color}15`,
                      borderColor: `${detail.color}30`,
                    }}
                  >
                    <i
                      className={detail.icon}
                      style={{ color: detail.color }}
                    ></i>
                  </div>
                  <div className="cf-contact-info">
                    <span className="cf-contact-title">{detail.title}</span>
                    {detail.link ? (
                      <a href={detail.link} className="cf-contact-value">
                        {detail.value}
                      </a>
                    ) : (
                      <span className="cf-contact-value">{detail.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="cf-social-section">
              <h4 className="cf-social-title">
                <i className="fa-solid fa-share-nodes"></i>Connect With Me
              </h4>
              <div className="cf-social-grid">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.url}
                    className="cf-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    whileHover={{
                      scale: 1.15,
                      y: -3,
                      boxShadow: "0 8px 25px rgba(8, 145, 255, 0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className={social.icon}></i>
                    <span>{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div className="cf-right" variants={fadeUpVariants}>
            <div className="cf-form-wrapper">
              <div className="cf-form-heading">
                <h3 className="cf-form-title">Get In Touch</h3>
                <p className="cf-form-subtitle">Step 1 of 6 - Book a Call</p>
              </div>

              <div className="cf-step-indicator">
                <div className="cf-step active">
                  <div className="cf-step-number">1</div>
                  <span className="cf-step-label">Contact</span>
                </div>
                <div className="cf-step-line" />
                <div className="cf-step">
                  <div className="cf-step-number">2</div>
                  <span className="cf-step-label">Details</span>
                </div>
                <div className="cf-step-line" />
                <div className="cf-step">
                  <div className="cf-step-number">6</div>
                  <span className="cf-step-label">Done</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="cf-form">
                <div className="cf-form-row">
                  <div className="cf-form-group">
                    <label className="cf-label">
                      <i className="fa-solid fa-user"></i>Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="cf-input"
                    />
                  </div>
                  <div className="cf-form-group">
                    <label className="cf-label">
                      <i className="fa-solid fa-envelope"></i>Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="cf-input"
                    />
                  </div>
                </div>

                {/* Custom Dropdown */}
                <div className="cf-form-group">
                  <label className="cf-label">
                    <i className="fa-solid fa-briefcase"></i>Service Interested
                    In
                  </label>
                  <div className="cf-custom-select-wrapper">
                    <div
                      className={`cf-custom-select ${isDropdownOpen ? "active" : ""}`}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span
                        className={
                          formData.service ? "selected" : "placeholder"
                        }
                      >
                        {servicesLoading ? (
                          <>
                            <i
                              className="fa-solid fa-spinner fa-spin"
                              style={{ marginRight: "0.5rem" }}
                            ></i>
                            Loading services...
                          </>
                        ) : (
                          formData.service || "Select a service you need..."
                        )}
                      </span>
                      <div className="cf-select-arrow">
                        <i
                          className={`fa-solid fa-chevron-down ${isDropdownOpen ? "rotated" : ""}`}
                        ></i>
                      </div>
                    </div>
                    {isDropdownOpen && (
                      <motion.div
                        className="cf-custom-dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          className="cf-dropdown-option placeholder-option"
                          onClick={() => {
                            setFormData({ ...formData, service: "" });
                            setIsDropdownOpen(false);
                          }}
                        >
                          Select a service you need...
                        </div>
                        {services.map((s, i) => (
                          <div
                            key={i}
                            className={`cf-dropdown-option ${formData.service === s ? "active" : ""}`}
                            onClick={() => {
                              setFormData({ ...formData, service: s });
                              setIsDropdownOpen(false);
                            }}
                          >
                            {s}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    style={{ display: "none" }}
                  >
                    <option value="">Select a service you need...</option>
                    {services.map((s, i) => (
                      <option key={i} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="cf-form-group">
                  <label className="cf-label">
                    <i className="fa-solid fa-message"></i>Project Description
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, goals, and requirements..."
                    className="cf-textarea"
                    rows="5"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="cf-submit-btn"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="fa-solid fa-spinner pd3-icon-spin"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      Continue to Next Step
                      <i className="fa-solid fa-arrow-right"></i>
                    </>
                  )}
                </motion.button>
              </form>
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

export default ContactForm;
