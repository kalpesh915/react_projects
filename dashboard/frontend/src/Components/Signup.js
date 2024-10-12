import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    useEffect(() => {
        const auth = localStorage.getItem("useremail");
        if (auth) {
            navigate("/add");
        }
    });
    const [userData, setUserData] = useState({ fname: "", lname: "", email: "", password: "", cpassword: "" });

    const navigate = useNavigate();

    function handleInput(e) {
        // console.log(e.target);
        let { name, value } = e.target;
        setUserData(previousData => ({
            ...previousData,
            [name]: value
        }));
    }


    async function handleForm(e) {
        //console.log(event.target);
        e.preventDefault();
        //console.log(userData);

        const result = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                fname: userData.fname,
                lname: userData.lname,
                email: userData.email,
                password: userData.password
            })
        }).then((response) => {
            response.json().then((result) => {
                //console.log(result);
                localStorage.setItem("useremail", result.userdata.email);
                localStorage.setItem("token", result.token);
                navigate("/");
            });
        })
    }

    return (
        <>
            <div className="container">
                <h1 className="text-center p-2">Signup Form</h1>
                <form onSubmit={handleForm}>
                    <div className="my-3 form-floating">
                        <input type="text" className="form-control" placeholder="Enter First Name" id="fname" name="fname" required onInput={handleInput}></input>
                        <label className="form-label" htmlFor="fname">Enter First Name
                        </label>
                    </div>
                    <div className="my-3 form-floating">
                        <input type="text" className="form-control" placeholder="Enter Last Name" id="lname" name="lname" required onInput={handleInput}></input>
                        <label className="form-label" htmlFor="lname">
                            Enter Last Name
                        </label>
                    </div>
                    <div className="my-3 form-floating">
                        <input type="email" className="form-control" placeholder="Enter Email Address" id="email" name="email" required onInput={handleInput}></input>
                        <label className="form-label" htmlFor="email">
                            Enter Email Address
                        </label>
                    </div>
                    <div className="my-3 form-floating">
                        <input type="password" className="form-control" placeholder="Enter Password" id="password" name="password" required onInput={handleInput}></input>
                        <label className="form-label" htmlFor="password">
                            Enter Password
                        </label>
                    </div>
                    <div className="my-3 form-floating">
                        <input type="password" className="form-control" placeholder="Enter Confirm Password" id="cpassword" name="cpassword" required onInput={handleInput}></input>
                        <label className="form-label" htmlFor="cpassword">
                            Enter Confirm Password
                        </label>
                    </div>
                    <div className="my-3">
                        <input type="submit" value="Register Now" className="btn btn-primary mx-3" />
                        <input type="reset" value="Reset" className="btn btn-danger" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Signup;
