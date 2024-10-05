/// Delete data in collection with mongodb

const getConnection = require("./dbconnection");

const deleteData = async () => {
    const data = await getConnection();
    //let result = await data.deleteOne({"fname":"Kalpesh"});
    let result = await data.deleteMany({"fname":"Vansh"});
    //console.log(result);
    if(result.acknowledged){
        console.log(result.deletedCount,"Records Deleted");
    }else{
        console.log("Error while Deleting Data");
    }
}

deleteData();