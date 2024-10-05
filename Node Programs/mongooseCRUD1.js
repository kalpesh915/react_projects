const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/college");
const studentSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    city: String
});

const addNewData = async () => {
    const studentsModel = mongoose.model("students", studentSchema);
    let data = new studentsModel({
        "fname":"Kalpesh",
        "lname":"Chauhan",
        "city":"Rajkot"
    });

    let result = await data.save();
    console.log(result);
}

const updateDB = async ()=> {
    const studentsModel = mongoose.model("students", studentSchema);
    let data = await studentsModel.updateOne({
        "fname": "Kalpesh"
    },{
        $set: {"lname":"CHAUHAN", "city":"Ahamdabad"}
    });

    console.log(data);
}

const deleteDB = async ()=> {
    const studentsModel = mongoose.model("students", studentSchema);
    let data = await studentsModel.deleteOne({
        //"fname": "Kalpesh"
        "lname":"Chauhan"
    });

    console.log(data);
}

const findData = async ()=>{
    const studentsModel = mongoose.model("students", studentSchema);
    let data = await studentsModel.findOne(
        {"fname":"Demo"}
    );
    console.log(data);
}

//addNewData();
//updateDB();
// deleteDB();
findData()