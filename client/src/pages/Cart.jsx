import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cart?userId=guest');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;
    await fetch(`/api/cart/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    });
    fetchCart();
  };

  const removeItem = async (id) => {
    await fetch(`/api/cart/${id}`, { method: 'DELETE' });
    fetchCart();
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2 style={{ color: '#2f3542' }}>Your Cart</h2>
      {loading ? (
        <p>Loading cart...</p>
      ) : items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div style={{ display: 'grid', gap: '20px' }}>
            {items.map((item) => (
              <div key={item._id} style={{ display: 'flex', gap: '20px', padding: '16px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <img src={item.mainimg} alt={item.title} style={{ width: '130px', height: '130px', objectFit: 'cover', borderRadius: '12px' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 8px 0' }}>{item.title}</h3>
                  <p style={{ margin: '0 0 10px 0', color: '#6b7280' }}>{item.category}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} style={{ padding: '8px 12px' }}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} style={{ padding: '8px 12px' }}>+</button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: '0 0 12px 0', fontWeight: 'bold' }}>₹{item.price * item.quantity}</p>
                  <button onClick={() => removeItem(item._id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer' }}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, color: '#6b7280' }}>Total</p>
              <h3 style={{ margin: 0, color: '#111827' }}>₹{total}</h3>
            </div>
            <button onClick={() => navigate('/checkout')} style={{ background: '#2563eb', color: 'white', border: 'none', padding: '14px 24px', borderRadius: '12px', cursor: 'pointer' }}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
