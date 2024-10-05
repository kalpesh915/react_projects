const express = require("express");
const path = require("path");

const app = express()
const publicDir = path.join(__dirname, "public");    
//console.log(publicDir);

app.use(express.static(publicDir));

app.listen(5000, "localhost", ()=>{
    console.log("Server Started");
});