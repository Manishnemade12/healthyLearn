import express from "express";
import User from "../src/model/userModel.js";
import Quiz from "../src/model/quizModel.js";

const router = express.Router();

// Fetch quiz questions
router.get("/questions", async (req, res) => {
  try {
    const questions = await Quiz.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions" });
  }
});

// Submit quiz score
router.post("/submit", async (req, res) => {
  try {
    const { nickname, email, score } = req.body;
    if (!nickname || !email || score === undefined) {
      return res.status(400).json({ message: "Nickname, email, and score are required" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ nickname, email, highestScore: score });
    } else {
      if (score > user.highestScore) {
        user.highestScore = score;
      }
      user.nickname = nickname; // Update nickname if it has changed
    }

    await user.save();
    res.json({ message: "Score saved successfully!" });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ message: "Error saving score" });
  }
});

// Fetch leaderboard (Top 10 players)
router.get("/leaderboard", async (req, res) => {
  try {
    const leaders = await User.find().sort({ highestScore: -1 }).limit(10);
    res.json(leaders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
});

export default router;