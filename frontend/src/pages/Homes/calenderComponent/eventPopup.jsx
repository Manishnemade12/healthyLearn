import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const EventPopup = ({ date, onClose, saveEvent, deleteEvent }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("08:00");

  const handleSave = () => {
    if (title.trim() === "") {
      alert("Event title cannot be empty!");
      return;
    }
    const newEvent = { title, time, date };
    saveEvent(newEvent);
    onClose();
  };

  const handleDelete = () => {
    deleteEvent(date);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-96 bg-sec rounded-3xl p-8 shadow-2xl shadow-gray-900 border border-[var(--bg-ter)]"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold txt">
                {title ? "Edit Event" : "New Event"}
              </h2>
              <p className="text-sm txt-dim">{date}</p>
            </div>
            <button
              onClick={onClose}
              className="txt-dim hover:txt transition mb-auto"
            >
              <X size={24} />
            </button>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl bg-transparent border border-[var(--bg-ter)] px-4 py-2 txt placeholder:txt-dim focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div className="mb-6">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-xl bg-transparent border border-[var(--bg-ter)] px-4 py-2 txt placeholder:txt-dim focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleDelete}
              className="flex-1 rounded-lg bg-ter py-2 text-center txt font-semibold shadow hover:bg-red-700 transition"
            >
              Delete
            </button>
            <button
              onClick={handleSave}
              className="flex-1 m-auto w-min rounded-lg bg-purple-600 py-2 text-center text-white font-semibold shadow hover:bg-purple-700 transition"
            >
              {title ? "Update" : "Create"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EventPopup;