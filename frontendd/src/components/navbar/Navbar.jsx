import { NavLink, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import "./navbar.css";
import { useState } from "react";
import { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [closeMenu, setCloseMenu] = useState(false);
  const navigate = useNavigate();
  // The handleSuccess of the login button
  const [user, setuser] = useState({
    email: "",
    family_name: "",
    image_url: "",
    name: "",
    profile_image: "",
    is_admin: true,
  });
  const handleSuccess = (credentialResponse) => {
    var userobject = jwtDecode(credentialResponse.credential);
    axios
      .get(`http://127.0.0.1:8000/api/user/` + userobject.email)
      .then((response) => {
        // User already exists, set the user data
        setuser(response.data.user);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          axios
            .post("http://127.0.0.1:8000/api/users/", {
              email: userobject.email,
              name: userobject.given_name,
              family_name: userobject.family_name,
              image_url: userobject.picture,
            })
            .then((response) => {
              setuser(response.data.user);
            })
            .catch((error) => {
              console.error("Error creating user:", error);
            });
        }
      });
  };
  useEffect(() => {
    // Trigger fetchData when user.email changes
  }, [user]);
  const handleLogout = () => {
    setuser({});
    window.location.href = "/";
  };
  const handleError = () => {
    console.log("Login Failed");
  };

  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <div className="navbar">
      <div className="logodiv">
        <a className="logo" href="/">
          let's learn
        </a>
      </div>
      <div className={`links ${closeMenu ? "open" : "close"}`}>
        <div className="link">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/"
          >
            Home
          </NavLink>
        </div>
        <div className="link">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/course"
          >
            Course Path
          </NavLink>
        </div>
        <div className="link">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/testlvl"
          >
            Test-Level
          </NavLink>
        </div>
        <div className="link">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/articles"
          >
            Articles
          </NavLink>
        </div>
        <div className="link">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to={{ pathname: "/onlinesessions" }}
            state={user.email}
          >
            Online-Sessions
          </NavLink>
        </div>
        <div className="link">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/aichat"
          >
            Chat With Ai
          </NavLink>
        </div>
        {user.is_admin && ( // Conditionally rendering based on isAdmin flag
          <React.Fragment>
            <div className="link">
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/admin"
              >
                Admin Dashboard
              </NavLink>
            </div>
          </React.Fragment>
        )}
      </div>

      <div>
        {user.email ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="link" style={{ marginRight: "10px" }}>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to={{ pathname: "/profile" }}
                state={user.email}
              >
                <img
                  src={user.image_url}
                  alt="User Icon"
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                />
              </NavLink>
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 12px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#333333",
                color: "white",
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
          />
        )}
      </div>

      {/*<FaUser className='login-icon'/>*/}

      <HiMenu
        onClick={() => setCloseMenu(!closeMenu)}
        className="login-icon menu"
      />
    </div>
  );
};

export default Navbar;
