import http from "http"
import express from "express"
import { Server } from "socket.io"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"

const app = express()
const port = 3000
const CreateServer = http.createServer(app)
const io = new Server(CreateServer,{
    cors:{
        origin:"*"
    }
})

io.on("connection",(socket)=>{
    console.log(`${socket.id}`)
    socket.on("message",(data)=>{
        io.emit("data",data)
        console.log(data)
    })
})



app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.json({msg:"ok"})
})

app.post('/',(req,res)=>{
    res.json(req.body)
})

CreateServer.listen(port, ()=>{
    console.log(`Le serveur écoute sur le port ${port}`)
})

mongoose.connect("mongodb://127.0.0.1:27017/cours")
