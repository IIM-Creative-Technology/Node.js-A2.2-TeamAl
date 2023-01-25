//const express = require("express");
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const app = express();
const httpServer = http.createServer(app);

const port = 3000;

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`user connected. Socket id: ${socket.id}`);

  socket.on("message", (data) => {
    socket.emit("data", data);
  });
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

//app.get("/school", (req, res) => res.send(JSON.stringify({ msg: "IIM" })));

//app.get("/work", (req, res) => res.json("lol"));

//app.post("/", (req, res) => res.json({ msg: "POST" }));

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ msg: "POST" });
});

//app.put("/", (req, res) => res.json({ msg: "PUT" }));

//app.delete("/", (req, res) => res.json({ msg: "DELETE" }));

httpServer.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

// Path: package.json
