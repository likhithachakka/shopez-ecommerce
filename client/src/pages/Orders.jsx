import React, { useEffect, useState } from 'react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/orders?userId=guest');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2 style={{ color: '#2f3542' }}>Your Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: '18px' }}>
          {orders.map((order) => (
            <div key={order._id} style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ margin: 0 }}>{order.name}</h3>
                  <p style={{ margin: '4px 0 0 0', color: '#6b7280' }}>{order.email}</p>
                </div>
                <span style={{ color: '#2563eb', fontWeight: '700' }}>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <p style={{ margin: '0 0 12px 0', color: '#4b5563' }}>{order.address}, {order.pincode}</p>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '14px' }}>
                {order.items?.map((item) => (
                  <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>{item.title} x {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px', fontWeight: '700' }}>
                <span>Payment</span>
                <span>{order.paymentMethod}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
