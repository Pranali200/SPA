import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/productSlice';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [product, setProduct] = useState({
    id: Date.now(),
    name: '',
    unit: '',
    category: '',
    expiry: '',
    totalCost: 0,
    rawMaterials: [],
  });
  const [material, setMaterial] = useState({
    id: Date.now(),
    name: '',
    unit: '',
    quantity: 0,
    price: 0,
    tax: 0,
    totalAmount: 0,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addMaterial = () => {
    const tax = material.quantity * material.price * 0.1;
    const totalAmount = material.quantity * material.price + tax;
    const newMaterial = { ...material, tax, totalAmount };
    setProduct({
      ...product,
      rawMaterials: [...product.rawMaterials, newMaterial],
      totalCost: product.totalCost + totalAmount,
    });
    setMaterial({
      id: Date.now(),
      name: '',
      unit: '',
      quantity: 0,
      price: 0,
      tax: 0,
      totalAmount: 0,
    });
  };

  const handleSubmit = () => {
    dispatch(addProduct(product));
    navigate('/');
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form>
        <input
          type="text"
          placeholder="Product Name"
          value={product.name}
          onChange={e => setProduct({ ...product, name: e.target.value })}
        />
        <select
          value={product.unit}
          onChange={e => setProduct({ ...product, unit: e.target.value })}
        >
          <option value="">Select Unit</option>
          <option value="ml">ml</option>
          <option value="ltr">ltr</option>
          <option value="gm">gm</option>
          <option value="kg">kg</option>
          <option value="box">box</option>
          <option value="units">units</option>
        </select>
        <select
          value={product.category}
          onChange={e => setProduct({ ...product, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="Finished">Finished</option>
          <option value="Semi finished">Semi finished</option>
          <option value="Subsidiary">Subsidiary</option>
        </select>
        <input
          type="date"
          value={product.expiry}
          onChange={e => setProduct({ ...product, expiry: e.target.value })}
        />
      </form>

      <h2>Add Raw Material</h2>
      <form>
        <input
          type="text"
          placeholder="Material Name"
          value={material.name}
          onChange={e => setMaterial({ ...material, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={material.quantity}
          onChange={e => setMaterial({ ...material, quantity: +e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={material.price}
          onChange={e => setMaterial({ ...material, price: +e.target.value })}
        />
        <button type="button" onClick={addMaterial}>
          Add Material
        </button>
      </form>

      <h2>Raw Materials</h2>
      <ul>
        {product.rawMaterials.map(mat => (
          <li key={mat.id}>{mat.name} - Total: {mat.totalAmount}</li>
        ))}
      </ul>

      <button onClick={handleSubmit}>Save Product</button>
    </div>
  );
}

export default AddProduct;
