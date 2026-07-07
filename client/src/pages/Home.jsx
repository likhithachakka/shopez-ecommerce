import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category !== 'all') params.set('category', category);

    try {
      const response = await fetch(`/api/products?${params.toString()}`);
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
  }, [search, category]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#2f3542' }}>ShopEZ Product Catalog</h2>
          <p style={{ color: '#6b7280' }}>Browse products, filter by category, and explore offers.</p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products"
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', minWidth: '220px' }}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
            <option value="all">All Categories</option>
            <option value="Footwear">Footwear</option>
            <option value="Accessories">Accessories</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {products.map((product) => (
            <div key={product._id} style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              border: '1px solid #e5e7eb',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <img src={product.mainimg} alt={product.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>{product.category}</span>
                  <span style={{ fontSize: '14px', color: product.stock > 0 ? '#16a34a' : '#dc2626' }}>
                    {product.stock > 0 ? 'In stock' : 'Out of stock'}
                  </span>
                </div>
                <h3 style={{ margin: '0 0 12px 0', color: '#111827' }}>{product.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', flexGrow: 1 }}>{product.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '18px' }}>
                  <div>
                    <span style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>₹{product.price}</span>
                    {product.discount > 0 && (
                      <span style={{ marginLeft: '10px', color: '#ef4444', fontSize: '14px' }}>
                        {product.discount}% off
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    style={{
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    View details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
