import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const LocaluserData = JSON.parse(localStorage.getItem("user"));
  const userId = LocaluserData._id;

  const addProduct = async (e) => {
    e.preventDefault();
    if (!name || !price || !category || !company) {
      <span>Enter</span>;
      setError(true);
      return false;
    }
    console.log(name, price, category, company, userId);

    let result = await fetch("http://localhost:5000/add-product", {
      method: "POST",
      body: JSON.stringify({ name, price, category, userId, company }),
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log(result);
  };

  return (
    <div className="container mt-5">
      <h1>Add Product</h1>
      <div className="container">
        <form onSubmit={addProduct}>
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Product Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            {error && !name && (
              <p className="invalid-input">Enter valid name</p>
            )}
          </div>
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Product Price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
            {error && !price && (
              <p className="invalid-input">Enter valid price</p>
            )}
          </div>
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Product Category"
              required
              onChange={(e) => setCategory(e.target.value)}
            />
            {error && !category && (
              <p className="invalid-input">Enter valid category</p>
            )}
          </div>
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Product Company"
              required
              onChange={(e) => setCompany(e.target.value)}
            />
            {error && !company && (
              <p className="invalid-input">Enter valid company</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
