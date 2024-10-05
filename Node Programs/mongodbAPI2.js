/// POST API With MongoDB
const express = require("express");
const app = express();
const getConnection = require("./dbconnection");

// get data middleware
app.use(express.json());

app.get("", async (req, res) => {
  let data = await getConnection();
  let result = await data.find().toArray();
  res.send(result);
  res.end();
});

app.post("", async (req, res) => {
    let data = await getConnection();
    //console.log(req.body);
    let result = await data.insertOne(req.body);
    if(result.insertedId){
        res.send({
            code:200,
            message: "New Record Created",
            data:result
        });
    }else{
        res.send({
            code:500,
            message: "Internal Server Error"
        });
    }
    res.end();
});

app.listen(5000);
