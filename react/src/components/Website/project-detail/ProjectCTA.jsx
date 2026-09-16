import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../../../css/Website/project-detail//projectCTA.css";

const ProjectCTA = ({ project }) => {
  return (
    <motion.div
      className="pdv-cta-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h2>Ready to Launch?</h2>
      <p>
        Get this complete project with full source code and start your business
        today.
      </p>
      <div className="pdv-cta-actions">
        <Link to="/contact" className="pdv-cta-btn primary">
          <i className="fa-solid fa-cart-shopping"></i> Buy Now -{" "}
          {project.price}
        </Link>
        <Link to="/contact" className="pdv-cta-btn secondary">
          <i className="fa-solid fa-message"></i> Have Questions?
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCTA;
