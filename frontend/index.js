const express=require("express")
const app=express()
const path = require("path")


app.get("/login",(req,res)=> {
    res.render("login")
})

app.get("/signup",(req,res)=> {
    res.render("signup")
})

app.listen(3000, ()=> {
    console.log("port connected")
})