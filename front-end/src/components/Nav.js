import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      <img
        className="logo"
        alt="logo"
        src="https://t4.ftcdn.net/jpg/07/64/55/75/360_F_764557526_HlwV6rYpIxrfhrmlpTzl74INFoMmJs9Z.jpg"
      ></img>
      {auth ? (
        <ul className="Nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/signup" onClick={logout}>
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="Nav-ul nav-right">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Nav;
