const express = require("express");
const app = express();
const connectDb = require("./config/db");
const userRouter = require("./routes/userRoute");
const cors = require("cors");

connectDb();

app.use(express.json());

app.use(cors());

app.listen("5003", () => {
  console.log("Server is running on port 5003");
});

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.use("/api", userRouter);
