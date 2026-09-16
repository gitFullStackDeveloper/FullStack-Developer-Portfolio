import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext";
import "../../../css/Website/admin/admin.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${window.API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Login failed");
      login(data.access_token, data.user);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* Background decoration */}
      <div className="admin-bg-shapes">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="admin-shape"
            style={{
              width: `${200 + i * 60}px`,
              height: `${200 + i * 60}px`,
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
              background: `rgba(8,145,255,${0.05 - i * 0.01})`,
            }}
          />
        ))}
      </div>
      <div className="admin-grid-lines">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="admin-grid-line vertical"
            style={{ left: `${(i + 1) * 20}%` }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="admin-grid-line horizontal"
            style={{ top: `${(i + 1) * 25}%` }}
          />
        ))}
      </div>
      <div className="admin-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="admin-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <motion.div
        className="login-card"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <div className="admin-logo">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <h1>Admin Login</h1>
          <p>Enter your credentials to access the panel</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-input-group">
            <label>
              <i className="fa-solid fa-envelope"></i> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="admin-input-group" style={{ marginTop: "1.2rem" }}>
            <label>
              <i className="fa-solid fa-lock"></i> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <motion.p
              className="login-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                color: "#ef4444",
                fontSize: "0.85rem",
                marginTop: "1rem",
                background: "rgba(239,68,68,0.1)",
                padding: "0.6rem 1rem",
                borderRadius: "8px",
              }}
            >
              <i className="fa-solid fa-circle-exclamation"></i> {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            className="admin-submit-btn"
            style={{
              width: "100%",
              marginTop: "1.8rem",
              justifyContent: "center",
            }}
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <span className="admin-spinner"></span> Signing in...
              </>
            ) : (
              <>
                <i className="fa-solid fa-right-to-bracket"></i> Sign In
              </>
            )}
          </motion.button>
        </form>

        <p className="login-footer">
          <i className="fa-solid fa-circle-info"></i> Only authorized personnel
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
