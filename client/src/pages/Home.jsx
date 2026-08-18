import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const categories = [
    { title: 'Electronics', emoji: '📱', tag: 'Smart deals' },
    { title: 'Home Essentials', emoji: '🏠', tag: 'Everyday must-haves' },
    { title: 'Fashion', emoji: '👗', tag: 'Trending picks' },
    { title: 'Wellness', emoji: '🧘', tag: 'Live better' },
  ];

  const deals = [
    { name: 'Noise Pro Headphones', price: '₹2,499', oldPrice: '₹3,299', badge: 'Save 24%' },
    { name: 'Smart Air Purifier', price: '₹2,799', oldPrice: '₹3,499', badge: 'Prime deal' },
    { name: 'Urban Running Sneakers', price: '₹1,999', oldPrice: '₹2,499', badge: 'Top rated' },
    { name: 'Classic Smartwatch', price: '₹3,499', oldPrice: '₹4,199', badge: 'Hot pick' },
  ];

  const benefits = [
    'Free delivery over ₹499',
    'Secure payments with UPI, COD & cards',
    'Fast dispatch across India',
    'Live order tracking and support',
  ];

  return (
    <div className="home-page">
      <div className="promo-strip">Free delivery across 28+ states • Easy returns • Daily offers</div>

      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Amazon-style shopping, built for India</span>
          <h1>Shop smarter, faster and safer across the nation.</h1>
          <p>
            Discover premium products, daily deals, trusted brands and seamless delivery from metro cities to every corner of India. ShopEZ brings the convenience of a modern marketplace to your everyday life.
          </p>

          <div className="hero-actions">
            <button className="primary-btn" onClick={() => navigate('/products')}>
              Shop Now
            </button>
            <button className="secondary-btn" onClick={() => navigate('/login')}>
              Start Shopping
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <strong>28+</strong>
              <span>states covered</span>
            </div>
            <div className="stat-card">
              <strong>1M+</strong>
              <span>happy shoppers</span>
            </div>
            <div className="stat-card">
              <strong>2-day</strong>
              <span>delivery promise</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card">
            <span className="visual-badge">Today’s top picks</span>
            <h3>Everything you need, delivered with confidence.</h3>
            <p>
              From gadgets and lifestyle essentials to home upgrades and wellness products, shop curated categories that match modern needs across India.
            </p>

            <div className="pill-row">
              {['Fast shipping', 'Easy returns', 'Secure checkout', 'Live inventory'].map((item) => (
                <span key={item} className="pill">{item}</span>
              ))}
            </div>

            <div className="mini-cards">
              <div>Prime-style shipping</div>
              <div>Nationwide trust</div>
            </div>
          </div>
        </div>
      </section>

      <section className="category-section">
        <div className="section-heading">
          <h2>Shop by Department</h2>
          <button onClick={() => navigate('/products')}>Browse all</button>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <div key={category.title} className="category-card" onClick={() => navigate('/products')}>
              <div className="category-icon">{category.emoji}</div>
              <div>
                <h3>{category.title}</h3>
                <p>{category.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="deal-section">
        <div className="section-heading">
          <h2>Today’s Deals</h2>
          <button onClick={() => navigate('/products')}>See more</button>
        </div>

        <div className="deal-grid">
          {deals.map((deal) => (
            <article key={deal.name} className="deal-card">
              <span className="deal-badge">{deal.badge}</span>
              <div className="deal-image">✨</div>
              <h3>{deal.name}</h3>
              <div className="deal-pricing">
                <strong>{deal.price}</strong>
                <span>{deal.oldPrice}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="benefits-band">
        {benefits.map((item) => (
          <div key={item} className="benefit-item">{item}</div>
        ))}
      </section>

      <section className="feature-grid">
        <article className="feature-card">
          <h3>National delivery</h3>
          <p>Reach customers across India with region-aware inventory, fast logistics and transparent shipping.</p>
        </article>
        <article className="feature-card">
          <h3>Smart checkout</h3>
          <p>Offer COD, UPI and card payments with coupon validation and order totals that stay clear and accurate.</p>
        </article>
        <article className="feature-card">
          <h3>Trust and service</h3>
          <p>Build confidence through returns, support, product visibility and smooth account-based ordering.</p>
        </article>
      </section>
    </div>
  );
}
