import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    console.log(id);
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  return (
    <div>
      <h3 className="mt-5 mb-3 text-center">Product List</h3>
      <div className="container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="column">Serial No</th>
              <th scope="column">Name</th>
              <th scope="column">Price</th>
              <th scope="column">Category</th>
              <th scope="column">Operation</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {products.map((item, index) => (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProduct(item._id)}
                  >
                    {" "}
                    <i className="bi bi-trash"></i>Delete
                  </button>
                  <Link to={"/update/" + item._id}>Update</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
