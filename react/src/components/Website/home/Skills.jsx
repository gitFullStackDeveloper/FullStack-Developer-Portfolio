import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import "../../../css/Website/home/skills.css";

const Skills = () => {
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
    hidden: { opacity: 0, y: 50, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 0.7,
        ease: "backOut",
      },
    }),
  };

  const skillCategories = [
    {
      title: "UI/UX Design",
      subtitle: "Creative & Modern Design",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
      skills: [
        "Figma",
        "Canva",
        "Claude AI",
        "Stitch",
        "Responsive Design",
        "AI-Assisted Design",
      ],
    },
    {
      title: "Frontend Development",
      subtitle: "Building Beautiful UIs",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "Bootstrap",
        "Tailwind",
        "React JS",
        "Next JS",
        "GitHub",
      ],
    },
    {
      title: "Backend & Database",
      subtitle: "Server & Database Solutions",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
      skills: [
        "Node JS",
        "Express JS",
        "MongoDB",
        "PHP",
        "Laravel",
        "MySQL",
        "Python",
        "Docker",
      ],
    },

    {
      title: "AI & Automation",
      subtitle: "Smart Workflows",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ),
      skills: [
        "n8n",
        "make.com",
        "Python",
        "AI Integration",
        "API Integration",
        "Workflow Automation",
      ],
    },
  ];

  return (
    <section className="skills-section" ref={sectionRef}>
      {/* Background Shapes */}
      <div className="skills-bg-shapes">
        {[
          { size: 250, x: "5%", y: "15%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 200, x: "90%", y: "40%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 220, x: "50%", y: "70%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 180, x: "30%", y: "85%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="skills-shape"
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
      <div className="skills-grid">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="skills-grid-line vertical"
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
            className="skills-grid-line horizontal"
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
      <div className="skills-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="skills-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              y: [0, -90],
              opacity: [0, 0.6, 0],
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
        className="skills-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="skills-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            My Skills
          </motion.div>

          <motion.h2 className="section-title">
            <span className="title-line">
              Technologies I <span className="highlight-text">Work With</span>
            </span>
          </motion.h2>

          <motion.p className="section-description" variants={fadeUpVariants}>
            A comprehensive set of tools and technologies I use to build amazing
            digital products
          </motion.p>
        </motion.div>

        {/* Skills Grid - 4 Columns */}
        <motion.div className="skills-grid-4col">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              className="skill-card-modern"
              custom={catIndex}
              variants={cardVariants}
              whileHover={{
                y: -8,
                borderColor: "rgba(8, 145, 255, 0.6)",
                boxShadow:
                  "0 20px 60px rgba(8, 145, 255, 0.15), 0 0 80px rgba(8, 145, 255, 0.05)",
              }}
            >
              <div className="card-accent-bar" />

              <div className="card-icon-section">
                <div className="card-icon-circle">
                  <div className="card-icon">{category.icon}</div>
                  <motion.div
                    className="card-icon-pulse"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Title Section */}
              <div className="card-title-section">
                <h3 className="card-title">{category.title}</h3>
                <p className="card-subtitle">{category.subtitle}</p>
              </div>

              {/* Skills Tags */}
              <div className="card-skills-tags">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="skill-tag-modern"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{
                      delay: 0.8 + catIndex * 0.2 + skillIndex * 0.05,
                      duration: 0.4,
                    }}
                    whileHover={{
                      scale: 1.1,
                      borderColor: "rgba(8, 145, 255, 0.8)",
                      boxShadow: "0 0 15px rgba(8, 145, 255, 0.3)",
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />
    </section>
  );
};

export default Skills;
