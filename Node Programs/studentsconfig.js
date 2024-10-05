const mongoose = require("mongoose");
const studentsSchema = new mongoose.Schema({
    "fname": String,
    "lname": String,
    "city": String
});

module.exports = studentsModel = mongoose.model("students", studentsSchema);