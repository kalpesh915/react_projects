const fs = require("fs");
const path = require("path");
const myPath = path.join(__dirname, "/myfiles");

for(let i=1; i<=10; i++){
    //fs.writeFileSync(myPath+"/data"+i+".txt", "This is Sample File");
    fs.writeFileSync(`${myPath}/data${i}.txt`, "This is Sample File");
}