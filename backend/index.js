const express = require("express");
const app = express();
const port = 8000 || process.env.port;
const dotenv = require("dotenv");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

//routes
const userRouter = require("./routes/user");
const jobRouter = require("./routes/job");
const applicationRouter = require("./routes/application");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.fgame.mongodb.net/${process.env.dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);
const db = mongoose.connection;
db.once("open", function () {
  console.log("database connected succcessfully");
});

//setting up api endpoints
app.use("/user", userRouter);
app.use("/jobs", jobRouter);
app.use("/application", applicationRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`app listening to port ${port}`);
});
