import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../../css/footer.css";

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      link: "#",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      link: "#",
    },
    {
      name: "Twitter",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      link: "#",
    },
    {
      name: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
      link: "#",
    },
  ];

  const quickLinks = [
    { name: "Home", path: "#home" },
    { name: "About", path: "#about" },
    { name: "Services", path: "#services" },
    { name: "Portfolio", path: "#portfolio" },
    { name: "Contact", path: "#contact" },
  ];

  const services = [
    "UI/UX Design",
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Database",
    "AI & Automation",
    "Other",
  ];

  return (
    <footer className="footer" ref={footerRef}>
      {/* Top Accent Line */}
      <div className="footer-accent-line" />

      {/* Background Effects */}
      <div className="footer-bg-glow" />

      {/* Grid Lines */}
      <div className="footer-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="footer-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={
              isInView
                ? { scaleY: 1, opacity: 0.02 }
                : { scaleY: 0, opacity: 0 }
            }
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      {/* Main Footer Content */}
      <motion.div
        className="footer-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Top Section */}
        <div className="footer-top">
          <motion.div className="footer-brand" variants={fadeUpVariants}>
            <a href="#home" className="footer-logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 813 565"
                className="footer-logo-svg"
              >
                <defs>
                  <linearGradient
                    id="microzeeGradientFooter"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#1237D6" />
                    <stop offset="45%" stopColor="#005BFF" />
                    <stop offset="75%" stopColor="#09A8FF" />
                    <stop offset="100%" stopColor="#19D8FF" />
                  </linearGradient>

                  <filter
                    id="blueGlowFooter"
                    x="-30%"
                    y="-30%"
                    width="160%"
                    height="160%"
                  >
                    <feGaussianBlur stdDeviation="7" result="blur" />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="
          0 0 0 0 0
          0 0 0 0.55 0
          0 0 0 1 0
          0 0 0 1 0"
                    />
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path
                  d="
      M212,538.5
      L161,534.5
      L116.5,519
      L155,518.5
      L185,512.5
      L248,481.5
      L581,159.5
      L634.5,146
      L625,148.5
      L623,142.5
      L606,139.5
      L637,139.5
      L638,144.5
      L646.5,140
      L633.5,138
      L639,135.5
      L443,139.5
      L396,151.5
      L357,177.5
      L379.5,135
      L404,108.5
      L441,85.5
      L479,74.5
      L657,73.5
      L702,67.5
      L754,46.5
      L795.5,18
      L767.5,65
      L768.5,72
      L760.5,75
      L760.5,83
      L751.5,88
      L753.5,92
      L725.5,120
      L731.5,120
      L396.5,439
      L454,424.5
      L609,424.5
      L648,418.5
      L695,399.5
      L744,360.5
      L714.5,426
      L680,465.5
      L644,487.5
      L616,495.5
      L353,497.5
      L325,503.5
      L265,528.5
      Z

      M163,493.5
      L116,486.5
      L76,461.5
      L43.5,416
      L25.5,356
      L22.5,289
      L32.5,227
      L56.5,168
      L79.5,134
      L99,114.5
      L126,97.5
      L148,91.5
      L175,92.5
      L203,103.5
      L230.5,128
      L304.5,245
      L322,257.5
      L341,253.5
      L383.5,203
      L417,175.5
      L451,163.5
      L500.5,163
      L455.5,201
      L386.5,303
      L365,320.5
      L332,331.5
      L299,327.5
      L267,307.5
      L199.5,208
      L178,184.5
      L163,177.5
      L138,184.5
      L110.5,225
      L97.5,272
      L97.5,332
      L112.5,380
      L141,413.5
      L165,427.5
      L191,435.5
      L232,436.5
      L279.5,421
      L251,451.5
      L226,470.5
      L192,487.5
      Z"
                  fill="url(#microzeeGradientFooter)"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  filter="url(#blueGlowFooter)"
                />
              </svg>

              <span className="logo-text">
                Micro<span className="logo-highlight">Zee</span> &nbsp;Solutions
              </span>
            </a>
            <p className="footer-description">
              Creating stunning digital experiences with modern technologies.
              Let's build something amazing together.
            </p>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{
                    scale: 1.2,
                    y: -3,
                    color: "#0891ff",
                    boxShadow: "0 0 20px rgba(8, 145, 255, 0.4)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="footer-links" variants={fadeUpVariants}>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-list">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href={link.path} className="footer-link">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div className="footer-links" variants={fadeUpVariants}>
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-list">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href="#services" className="footer-link">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                    {service}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div className="footer-newsletter" variants={fadeUpVariants}>
            <h4 className="footer-heading">Newsletter</h4>
            <p className="newsletter-text">
              Subscribe to get latest updates and news.
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input"
              />
              <motion.button
                className="newsletter-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="footer-divider"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        />

        {/* Bottom Section */}
        <motion.div className="footer-bottom" variants={fadeUpVariants}>
          <p className="copyright">
            © {new Date().getFullYear()} MicroZee Solutions. All rights
            reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#privacy" className="bottom-link">
              Privacy Policy
            </a>
            <span className="link-separator">|</span>
            <a href="#terms" className="bottom-link">
              Terms of Service
            </a>
          </div>
        </motion.div>

        {/* Back to Top Button */}
        <motion.button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 30px rgba(8, 145, 255, 0.4)",
          }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </motion.button>
      </motion.div>
    </footer>
  );
};

export default Footer;
