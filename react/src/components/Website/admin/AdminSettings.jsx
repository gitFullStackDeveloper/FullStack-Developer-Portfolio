import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import "../../../css/Website/admin/admin.css";
import AdminTopBar from "./AdminTopBar";
const API_BASE = `${window.API_BASE}/api/settings`;

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    social_links: [],
    meeting: { allowed_days: [], time_slots: [], specific_dates: [] },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("social");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [newTimeSlot, setNewTimeSlot] = useState("");
  const [newSpecificDate, setNewSpecificDate] = useState("");
  // Booking checker states
  const [checkDate, setCheckDate] = useState("");
  const [checkTime, setCheckTime] = useState("");
  const [checkResult, setCheckResult] = useState([]);
  const [checkLoading, setCheckLoading] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE + "/");
      if (!res.ok) throw new Error("Failed to fetch settings");
      const data = await res.json();
      // Safely merge with defaults, converting legacy string-only dates
      const normalizedDates = (data.meeting?.specific_dates || []).map(
        (item) =>
          typeof item === "string" ? { date: item, time_slots: [] } : item,
      );
      setSettings({
        social_links: data.social_links || [],
        meeting: {
          allowed_days: data.meeting?.allowed_days || [],
          time_slots: data.meeting?.time_slots || [],
          specific_dates: normalizedDates,
        },
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSocialChange = (index, field, value) => {
    const updated = [...settings.social_links];
    updated[index] = { ...updated[index], [field]: value };
    setSettings({ ...settings, social_links: updated });
  };

  const addSocialLink = () => {
    setSettings({
      ...settings,
      social_links: [...settings.social_links, { icon: "", name: "", url: "" }],
    });
  };

  const removeSocialLink = (index) => {
    const updated = settings.social_links.filter((_, i) => i !== index);
    setSettings({ ...settings, social_links: updated });
  };

  const toggleDay = (day) => {
    const allowed = settings.meeting.allowed_days.includes(day)
      ? settings.meeting.allowed_days.filter((d) => d !== day)
      : [...settings.meeting.allowed_days, day];
    setSettings({
      ...settings,
      meeting: { ...settings.meeting, allowed_days: allowed },
    });
  };

  const addTimeSlot = () => {
    const slot = newTimeSlot.trim();
    if (!slot) return;
    if (settings.meeting.time_slots.includes(slot)) {
      alert("Time slot already exists");
      return;
    }
    setSettings({
      ...settings,
      meeting: {
        ...settings.meeting,
        time_slots: [...settings.meeting.time_slots, slot],
      },
    });
    setNewTimeSlot("");
  };

  const removeTimeSlot = (index) => {
    const updated = settings.meeting.time_slots.filter((_, i) => i !== index);
    setSettings({
      ...settings,
      meeting: { ...settings.meeting, time_slots: updated },
    });
  };

  const addSpecificDate = () => {
    const date = newSpecificDate.trim();
    if (!date) return;
    if (settings.meeting.specific_dates.some((d) => d.date === date)) {
      alert("Date already added");
      return;
    }
    setSettings({
      ...settings,
      meeting: {
        ...settings.meeting,
        specific_dates: [
          ...settings.meeting.specific_dates,
          { date, time_slots: [] },
        ],
      },
    });
    setNewSpecificDate("");
  };

  const removeSpecificDate = (index) => {
    const updated = settings.meeting.specific_dates.filter(
      (_, i) => i !== index,
    );
    setSettings({
      ...settings,
      meeting: { ...settings.meeting, specific_dates: updated },
    });
  };

  const addSlotToDate = (index, slot) => {
    if (!slot) return;
    const current = settings.meeting.specific_dates[index].time_slots || [];
    if (current.includes(slot)) return;
    const updatedDates = settings.meeting.specific_dates.map((d, i) =>
      i === index ? { ...d, time_slots: [...current, slot] } : d,
    );
    setSettings({
      ...settings,
      meeting: { ...settings.meeting, specific_dates: updatedDates },
    });
  };

  const removeSlotFromDate = (dateIndex, slotIndex) => {
    const updatedDates = settings.meeting.specific_dates.map((d, i) =>
      i === dateIndex
        ? { ...d, time_slots: d.time_slots.filter((_, si) => si !== slotIndex) }
        : d,
    );
    setSettings({
      ...settings,
      meeting: { ...settings.meeting, specific_dates: updatedDates },
    });
  };

  const checkBooking = async () => {
    if (!checkDate || !checkTime) return;
    setCheckLoading(true);
    try {
      const res = await fetch(
        `${window.API_BASE}/api/contacts/?meetingDate=${checkDate}&meetingTime=${checkTime}`,
      );
      if (!res.ok) throw new Error("Failed to check");
      const data = await res.json();
      setCheckResult(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setCheckLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const res = await fetch(API_BASE + "/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Failed to save settings");
      alert("Settings saved successfully!");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const daysOfWeek = [
    { index: 0, label: "Mon" },
    { index: 1, label: "Tue" },
    { index: 2, label: "Wed" },
    { index: 3, label: "Thu" },
    { index: 4, label: "Fri" },
    { index: 5, label: "Sat" },
    { index: 6, label: "Sun" },
  ];

  return (
    <div className="admin-layout" ref={sectionRef}>
      <div className="pfg-bg-shapes">...</div>
      <div className="pfg-grid-lines">...</div>
      <div className="pfg-particles">...</div>

      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className="admin-main">
        <div className="pfg-container">
          {/* Header */}
          <div className="admin-header-row">
            <div className="admin-title-area">
              <motion.div
                className="section-badge"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.span
                  className="badge-dot"
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                Admin Panel
              </motion.div>
              <h2 className="admin-page-title">Settings</h2>
            </div>
            <AdminTopBar />
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
            {[
              {
                key: "social",
                label: "Social Links",
                icon: "fa-solid fa-share-nodes",
              },
              {
                key: "meeting",
                label: "Meeting Availability",
                icon: "fa-solid fa-calendar-check",
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: "0.8rem 1.8rem",
                  background:
                    activeTab === tab.key
                      ? "rgba(8,145,255,0.15)"
                      : "rgba(255,255,255,0.03)",
                  border: `1px solid ${activeTab === tab.key ? "rgba(8,145,255,0.5)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "14px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  transition: "all 0.3s",
                }}
              >
                <i
                  className={tab.icon}
                  style={{
                    color:
                      activeTab === tab.key
                        ? "#0891ff"
                        : "rgba(255,255,255,0.6)",
                  }}
                ></i>{" "}
                {tab.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="admin-empty">
              <span className="admin-spinner"></span> Loading settings...
            </div>
          ) : (
            <>
              {activeTab === "social" && (
                <div
                  style={{
                    background: "rgba(10,10,15,0.4)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    padding: "2.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "2rem",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "1.4rem",
                          fontWeight: 700,
                        }}
                      >
                        <i
                          className="fa-solid fa-share-nodes"
                          style={{ color: "#0891ff", marginRight: "0.5rem" }}
                        ></i>
                        Social Media Links
                      </h3>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.5)",
                          margin: "0.3rem 0 0 0",
                          fontSize: "0.85rem",
                        }}
                      >
                        These links appear on the contact form. Leave URL empty
                        to hide.
                      </p>
                    </div>
                    <button className="admin-add-btn" onClick={addSocialLink}>
                      <i className="fa-solid fa-plus"></i> Add Link
                    </button>
                  </div>

                  {settings.social_links.length === 0 ? (
                    <div className="admin-empty" style={{ padding: "2rem" }}>
                      <i
                        className="fa-solid fa-link-slash"
                        style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
                      ></i>
                      <p>No social links added yet.</p>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      {settings.social_links.map((link, i) => (
                        <div
                          key={i}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 2fr auto",
                            gap: "1rem",
                            alignItems: "flex-end",
                            background: "rgba(255,255,255,0.03)",
                            padding: "1.2rem 1.5rem",
                            borderRadius: "14px",
                            border: "1px solid rgba(255,255,255,0.06)",
                            transition: "all 0.3s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.borderColor =
                              "rgba(8,145,255,0.3)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.borderColor =
                              "rgba(255,255,255,0.06)")
                          }
                        >
                          <div
                            className="admin-input-group"
                            style={{ marginBottom: 0 }}
                          >
                            <label>Icon (FA class)</label>
                            <input
                              type="text"
                              value={link.icon}
                              onChange={(e) =>
                                handleSocialChange(i, "icon", e.target.value)
                              }
                              placeholder="fa-brands fa-github"
                            />
                          </div>
                          <div
                            className="admin-input-group"
                            style={{ marginBottom: 0 }}
                          >
                            <label>Name</label>
                            <input
                              type="text"
                              value={link.name}
                              onChange={(e) =>
                                handleSocialChange(i, "name", e.target.value)
                              }
                              placeholder="GitHub"
                            />
                          </div>
                          <div
                            className="admin-input-group"
                            style={{ marginBottom: 0 }}
                          >
                            <label>URL</label>
                            <input
                              type="url"
                              value={link.url}
                              onChange={(e) =>
                                handleSocialChange(i, "url", e.target.value)
                              }
                              placeholder="https://..."
                            />
                          </div>
                          <button
                            onClick={() => removeSocialLink(i)}
                            style={{
                              background: "rgba(239,68,68,0.15)",
                              border: "1px solid rgba(239,68,68,0.3)",
                              color: "#ef4444",
                              borderRadius: "10px",
                              padding: "0.6rem 1rem",
                              cursor: "pointer",
                              fontWeight: 600,
                              fontSize: "0.85rem",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.4rem",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#ef4444";
                              e.currentTarget.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                "rgba(239,68,68,0.15)";
                              e.currentTarget.style.color = "#ef4444";
                            }}
                          >
                            <i className="fa-solid fa-trash"></i> Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ========== MEETING TAB ========== */}
              {activeTab === "meeting" && (
                <div
                  style={{
                    background: "rgba(10,10,15,0.4)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    padding: "2.5rem",
                  }}
                >
                  <h3
                    style={{
                      marginTop: 0,
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      marginBottom: "0.3rem",
                    }}
                  >
                    <i
                      className="fa-solid fa-calendar-check"
                      style={{ color: "#0891ff", marginRight: "0.5rem" }}
                    ></i>
                    Meeting Availability
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      marginBottom: "1.5rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    Control which days and times users can pick on the
                    scheduling page.
                  </p>

                  {/* ---------- Availability Summary ---------- */}
                  <div
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      flexWrap: "wrap",
                      background: "rgba(8,145,255,0.05)",
                      borderRadius: "14px",
                      padding: "1.2rem 1.5rem",
                      marginBottom: "2rem",
                      border: "1px solid rgba(8,145,255,0.1)",
                    }}
                  >
                    <div
                      style={{ textAlign: "center", flex: 1, minWidth: "70px" }}
                    >
                      <div
                        style={{
                          fontSize: "1.8rem",
                          fontWeight: 700,
                          color: "#0891ff",
                        }}
                      >
                        {settings.meeting.allowed_days.length}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        Weekdays
                      </div>
                    </div>
                    <div
                      style={{ textAlign: "center", flex: 1, minWidth: "70px" }}
                    >
                      <div
                        style={{
                          fontSize: "1.8rem",
                          fontWeight: 700,
                          color: "#0891ff",
                        }}
                      >
                        {settings.meeting.specific_dates.length}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        Specific Dates
                      </div>
                    </div>
                    <div
                      style={{ textAlign: "center", flex: 1, minWidth: "70px" }}
                    >
                      <div
                        style={{
                          fontSize: "1.8rem",
                          fontWeight: 700,
                          color: "#0891ff",
                        }}
                      >
                        {settings.meeting.time_slots.length}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        Global Time Slots
                      </div>
                    </div>
                    <div
                      style={{ textAlign: "center", flex: 1, minWidth: "70px" }}
                    >
                      <div
                        style={{
                          fontSize: "1.8rem",
                          fontWeight: 700,
                          color: "#0891ff",
                        }}
                      >
                        {settings.meeting.allowed_days.length *
                          settings.meeting.time_slots.length +
                          settings.meeting.specific_dates.reduce(
                            (acc, d) => acc + (d.time_slots?.length || 0),
                            0,
                          )}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        Possible Slots
                      </div>
                    </div>
                  </div>

                  {/* Weekly days */}
                  <div style={{ marginBottom: "2rem" }}>
                    <label
                      style={{
                        fontWeight: 600,
                        display: "block",
                        marginBottom: "0.8rem",
                        fontSize: "0.95rem",
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      <i
                        className="fa-solid fa-calendar-days"
                        style={{ marginRight: "0.4rem", color: "#0891ff" }}
                      ></i>
                      Available Days of the Week
                    </label>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.6rem",
                        flexWrap: "wrap",
                      }}
                    >
                      {daysOfWeek.map((day) => {
                        const isActive = settings.meeting.allowed_days.includes(
                          day.index,
                        );
                        return (
                          <motion.button
                            key={day.index}
                            onClick={() => toggleDay(day.index)}
                            whileTap={{ scale: 0.95 }}
                            style={{
                              padding: "0.65rem 1.3rem",
                              borderRadius: "50px",
                              border: `1px solid ${isActive ? "#0891ff" : "rgba(255,255,255,0.1)"}`,
                              background: isActive
                                ? "rgba(8,145,255,0.2)"
                                : "rgba(255,255,255,0.03)",
                              color: isActive
                                ? "#fff"
                                : "rgba(255,255,255,0.4)",
                              cursor: "pointer",
                              fontWeight: 600,
                              fontSize: "0.9rem",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.4rem",
                              transition: "all 0.2s",
                            }}
                          >
                            {isActive && (
                              <i
                                className="fa-solid fa-check"
                                style={{ color: "#0891ff", fontSize: "0.8rem" }}
                              ></i>
                            )}
                            {day.label}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label
                      style={{
                        fontWeight: 600,
                        display: "block",
                        marginBottom: "0.8rem",
                        fontSize: "0.95rem",
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      <i
                        className="fa-solid fa-calendar-plus"
                        style={{ marginRight: "0.4rem", color: "#0891ff" }}
                      ></i>
                      Additional Available Dates (override weekly schedule)
                    </label>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.8rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <input
                        type="date"
                        value={newSpecificDate}
                        onChange={(e) => setNewSpecificDate(e.target.value)}
                        style={{
                          flex: 1,
                          padding: "0.7rem 1rem",
                          background: "rgba(0,0,0,0.5)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "10px",
                          color: "#fff",
                          fontSize: "0.9rem",
                        }}
                      />
                      <button
                        onClick={addSpecificDate}
                        style={{
                          padding: "0 1.5rem",
                          background:
                            "linear-gradient(135deg, #0891ff, #0066cc)",
                          border: "none",
                          borderRadius: "10px",
                          color: "#fff",
                          fontWeight: 600,
                          cursor: "pointer",
                          fontSize: "0.9rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <i className="fa-solid fa-plus"></i> Add
                      </button>
                    </div>
                    {settings.meeting.specific_dates.length === 0 ? (
                      <div
                        style={{
                          color: "rgba(255,255,255,0.3)",
                          fontSize: "0.85rem",
                          fontStyle: "italic",
                        }}
                      >
                        No specific dates added.
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                      >
                        {settings.meeting.specific_dates.map((item, i) => (
                          <div
                            key={item.date}
                            style={{
                              background: "rgba(8,145,255,0.05)",
                              border: "1px solid rgba(8,145,255,0.15)",
                              borderRadius: "12px",
                              padding: "1rem",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "0.8rem",
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: 600,
                                  color: "#fff",
                                  fontSize: "1rem",
                                }}
                              >
                                <i
                                  className="fa-solid fa-calendar-day"
                                  style={{
                                    marginRight: "0.5rem",
                                    color: "#0891ff",
                                  }}
                                ></i>
                                {item.date}
                              </span>
                              <button
                                onClick={() => removeSpecificDate(i)}
                                style={{
                                  background: "rgba(239,68,68,0.15)",
                                  border: "1px solid rgba(239,68,68,0.3)",
                                  color: "#ef4444",
                                  borderRadius: "8px",
                                  padding: "0.3rem 0.7rem",
                                  cursor: "pointer",
                                  fontSize: "0.85rem",
                                }}
                              >
                                <i className="fa-solid fa-trash"></i> Remove
                              </button>
                            </div>

                            {/* Per‑date time slots */}
                            <div>
                              <label
                                style={{
                                  fontSize: "0.85rem",
                                  color: "rgba(255,255,255,0.6)",
                                  marginBottom: "0.5rem",
                                  display: "block",
                                }}
                              >
                                Custom time slots for this date (empty = use
                                global)
                              </label>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "0.5rem",
                                  marginBottom: "0.5rem",
                                }}
                              >
                                <input
                                  type="text"
                                  placeholder="e.g. 21:00"
                                  style={{
                                    flex: 1,
                                    padding: "0.5rem",
                                    background: "rgba(0,0,0,0.5)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "8px",
                                    color: "#fff",
                                    fontSize: "0.85rem",
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      addSlotToDate(i, e.target.value.trim());
                                      e.target.value = "";
                                    }
                                  }}
                                />
                                <button
                                  onClick={(e) => {
                                    const input = e.target.previousSibling;
                                    addSlotToDate(i, input.value.trim());
                                    input.value = "";
                                  }}
                                  style={{
                                    padding: "0 1rem",
                                    background: "#0891ff",
                                    border: "none",
                                    borderRadius: "8px",
                                    color: "#fff",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    fontSize: "0.85rem",
                                  }}
                                >
                                  <i className="fa-solid fa-plus"></i>
                                </button>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: "0.3rem",
                                }}
                              >
                                {(item.time_slots || []).map((slot, si) => (
                                  <span
                                    key={si}
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "0.3rem",
                                      background: "rgba(8,145,255,0.2)",
                                      border: "1px solid rgba(8,145,255,0.3)",
                                      borderRadius: "50px",
                                      padding: "0.3rem 0.7rem",
                                      fontSize: "0.8rem",
                                      color: "#fff",
                                    }}
                                  >
                                    {slot}
                                    <i
                                      className="fa-solid fa-xmark"
                                      style={{
                                        cursor: "pointer",
                                        color: "rgba(255,255,255,0.6)",
                                      }}
                                      onClick={() => removeSlotFromDate(i, si)}
                                    ></i>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Global Time Slots */}
                  <div style={{ marginBottom: "2rem" }}>
                    <label
                      style={{
                        fontWeight: 600,
                        display: "block",
                        marginBottom: "0.8rem",
                        fontSize: "0.95rem",
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      <i
                        className="fa-solid fa-clock"
                        style={{ marginRight: "0.4rem", color: "#0891ff" }}
                      ></i>
                      Global Time Slots (used if no custom slots)
                    </label>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.8rem",
                        marginBottom: "1.2rem",
                      }}
                    >
                      <input
                        type="text"
                        value={newTimeSlot}
                        onChange={(e) => setNewTimeSlot(e.target.value)}
                        placeholder="e.g. 09:00 or 14:30"
                        style={{
                          flex: 1,
                          padding: "0.7rem 1rem",
                          background: "rgba(0,0,0,0.5)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "10px",
                          color: "#fff",
                          fontSize: "0.9rem",
                        }}
                      />
                      <button
                        onClick={addTimeSlot}
                        style={{
                          padding: "0 1.5rem",
                          background:
                            "linear-gradient(135deg, #0891ff, #0066cc)",
                          border: "none",
                          borderRadius: "10px",
                          color: "#fff",
                          fontWeight: 600,
                          cursor: "pointer",
                          fontSize: "0.9rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <i className="fa-solid fa-plus"></i> Add
                      </button>
                    </div>
                    {settings.meeting.time_slots.length === 0 ? (
                      <div
                        style={{
                          color: "rgba(255,255,255,0.3)",
                          fontSize: "0.85rem",
                          fontStyle: "italic",
                        }}
                      >
                        No global time slots defined.
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                        }}
                      >
                        {settings.meeting.time_slots.map((slot, i) => (
                          <motion.span
                            key={i}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              background: "rgba(8,145,255,0.15)",
                              border: "1px solid rgba(8,145,255,0.3)",
                              borderRadius: "50px",
                              padding: "0.4rem 0.9rem",
                              fontSize: "0.85rem",
                              color: "#fff",
                              fontWeight: 500,
                            }}
                          >
                            {slot}
                            <i
                              className="fa-solid fa-xmark"
                              style={{
                                cursor: "pointer",
                                color: "rgba(255,255,255,0.6)",
                              }}
                              onClick={() => removeTimeSlot(i)}
                            ></i>
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Booking Checker */}
                  <div
                    style={{
                      background: "rgba(8,145,255,0.05)",
                      border: "1px solid rgba(8,145,255,0.2)",
                      borderRadius: "14px",
                      padding: "1.5rem",
                      marginTop: "2rem",
                    }}
                  >
                    <h4
                      style={{
                        margin: "0 0 1rem 0",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#0891ff",
                      }}
                    >
                      <i className="fa-solid fa-magnifying-glass"></i> Check
                      Existing Bookings
                    </h4>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr auto",
                        gap: "0.8rem",
                        alignItems: "end",
                      }}
                    >
                      <div
                        className="admin-input-group"
                        style={{ marginBottom: 0 }}
                      >
                        <label>Date</label>
                        <input
                          type="date"
                          value={checkDate}
                          onChange={(e) => setCheckDate(e.target.value)}
                        />
                      </div>
                      <div
                        className="admin-input-group"
                        style={{ marginBottom: 0 }}
                      >
                        <label>Time</label>
                        <select
                          value={checkTime}
                          onChange={(e) => setCheckTime(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "0.7rem",
                            background: "rgba(0,0,0,0.5)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "10px",
                            color: "#fff",
                          }}
                        >
                          <option value="">Select time</option>
                          {settings.meeting.time_slots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={checkBooking}
                        disabled={!checkDate || !checkTime || checkLoading}
                        style={{
                          padding: "0.7rem 1.5rem",
                          background: "#0891ff",
                          border: "none",
                          borderRadius: "10px",
                          color: "#fff",
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          opacity: !checkDate || !checkTime ? 0.5 : 1,
                        }}
                      >
                        {checkLoading ? (
                          <span className="admin-spinner"></span>
                        ) : (
                          <i className="fa-solid fa-search"></i>
                        )}
                        Check
                      </button>
                    </div>
                    {checkResult.length > 0 && (
                      <div
                        style={{
                          marginTop: "1rem",
                          color: "#f59e0b",
                          background: "rgba(245,158,11,0.1)",
                          borderRadius: "8px",
                          padding: "0.8rem 1rem",
                        }}
                      >
                        <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                        This slot is already booked by:
                        <ul
                          style={{
                            margin: "0.5rem 0 0 0",
                            paddingLeft: "1.2rem",
                          }}
                        >
                          {checkResult.map((contact, i) => (
                            <li key={i}>
                              {contact.name} ({contact.email})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {checkDate && checkTime && checkResult.length === 0 && (
                      <div
                        style={{
                          marginTop: "1rem",
                          color: "#10b981",
                          background: "rgba(16,185,129,0.1)",
                          borderRadius: "8px",
                          padding: "0.8rem 1rem",
                        }}
                      >
                        <i className="fa-solid fa-circle-check"></i> No bookings
                        for this slot.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  className="admin-submit-btn"
                  onClick={saveSettings}
                  disabled={saving}
                  style={{ padding: "0.9rem 2.5rem", fontSize: "1rem" }}
                >
                  {saving ? (
                    <>
                      <span className="admin-spinner"></span> Saving...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-floppy-disk"></i> Save Settings
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;
