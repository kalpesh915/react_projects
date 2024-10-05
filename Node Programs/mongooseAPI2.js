require("./mongooseconnection");
const express = require("express");
const app = express();
const studentsModel = require("./studentsconfig");

app.use(express.json());

app.get("/", async(req, res) => {
    const studentData = await studentsModel.find();
    res.send(studentData);
});

app.put("/update/:_id", async(req, res) => {
    const studentData = await studentsModel.updateOne(
        // condition
        req.params
    ,{
        // Data
        /*$set : {
            "fname": req.body.fname,
            "lname": req.body.lname,
            "city": req.body.city,
        }*/

        $set: req.body
    })
    res.send(studentData);
    res.send("PUT Completed");
});

app.delete("/delete/:_id", async(req, res) => {
    //const studentData = await studentsModel.deleteOne({"fname":"Kalpesh"});
    //const studentData = await studentsModel.deleteOne(req.params);
    const studentData = await studentsModel.deleteOne(req.params);
    res.send(studentData);
    res.send("Delete Completed");
});

app.post("/", async (req, res) => {
    // console.log(req.body);
    let studentData = new studentsModel(req.body);
    let result = await studentData.save();
    res.send(result);
    res.send("Completed");
});

app.listen(5000);