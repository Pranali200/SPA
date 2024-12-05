import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/productSlice';

function AddProduct() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: '',
    unit: '',
    category: '',
    expiry: '',
    totalCost: 0,
    rawMaterials: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(product)); 
    setProduct({
      name: '',
      unit: '',
      category: '',
      expiry: '',
      totalCost: 0,
      rawMaterials: [],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      {/* Additional fields */}
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProduct;
