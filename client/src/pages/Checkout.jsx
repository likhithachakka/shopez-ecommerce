import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const getZone = (state) => {
  const metro = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Gujarat'];
  const tier1 = ['Punjab', 'Haryana', 'Uttar Pradesh', 'West Bengal', 'Rajasthan', 'Kerala', 'Andhra Pradesh', 'Odisha'];
  if (metro.includes(state)) return 'Metro';
  if (tier1.includes(state)) return 'Tier 1';
  return 'Tier 2';
};

const getShippingFee = (state, subtotal) => {
  if (subtotal > 5000) return 0;
  const zone = getZone(state);
  if (zone === 'Metro') return 59;
  if (zone === 'Tier 1') return 79;
  return 119;
};

export default function Checkout() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    paymentMethod: 'COD'
  });
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

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = getShippingFee(form.state, subtotal);
  const gst = Number((subtotal * 0.05).toFixed(2));
  const totalBeforeCoupon = subtotal + shippingFee + gst;
  const total = Number((totalBeforeCoupon - couponDiscount).toFixed(2));

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponDiscount(0);
      setCouponMessage('');
      return;
    }

    try {
      const response = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, subtotal: totalBeforeCoupon }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Invalid coupon');
      }
      setCouponDiscount(Number(result.discount || 0));
      setCouponMessage(`${result.message} (${result.code})`);
    } catch (error) {
      setCouponDiscount(0);
      setCouponMessage(error.message || 'Coupon not usable');
    }
  };

  const submitOrder = async () => {
    if (!items.length) {
      return alert('Your cart is empty');
    }

    if (!form.name || !form.email || !form.mobile || !form.address || !form.city || !form.state || !form.pincode) {
      return alert('Please complete all shipping details including city, state, and pincode.');
    }

    setLoading(true);
    const orderPayload = {
      userId: 'guest',
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      address: form.address,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      paymentMethod: form.paymentMethod,
      shippingFee,
      gst,
      total,
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

  return (
    <div>
      <h2 style={{ color: '#2f3542' }}>Checkout</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '18px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
          <h3>Shipping Information</h3>
          <div style={{ display: 'grid', gap: '14px', marginTop: '18px' }}>
            {['name', 'email', 'mobile', 'address'].map((field) => (
              <input
                key={field}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                style={{ padding: '12px 14px', borderRadius: '12px', border: '1px solid #d1d5db' }}
              />
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="City"
                style={{ padding: '12px 14px', borderRadius: '12px', border: '1px solid #d1d5db' }}
              />
              <select value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} style={{ padding: '12px 14px', borderRadius: '12px', border: '1px solid #d1d5db' }}>
                {indianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <input
              value={form.pincode}
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              placeholder="Pincode"
              style={{ padding: '12px 14px', borderRadius: '12px', border: '1px solid #d1d5db' }}
            />
            <select value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} style={{ padding: '12px 14px', borderRadius: '12px', border: '1px solid #d1d5db' }}>
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI</option>
              <option value="Card">Debit / Credit Card</option>
            </select>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Coupon code" style={{ flex: 1, minWidth: '180px', padding: '12px 14px', borderRadius: '12px', border: '1px solid #d1d5db' }} />
              <button type="button" onClick={applyCoupon} style={{ background: '#1d4ed8', color: 'white', border: 'none', borderRadius: '12px', padding: '12px 16px', cursor: 'pointer' }}>
                Apply
              </button>
            </div>
            {couponMessage && <div style={{ color: couponDiscount > 0 ? '#15803d' : '#b91c1c', fontSize: '0.95rem' }}>{couponMessage}</div>}
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
          <div style={{ marginTop: '18px', display: 'grid', gap: '10px', borderTop: '1px solid #e5e7eb', paddingTop: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Shipping</span><span>₹{shippingFee}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>GST (5%)</span><span>₹{gst}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Coupon</span><span>-₹{couponDiscount}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.1rem' }}><span>Total</span><span>₹{total}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
