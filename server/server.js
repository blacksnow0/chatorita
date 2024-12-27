const express = require("express");
const app = express();
const connectDb = require("./config/db");
const userRouter = require("./routes/userRoute");
const cors = require("cors");

connectDb();

require("dotenv").config();

app.use(express.json());

app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.use("/api", userRouter);
