import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import "../../../css/Website/funnel-home/storyGrowth.css";

const StoryGrowth = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [lineProgress, setLineProgress] = useState(0);
  const [barsProgress, setBarsProgress] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setLineProgress(100), 300);
      const barTimers = [0, 1, 2, 3, 4].map((i) =>
        setTimeout(
          () => {
            setBarsProgress((prev) => {
              const newArr = [...prev];
              newArr[i] = [25, 45, 70, 85, 100][i];
              return newArr;
            });
          },
          500 + i * 200,
        ),
      );
      return () => {
        clearTimeout(timer);
        barTimers.forEach(clearTimeout);
      };
    }
  }, [isInView]);

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

  const milestones = [
    {
      year: "2022",
      title: "Started Learning",
      desc: "Began with HTML, CSS, JavaScript",
    },
    {
      year: "2023",
      title: "Built Projects",
      desc: "Created personal & freelance projects",
    },
    {
      year: "2024",
      title: "Deepened Skills",
      desc: "Mastered React, Node.js, AI tools",
    },
    {
      year: "2025",
      title: "Launched Services",
      desc: "Started offering professional development",
    },
  ];

  const graphLabels = [
    "HTML/CSS",
    "JavaScript",
    "React/Node",
    "AI & Auto",
    "Full Stack",
  ];
  const graphValues = [95, 85, 75, 65, 60];

  return (
    <section className="sg-section" ref={sectionRef}>
      {/* Background */}
      <div className="sg-bg-shapes">
        {[
          { size: 280, x: "5%", y: "20%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 220, x: "85%", y: "45%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 200, x: "50%", y: "75%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="sg-shape"
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

      <div className="sg-grid-lines">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="sg-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="sg-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      <div className="sg-particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="sg-particle"
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
        className="sg-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="sg-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            My Journey
          </motion.div>
          <motion.h2 className="section-title">
            <span className="title-line">
              Story & <span className="highlight-text">Growth</span>
            </span>
          </motion.h2>
          <motion.p className="section-description">
            How I've been building my skills and passion over time
          </motion.p>
        </motion.div>

        <div className="sg-content-grid">
          {/* Left - Story Timeline */}
          <motion.div className="sg-timeline" variants={fadeUpVariants}>
            {milestones.map((item, i) => (
              <motion.div
                key={i}
                className="sg-timeline-item"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
              >
                <div className="sg-timeline-marker">
                  <div className="sg-marker-dot" />
                  {i < milestones.length - 1 && (
                    <div
                      className="sg-marker-line"
                      style={{
                        height: lineProgress === 100 ? "100%" : "0%",
                        transition: "height 1s ease",
                      }}
                    />
                  )}
                </div>
                <div className="sg-timeline-content">
                  <span className="sg-year">{item.year}</span>
                  <h4 className="sg-milestone-title">{item.title}</h4>
                  <p className="sg-milestone-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right - Growth Graph */}
          <motion.div className="sg-graph" variants={fadeUpVariants}>
            <div className="sg-graph-card">
              <h3 className="sg-graph-title">
                <i className="fa-solid fa-chart-line"></i> Skill Growth
              </h3>
              <div className="sg-bars">
                {graphLabels.map((label, i) => (
                  <div key={i} className="sg-bar-item">
                    <div className="sg-bar-label">{label}</div>
                    <div className="sg-bar-track">
                      <motion.div
                        className="sg-bar-fill"
                        initial={{ width: 0 }}
                        animate={
                          isInView
                            ? { width: `${barsProgress[i]}%` }
                            : { width: 0 }
                        }
                        transition={{
                          duration: 1,
                          delay: 0.8 + i * 0.15,
                          ease: "easeOut",
                        }}
                      >
                        <motion.div className="sg-bar-glow" />
                      </motion.div>
                    </div>
                    <motion.span
                      className="sg-bar-value"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 1.5 + i * 0.2 }}
                    >
                      {graphValues[i]}%
                    </motion.span>
                  </div>
                ))}
              </div>
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

export default StoryGrowth;
