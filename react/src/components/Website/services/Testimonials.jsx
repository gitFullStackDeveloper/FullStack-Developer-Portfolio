import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import "../../../css/Website/services/testimonials.css";

const Testimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

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

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Working with Arham was an absolute pleasure. He delivered our e-commerce platform ahead of schedule with exceptional quality. His attention to detail and technical expertise are outstanding.",
      project: "E-Commerce Platform",
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Founder, Digital Solutions",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Arham built our company website with incredible speed and precision. He understood our vision perfectly and translated it into a beautiful, functional website that our clients love.",
      project: "Company Website",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director, BrandCo",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The SEO optimization Arham did for our website doubled our organic traffic in just 3 months. His data-driven approach and regular reporting made the process transparent and effective.",
      project: "SEO Optimization",
    },
    {
      id: 4,
      name: "David Kim",
      role: "CTO, StartupHub",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "We hired Arham to build our API infrastructure, and he exceeded all expectations. The documentation was thorough, and the APIs have been running flawlessly for months.",
      project: "API Development",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Owner, Creative Agency",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      text: "Arham designed a stunning UI for our client portal. His design sense is amazing and he was very responsive to feedback throughout the project. Highly recommended!",
      project: "UI/UX Design",
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Product Manager, TechFlow",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The AI chatbot Arham built for our customer support has been a game-changer. Response times dropped by 80% and customer satisfaction increased significantly.",
      project: "AI Chatbot",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <i
        key={i}
        className={`fa-solid fa-star ${i < rating ? "active" : ""}`}
      ></i>
    ));
  };

  return (
    <section className="testimonials-section" ref={sectionRef}>
      {/* Background Shapes */}
      <div className="tm-bg-shapes">
        {[
          { size: 250, x: "10%", y: "25%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 200, x: "80%", y: "50%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 180, x: "40%", y: "75%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="tm-shape"
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
      <div className="tm-grid">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="tm-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="tm-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.04 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
          />
        ))}
      </div>

      {/* Particles */}
      <div className="tm-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="tm-particle"
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
        className="tm-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="tm-header" variants={fadeUpVariants}>
          <motion.div className="section-badge">
            <motion.span
              className="badge-dot"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Testimonials
          </motion.div>
          <motion.h2 className="section-title">
            <span className="title-line">
              What <span className="highlight-text">Clients Say</span>
            </span>
          </motion.h2>
          <motion.p className="section-description">
            Real feedback from real clients who trust my services
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="tm-grid-cards">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="tm-card"
              variants={fadeUpVariants}
              whileHover={{
                y: -8,
                borderColor: "rgba(8, 145, 255, 0.4)",
                boxShadow: "0 20px 60px rgba(8, 145, 255, 0.1)",
              }}
            >
              {/* Quote Icon */}
              <div className="tm-quote-icon">
                <i className="fa-solid fa-quote-right"></i>
              </div>

              {/* Stars */}
              <div className="tm-stars">{renderStars(testimonial.rating)}</div>

              {/* Review Text */}
              <p className="tm-text">"{testimonial.text}"</p>

              {/* Project Badge */}
              <div className="tm-project-badge">
                <i className="fa-solid fa-folder-open"></i>
                {testimonial.project}
              </div>

              {/* Author */}
              <div className="tm-author">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="tm-author-img"
                />
                <div className="tm-author-info">
                  <h4 className="tm-author-name">{testimonial.name}</h4>
                  <span className="tm-author-role">{testimonial.role}</span>
                </div>
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

export default Testimonials;
