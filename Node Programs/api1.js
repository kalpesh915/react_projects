const http = require("http");

http.createServer((req, res) => {
    res.writeHead(200, {"content-type":"Application/json"});
    res.write(JSON.stringify({id:1, fname:"Kalpesh", lname:"Chauhan",city:"Rajkot"}));
    res.end();
}).listen(5000);