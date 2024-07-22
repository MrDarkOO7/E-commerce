import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    //console.log(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category, company }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h1>Update Product</h1>
      <div className="container">
        <form onSubmit={updateProduct}>
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              value={company}
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
