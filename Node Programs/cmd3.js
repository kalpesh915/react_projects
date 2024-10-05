const fs = require("fs");

if(process.argv[2] === "add"){
    fs.writeFileSync(process.argv[3], process.argv[4])
    console.log("New File Created");
}