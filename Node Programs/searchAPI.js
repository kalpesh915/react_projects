const express = require("express");
require("./mongooseconnection");
const studentData = require("./studentsconfig");

const app = express();
app.use(express.json());

app.get("/search/:text", async (req, res) => {
    //let data = await studentData.find();
    //res.send(req.params.text);
    //res.send(data);

    let data = await studentData.find({
        "$or":[
            {"fname" : {$regex: req.params.text}},
            {"lname" : {$regex: req.params.text}},
            {"city" : {$regex: req.params.text}}
        ]
    });

    res.send(data);
    //res.send("Working");
});

app.listen(5000);