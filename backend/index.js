import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import profileRoutes from "./routes/profile.js";
import quizRoutes from "./routes/quizRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
  app.use("/quiz", quizRoutes);
// Routes with simplified Auth handling
app.use("/api/profile", profileRoutes);

// Basic health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import profileRoutes from "./routes/profile.js";
// import quizRoutes from "./routes/quizRoutes.js";
// import { videoRouter, server } from "./routes/videoroute.js"; // Import video routes

// dotenv.config(); // Load environment variables

// const app = express();
// app.use(cors()); // Enable CORS
// app.use(express.json()); // Parse JSON request bodies

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // Define routes
// app.use("/quiz", quizRoutes); // Quiz routes
// app.use("/api/profile", profileRoutes); // Profile routes
// app.use("/video", videoRouter); // Video routes

// // Basic health check endpoint
// app.get("/health", (req, res) => {
//   res.json({ status: "ok", message: "Server is running" });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));