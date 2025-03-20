import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { BotMessageSquare, X, ArrowUp, Loader, Spline } from "lucide-react";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const apikey = "AIzaSyBPuUC9dW_uIqC8q9wsSE1zKjgUJR62XxE"; // Replace with your actual API key

// Variants for the chat panel
const panelVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

// Variants for each chat message
const messageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const Ai = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 350, height: 500 });
  const resizing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startDimensions = useRef({ width: 350, height: 500 });

  useEffect(() => {
    const modalEl = document.getElementById("ai_chat_modal");
    if (modalEl) {
      modalEl.showModal = () => setIsChatOpen(true);
      modalEl.close = () => {
        setIsChatOpen(false);
        setMessages([]); // Clear messages on close
      };
    }
  }, []);

  const generateQuestion = async () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    setLoading(true);
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const userMessage = { type: "user", text: question, time: currentTime };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apikey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: {
              text: question,
            },
          }),
        }
      );

      const data = await response.json();

      if (data && data.candidates && data.candidates.length > 0) {
        const generatedResponse = data.candidates[0]?.output || "No response found";
        const aiMessage = {
          type: "ai",
          text: generatedResponse,
          time: currentTime,
        };
        setMessages((prev) => [...prev, aiMessage]);
        toast.success("Response generated successfully!");
      } else {
        toast.error("No response from AI model");
      }
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Failed to generate response");
    } finally {
      setLoading(false);
      setQuestion(""); // Clear input field
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      generateQuestion();
    }
  };

  const closeModal = () => {
    setMessages([]); // Clear messages when modal is closed
    setIsChatOpen(false);
  };

  // --- Resizable functionality from the top-left corner ---
  const handleMouseDown = (e) => {
    resizing.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
    startDimensions.current = { ...dimensions };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!resizing.current) return;
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    const newWidth = Math.min(
      Math.max(startDimensions.current.width - deltaX, 300),
      window.innerWidth * 0.96
    );
    const newHeight = Math.min(
      Math.max(startDimensions.current.height - deltaY, 400),
      window.innerHeight * 0.94
    );
    setDimensions({ width: newWidth, height: newHeight });
  };

  const handleMouseUp = () => {
    resizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  // --- End resizable functionality ---

  return (
    <div>
      {/* Ask AI Button */}
      <button
        className="flex gap-3 bg-purple-600 text-white px-5 py-2.5 font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition duration-200 transform hover:scale-105"
        onClick={() => {
          const modalEl = document.getElementById("ai_chat_modal");
          modalEl && modalEl.showModal();
        }}
      >
        <BotMessageSquare />
        Ask AI
      </button>

      {/* Chat Panel */}
      <motion.div
        id="ai_chat_modal"
        variants={panelVariants}
        initial="hidden"
        animate={isChatOpen ? "visible" : "hidden"}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 50,
          pointerEvents: isChatOpen ? "auto" : "none",
          width: dimensions.width,
          height: dimensions.height,
        }}
      >
        <div className="bg-white rounded-3xl w-full h-full text-gray-800 flex flex-col overflow-hidden relative shadow-2xl">
          {/* Resizer handle using the Spline icon */}
          <div
            onMouseDown={handleMouseDown}
            className="absolute top-0 left-0 p-2 cursor-nw-resize z-50"
          >
            <Spline className="w-5 h-5 text-gray-500" />
          </div>

          {/* Nav-bar */}
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Ask AI</h3>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Chat area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-lg font-medium text-center">
                  Hey! Welcome to{" "}
                  <span className="text-purple-600 font-bold">EDTech AI</span>
                  <br />
                  How can I help you today?
                </p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className={`flex flex-col ${
                    msg.type === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <p
                    className={`py-2 px-4 rounded-lg ${
                      msg.type === "user"
                        ? "bg-purple-100 text-gray-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </p>
                  <span className="text-sm text-gray-500 mt-1">{msg.time}</span>
                </motion.div>
              ))
            )}
          </div>

          {/* Input area */}
          <div className="p-2 border-t border-gray-200 flex items-center gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your question to AI..."
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={generateQuestion}
              className={`p-3 rounded-lg text-white font-bold transition-all ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : <ArrowUp />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Ai;