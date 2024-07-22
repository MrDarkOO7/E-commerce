import React, { useEffect, useState } from "react";

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

  console.log(products);

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
              <tr>
                <td scope="row">{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <button className="btn btn-danger">
                    {" "}
                    <i className="bi bi-trash"></i>Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
