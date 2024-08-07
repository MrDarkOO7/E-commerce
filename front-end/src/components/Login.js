import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalInfo } from "./AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setloggedInID } = useContext(GlobalInfo);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logged in from : ", email);
    let result = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      //console.log(result.user._id);
      setloggedInID(result.user._id);
      navigate("/");
    } else {
      alert("Please enter correct details");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <input
            required="required"
            className="form-control"
            type="text"
            id="username"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="mt-3">
          <input
            required="required"
            className="form-control"
            type="password"
            id="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
