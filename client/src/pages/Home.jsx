import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', alignItems: 'start' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '18px', padding: '36px', boxShadow: '0 18px 45px rgba(15, 23, 42, 0.08)', border: '1px solid #e5e7eb' }}>
        <span style={{ display: 'inline-block', marginBottom: '18px', color: '#2563eb', fontWeight: 700 }}>ShopEZ</span>
        <h1 style={{ margin: '0 0 18px 0', fontSize: '3rem', lineHeight: 1.05, color: '#111827' }}>Shop smarter, faster, and with confidence.</h1>
        <p style={{ margin: 0, color: '#475569', fontSize: '1.05rem', lineHeight: 1.8 }}>
          Explore the ShopEZ catalog, filter products by category, and complete checkout easily.
          Use the Products page to search for items like watches, headphones, footwear, and accessories.
        </p>
        <div style={{ marginTop: '32px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/products')}
            style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '12px', padding: '14px 24px', cursor: 'pointer' }}
          >
            Browse Products
          </button>
          <button
            onClick={() => navigate('/cart')}
            style={{ backgroundColor: '#f8fafc', color: '#1f2937', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '14px 24px', cursor: 'pointer' }}
          >
            View Cart
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '18px', padding: '28px', boxShadow: '0 18px 45px rgba(15, 23, 42, 0.08)', border: '1px solid #e5e7eb' }}>
          <h2 style={{ margin: '0 0 14px 0', color: '#111827' }}>Top categories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <span style={{ backgroundColor: '#eef2ff', color: '#4338ca', borderRadius: '999px', padding: '10px 14px', textAlign: 'center' }}>Footwear</span>
            <span style={{ backgroundColor: '#fef3c7', color: '#92400e', borderRadius: '999px', padding: '10px 14px', textAlign: 'center' }}>Accessories</span>
            <span style={{ backgroundColor: '#d1fae5', color: '#047857', borderRadius: '999px', padding: '10px 14px', textAlign: 'center' }}>Electronics</span>
            <span style={{ backgroundColor: '#ede9fe', color: '#5b21b6', borderRadius: '999px', padding: '10px 14px', textAlign: 'center' }}>Watches</span>
          </div>
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: '18px', padding: '28px', boxShadow: '0 18px 45px rgba(15, 23, 42, 0.08)', border: '1px solid #e5e7eb' }}>
          <h2 style={{ margin: '0 0 14px 0', color: '#111827' }}>Why ShopEZ?</h2>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: 1.85 }}>
            <li>Easy product browsing with category filters and search</li>
            <li>Cart and checkout flow for fast purchases</li>
            <li>Order history and admin capabilities built in</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
