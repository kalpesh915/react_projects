import React from "react";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../Redux/slices/cartSlice";

function Product(Props) {
    const dispatch = useDispatch();
    return <>
        <div className="col-md-3">
            <div className="card">
                <img className="card-img-top" src={Props.image} alt={Props.productName}></img>
                <div className="card-body">
                    <div className="card-title">{Props.productName}</div>
                    <p className="card-text">{Props.price}</p>
                    <button className="btn btn-primary" onClick={e => dispatch(ADD_TO_CART({
                        name : Props.productName, 
                        price : Props.price
                    }))}>Add to Cart</button>
                </div>
            </div>
        </div>
    </>
}

export default Product;