require("./mongooseconnection");
const express = require("express");
const app = express();
const studentsModel = require("./studentsconfig");

app.use(express.json());
app.post("/", async (req, res) => {
    // console.log(req.body);
    let studentData = new studentsModel(req.body);
    let result = await studentData.save();
    res.send(result);
    res.send("Completed");
});

app.listen(5000);