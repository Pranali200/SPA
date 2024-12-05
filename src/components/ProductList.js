import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ProductList() {
  const products = useSelector(state => state.product.products);

  return (
    <div>
      <h1>Product List</h1>
      <Link to="/add">Add New Product</Link>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Total Cost</th>
            <th>Number of Raw Materials</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>
                <Link to={`/update/${product.id}`}>{product.name}</Link>
              </td>
              <td>{product.category}</td>
              <td>{product.totalCost}</td>
              <td>{product.rawMaterials.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;


