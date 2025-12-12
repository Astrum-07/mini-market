
import React, { useState, useEffect } from 'react';


const CartItem = ({ item, onRemove }) => {
  return (
    <div className="cart-item">
      <div>
        <strong>{item.title.substring(0, 20)}...</strong>
        <br />
        <small>{item.quantity} x ${item.price}</small>
      </div>
      <div>
        <span>${(item.price * item.quantity).toFixed(2)}</span>
        <button className="remove-btn" onClick={() => onRemove(item.id)}>X</button>
      </div>
    </div>
  );
};


const Cart = () => {

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('mini-marketplace-cart');
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    localStorage.setItem('mini-marketplace-cart', JSON.stringify(cartItems));
  }, [cartItems]);


  useEffect(() => {
    const handleAddToCart = (e) => {
      const product = e.detail;
      addToCart(product);
    };

    window.addEventListener('addToCart', handleAddToCart);


    return () => {
      window.removeEventListener('addToCart', handleAddToCart);
    };
  }, [cartItems]); 

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart-box">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} onRemove={removeFromCart} />
            ))}
          </div>
          <div style={{ marginTop: '20px', borderTop: '2px solid #333', paddingTop: '10px' }}>
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;