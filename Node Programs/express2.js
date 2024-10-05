const express = require("express");
const app = express()

app.get("/", (req, res) => {
    //console.log(req.query);
    console.log(req.query.name);
    res.write("<h1>Basic Example of Express JS</h1>");
    res.write(`<h1>Welcome ${req.query.name}</h1>`);
    res.end();
});

app.get("/about", (req, res) => {
    res.write("<h1>About us Page Called</h1>");
    res.end();
});

app.get("/contact", (req, res) => {
    res.write("<h1>Contact Function Called</h1>");
    res.end();
});

app.listen(5000, "localhost", ()=>{
    console.log("Server Started");
});