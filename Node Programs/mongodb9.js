/// Update data in collection with mongodb

const getConnection = require("./dbconnection");

const update = async() =>{
    let data = await getConnection();
    /// update All Match
    let result = await data.update(
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