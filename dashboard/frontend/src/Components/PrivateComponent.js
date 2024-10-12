import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
    const auth = localStorage.getItem("useremail");

    return auth ? <Outlet></Outlet> : <Navigate to="/"></Navigate>
}

export default PrivateComponent;