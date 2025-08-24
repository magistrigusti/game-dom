// frontend/models/Lord.ts
import mongoose, { Schema, models } from "mongoose";

const LordSchema = new Schema({
  name: { type: String, required: true, unique: true},
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Lord || mongoose.model("Lord", LordSchema);