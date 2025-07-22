import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, enum: ["admin", "manager", "doctor", "client"] },
  organizationId: mongoose.Types.ObjectId,
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
