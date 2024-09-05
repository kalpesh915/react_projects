import React from "react";
import { useSelector } from "react-redux";
import { getItemSelector } from "../Redux/slices/cartSlice";

function Cart(){
    const items = useSelector(getItemSelector);
    const total = items.reduce((a, b) => a + b.price, 0);
    return <>
        <div className="alert alert-success fixed-top mb-5">
            <h3 className="text-center">Total Items : {items.length} (Rs. {total} /-)</h3>
        </div>
    </>
}

export default Cart;