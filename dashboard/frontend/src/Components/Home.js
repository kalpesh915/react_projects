import alertify from "alertifyjs";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Home() {
    let [productsData, setProductsData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getAllProducts();
    }, []);

    function clearAuth(){
        localStorage.removeItem("useremail");
        localStorage.removeItem("token");
    }
    
    const getAllProducts = async () => {
        fetch("http://localhost:5000/listproducts", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((response) => {
            response.json().then((result) => {
                //console.log(result);
                if (result.code === 200) {
                    setProductsData(result.products);
                }else if(result.code === 401){
                    alertify.set('notifier','position', 'top-right');
                    alertify.error(result.message);
                    clearAuth();
                    navigate("/");
                } else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            });
        });
    }

    function deleteProduct(_id) {
        //alert(_id);
        if (window.confirm("Are you sure to delete this products ?")) {


            fetch("http://localhost:5000/deleteproduct/" + _id, {
                method: "DELETE",
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then((response) => {
                response.json().then((result) => {
                    if (result.code === 200) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        getAllProducts();
                    }else if(result.code === 401){
                        alertify.set('notifier','position', 'top-right');
                        alertify.error(result.message);
                        clearAuth();
                        navigate("/");
                    } else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }
                });
            });
        }
    }

    async function searchData(e) {
        let searchText = e.target.value;
        //alert(searchText); 

        if (searchText.length > 0) {
            fetch("http://localhost:5000/search/" + searchText,
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            ).then((response) => {
                response.json().then((result) => {
                    console.log(result);
                    if (result.code === 200) {
                        setProductsData(result.products);
                    } else if(result.code === 401){
                        clearAuth();
                        navigate("/");
                    }else{
                        // alertify.set('notifier','position', 'top-right');
                        // alertify.error(result.message);
                    }
                });
            });
        } else {
            getAllProducts();
        }
    }


    return <>
        <div className="container-fluid">
            <div className="table-responsive">
                <input type="search" id="search" name="search" placeholder="Search Products Here.." className="form-control p-3 my-4" onInput={searchData}></input>
                <table className="table table-hover table-striped">
                    <thead className="table-primary">
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            productsData.map((product, key) => <tr key={key}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td><button type="button" className="btn btn-danger mx-2" onClick={() => deleteProduct(product._id)}>Delete</button> <Link to={"/update/" + product._id} className="btn btn-primary mx-2" >Update</Link></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>
}

export default Home;