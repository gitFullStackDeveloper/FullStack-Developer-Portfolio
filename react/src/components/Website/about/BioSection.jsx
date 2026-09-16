import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../../../css/Website/about/bio.css";

const BioSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };
  const timelineEvents = [
    {
      year: "2024",
      title: "Started My Journey",
      description:
        "Started learning web development and discovered my passion for coding.",
      icon: "fa-solid fa-rocket",
    },
    {
      year: "2025",
      title: "First Professional Role",
      description:
        "Started my first professional role as a Frontend Development Instructor.",
      icon: "fa-solid fa-briefcase",
    },
    {
      year: "2025",
      title: "Expanded My Skills",
      description:
        "Expanded into backend development and AI automation, strengthening my full-stack capabilities.",
      icon: "fa-solid fa-layer-group",
    },
    {
      year: "2026",
      title: "Freelance Developer",
      description:
        "Started working with clients, leading projects, and delivering complete software solutions for education businesses.",
      icon: "fa-solid fa-star",
    },
  ];

  const philosophies = [
    {
      icon: "fa-solid fa-heart",
      title: "Passion-Driven",
      description:
        "I believe great software comes from genuine passion and dedication to the craft.",
    },
    {
      icon: "fa-solid fa-users",
      title: "User-First Approach",
      description:
        "I build every solution with the end-user experience in mind.",
    },
    {
      icon: "fa-solid fa-lightbulb",
      title: "Continuous Learning",
      description:
        "Technology evolves rapidly, and I evolve with it through continuous learning.",
    },
    {
      icon: "fa-solid fa-handshake",
      title: "Collaborative Spirit",
      description:
        "The best solutions come from working together, sharing ideas, and knowledge.",
    },
  ];

  return (
    <section className="bio-section" ref={sectionRef}>
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
        className="bio-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="bio-header" variants={fadeUpVariants}>
          <div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            My Story
          </div>
          <h2 className="section-title">
            <span className="title-line">
              The Journey That <span className="highlight-text">Shaped Me</span>
            </span>
          </h2>
          <p className="section-description">
            From curious beginner to experienced developer - here's my story
          </p>
        </motion.div>

        <div className="bio-content-grid">
          <motion.div className="bio-story" variants={fadeUpVariants}>
            <div className="story-text-wrapper">
              <div className="story-icon-quote">
                <i className="fa-solid fa-quote-left"></i>
              </div>
              <p className="story-paragraph">
                My journey into the world of development started back in 2024
                when I discovered the power of creating things with code. What
                began as simple HTML and CSS experiments quickly evolved into a
                deep passion for building complete digital experiences.
              </p>
              <p className="story-paragraph">
                Over the years, I've had the privilege of working with amazing
                teams, tackling challenging projects, and continuously pushing
                the boundaries of what I can create. Each project has taught me
                something new and shaped me into the developer I am today.
              </p>
              <p className="story-paragraph">
                Today, I specialize in crafting full-stack applications that are
                not just functional, but delightful to use. I believe that
                technology should serve people, and that philosophy drives every
                decision I make in my work.
              </p>
              <p className="story-paragraph">
                Today, I specialize in crafting full-stack applications that are
                not just functional, but delightful to use. I believe that
                technology should serve people, and that philosophy drives every
                decision I make in my work.
              </p>
            </div>
          </motion.div>

          <motion.div className="bio-timeline" variants={fadeUpVariants}>
            <div className="timeline-wrapper">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className="timeline-item"
                  initial={{ opacity: 0, x: 50 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
                  }
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
                  whileHover={{ x: 8 }}
                >
                  <div className="timeline-marker">
                    <div className="marker-dot" />
                    {index !== timelineEvents.length - 1 && (
                      <div className="marker-line" />
                    )}
                  </div>
                  <div className="timeline-content">
                    <span className="timeline-year">{event.year}</span>
                    <div className="timeline-card">
                      <div className="timeline-icon">
                        <i className={event.icon}></i>
                      </div>
                      <div className="timeline-text">
                        <h4 className="timeline-title">{event.title}</h4>
                        <p className="timeline-desc">{event.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        {/* Philosophy Section */}
        <motion.div className="philosophy-section" variants={fadeUpVariants}>
          <div className="philosophy-header">
            <h3 className="philosophy-title">
              <i className="fa-solid fa-gem"></i>
              My Philosophy
            </h3>
            <p className="philosophy-subtitle">
              Core principles that guide my work and approach
            </p>
          </div>

          <div className="philosophy-grid">
            {philosophies.map((item, index) => (
              <motion.div
                key={index}
                className="philosophy-card"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ delay: 0.8 + index * 0.15, duration: 0.5 }}
                whileHover={{
                  y: -5,
                  borderColor: "rgba(8, 145, 255, 0.4)",
                  boxShadow: "0 15px 40px rgba(8, 145, 255, 0.08)",
                }}
              >
                <div className="philosophy-icon-wrapper">
                  <div className="philosophy-icon-circle">
                    <i className={item.icon}></i>
                  </div>
                </div>
                <h4 className="philosophy-card-title">{item.title}</h4>
                <p className="philosophy-card-desc">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BioSection;
