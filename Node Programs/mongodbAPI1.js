/// GET API With MongoDB
const express = require("express");
const app = express();
const getConnection = require("./dbconnection");

app.get("", async (req, res)=>{
    // res.send({
    //     id:"1",
    //     fname:"Kalpesh",
    //     lnamae:"Chauhan"
    // });

    let data = await getConnection();
    let result = await data.find().toArray();
    res.send(result);
    res.end();
});


app.listen(5000);
