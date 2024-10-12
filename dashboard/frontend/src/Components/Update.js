import alertify from "alertifyjs";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const [productData, setProductData] = useState({ _id:"", name: "", price: "", category: "", brand: ""});
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{    
        //console.log(id);
        getoneproduct(id);
    }, []);

    function clearAuth(){
        localStorage.removeItem("useremail");
        localStorage.removeItem("token");
    }

    async function getoneproduct(){
        fetch("http://localhost:5000/getoneproduct/"+id,{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        }).then((response)=>{
            response.json().then((result)=>{
                if(result.code === 200){
                    setProductData(result.productdata);
                }else if(result.code === 404){
                    alertify.set('notifier','position', 'top-right');
                    alertify.error(result.message);
                    navigate("/home");
                }
                else if(result.code === 401){
                    clearAuth();
                    navigate("/");
                }
            });
        })
    }
    

    

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

        const result = await fetch("http://localhost:5000/updateproduct/"+productData._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: localStorage.getItem("token")
            },
            body: JSON.stringify({
                name: productData.name,
                price: productData.price,
                category: productData.category,
                brand: productData.brand,
            })
        }).then((response) => {
            response.json().then((result) => {
                //console.log(result);
                if(result.code === 200){
                    alertify.set('notifier','position', 'top-right');
                    alertify.success(result.message);
                    getoneproduct();
                    //navigate("/home");
                }else if(result.code === 401){
                    alertify.set('notifier','position', 'top-right');
                    alertify.error(result.message);
                    clearAuth();
                    navigate("/");
                }else{
                    alertify.set('notifier','position', 'top-right');
                    alertify.error(result.message);
                }
                
                //e.target.reset();
            });
        })
    }

    return (
        <>
            <div className="container">
                <h1 className="text-center p-2">Update Product Form</h1>
                <form onSubmit={handleForm}>
                <div className="my-3 form-floating">
                        <input type="text" className="form-control" placeholder="Enter Product ID" id="_id" name="_id" required onInput={handleInput} readOnly defaultValue={productData._id}></input>
                        <label className="form-label" htmlFor="_id">Enter Product ID
                        </label>
                    </div>

                    <div className="my-3 form-floating">
                        <input type="text" className="form-control" placeholder="Enter Product Name" id="name" name="name" required onInput={handleInput} defaultValue={productData.name}></input>
                        <label className="form-label" htmlFor="name">Enter Product Name
                        </label>
                    </div>
                    
                    <div className="my-3 form-floating">
                        <input type="text" className="form-control" placeholder="Enter Product Price" id="price" name="price" required onInput={handleInput} defaultValue={productData.price}></input>
                        <label className="form-label" htmlFor="price">Enter Product Price
                        </label>
                    </div>

                    <div className="my-3 form-floating">
                        <input type="text" className="form-control" placeholder="Enter Category Name" id="category" name="category" required onInput={handleInput} defaultValue={productData.category}></input>
                        <label className="form-label" htmlFor="category">Enter Category Name
                        </label>
                    </div>

                    <div className="my-3 form-floating">
                        <input type="text" className="form-control" placeholder="Enter Brand Name" id="brand" name="brand" required onInput={handleInput} defaultValue={productData.brand}></input>
                        <label className="form-label" htmlFor="brand">Enter Brand Name
                        </label>
                    </div>
                    <div className="my-3">
                        <input type="submit" value="Update Product" className="btn btn-primary mx-3" />
                        <input type="reset" value="Reset" className="btn btn-danger" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Update;
