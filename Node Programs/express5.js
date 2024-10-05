const express = require("express");
const path = require("path");

const app = express()
const publicDir = path.join(__dirname, "public");    
//console.log(publicDir);

//app.use(express.static(publicDir));

app.get("/", (req, res)=>{
    res.sendFile(`${publicDir}/index.html`);
});

app.get("/about", (req, res)=>{
    res.sendFile(`${publicDir}/about.html`);
});

app.get("*", (req, res)=>{
    res.sendFile(`${publicDir}/error.html`);
});

app.listen(5000, "localhost", ()=>{
    console.log("Server Started");
});