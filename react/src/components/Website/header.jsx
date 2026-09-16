import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../css/header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const getActiveFromPath = () => {
    const path = window.location.pathname;
    if (path === "/about") return "about";
    if (path === "/services") return "services";
    if (path === "/portfolio") return "portfolio";
    if (path === "/contact") return "contact";
    return "home";
  };

  const [activeLink, setActiveLink] = useState(getActiveFromPath());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home", href: "/home" },
    { id: "about", label: "About", href: "/about" },
    { id: "services", label: "Services", href: "/services" },
    { id: "portfolio", label: "Portfolio", href: "/portfolio" },
    { id: "contact", label: "Contact", href: "/contact" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const logoVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: {
      scale: 1.05,
      filter: "drop-shadow(0 0 20px rgba(8, 145, 255, 0.8))",
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.header
      className={`header ${isScrolled ? "scrolled" : ""}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="header-container">
        <motion.div
          className="logo"
          initial="initial"
          whileTap={{ scale: 0.95 }}
        >
          <a href="#home" className="logo-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 813 565"
              className="logo-svg"
            >
              <defs>
                <linearGradient
                  id="microzeeGradient"
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
                  id="blueGlow"
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
                fill="url(#microzeeGradient)"
                fillRule="evenodd"
                clipRule="evenodd"
                filter="url(#blueGlow)"
              />
            </svg>

            <span className="header-logo-text">
              Micro<span className="logo-highlight">Zee</span>&nbsp; Solutions
            </span>

            <motion.span
              className="logo-dot"
              animate={{
                opacity: [1, 0.3, 1],
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </a>
        </motion.div>

        <motion.nav className="nav-desktop">
          {navLinks.map((link) => (
            <motion.a
              key={link.id}
              href={link.href}
              className={`nav-link ${activeLink === link.id ? "active" : ""}`}
              variants={itemVariants}
              onClick={() => setActiveLink(link.id)}
              whileHover={{
                scale: 1.1,
                color: "#0891ff",
                textShadow: "0 0 15px rgba(8, 145, 255, 0.8)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {link.label}
              {activeLink === link.id && (
                <motion.div
                  className="active-indicator"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </motion.nav>

        {/* CTA Button */}
        <motion.button
          className="cta-button"
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 30px rgba(8, 145, 255, 0.6)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Let's Talk</span>
          <motion.span
            className="button-arrow"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.button>

        {/* Mobile Hamburger */}
        <motion.div
          className={`hamburger ${isMobileOpen ? "open" : ""}`}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <span />
          <span />
          <span />
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.div
              className="mobile-menu-inner"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.2 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  className={`mobile-link ${activeLink === link.id ? "active" : ""}`}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -30 },
                  }}
                  onClick={() => {
                    setActiveLink(link.id);
                    setIsMobileOpen(false);
                  }}
                  whileHover={{
                    x: 10,
                    color: "#0891ff",
                    textShadow: "0 0 15px rgba(8, 145, 255, 0.8)",
                  }}
                >
                  <span className="mobile-link-number">
                    0{navLinks.indexOf(link) + 1}.
                  </span>
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
