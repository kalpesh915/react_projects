const express = require("express");
const app = express();

/// Route middleware
const requestFilter = require("./myMiddleware");

//app.use(requestFilter);

app.get("/", requestFilter, (req, res)=>{
    res.send("<h1>Home, Welcome to middleware of Node JS</h1>");
}); 

app.get("/about", requestFilter, (req, res)=>{
    res.send("<h1>About, Welcome to middleware of Node JS</h1>");
}); 

app.get("/login", (req, res)=>{
    res.send("<h1>Login, Welcome to middleware of Node JS</h1>");
}); 

app.get("/users", (req, res)=>{
    res.send("<h1>Users, Welcome to middleware of Node JS</h1>");
}); 

app.listen(5000);