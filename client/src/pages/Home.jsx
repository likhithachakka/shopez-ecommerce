import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const highlights = [
    { value: '500+', label: 'Curated products' },
    { value: '24/7', label: 'Order support' },
    { value: '4.9/5', label: 'Happy shoppers' },
  ];

  const categories = ['Footwear', 'Accessories', 'Electronics', 'Watches'];

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Curated shopping made effortless</span>
          <h1>Discover products that feel as good as they look.</h1>
          <p>
            Browse the ShopEZ catalog, explore polished categories, and move from discovery to checkout without friction.
          </p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => navigate('/products')}>
              Browse Products
            </button>
            <button className="secondary-btn" onClick={() => navigate('/cart')}>
              View Cart
            </button>
          </div>
          <div className="hero-stats">
            {highlights.map((item) => (
              <div key={item.label} className="stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card">
            <span className="visual-badge">New arrival</span>
            <h3>Premium essentials for everyday life</h3>
            <p>From smart accessories to everyday footwear, everything is gathered in one place.</p>
            <div className="pill-row">
              {categories.map((category) => (
                <span key={category} className="pill">
                  {category}
                </span>
              ))}
            </div>
            <div className="mini-cards">
              <div>Fast checkout</div>
              <div>Secure orders</div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-grid">
        <article className="feature-card">
          <h3>Smart browsing</h3>
          <p>Find the right item quickly with category filters and a simple product experience.</p>
        </article>
        <article className="feature-card">
          <h3>Seamless checkout</h3>
          <p>Enjoy a guided cart and checkout experience designed to keep purchases moving.</p>
        </article>
        <article className="feature-card">
          <h3>Order tracking</h3>
          <p>Stay on top of every order from confirmation through delivery and beyond.</p>
        </article>
      </section>
    </div>
  );
}
