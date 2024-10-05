const express = require("express");
const app = express()

app.get("/", (req, res) => {
    res.send({
            id:1,
            fname: "Kalpesh",
            lname: "Chauhan",
            city: "Rajkot"
        });
    res.end();
});


app.listen(5000, "localhost", ()=>{
    console.log("Server Started");
});