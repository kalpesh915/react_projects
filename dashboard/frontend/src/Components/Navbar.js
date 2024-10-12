import { useEffect } from "react";
import alertify from "alertifyjs";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("useremail");

  const logout = () => {
    if(window.confirm("Are you sure to Logout??")) {
      const auth = localStorage.getItem("useremail");
      if (auth) {
        localStorage.removeItem("useremail");
        localStorage.removeItem("token");
        navigate("/");
      }
    };

  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <span className="navbar-brand mx-3">E Commerce Dashboard</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            {
              auth ? <>
                <li className="nav-item">
                  <Link to="/home" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/add" className="nav-link">
                    Add Products
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to="/update" className="nav-link">
                    Udpate Products
                  </Link>
                </li> */}
                {/* <li className="nav-item">
                  <Link to="/delete" className="nav-link">
                    Delete Products
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" onClick={logout} className="nav-link">
                    Logout
                  </Link>
                </li>
              </>
                : <>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Login
                    </Link>
                  </li><li className="nav-item">
                    <Link to="/signup" className="nav-link">
                      Signup
                    </Link>
                  </li></>
            }
          </ul>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
