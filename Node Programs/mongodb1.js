const {MongoClient} = require("mongodb");

const URL = "mongodb://localhost:27017";
const database = "college";

const client = new MongoClient(URL);

async function getData(){
    let result = await client.connect();
    let db = result.db(database);
    let collection = db.collection("students");
    let response = await collection.find({}).toArray();
    console.log(response);
}

getData();