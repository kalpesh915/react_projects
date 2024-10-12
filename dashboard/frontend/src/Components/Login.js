import alertify from "alertifyjs";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    useEffect(() => {
        const auth = localStorage.getItem("useremail");
        if (auth) {
            navigate("/home");
        }
    });
    const [userData, setUserData] = useState({ email: "", password: "" });

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

        const result = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email: userData.email,
                password: userData.password
            })
        }).then((response) => {
            response.json().then((result) => {
                //console.log(result);
                if (result.code === 200) {
                    localStorage.setItem("useremail", result.userdata.email);
                    // localStorage.setItem("username", {fname:result.fname, lname:result.lname});
                    localStorage.setItem("token", result.token);
                    navigate("/home");
                } else if (result.code === 404) {
                    /*alertify.alert('Error', 'No User Found', function () {
                        alertify.success(result.message);
                    });*/

                    alertify.set('notifier','position', 'top-right');
                    alertify.error(result.message);
                }

            });
        })
    }

    return (
        <>
            <div className="container">
                <h1 className="text-center p-2">Login Form</h1>
                <form onSubmit={handleForm}>

                    <div className="my-3 form-floating">
                        <input type="email" className="form-control" placeholder="Enter Email Address" id="email" name="email" required onInput={handleInput}></input>
                        <label className="form-label" htmlFor="email">
                            Enter Email Address
                        </label>
                    </div>
                    <div className="my-3 form-floating">
                        <input type="password" className="form-control" placeholder="Enter Password" id="password" name="password" required onInput={handleInput}></input>
                        <label className="form-label" htmlFor="Enter Password">
                            Enter Password
                        </label>
                    </div>

                    <div className="my-3">
                        <input type="submit" value="Login Now" className="btn btn-primary mx-3" />
                        <input type="reset" value="Reset" className="btn btn-danger" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
