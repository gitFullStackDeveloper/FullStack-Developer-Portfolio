import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import "../../../css/Website/contact/projectDetails.css";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [openDropdown, setOpenDropdown] = useState(null);
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    projectType: "",
    budgetRange: "",
    timeline: "",
    name: "",
    email: "",
    company: "",
    country: "",
    service: "",
    message: "",
    description: "",
    goals: "",
    features: "",
    meetingDate: "",
    meetingTime: "",
  });
  const update = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setOpenDropdown(null);
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);

    const step1 = JSON.parse(localStorage.getItem("contactStep1") || "{}");

    const payload = {
      name: step1.name || "",
      email: step1.email || "",
      service: step1.service || "",
      message: step1.message || "",
      ...formData,
      meetingDate: selectedDate ? formatDate(selectedDate) : "",
    };

    try {
      const res = await fetch(`${window.API_BASE}/api/contacts/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      // Clear localStorage after successful submission
      localStorage.removeItem("contactStep1");
      navigate("/contact/thank-you");
    } catch (err) {
      alert("Error submitting form: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleContinue = (step) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(step);
    }, 600);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [currentStep]);
  // ---------- Pre-fill from ContactForm (localStorage) ----------
  useEffect(() => {
    const step1 = JSON.parse(localStorage.getItem("contactStep1") || "{}");
    setFormData((prev) => ({
      ...prev,
      name: step1.name || prev.name,
      email: step1.email || prev.email,
      service: step1.service || prev.service,
      message: step1.message || prev.message,
    }));
  }, []);
  // ---------- Dynamic Meeting Settings ----------
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch(`${window.API_BASE}/api/settings/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.meeting) {
          setSettings(data.meeting);
        } else {
          // fallback to old defaults
          setSettings({
            allowed_days: [0, 1, 2, 3, 4], // Mon-Fri
            time_slots: [
              "09:00",
              "09:30",
              "10:00",
              "10:30",
              "11:00",
              "14:00",
              "14:30",
              "15:00",
              "15:30",
              "16:00",
            ],
          });
        }
      })
      .catch(() => {
        setSettings({
          allowed_days: [0, 1, 2, 3, 4],
          time_slots: [
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
          ],
        });
      });
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      setServicesLoading(true);
      try {
        const res = await fetch(`${window.API_BASE}/api/services/`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setServices(data.map((service) => service.title));
          }
        }
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setServicesLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Calendar
  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDay = (date) =>
    (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7;
  const isAvailable = (day) => {
    const d = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (d < today) return false;
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const isAllowed =
      settings?.specific_dates?.some((item) => item.date === dateStr) ||
      (settings?.allowed_days ?? [0, 1, 2, 3, 4]).includes(
        d.getDay() === 0 ? 6 : d.getDay() - 1,
      );
    if (!isAllowed) return false;

    const slots = getTimeSlotsForDay(day);
    return slots.length > 0;
  };

  const formatDate = (day) =>
    new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    ).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

  const getTimeSlotsForDay = (day) => {
    const d = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const specific = settings?.specific_dates?.find(
      (item) => item.date === dateStr,
    );
    const slots =
      specific && specific.time_slots?.length > 0
        ? specific.time_slots
        : settings?.time_slots || [];
    return slots.map((t) => {
      const [h, m] = t.split(":");
      const hour = parseInt(h);
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      return { value: t, display: `${displayHour}:${m} ${ampm}` };
    });
  };
  const totalSteps = 6;

  const projectTypes = [
    "UI/UX Design",
    "Website",
    "Web Application",
    "Software",
    "AI/Automation",
    "Other",
  ];
  const budgetRanges = [
    "$1K - $3K",
    "$3K - $5K",
    "$5K - $10K",
    "$10K - $25K",
    "$25K+",
  ];
  const timelines = [
    "ASAP",
    "1-2 Weeks",
    "1 Month",
    "1-3 Months",
    "3+ Months",
    "Flexible",
  ];

  const CustomDropdown = ({
    name,
    value,
    options,
    placeholder,
    icon,
    required,
  }) => (
    <div
      className="pd3-input-group"
      ref={openDropdown === name ? dropdownRef : null}
    >
      <label>
        <i className={icon}></i> {placeholder}
      </label>
      <div
        className={`pd3-custom-select ${openDropdown === name ? "open" : ""}`}
        onClick={() => setOpenDropdown(openDropdown === name ? null : name)}
      >
        <span className={value ? "selected" : "placeholder"}>
          {value || `Select ${placeholder.toLowerCase()}...`}
        </span>
        <i
          className={`fa-solid fa-chevron-down ${openDropdown === name ? "rotated" : ""}`}
        ></i>
      </div>
      <AnimatePresence>
        {openDropdown === name && (
          <motion.div
            className="pd3-dropdown-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((opt) => (
              <div
                key={opt}
                className={`pd3-dropdown-item ${value === opt ? "active" : ""}`}
                onClick={() => update(name, opt)}
              >
                {opt} {value === opt && <i className="fa-solid fa-check"></i>}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {required && (
        <select
          required
          value={value}
          onChange={() => {}}
          style={{ display: "none" }}
          tabIndex={-1}
        >
          <option value="">{`Select ${placeholder.toLowerCase()}...`}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}
    </div>
  );
  return (
    <section className="pd3-section">
      {/* Background */}
      {/* Background - Updated */}
      <div className="pd3-bg">
        <div className="pd3-gradient-1" />
        <div className="pd3-gradient-2" />
        <div className="pd3-grid-overlay" />

        {/* Grid Lines */}
        <div className="pd3-grid-lines">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="pd3-grid-line vertical"
              style={{ left: `${(i + 1) * 20}%` }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 0.04 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
            />
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="pd3-grid-line horizontal"
              style={{ top: `${(i + 1) * 25}%` }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.04 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
            />
          ))}
        </div>

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="pd3-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -60], opacity: [0, 0.6, 0] }}
            transition={{
              duration: 3 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />
      <div className="pd3-container">
        {/* Sleek Top Bar */}
        <div className="pd3-topbar">
          <div className="pd3-topbar-steps">
            {[
              "Contact Information",
              "Budget",
              "Project Details",
              "Goal",
              "Meeting",
            ].map((label, i) => (
              <div
                key={label}
                className={`pd3-topbar-step ${currentStep > i ? "done" : ""} ${currentStep === i ? "active" : ""}`}
              >
                <div className="pd3-step-indicator">
                  {currentStep > i ? (
                    <i className="fa-solid fa-check"></i>
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="pd3-topbar-counter">0{currentStep + 1}/06</div>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: BUDGET */}
          {currentStep === 1 && selectedBudget !== "no" && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="pd3-card"
            >
              <div className="pd3-card-header">
                <div className="pd3-icon-circle">
                  <i className="fa-solid fa-sack-dollar"></i>
                </div>
                <h1>Let's Talk Budget</h1>
                <p>
                  Quality work requires investment. Are you ready to invest in
                  your project?
                </p>
              </div>
              <div className="pd3-budget-grid">
                {[
                  {
                    id: "yes",
                    icon: "fa-solid fa-rocket",
                    title: "Yes, I Have Budget",
                    desc: "Ready to create something amazing",
                    color: "#10b981",
                  },
                  {
                    id: "maybe",
                    icon: "fa-solid fa-circle-question",
                    title: "Not Sure Yet",
                    desc: "Need help estimating costs",
                    color: "#f59e0b",
                  },
                  {
                    id: "no",
                    icon: "fa-solid fa-clock",
                    title: "Just Exploring",
                    desc: "Researching for future projects",
                    color: "#ef4444",
                  },
                ].map((opt) => (
                  <motion.div
                    key={opt.id}
                    className={`pd3-budget-option ${selectedBudget === opt.id ? "selected" : ""}`}
                    onClick={() => setSelectedBudget(opt.id)}
                    whileHover={{ y: -4, borderColor: `${opt.color}60` }}
                    style={
                      selectedBudget === opt.id
                        ? {
                            borderColor: opt.color,
                            background: `${opt.color}10`,
                          }
                        : {}
                    }
                  >
                    <div
                      className="pd3-budget-icon"
                      style={{ background: `${opt.color}15`, color: opt.color }}
                    >
                      <i className={opt.icon}></i>
                    </div>
                    <div>
                      <h3
                        style={{
                          color: selectedBudget === opt.id ? opt.color : "#fff",
                        }}
                      >
                        {opt.title}
                      </h3>
                      <p>{opt.desc}</p>
                    </div>
                    {selectedBudget === opt.id && (
                      <i
                        className="fa-solid fa-circle-check"
                        style={{ color: opt.color }}
                      ></i>
                    )}
                  </motion.div>
                ))}
              </div>
              {selectedBudget && selectedBudget !== "no" && (
                <motion.button
                  className="pd3-primary-btn"
                  onClick={() => handleContinue(2)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="fa-solid fa-spinner pd3-icon-spin"></span>{" "}
                      Loading...
                    </>
                  ) : (
                    <>
                      Continue <i className="fa-solid fa-arrow-right"></i>
                    </>
                  )}
                </motion.button>
              )}
            </motion.div>
          )}

          {/* NO BUDGET - Replaces entire form */}
          {selectedBudget === "no" && currentStep === 1 && (
            <motion.div
              key="nobudget"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="pd3-card pd3-nobudget-center"
            >
              <div className="pd3-nobudget-icon-wrap">
                <i className="fa-solid fa-face-smile-beam"></i>
              </div>
              <h1>No Worries! 😊</h1>
              <p>
                I completely understand. Quality work requires proper planning
                and budgeting. Here are some ways we can still stay connected:
              </p>
              <div className="pd3-nobudget-grid">
                <Link to="/portfolio" className="pd3-nobudget-item">
                  <div className="pd3-nobudget-item-icon">
                    <i className="fa-solid fa-briefcase"></i>
                  </div>
                  <h4>View Portfolio</h4>
                  <span>See my past work</span>
                </Link>
                <Link to="/services" className="pd3-nobudget-item">
                  <div className="pd3-nobudget-item-icon">
                    <i className="fa-solid fa-tags"></i>
                  </div>
                  <h4>Service Packages</h4>
                  <span>Starting from $499</span>
                </Link>
                <a href="#" className="pd3-nobudget-item">
                  <div className="pd3-nobudget-item-icon">
                    <i className="fa-solid fa-bookmark"></i>
                  </div>
                  <h4>Save Contact</h4>
                  <span>For future projects</span>
                </a>
                <Link to="/" className="pd3-nobudget-item">
                  <div className="pd3-nobudget-item-icon">
                    <i className="fa-solid fa-home"></i>
                  </div>
                  <h4>Go Home</h4>
                  <span>Explore more</span>
                </Link>
              </div>
              <motion.button
                className="pd3-outline-btn"
                onClick={() => setSelectedBudget(null)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ marginTop: "1.5rem" }}
              >
                <i className="fa-solid fa-arrow-left"></i> Go Back
              </motion.button>
            </motion.div>
          )}

          {currentStep === 2 && selectedBudget !== "no" && (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="pd3-card"
              onSubmit={(e) => {
                e.preventDefault();
                if (e.target.checkValidity()) {
                  handleContinue(3);
                } else {
                  e.target.reportValidity();
                }
              }}
            >
              <div className="pd3-card-header">
                <span className="pd3-step-badge">Step 3</span>
                <h2>Project Details</h2>
                <p>Help me understand what you need</p>
              </div>
              <div className="pd3-form-grid">
                <div className="pd3-input-group">
                  <label>
                    <i className="fa-solid fa-user"></i> Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="pd3-input-group">
                  <label>
                    <i className="fa-solid fa-envelope"></i> Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="pd3-input-group">
                  <label>
                    <i className="fa-solid fa-building"></i> Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => update("company", e.target.value)}
                    placeholder="Acme Inc."
                    required
                  />
                </div>
                <div className="pd3-input-group">
                  <label>
                    <i className="fa-solid fa-globe"></i> Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => update("country", e.target.value)}
                    placeholder="Your country"
                    required
                  />
                </div>
                <CustomDropdown
                  name="projectType"
                  value={formData.projectType}
                  options={projectTypes}
                  placeholder="Project Type"
                  icon="fa-solid fa-folder"
                  required
                />
                <div className="pd3-input-group">
                  <label>
                    <i className="fa-solid fa-dollar-sign"></i> Your Budget
                  </label>
                  <input
                    type="text"
                    value={formData.budgetRange}
                    onChange={(e) => update("budgetRange", e.target.value)}
                    placeholder="e.g., $5,000 or $3K - $8K"
                    required
                  />
                </div>
                <div className="pd3-input-group">
                  <label>
                    <i className="fa-solid fa-clock"></i> Timeline
                  </label>
                  <input
                    type="text"
                    value={formData.timeline}
                    onChange={(e) => update("timeline", e.target.value)}
                    placeholder="e.g., 2 weeks, 1 month, ASAP"
                    required
                  />
                </div>
                <CustomDropdown
                  name="service"
                  value={formData.service}
                  options={services}
                  placeholder="Service"
                  icon="fa-solid fa-briefcase"
                  required
                />
                <div className="pd3-input-group">
                  <label>
                    <i className="fa-solid fa-message"></i> Your Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Your message from contact form"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="pd3-input-group full">
                <label>
                  <i className="fa-solid fa-align-left"></i> Project Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Describe what you need built..."
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="pd3-nav-buttons">
                <button
                  type="button"
                  className="pd3-outline-btn"
                  onClick={() => setCurrentStep(1)}
                >
                  <i className="fa-solid fa-arrow-left"></i> Back
                </button>
                <button
                  type="submit"
                  className="pd3-primary-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="fa-solid fa-spinner pd3-icon-spin"></span>{" "}
                      Loading...
                    </>
                  ) : (
                    <>
                      Continue <i className="fa-solid fa-arrow-right"></i>
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 3: DEEP QUESTIONS */}
          {currentStep === 3 && selectedBudget !== "no" && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="pd3-card"
            >
              <div className="pd3-card-header">
                <span className="pd3-step-badge">Step 4</span>
                <h2>Deep Dive</h2>
                <p>These questions ensure I deliver exactly what you need</p>
              </div>
              <div className="pd3-input-group full">
                <label>
                  <i className="fa-solid fa-bullseye"></i> What are the main
                  goals?
                </label>
                <textarea
                  value={formData.goals}
                  onChange={(e) => update("goals", e.target.value)}
                  placeholder="e.g., Increase sales by 40%, automate manual tasks..."
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="pd3-input-group full">
                <label>
                  <i className="fa-solid fa-list-check"></i> Must-have features?
                </label>
                <textarea
                  value={formData.features}
                  onChange={(e) => update("features", e.target.value)}
                  placeholder="List essential features..."
                  rows="3"
                ></textarea>
              </div>
              <div className="pd3-nav-buttons">
                <button
                  className="pd3-outline-btn"
                  onClick={() => setCurrentStep(2)}
                >
                  <i className="fa-solid fa-arrow-left"></i> Back
                </button>
                <button
                  className="pd3-primary-btn"
                  onClick={() => handleContinue(4)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="fa-solid fa-spinner pd3-icon-spin"></span>{" "}
                      Loading...
                    </>
                  ) : (
                    <>
                      Schedule Meeting{" "}
                      <i className="fa-solid fa-arrow-right"></i>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: MEETING */}
          {currentStep === 4 && selectedBudget !== "no" && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="pd3-card"
            >
              <div className="pd3-card-header">
                <span className="pd3-step-badge">Step 5</span>
                <h2>Schedule Meeting</h2>
                <p>Pick a convenient time to discuss your project</p>
              </div>
              <div className="pd3-meeting-layout">
                <div className="pd3-calendar-card">
                  <div className="pd3-cal-header">
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() - 1,
                          ),
                        )
                      }
                    >
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <h3>
                      {currentMonth.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </h3>
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() + 1,
                          ),
                        )
                      }
                    >
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>
                  <div className="pd3-cal-grid">
                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                      <span key={d} className="pd3-cal-weekday">
                        {d}
                      </span>
                    ))}
                    {Array.from({ length: getFirstDay(currentMonth) }).map(
                      (_, i) => (
                        <div key={`e${i}`} />
                      ),
                    )}
                    {Array.from({ length: getDaysInMonth(currentMonth) }).map(
                      (_, i) => {
                        const day = i + 1;
                        const avail = isAvailable(day);
                        return (
                          <div
                            key={day}
                            className={`pd3-cal-day ${avail ? "avail" : "blocked"} ${selectedDate === day ? "picked" : ""}`}
                            onClick={() => avail && setSelectedDate(day)}
                          >
                            {day}
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
                <div className="pd3-time-card">
                  <h4>
                    {selectedDate
                      ? formatDate(selectedDate)
                      : "← Select a date"}
                  </h4>
                  {selectedDate && (
                    <div className="pd3-time-grid">
                      {getTimeSlotsForDay(selectedDate).map((slot) => (
                        <div
                          key={slot.value}
                          className={`pd3-time-chip ${formData.meetingTime === slot.value ? "picked" : ""}`}
                          onClick={() => update("meetingTime", slot.value)}
                        >
                          {slot.display}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="pd3-nav-buttons">
                <button
                  className="pd3-outline-btn"
                  onClick={() => setCurrentStep(3)}
                >
                  <i className="fa-solid fa-arrow-left"></i> Back
                </button>
                <button
                  className="pd3-primary-btn"
                  onClick={handleSubmit}
                  disabled={
                    !selectedDate || !formData.meetingTime || isSubmitting
                  }
                >
                  {isSubmitting ? (
                    <>
                      <span className="fa-solid fa-spinner pd3-icon-spin"></span>{" "}
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane"></i> Submit Request
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectDetails;
