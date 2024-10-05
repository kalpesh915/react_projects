const http = require("http");

http.createServer((req, res) =>{
    res.write("Welcome to world of Node JS");
    res.end();
}).listen(5000);
