import React, { useState } from "react";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const LocaluserData = JSON.parse(localStorage.getItem("user"));
  const userId = LocaluserData._id;

  const UpdateProduct = (e) => {
    console.log(name, price, category, company);
  };

  return (
    <div className="container mt-5">
      <h1>Update Product</h1>
      <div className="container">
        <form onSubmit={UpdateProduct}>
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Product Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Product Price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Product Category"
              required
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Product Company"
              required
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
