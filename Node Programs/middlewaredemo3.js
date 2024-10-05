const express = require("express");
const app = express();

/// Route middleware
const requestFilter = (req, res, next) => {
    console.log("Request Filter Called");
    if(!req.query.age){
        res.send("Please Enter Your Age");
    }else if(req.query.age < 18){
        res.send("Please Enter Age greter than 18");
    }else{
        next();
    }
}

//app.use(requestFilter);

app.get("/", requestFilter, (req, res)=>{
    res.send("<h1>Home, Welcome to middleware of Node JS</h1>");
}); 

app.get("/about", (req, res)=>{
    res.send("<h1>About, Welcome to middleware of Node JS</h1>");
}); 

app.get("/login", (req, res)=>{
    res.send("<h1>Login, Welcome to middleware of Node JS</h1>");
}); 

app.get("/users", (req, res)=>{
    res.send("<h1>Users, Welcome to middleware of Node JS</h1>");
}); 

app.listen(5000);