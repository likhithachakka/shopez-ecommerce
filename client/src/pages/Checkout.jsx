import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', mobile: '', address: '', pincode: '', paymentMethod: 'COD' });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart?userId=guest');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const submitOrder = async () => {
    if (!items.length) {
      return alert('Your cart is empty');
    }
    setLoading(true);
    const orderPayload = {
      userId: 'guest',
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      address: form.address,
      pincode: form.pincode,
      paymentMethod: form.paymentMethod,
      items,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      const result = await response.json();
      if (response.ok) {
        navigate('/order-success');
      } else {
        alert(result.message || 'Unable to place order');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2 style={{ color: '#2f3542' }}>Checkout</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '18px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
          <h3>Shipping Information</h3>
          <div style={{ display: 'grid', gap: '14px', marginTop: '18px' }}>
            {['name', 'email', 'mobile', 'address', 'pincode'].map((field) => (
              <input
                key={field}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                style={{ padding: '12px 14px', borderRadius: '12px', border: '1px solid #d1d5db' }}
              />
            ))}
            <select value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} style={{ padding: '12px 14px', borderRadius: '12px', border: '1px solid #d1d5db' }}>
              <option value="COD">Cash on Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
            <button onClick={submitOrder} disabled={loading} style={{ background: '#10b981', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', cursor: 'pointer' }}>
              {loading ? 'Placing order...' : 'Place Order'}
            </button>
          </div>
        </div>
        <div style={{ background: 'white', padding: '24px', borderRadius: '18px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
          <h3>Order Summary</h3>
          <div style={{ marginTop: '18px', display: 'grid', gap: '12px' }}>
            {items.map((item) => (
              <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.title} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
