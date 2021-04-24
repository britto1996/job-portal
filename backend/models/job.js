const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    recruiter: {
      type: Schema.Types.ObjectId,
      ref: "Recruiter",
    },
    recruiterName: {
      type: String,
    },
    recruiterEmail: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    duration: {
      type: Number,
    },
    salary: {
      type: Number,
    },
    app: {
      type: Number,
      default: 0,
    },
    appmax: {
      type: Number,
    },
    numapp: {
      type: Number,
    },
    address: {
      type: String,
    },
    skills: {
      type: [String],
    },
    rating: {
      type: Number,
    },
    numrate: {
      type: Number,
    },
    posmax: {
      type: Number,
    },
    numpos: {
      type: Number,
    },
    dateOfPost: {
      type: Date,
      default: new Date(),
    },
    deadline: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = Job = mongoose.model("Job", jobSchema);
