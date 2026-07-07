import React, { useEffect, useState } from 'react';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2 style={{ color: '#2f3542' }}>Admin Dashboard</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div style={{ display: 'grid', gap: '18px' }}>
          {products.map((product) => (
            <div key={product._id} style={{ background: 'white', padding: '18px', borderRadius: '16px', boxShadow: '0 8px 25px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0 }}>{product.title}</h3>
                  <p style={{ margin: '6px 0 0 0', color: '#6b7280' }}>{product.category}</p>
                </div>
                <span style={{ fontWeight: '700', color: '#111827' }}>₹{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
