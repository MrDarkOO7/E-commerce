import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    let result = await fetch(`http://localhost:5000/products/`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    console.log(id);
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const handleSearch = async (e) => {
    const key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="container">
      <h3 className="mt-5 mb-3 text-center">Product List</h3>
      <div className="search-input">
        <input
          type="text"
          placeholder="Search Product"
          className="search-box"
          onChange={handleSearch}
        ></input>
      </div>
      <div className="container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="column">Serial No</th>
              <th scope="column">Name</th>
              <th scope="column">Price</th>
              <th scope="column">Category</th>
              <th scope="column">Company</th>
              <th scope="column">Operation</th>
            </tr>
          </thead>
          {products.length > 0 ? (
            <tbody className="table-group-divider">
              {products.map((item, index) => (
                <tr key={item._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.company}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteProduct(item._id)}
                    >
                      {" "}
                      <i className="bi bi-trash"></i>Delete
                    </button>
                    <Link to={"/update/" + item._id}>Update</Link>
                    {/* <Link to={'/add'} */}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <h1>No products found</h1>
          )}
        </table>
      </div>
    </div>
  );
}
