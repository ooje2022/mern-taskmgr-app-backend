const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

//Middelware
app.use(express.json());
//You need the above line to access the res objects

app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:3000", "mern-taskmgr-app.onrender.com"],
  })
);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDb Server connected.......");
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}.....`);
    });
  })
  .catch((err) => console.log(err));
