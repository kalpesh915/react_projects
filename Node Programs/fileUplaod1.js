const express = require("express");
const multer = require("multer");
const app = express();

const uplaodProcess = multer({
    Storage: multer.diskStorage({
        destination: function(req, file, callback){
            callback(null, "uploads")
        },
        filename: function(req, file, callback){
            callback(null, file.filename)
        },
    })
});

app.post("/fileupload", async (req, res) => {

    res.send("File Uplaoded");
});

app.listen(5000);
