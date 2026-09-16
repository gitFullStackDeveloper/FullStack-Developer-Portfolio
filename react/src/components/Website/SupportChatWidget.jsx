import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./SupportChatWidget.css";

const SupportChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [customSize, setCustomSize] = useState({ width: 420, height: 600 });
  const chatEndRef = useRef(null);
  const resizeRef = useRef(null);
  const windowRef = useRef(null);
  const sessionId = useRef(
    `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  );
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const sendMessage = async () => {
    const text = message.trim();
    if (!text) return;

    const userMsg = { role: "user", content: text };
    setConversation((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const history = conversation
        .filter((msg) => msg.role === "user" || msg.role === "model")
        .map((msg) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        }));

      const res = await fetch(`${window.API_BASE}/api/chat/support/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          session_id: sessionId.current,
          history: history,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed");

      const botMsg = { role: "assistant", content: data.reply };
      setConversation((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
      };
      setConversation((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleMaximize = () => {
    setIsMaximized((prev) => !prev);
  };

  // Resize logic
  const handleResizeMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = windowRef.current?.offsetWidth || customSize.width;
      const startHeight = windowRef.current?.offsetHeight || customSize.height;

      const onMouseMove = (moveEvent) => {
        const newWidth = Math.max(350, startWidth + moveEvent.clientX - startX);
        const newHeight = Math.max(
          400,
          startHeight + moveEvent.clientY - startY,
        );
        setCustomSize({ width: newWidth, height: newHeight });
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [customSize],
  );

  const windowStyle = isMaximized
    ? {
        width: "calc(100vw - 4rem)",
        height: "calc(100vh - 10rem)",
        maxHeight: "none",
      }
    : { width: customSize.width, height: customSize.height };

  return (
    <div className="scw-container">
      {/* Floating Button */}
      <motion.button
        className="scw-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <i className="fa-solid fa-times"></i>
        ) : (
          <i className="fa-solid fa-comment-dots"></i>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={windowRef}
            className={`scw-chat-window ${isMaximized ? "maximized" : ""}`}
            style={windowStyle}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="scw-header">
              <div>
                <h4>
                  <i className="fa-solid fa-robot"></i> AI Support
                </h4>
                <p>Ask me anything about services</p>
              </div>
              <div className="scw-header-actions">
                <button
                  onClick={toggleMaximize}
                  title={isMaximized ? "Minimize" : "Maximize"}
                >
                  <i
                    className={`fa-solid ${isMaximized ? "fa-compress" : "fa-expand"}`}
                  ></i>
                </button>
              </div>
            </div>

            <div className="scw-messages">
              {conversation.length === 0 && (
                <div className="scw-empty">
                  <i className="fa-solid fa-message-bot"></i>
                  <p>Hello! How can I help you today?</p>
                </div>
              )}
              {conversation.map((msg, i) => (
                <div
                  key={i}
                  className={`scw-message ${msg.role === "user" ? "user" : "assistant"}`}
                >
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div className="scw-message assistant">
                  <span className="scw-typing">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="scw-input-area">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !message.trim()}
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>

            {/* Resize handle */}
            {!isMaximized && (
              <div
                ref={resizeRef}
                className="scw-resize-handle"
                onMouseDown={handleResizeMouseDown}
              >
                <i className="fa-solid fa-grip-lines"></i>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SupportChatWidget;
