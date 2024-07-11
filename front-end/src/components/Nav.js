import React, { Fragment } from "react";
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
      <ul className="Nav-ul">
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/add">Add Products</Link>
        </li>
        <li>
          <Link to="/update">Update Products</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>

        {auth ? (
          <li>
            <Link to="/signup" onClick={logout}>
              Logout
            </Link>
          </li>
        ) : (
          <Fragment>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </Fragment>
        )}

        <li></li>
      </ul>
    </div>
  );
};
export default Nav;
