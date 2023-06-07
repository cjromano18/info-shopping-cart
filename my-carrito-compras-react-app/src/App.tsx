import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './App.css';

interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const handleAddProduct = () => {
    if (name.trim() === '' || description.trim() === '' || price <= 0) {
      return;
    }

    const newProduct: Product = {
      name,
      description,
      price,
      quantity: 1,
    };

    setProducts([...products, newProduct]);
    setName('');
    setDescription('');
    setPrice(0);
  };

  const handleIncrementQuantity = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity++;
    setProducts(updatedProducts);
  };

  const handleDecrementQuantity = (index: number) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity--;
      setProducts(updatedProducts);
    }
  };

  const totalPrice = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div className="container">
      <div className="form">
        <h2>Agregar Producto</h2>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <button onClick={handleAddProduct}>Agregar Producto</button>
      </div>
      {products.length > 0 && (
        <div className="cart">
          <div className="cart-header">
            <h2>Carrito de Compras</h2>
            <div className="cart-summary">
              <FaShoppingCart size={24} />
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          {products.map((product, index) => (
            <div className="product-card" key={index}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Precio: ${product.price.toFixed(2)}</p>
              <div className="quantity">
                <button onClick={() => handleDecrementQuantity(index)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => handleIncrementQuantity(index)}>+</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;