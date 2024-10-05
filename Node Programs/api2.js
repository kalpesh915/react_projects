const http = require("http");
const data = require("./jsondata");
http.createServer((req, res) => {
    res.writeHead(200, {"content-type":"Application/json"});
    res.write(JSON.stringify(data));
    res.end();
}).listen(5000);