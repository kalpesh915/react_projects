module.exports = requestFilter = (req, res, next) => {
    console.log("Request Filter Called");
    if(!req.query.age){
        res.send("Please Enter Your Age");
    }else if(req.query.age < 18){
        res.send("Please Enter Age greter than 18");
    }else{
        next();
    }
}