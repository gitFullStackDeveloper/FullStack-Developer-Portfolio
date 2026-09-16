import "../../../css/Website/about/ExperianceTimeline.css";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ExperienceTimeline = () => {
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

  const certifications = [
    {
      title: "Software/Web Developer",
      issuer: "Certified Professional",
      icon: "fa-solid fa-code",
      color: "#0891ff",
    },
    {
      title: "Data Analytics",
      issuer: "Certified Professional",
      icon: "fa-solid fa-chart-line",
      color: "#0891ff",
    },
    {
      title: "Communication",
      issuer: "Certified Professional",
      icon: "fa-solid fa-comments",
      color: "#0891ff",
    },
    {
      title: "Project Management",
      issuer: "Certified Professional",
      icon: "fa-solid fa-tasks",
      color: "#0891ff",
    },
    {
      title: "Vibe Coding",
      issuer: "Certified Professional",
      icon: "fa-solid fa-wand-magic-sparkles",
      color: "#0891ff",
    },
    {
      title: "AI Automation",
      issuer: "Certified Professional",
      icon: "fa-solid fa-robot",
      color: "#0891ff",
    },
  ];

  const education = [
    {
      period: "2026 - Present",
      title: "BSCS - Computer Science",
      institution: "The Virtual University of Pakistan",
      description:
        "Currently pursuing Bachelor of Science in Computer Science with focus on software development, algorithms, and modern technologies.",
      icon: "fa-solid fa-graduation-cap",
      badge: "In Progress",
      highlights: [
        "Software Engineering",
        "Data Structures",
        "Web Technologies",
        "Database Systems",
      ],
    },
  ];

  const experience = [
    {
      period: "2026 - Present",
      title: "Freelance Developer",
      institution: "Self-Employed",
      description:
        "Running a successful freelance business providing comprehensive AI-powered software solutions for the education industry worldwide.",
      icon: "fa-solid fa-laptop-code",
      badge: "Current",
      highlights: [
        "Full-Stack Development",
        "Client Management",
        "Project Delivery",
        "Quality Assurance",
      ],
    },
    {
      period: "2025",
      title: "Frontend Development Teacher",
      institution: "6 Months Contract",
      description:
        "Taught frontend development fundamentals and mentored aspiring developers in modern web technologies.",
      icon: "fa-solid fa-chalkboard-user",
      highlights: [
        "HTML, CSS, JavaScript",
        "Curriculum Design",
        "Student Mentoring",
        "Code Reviews",
      ],
    },
  ];

  const stats = [
    { icon: "fa-solid fa-briefcase", number: "10+", label: "Happy Clients" },
    { icon: "fa-solid fa-users", number: "15+", label: "Students Taught" },
    {
      icon: "fa-solid fa-folder-open",
      number: "10+",
      label: "Projects Delivered",
    },
    { icon: "fa-solid fa-certificate", number: "6+", label: "Certifications" },
  ];

  return (
    <section className="experience-section" ref={sectionRef}>
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
        className="experience-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <br />
        <br />
        <br />
        <br />
        <br />

        {/* Section Header */}
        <motion.div className="experience-header" variants={fadeUpVariants}>
          <div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            My Journey
          </div>
          <h2 className="section-title">
            <span className="title-line">
              Education & <span className="highlight-text">Experience</span>
            </span>
          </h2>
          <p className="section-description">
            Building skills and growing every day through learning and <br />{" "}
            hands-on work
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div className="exp-stats-row" variants={fadeUpVariants}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="exp-stat-card"
              whileHover={{
                y: -5,
                borderColor: "rgba(8, 145, 255, 0.4)",
                boxShadow: "0 10px 30px rgba(8, 145, 255, 0.08)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
            >
              <div className="exp-stat-icon">
                <i className={stat.icon}></i>
              </div>
              <span className="exp-stat-number">{stat.number}</span>
              <span className="exp-stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Education Section */}
        <motion.div className="education-section-new" variants={fadeUpVariants}>
          <div className="edu-section-header">
            <div className="edu-header-left">
              <div className="edu-icon-box">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <div>
                <h3 className="edu-title">Education</h3>
                <p className="edu-subtitle">My academic background</p>
              </div>
            </div>
          </div>

          <div className="education-card-wrapper">
            {education.map((item, index) => (
              <motion.div
                key={index}
                className="education-card-new"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
              >
                <div className="edu-card-top">
                  <div className="edu-card-icon">
                    <i className={item.icon}></i>
                  </div>
                  <div className="edu-card-header-info">
                    <span className="edu-period">{item.period}</span>
                    {item.badge && (
                      <span className="edu-badge">{item.badge}</span>
                    )}
                  </div>
                </div>
                <h4 className="edu-card-title">{item.title}</h4>
                <p className="edu-card-institution">{item.institution}</p>
                <p className="edu-card-desc">{item.description}</p>
                <div className="edu-highlights">
                  {item.highlights.map((highlight, hIndex) => (
                    <span key={hIndex} className="edu-highlight-tag">
                      <i className="fa-solid fa-check-circle"></i>
                      {highlight}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          className="work-experience-section"
          variants={fadeUpVariants}
        >
          <div className="work-section-header">
            <div className="work-header-left">
              <div className="work-icon-box">
                <i className="fa-solid fa-briefcase"></i>
              </div>
              <div>
                <h3 className="work-title">Work Experience</h3>
                <p className="work-subtitle">My professional journey</p>
              </div>
            </div>
          </div>

          <div className="work-cards-container">
            {experience.map((item, index) => (
              <motion.div
                key={index}
                className="work-card"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }
                }
                transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="work-card-left">
                  <div className="work-card-icon">
                    <i className={item.icon}></i>
                  </div>
                  <div className="work-timeline-connector">
                    <div className="work-timeline-dot" />
                    {index !== experience.length - 1 && (
                      <div className="work-timeline-line" />
                    )}
                  </div>
                </div>
                <div className="work-card-right">
                  <div className="work-card-header">
                    <span className="work-period">{item.period}</span>
                    {item.badge && (
                      <span className="work-badge">{item.badge}</span>
                    )}
                  </div>
                  <h4 className="work-card-title">{item.title}</h4>
                  <p className="work-card-company">{item.institution}</p>
                  <p className="work-card-desc">{item.description}</p>
                  <div className="work-highlights">
                    {item.highlights.map((highlight, hIndex) => (
                      <span key={hIndex} className="work-highlight-tag">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ExperienceTimeline;
