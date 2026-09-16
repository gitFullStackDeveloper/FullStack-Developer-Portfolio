import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '../../../css/Website/services/whyChooseServices.css';

const WhyChooseServices = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -10 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: (i) => ({ opacity: 1, y: 0, scale: 1, transition: { delay: 0.4 + i * 0.15, duration: 0.7, ease: 'backOut' } }),
  };
const benefits = [
  {
    icon: 'fa-solid fa-medal',
    title: 'Quality First',
    description: 'I focus on clean, reliable, and well-tested solutions with attention to detail and modern development practices.',
    highlights: ['Clean Code', 'Testing', 'Best Practices', 'Performance'],
  },
  {
    icon: 'fa-solid fa-clock',
    title: 'On-Time Delivery',
    description: 'I plan projects around clear milestones and keep you updated throughout the development process.',
    highlights: ['Clear Milestones', 'Regular Updates', 'Efficient Workflow', 'On-Time'],
  },
  {
    icon: 'fa-solid fa-headset',
    title: 'Ongoing Support',
    description: 'I provide post-launch support to help maintain your project, resolve issues, and make improvements when needed.',
    highlights: ['Bug Fixes', 'Maintenance', 'Updates', 'Support'],
  },
  {
    icon: 'fa-solid fa-wallet',
    title: 'Fair Pricing',
    description: 'I offer transparent and practical pricing focused on delivering real value without unnecessary costs.',
    highlights: ['Transparent', 'Flexible', 'No Hidden Fees', 'Value'],
  },
];

  return (
    <section className="wcs-section" ref={sectionRef}>
      {/* Background Shapes */}
      <div className="wcs-bg-shapes">
        {[
          { size: 200, x: '5%', y: '20%', color: 'rgba(8, 145, 255, 0.06)' },
          { size: 250, x: '85%', y: '40%', color: 'rgba(8, 145, 255, 0.04)' },
          { size: 180, x: '50%', y: '70%', color: 'rgba(8, 145, 255, 0.05)' },
        ].map((shape, i) => (
          <motion.div key={i} className="wcs-shape"
            style={{ width: shape.size, height: shape.size, left: shape.x, top: shape.y, background: shape.color }}
            animate={{ y: [-30, 30, -30], x: [-15, 15, -15], scale: [1, 1.05, 1] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Grid Lines */}
      <div className="wcs-grid">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div key={`v-${i}`} className="wcs-grid-line vertical" style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }} animate={isInView ? { scaleY: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div key={`h-${i}`} className="wcs-grid-line horizontal" style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }} animate={isInView ? { scaleX: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      {/* Particles */}
      <div className="wcs-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div key={i} className="wcs-particle"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: `${Math.random() * 3 + 1}px`, height: `${Math.random() * 3 + 1}px` }}
            animate={{ y: [0, -80], opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
            transition={{ duration: Math.random() * 3 + 2, delay: Math.random() * 3, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      <motion.div className="wcs-container" variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
        {/* Section Header */}
        <motion.div className="wcs-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span className="badge-dot" animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            Why Choose Me
          </motion.div>
          <motion.h2 className="section-title">
            <span className="title-line">Why My <span className="highlight-text">Services?</span></span>
          </motion.h2>
    <motion.p className="section-description">
  What sets my services apart and why clients trust me with their projects
  <span className="text-highlight"> and goals</span>
</motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="wcs-grid-cards">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              className="wcs-card"
              custom={i}
              variants={cardVariants}
              whileHover={{ y: -10, borderColor: 'rgba(8, 145, 255, 0.5)', boxShadow: '0 25px 70px rgba(8, 145, 255, 0.15)' }}
            >

              {/* Icon */}
              <div className="wcs-card-icon-wrapper">
                <motion.div
                  className="wcs-card-icon"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <i className={benefit.icon}></i>
                </motion.div>
                <div className="wcs-icon-glow" />
              </div>

              {/* Content */}
              <h3 className="wcs-card-title">{benefit.title}</h3>
              <p className="wcs-card-desc">{benefit.description}</p>

              {/* Highlights */}
              <div className="wcs-card-tags">
                {benefit.highlights.map((tag, j) => (
                  <span key={j} className="wcs-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
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

export default WhyChooseServices;