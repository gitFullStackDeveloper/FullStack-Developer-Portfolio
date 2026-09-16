import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useParams } from "react-router-dom";
import "../../css/Website/servicesDetail/servicesDetail.css";
import ServiceHero from "./service-detail/ServiceHero";
import ServiceTechStack from "./service-detail/ServiceTechStack";
import ServiceFeatures from "./service-detail/ServiceFeatures";
import ServiceProcess from "./service-detail/ServiceProcess";
import ServiceCTA from "./about/AboutCTA";
import { servicesData } from "../../js/Website/services/servicesData";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const service = servicesData[serviceId] || servicesData["web-development"];

  return (
    <section className="service-detail-section" ref={sectionRef}>
      {/* Background Effects */}
      <div className="sd-bg-shapes">
        {[
          { size: 300, x: "5%", y: "15%", color: "rgba(8, 145, 255, 0.05)" },
          { size: 250, x: "85%", y: "50%", color: "rgba(8, 145, 255, 0.04)" },
          { size: 200, x: "50%", y: "80%", color: "rgba(8, 145, 255, 0.03)" },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="sd-shape"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
              background: shape.color,
            }}
            animate={{
              y: [-35, 35, -35],
              x: [-18, 18, -18],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="sd-grid">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="sd-grid-line vertical"
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
      </div>

      <div className="sd-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="sd-particle"
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

      {/* Main Content */}
      <motion.div
        className="sd-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <ServiceHero service={service} />
        <ServiceTechStack techStack={service.techStack} isInView={isInView} />
        <ServiceFeatures features={service.features} />
        <ServiceProcess process={service.process} isInView={isInView} />
        <ServiceCTA />
      </motion.div>
    </section>
  );
};

export default ServiceDetail;
