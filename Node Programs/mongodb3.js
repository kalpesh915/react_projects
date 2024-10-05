const {MongoClient} = require("mongodb");

const URL = "mongodb://localhost:27017";
const database = "college";

const client = new MongoClient(URL);

async function getConnection(){
    let result = await client.connect();
    let db = result.db(database);
    return db.collection("students");
}

getConnection().then((resp)=>{
    //console.log(resp);
    resp.find().toArray().then((data)=>{
        console.log(data);
    })
})