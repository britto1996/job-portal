const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const mongoose = require("mongoose");

//load input validation
const validateRegisterInput = require("../validations/register");
const validateLoginInput = require("../validations/login");

//load user model
const User = require("../models/users");

//register user to the database
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        phone_number: req.body.phone_number,
        skills: req.body.skills,
      });

      //hashing the password before saving into database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              res.status(200).json(user);
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        });
      });
    }
  });
});

//login user by checking into the database
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email already in use" });
    }

    //checking password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
        };
        //login token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "password is incorrect" });
      }
    });
  });
});

//get all the users
router.get("/", (req, res) => {
  User.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

//get one user
//showing bug cast to object id failed
//body is empty : cannot read property "1" of null
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) =>
      console.log(
        err,
        mongoose.Types.ObjectId.isValid(req.params.id),
        typeof req.params.id,
        req.params.id,
        req.params.id
      )
    );
});

//Edit user details
//updation will be done by double click and that's also a problem
router.route("/edit/:id").put((req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("updated successfully");
      }
    }
  );
});

//Delete user details
router.delete("/del/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => user.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
