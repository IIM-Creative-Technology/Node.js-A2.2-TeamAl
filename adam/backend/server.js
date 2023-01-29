const express = require("express");
const { parse } = require("path");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const dataFile = path.join(__dirname, "data.json");

// Pour encoder l'URL
app.use(express.urlencoded ({extended : true }));

// CORS

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/poll", async (req, res) => {
    let data = JSON.parse(await fs.readFile(dataFile, "utf-8"));
    const totalVotes = Object.values(data).reduce((total, n) => total +=n, 0); // pour aditionner les votes

    data = Object.entries(data).map(([label, votes]) => {
        return {
            label,
            parcentage :(((100 * votes) / totalVotes) || 0).toFixed(0)
        }
    });

    res.json(data);
});

app.post("/poll", async (req, res) => {
    const data = JSON.parse(await fs.readFile(dataFile, "utf-8"));

    data[req.body.add]++; //Modifie le form-data dans Postman

    await fs.writeFile(dataFile, JSON.stringify(data));

    res.end(); 
});

app.listen(3000, () => console.log("Server is running..."));

