import React from 'react';
import { useNavigate } from 'react-router-dom';

// టెస్టింగ్ కోసం కొన్ని డమ్మీ ప్రొడక్ట్స్ డేటా
const dummyProducts = [
  { id: '1', title: 'Trendy Sneakers', price: 1999, description: 'Comfortable and stylish sports shoes for daily wear.', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
  { id: '2', title: 'Classic Leather Watch', price: 3499, description: 'Elegant luxury watch with premium leather strap.', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
  { id: '3', title: 'Wireless Headphones', price: 2499, description: 'High bass noise-canceling bluetooth headphones.', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2f3542' }}>Comprehensive Product Catalog</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
        {dummyProducts.map((product) => (
          <div key={product.id} style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            border: '1px solid #e1e1e1',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <img src={product.img} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#2f3542' }}>{product.title}</h3>
              <p style={{ color: '#747d8c', fontSize: '14px', flexGrow: 1 }}>{product.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff4757' }}>₹{product.price}</span>
                <button 
                  onClick={() => navigate(`/order/${product.id}`)}
                  style={{
                    backgroundColor: '#ff4757',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}