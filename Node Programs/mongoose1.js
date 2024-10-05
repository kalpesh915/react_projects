const mongoose = require("mongoose");

const main = async () => {
    await mongoose.connect("mongodb://localhost:27017/college");
    const studentSchema = new mongoose.Schema({
        fname: String,
        lname: String
    });

    const studentsModel = mongoose.model("students", studentSchema);
    /*let data = new studentsModel({
        "fname":"Kalpesh"
    });*/

    let data = new studentsModel({
        "fname":"Kalpesh",
        "lname":"Chauhan",
    });

    let result = await data.save();
    console.log(result);
}

main();