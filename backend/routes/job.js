const express = require("express");
const router = express.Router();

//load user model
const Job = require("../models/job");

//add a job to db
router.post("/addjob", (req, res) => {
  const newJob = new Job({
    recruiter: req.body.recruiter,
    recruiterName: req.body.recruiterName,
    recruiterEmail: req.body.recruiterEmail,
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    duration: req.body.duration,
    salary: req.body.salary,
    appmax: req.body.appmax,
    numapp: req.body.numapp,
    posmax: req.body.posmax,
    numpos: req.body.numpos,
    address: req.body.address,
    skills: req.body.skills,
    rating: req.body.rating,
    numrate: req.body.numrate,
    dateOfPost: req.body.dateOfPost,
    deadline: req.body.deadline,
  });
  newJob
    .save()
    .then((job) => {
      res.status(200).json(job);
    })
    .catch((err) => {
      res.status(400).send(job);
    });
});

//getting all jobs
router.get("/jobs", (req, res) => {
  Job.find(function (err, jobs) {
    if (err) {
      console.log(err);
    } else {
      res.json(jobs);
    }
  });
});

module.exports = router;
