import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true }, // Unique nickname
  email: { type: String, required: true, unique: true }, // Unique email
  highestScore: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);
export default User;