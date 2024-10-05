/// insert data in collection with mongodb

const getConnection = require("./dbconnection");

const insert = async () => {
    //console.log("Called");
    const db = await getConnection();
    const result = await db.insertOne({"fname":"Kritika", "lname":"Chauhan"});

    if(result.acknowledged){
        console.log(`New Record Created`);
    }else{
        console.log(`Error while create new Record`);
    }

}

insert();