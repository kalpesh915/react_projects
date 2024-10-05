const fs = require("fs");
const path = require("path");
const myPath = path.join(__dirname, "/myfiles");

fs.readdir(`${myPath}`, (err, filename)=>{
    console.log(filename)
});
