const getConnection = require("./dbconnection");

const main = async () => {
    console.log("Main Called");
    let data = await getConnection();
    result = await data.find().toArray();
    console.log(result);
}

main();

// getConnection().then((resp)=>{
//     //console.log(resp);
//     resp.find().toArray().then((data)=>{
//         console.log(data);
//     })
// })