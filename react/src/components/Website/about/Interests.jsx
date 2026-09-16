import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../../../css/Website/about/interests.css";

const Interests = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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
  const aiInterests = [
    {
      icon: "fa-solid fa-robot",
      title: "AI Agents",
      description:
        "Building AI-powered agents and workflows that automate tasks and improve business processes.",
      tech: ["AI Agents", "Agentic Workflows", "Gemini API", "AI Automation"],
      color: "#0891ff",
    },
    {
      icon: "fa-solid fa-comments",
      title: "Conversational AI",
      description:
        "Building intelligent chatbots that help businesses communicate with users and automate support.",
      tech: ["AI Chatbots", "RAG", "Prompt Engineering", "API Integration"],
      color: "#4dc9f6",
    },
    {
      icon: "fa-solid fa-brain",
      title: "AI-Powered Applications",
      description:
        "Integrating AI into modern applications to create smarter and more useful digital experiences.",
      tech: ["AI APIs", "OpenAI", "Gemini", "Claude"],
      color: "#0891ff",
    },
    {
      icon: "fa-solid fa-wand-magic-sparkles",
      title: "AI Automation",
      description:
        "Automating repetitive business processes with AI-powered workflows and intelligent integrations.",
      tech: ["n8n", "AI Workflows", "API Integration", "Automation"],
      color: "#4dc9f6",
    },
    {
      icon: "fa-solid fa-code",
      title: "Full-Stack AI Solutions",
      description:
        "Combining frontend, backend, databases, and AI to build complete software solutions.",
      tech: ["React", "Node.js", "Python", "Databases"],
      color: "#0891ff",
    },
    {
      icon: "fa-solid fa-lightbulb",
      title: "Emerging AI Technologies",
      description:
        "Exploring new AI tools and technologies to discover better ways to build and solve problems.",
      tech: ["LLMs", "AI Tools", "AI Agents", "Innovation"],
      color: "#4dc9f6",
    },
  ];

  const learningGoals = [
    {
      text: "Build autonomous AI agents for business automation",
      icon: "fa-solid fa-check-circle",
    },
    {
      text: "Create enterprise-grade chatbots with RAG architecture",
      icon: "fa-solid fa-check-circle",
    },
    {
      text: "Fine-tune open-source LLMs for specific use cases",
      icon: "fa-solid fa-check-circle",
    },
    {
      text: "Develop end-to-end ML pipelines for real-world applications",
      icon: "fa-solid fa-check-circle",
    },
  ];

  return (
    <section className="interests-section" ref={sectionRef}>
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

      {/* Main Content */}
      <motion.div
        className="interests-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="interests-header" variants={fadeUpVariants}>
          <div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            My Intersets
          </div>
          <h2 className="section-title">
            <span className="title-line">
              AI & Software <span className="highlight-text">Innovation</span>
            </span>
          </h2>
          <p className="section-description">
            Exploring AI technologies and building smarter software solutions
            that solve real-world business problems.{" "}
          </p>
        </motion.div>

        {/* AI Interests Grid */}
        <motion.div className="interests-grid" variants={containerVariants}>
          {aiInterests.map((interest, index) => (
            <motion.div
              key={index}
              className="interest-card"
              variants={fadeUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{
                y: -8,
                borderColor: "rgba(8, 145, 255, 0.5)",
                boxShadow:
                  "0 20px 60px rgba(8, 145, 255, 0.12), 0 0 80px rgba(8, 145, 255, 0.04)",
              }}
            >
              {/* Card Header with Icon */}
              <div className="interest-card-header">
                <div className="interest-icon-wrapper">
                  <motion.div
                    className="interest-icon-circle"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <i
                      className={interest.icon}
                      style={{ color: interest.color }}
                    ></i>
                  </motion.div>
                  <div className="interest-icon-glow" />
                </div>
                <div className="interest-number-badge">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Content */}
              <h3 className="interest-title">{interest.title}</h3>
              <p className="interest-description">{interest.description}</p>

              {/* Tech Stack Tags */}
              <div className="interest-tech-stack">
                {interest.tech.map((tech, tIndex) => (
                  <span key={tIndex} className="interest-tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Learning Goals Section */}
        <motion.div
          className="learning-goals-section"
          variants={fadeUpVariants}
        >
          <div className="goals-header">
            <div className="goals-icon-box">
              <i className="fa-solid fa-bullseye"></i>
            </div>
            <div>
              <h3 className="goals-title">Current Learning Goals</h3>
              <p className="goals-subtitle">
                What I'm actively working on mastering
              </p>
            </div>
          </div>

          <div className="goals-list">
            {learningGoals.map((goal, index) => (
              <motion.div
                key={index}
                className="goal-item"
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ delay: 0.8 + index * 0.15, duration: 0.5 }}
                whileHover={{ x: 8 }}
              >
                <div className="goal-icon">
                  <i className={goal.icon}></i>
                </div>
                <span className="goal-text">{goal.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Quote */}
        <motion.div className="interests-quote" variants={fadeUpVariants}>
          <div className="interests-quote-card">
            <i className="fa-solid fa-quote-left quote-left-icon"></i>
            <p className="interests-quote-text">
              AI is not just a technology, it's the future of how we solve
              problems and create value. I'm excited to be part of this
              revolution.
            </p>
            <div className="interests-quote-line" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Interests;
