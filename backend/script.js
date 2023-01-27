///////////////// IMPORT /////////////////////

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import mongoose from "mongoose";
import router from "./routes/user.js";

///////////////// CONST /////////////////////

const app = express();
const httpServer = http.createServer(app);
const port = 3000;

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const userSchema = {
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  isVerified: Boolean,
  age: Number,
};

const User = mongoose.model("User", userSchema);

const amber = new User({
  name: "Amber",
  email: "amber.node@gmail.com",
  password: 1234,
  isAdmin: true,
  isVerified: false,
  age: 20,
});

const dbResponse = amber.save();
dbResponse.then((data) => {
  console.log(data);
});
///////////////// SOCKET /////////////////////

io.on("connection", (socket) => {
  console.log(`user connected. Socket id: ${socket.id}`);

  socket.on("message", (data) => {
    socket.emit("data", data);
  });

  socket.on("chat message", (msg) => {
    console.log("message reçu: " + msg);
    io.emit("chat message", msg);
  });
});

///////////////// DB /////////////////////

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

///////////////// MIDDELWARE /////////////////////

app.use(bodyParser.json());
app.use(cors());

///////////////// ROUTES /////////////////////

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/user", router);

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ msg: "POST" });
});

///////////////// LISTEN /////////////////////

httpServer.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

// Path: package.json
