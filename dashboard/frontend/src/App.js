import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Signup from "./Components/Signup";
import PrivateComponent from "./Components/PrivateComponent";
import Login from "./Components/Login";
import AddProduct from "./Components/AddProduct";
import Home from "./Components/Home";
import Delete from "./Components/Delete";
import Update from "./Components/Update";

function App() {
  return (
    <div className="App">
      <h1 className="bg-primary text-white text-center p-3">Front End in React JS</h1>
      <BrowserRouter>
        <Navbar></Navbar>

        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route element={<PrivateComponent />}>
            <Route path="/home" element={<Home/>} ></Route>
            <Route path="/add" element={<AddProduct />} ></Route>
            <Route path="/update/:id" element={<Update/>} ></Route>
            {/* <Route path="/delete" element={<Delete />} ></Route> */}
            <Route path="/profile" element={<>Profile</>} ></Route>
            <Route path="/logout" element={<>Logout</>} ></Route>
          </Route>
          <Route path="/signup" element={<Signup />} ></Route>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div >
  );
}

export default App;
