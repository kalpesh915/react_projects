/// Update data in collection with mongodb

const getConnection = require("./dbconnection");

const update = async() =>{
    let data = await getConnection();
    /// update only first match
    let result = await data.updateOne(
        {"fname": "Kalpesh"},
        {$set:{
            "fname":"Kalpesh",
            "lname":"Chauhan",
            "city" : "Rajkot"
        }}
    );

    console.log(result);
}

update();