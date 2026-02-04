import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "User must provide a valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "User must set a string password"],
      minLength: [8, "Password must be at least 8 characters"],
    },
    name: {
      type: String,
      required: [true, "User must provide user's name"],
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: { type: String },
    passwordResetTokenExpiresAt: { type: Date },
    verificationToken: { type: String },
    verificationTokenExpiresAt: { type: Date },
  },
  {
    timestamps: true, // The timestamps option tells mongoose to assign createdAt and updatedAt fields to your schema.
  },
);

// userSchema.pre("/^find/", (req, res, next) => {});

export const User = mongoose.model("User", userSchema);
