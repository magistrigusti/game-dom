// models/User.ts
import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema({
  wallet: { type: String, required: true, unique: true },
  lordName: { type: String },   // Появится после создания Лорда
  role: { type: String },       // Появится после создания Лорда
  isComplete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default models.User || mongoose.model("User", UserSchema);
