const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const education = require("../models/education");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: ["applicant", "recruiter"],
      default: "applicant",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    rating: {
      type: Number,
      default: 5,
    },
    profile_image: {
      type: String,
    },
    numapp: {
      type: Number,
      default: 0,
    },
    numrate: {
      type: Number,
      default: 0,
    },
    phone_number: {
      type: Number,
    },
    bio: {
      type: String,
    },
    education: {
      type: [education.schema],
    },
    skills: {
      type: [String],
    },
    resume: {
      type: String,
    },
    working: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", userSchema);
