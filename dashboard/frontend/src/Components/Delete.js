import alertify from "alertifyjs";
import { useEffect, useState } from "react";

function Delete() {
    let [productsData, setProductsData] = useState([]);

    useEffect(() => {
        getAllProducts();
    }, []);

    function deleteProduct(_id) {
        //alert(_id);
        if (window.confirm("Are you sure to delete this products ?")) {


            fetch("http://localhost:5000/deleteproduct/" + _id, {
                method:"DELETE"
            }).then((response) => {
                response.json().then((result) => {
                    if (result.code === 200) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        getAllProducts();
                    } else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }
                });
            });
        }
    }

    const getAllProducts = async () => {
        fetch("http://localhost:5000/listproducts").then((response) => {
            response.json().then((result) => {
                //console.log(result);
                if (result.code === 200) {
                    setProductsData(result.products);
                } else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            });
        });
    }

    return <>
        <div className="container-fluid">
            <div className="table-responsive">
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
                                <td><button type="button" className="btn btn-danger" onClick={() => deleteProduct(product._id)}>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>
}

export default Delete;