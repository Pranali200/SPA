import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct } from '../redux/productSlice';

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productToEdit = useSelector(state =>
    state.product.products.find(product => product.id === Number(id))
  );

  const [product, setProduct] = useState({
    id: Number(id),
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

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);

  const addMaterial = () => {
    const tax = material.quantity * material.price * 0.1;
    const totalAmount = material.quantity * material.price + tax;
    const newMaterial = { ...material, tax, totalAmount };

    setProduct(prevProduct => ({
      ...prevProduct,
      rawMaterials: [...prevProduct.rawMaterials, newMaterial],
      totalCost: prevProduct.totalCost + totalAmount,
    }));

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

  const handleMaterialChange = (index, updatedMaterial) => {
    const updatedMaterials = product.rawMaterials.map((mat, i) =>
      i === index ? updatedMaterial : mat
    );

    const totalCost = updatedMaterials.reduce((acc, mat) => acc + mat.totalAmount, 0);

    setProduct(prevProduct => ({
      ...prevProduct,
      rawMaterials: updatedMaterials,
      totalCost,
    }));
  };

  const handleSubmit = () => {
    dispatch(updateProduct(product));
    navigate('/');
  };

  if (!productToEdit) {
    return <div>Product not found!</div>;
  }

  return (
    <div>
      <h1>Update Product</h1>
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

      <h2>Raw Materials</h2>
      {product.rawMaterials.map((mat, index) => (
        <div key={mat.id}>
          <input
            type="text"
            placeholder="Material Name"
            value={mat.name}
            onChange={e =>
              handleMaterialChange(index, { ...mat, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Quantity"
            value={mat.quantity}
            onChange={e => {
              const quantity = +e.target.value;
              const totalPrice = quantity * mat.price;
              const tax = totalPrice * 0.1;
              handleMaterialChange(index, {
                ...mat,
                quantity,
                totalAmount: totalPrice + tax,
                tax,
              });
            }}
          />
          <input
            type="number"
            placeholder="Price"
            value={mat.price}
            onChange={e => {
              const price = +e.target.value;
              const totalPrice = mat.quantity * price;
              const tax = totalPrice * 0.1;
              handleMaterialChange(index, {
                ...mat,
                price,
                totalAmount: totalPrice + tax,
                tax,
              });
            }}
          />
          <button
            type="button"
            onClick={() => {
              const updatedMaterials = product.rawMaterials.filter(
                (_, i) => i !== index
              );
              const updatedTotalCost = updatedMaterials.reduce(
                (acc, mat) => acc + mat.totalAmount,
                0
              );

              setProduct({
                ...product,
                rawMaterials: updatedMaterials,
                totalCost: updatedTotalCost,
              });
            }}
          >
            Remove
          </button>
        </div>
      ))}

      <h2>Add New Material</h2>
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

      <button onClick={handleSubmit}>Save Changes</button>
    </div>
  );
}

export default UpdateProduct;
