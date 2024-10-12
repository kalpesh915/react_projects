import alertify from "alertifyjs";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const [productData, setProductData] = useState({ name: "", price: "", category: "", brand: "" });

    const navigate = useNavigate();

    function handleInput(e) {
        // console.log(e.target);
        let { name, value } = e.target;
        setProductData(previousData => ({
            ...previousData,
            [name]: value
        }));
    }


    async function handleForm(e) {
        //console.log(event.target);
        e.preventDefault();
        //console.log(userData);

        const result = await fetch("http://localhost:5000/addproduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                name: productData.name,
                price: productData.price,
                category: productData.category,
                brand: productData.brand,
                userid: localStorage.getItem("useremail")
            })
        }).then((response) => {
            response.json().then((result) => {
                //console.log(result);
                if (result.code === 401) {
                    localStorage.removeItem("useremail");
                    localStorage.removeItem("token");
                    navigate("/");
                } else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                    e.target.reset();
                }
            });
        })
    }

    return (
        <>
            <div className="container">
                <h1 className="text-center p-2">Add Product Form</h1>
                <form onSubmit={handleForm}>
                    <div className="my-3 form-floating">
                        <input type="text" className="form-control" placeholder="Enter Product Name" id="name" name="name" required onInput={handleInput}></input>
                        <label className="form-label" htmlFor="name">Enter Product Name
                        </label>
                    </div>

                    <div className="my-3 form-floating">
                        <input type="text" className="form-control" placeholder="Enter Product Price" id="price" name="price" required onInput={handleInput}></input>
                        <label className="form-label" htmlFor="price">Enter Product Price
                        </label>
                    </div>

                    <div className="my-3 form-floating">
                        <input type="text" className="form-control" placeholder="Enter Category Name" id="category" name="category" required onInput={handleInput}></input>
                        <label className="form-label" htmlFor="category">Enter Category Name
                        </label>
                    </div>

                    <div className="my-3 form-floating">
                        <input type="text" className="form-control" placeholder="Enter Brand Name" id="brand" name="brand" required onInput={handleInput}></input>
                        <label className="form-label" htmlFor="brand">Enter Brand Name
                        </label>
                    </div>
                    <div className="my-3">
                        <input type="submit" value="Add New Product" className="btn btn-primary mx-3" />
                        <input type="reset" value="Reset" className="btn btn-danger" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddProduct;
