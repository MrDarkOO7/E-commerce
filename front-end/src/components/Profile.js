import React, { useState, useEffect, useContext } from "react";
import { GlobalInfo } from "./AppContext";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user.email;
  const [absoluteProducts, setAbsoluteProducts] = useState("");
  const { totalProductsAvailable } = useContext(GlobalInfo);
  const { loggedInID } = useContext(GlobalInfo);

  useEffect(() => {
    getAbsoluteProducts();
  }, []);

  const getAbsoluteProducts = async () => {
    let result = await fetch(`http://localhost:5000/getCount/${loggedInID}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setAbsoluteProducts(result.numProducts);
  };
  //console.log("Email: " + email);
  //   console.log("Total: " + totalProductsAvailable);
  return (
    <div className="container">
      <p>Email : {email} </p>
      <p>Products available: {totalProductsAvailable}</p>
      <p>Total Products passed through this email : {absoluteProducts}</p>
    </div>
  );
}
