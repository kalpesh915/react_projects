const express = require("express");
const app = express();
const route = express.Router();
/// Group Middleware
const requestFilter = require("./myMiddleware");

route.use(requestFilter);

route.get("/",  (req, res)=>{
    res.send("<h1>Home, Welcome to middleware of Node JS</h1>");
}); 

route.get("/about", (req, res)=>{
    res.send("<h1>About, Welcome to middleware of Node JS</h1>");
}); 

app.get("/login", (req, res)=>{
    res.send("<h1>Login, Welcome to middleware of Node JS</h1>");
}); 

app.get("/users", (req, res)=>{
    res.send("<h1>Users, Welcome to middleware of Node JS</h1>");
}); 

app.use("/", route);

app.listen(5000);