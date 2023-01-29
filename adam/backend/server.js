const express = require("express");
const { parse } = require("path");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const dataFile = path.join(__dirname, "data.json");

// Pour encoder l'URL
app.use(express.urlencoded ({extended : true }));

app.get("/poll", async (req, res) => {
    let data = JSON.parse(await fs.readFile(dataFile, "utf-8"));


    console.log(data);
    
    res.end();
});

app.listen(3000, () => console.log("Server is running..."));

