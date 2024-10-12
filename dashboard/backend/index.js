const cors = require("cors");
const express = require("express");
const app = express();
require("./db/mongoconn");
const User = require("./db/user");
const Products = require("./db/products");
const ObjectId = require('mongoose').Types.ObjectId;
const Jwt = require("jsonwebtoken");
const JwtKey = "mykey";

app.use(express.json());
app.use(cors());

function verifyToken(req, res, next){
    //console.log("Token is ", req.header('Authorization'));
    let token = req.header('Authorization');
    if(token){
        Jwt.verify(token, JwtKey, (err,  valid)=>{
            if(err){
                res.send({
                    "code":401,
                    "message":"Invalid Login "
                });
            }else{
                next();
            }
        });
    }else{
        res.send({
            "code":401,
            "message":"Invalid Login, token is required"
        });
    }
}

app.get("/", (req, res) => {
    res.send("Server Started");
});

app.post("/register", async (req, res) => {
    console.log(req.body);

    const data = await User.findOne({ "email": req.body.email });
    console.log(data);
    if (data) {
        //console.log("User Exist ");
        res.send({
            "code": 404,
            "message": "User Exist"
        });
    } else {
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        if (result) {
            Jwt.sign({ result }, JwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({
                        "code": 404,
                        "message": "Server Error please try after some time"
                    });
                } else {
                    res.send({
                        "code": 200,
                        "message": "User Created",
                        "userdata": result,
                        "token": token
                    });
                }
            })
        }else{
            res.send({
                "code": 404,
                "message": "Server Error while creating User"
            });
        }

    }
    //res.send("API Called");
});

app.post("/login", async (req, res) => {
    //res.send(req.body);
    // console.log(req.body);
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, JwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ "code": 404, "message": "Server Error try again" });
                } else {
                    res.send({
                        "code": 200,
                        "message": "User Login",
                        "userdata": user,
                        "token": token
                    });
                }
            });
        } else {
            res.send({ "code": 404, "message": "No User Found" });
        }
    } else {
        res.send({ "code": 404, "message": "Must Enter Username and Password" });
    }
});

app.post("/addproduct", verifyToken, async (req, res) => {
    let product = new Products(req.body);
    let result = await product.save();
    //console.log("OK");
    res.send({
        "code": 200,
        "message": "New Product Added in Database",
        "product": result
    });
});

app.get("/listproducts", verifyToken, async (req, res) => {
    let result = await Products.find();
    if (result.length > 0) {
        res.send({
            "code": 200,
            "message": "Products Found",
            "products": result
        });
    } else {
        res.send({
            "code": 404,
            "message": "No Products Found"
        });
    }
});

app.delete("/deleteproduct/:id", verifyToken, async (req, res) => {
    let result = await Products.deleteOne({ "_id": req.params.id });
    if (result.deletedCount) {
        res.send({
            "code": 200,
            "message": "Data Deleted"
        });
    } else {
        res.send({
            "code": 404,
            "message": "Data Not Deleted"
        });
    }
});

app.get("/getoneproduct/:id", verifyToken, async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.send({
            "code": 404,
            "message": "Invalid Product ID",
        });
    } else {
        let result = await Products.findOne({ "_id": req.params.id });
        if (result) {
            res.send({
                "code": 200,
                "message": "Product Found",
                "productdata": result
            });
        } else {
            res.send({
                "code": 404,
                "message": "Product Not Found"
            });
        }
    }
});

app.put("/updateproduct/:id", verifyToken, async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.send({
            "code": 404,
            "message": "Invalid Product ID",
        });
    } else {
        let result = await Products.updateOne({ "_id": req.params.id }, {
            $set: req.body
        });
        if (result) {
            res.send({
                "code": 200,
                "message": "Product Updated Successfully",
                "productdata": result
            });
        } else {
            res.send({
                "code": 404,
                "message": "Error While updating Products Data"
            });
        }
    }
});

app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Products.find({
        $or: [
            { name: { $regex: req.params.key, $options: 'i' } },
            { price: { $regex: req.params.key, $options: 'i' } },
            { category: { $regex: req.params.key, $options: 'i' } },
            { brand: { $regex: req.params.key, $options: 'i' } }
        ]
    });

    if (result.length > 0) {
        res.send({
            "code": 200,
            "message": "Data Found",
            "products": result
        });
    } else {
        res.send({
            "code": 404,
            "message": "No Data Found"
        });
    }
});


app.listen(5000);