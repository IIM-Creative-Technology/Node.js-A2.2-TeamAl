import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import router from "./routes/user.js";
import mongoose from "mongoose";

const app = express();
const httpServer = http.createServer(app);

const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/test')

/*userSchema = {
  name: String,
  mail: String,
  password: String,
  isAdmin: Boolean,
  isVerified: Boolean,
  age: Number
}

const User = mongoose.model('User', userSchema)
const jp = new User({
  name: 'Agravain-Henke du Petit-mont-l-étoile',
  mail: 'ahdpmle@coldmail.de',
  password: 'yvRC#H/_2cD0n',
  isAdmin: false,
  isVerified: true,
  age: 42
})

const data = jp.save();
data.then((d) =>{
  console.log(d)
})



*/
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`user connected. Socket id: ${socket.id}`);

  socket.on("message", (data) => {
    io.emit("data", data);
  });
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/user", router)

//app.get("/school", (req, res) => res.send(JSON.stringify({ msg: "IIM" })));

//app.get("/work", (req, res) => res.json("lol"));

//app.post("/", (req, res) => res.json({ msg: "POST" }));

/*app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ msg: "POST" });
});*/

//app.put("/", (req, res) => res.json({ msg: "PUT" }));

//app.delete("/", (req, res) => res.json({ msg: "DELETE" }));

httpServer.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

// Path: package.json
