const express = require("express");
const path = require("path");

const app = express()

app.set('view engine', 'ejs');

app.get("/", (req, res)=>{
    //res.render('pro1');
    res.render('pro1', {
        id: 1,
        fname: "Kalpesh",
        lname: "Chauhan",
        languages: ["PHP","Java","Python", "Node", "ASP"]
    });
});

app.listen(5000, "localhost", ()=>{
    console.log("Server Started");
});