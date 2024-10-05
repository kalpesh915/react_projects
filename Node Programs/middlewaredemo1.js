const express = require("express");
const app = express();

const requestFilter = (req, res, next) => {
    console.log("Request Filter Called");
    next();
}

app.use(requestFilter);

app.get("/", (req, res)=>{
    res.send("<h1>Home, Welcome to middleware of Node JS</h1>");
}); 

app.get("/users", (req, res)=>{
    res.send("<h1>Users, Welcome to middleware of Node JS</h1>");
}); 

app.listen(5000);