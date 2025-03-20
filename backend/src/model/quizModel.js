import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [String],
  correct: { type: String, required: true },
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;