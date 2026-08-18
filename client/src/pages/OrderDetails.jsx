import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const fallbackProducts = [
  {
    _id: 'sample-1',
    title: 'Urban Running Sneakers',
    description: 'Lightweight everyday sneakers designed for commutes, fitness routines, and long city walks.',
    price: 1999,
    discount: 10,
    mainimg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    carousel: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200',
      'https://images.unsplash.com/photo-1528701800489-20c6d2c1d856?w=1200',
    ],
    category: 'Fashion',
    region: 'North',
    stock: 20,
    rating: 4.7,
    reviews: 1840,
    features: ['Breathable knit upper', 'Cushioned sole', 'All-day comfort', 'Lightweight build'],
  },
  {
    _id: 'sample-2',
    title: 'Classic Smart Watch',
    description: 'Elegant smartwatch with health tracking, Bluetooth calling, and a premium metallic finish.',
    price: 3499,
    discount: 15,
    mainimg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    carousel: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200',
      'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=1200',
    ],
    category: 'Electronics',
    region: 'South',
    stock: 12,
    rating: 4.8,
    reviews: 920,
    features: ['1.7-inch AMOLED display', 'Heart rate / sleep tracking', 'Water resistant', 'Bluetooth calling'],
  },
  {
    _id: 'sample-3',
    title: 'Noise Cancelling Headphones',
    description: 'High-quality wireless headphones for work calls, travel, and entertainment across long hours.',
    price: 2499,
    discount: 20,
    mainimg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    carousel: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200',
      'https://images.unsplash.com/photo-1512499617640-c2f999018b72?w=1200',
    ],
    category: 'Electronics',
    region: 'West',
    stock: 18,
    rating: 4.6,
    reviews: 1540,
    features: ['Active noise cancellation', '40-hour battery life', 'Fast charge support', 'Foldable design'],
  },
];

const getWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem('shopze-wishlist') || '[]');
  } catch {
    return [];
  }
};

export default function OrderDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [wishlist, setWishlist] = useState(getWishlist());

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) {
          throw new Error('Product fetch failed');
        }
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.mainimg || data.carousel?.[0] || '');
      } catch (error) {
        const fallback = fallbackProducts.find((item) => item._id === productId) || fallbackProducts[0];
        setProduct(fallback);
        setSelectedImage(fallback.mainimg || fallback.carousel?.[0] || '');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return fallbackProducts.filter((item) => item.category === product.category && item._id !== product._id).slice(0, 3);
  }, [product]);

  const toggleWishlist = () => {
    const next = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];
    setWishlist(next);
    localStorage.setItem('shopze-wishlist', JSON.stringify(next));
  };

  const addToCart = async () => {
    if (!product) return;

    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'guest', productId: product._id, quantity: 1, size: 'One Size' }),
      });
      navigate('/cart');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="page-loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="page-loading">Product not found.</div>;
  }

  const gallery = product.carousel?.length ? product.carousel : [product.mainimg];
  const priceAfterDiscount = Math.round(product.price * (1 - (product.discount || 0) / 100));

  return (
    <div className="product-detail-page">
      <div className="product-detail-layout">
        <div className="product-gallery">
          <div className="gallery-main">
            <img src={selectedImage || product.mainimg} alt={product.title} />
          </div>
          <div className="gallery-thumbs">
            {gallery.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                className={selectedImage === image ? 'thumb active' : 'thumb'}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt={`${product.title} view ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-info">
          <div className="product-badges">
            <span className="badge badge-dark">{product.category}</span>
            <span className="badge badge-light">{product.region || 'India'}</span>
            <button type="button" className={wishlist.includes(productId) ? 'wishlist-btn active' : 'wishlist-btn'} onClick={toggleWishlist}>
              {wishlist.includes(productId) ? '♥ Saved' : '♡ Save for later'}
            </button>
          </div>

          <h1>{product.title}</h1>

          <div className="rating-row">
            <span className="stars">★★★★★</span>
            <span>{product.rating || 4.7} rating</span>
            <span className="muted">({product.reviews || 1200} reviews)</span>
          </div>

          <div className="price-box">
            <div className="price-row">
              <span className="current-price">₹{priceAfterDiscount}</span>
              <span className="old-price">₹{product.price}</span>
            </div>
            <span className="discount-tag">Save {product.discount || 10}%</span>
          </div>

          <p className="description">{product.description}</p>

          <div className="info-list">
            {product.features?.map((feature) => (
              <div key={feature} className="info-item">✓ {feature}</div>
            ))}
          </div>

          <div className="delivery-box">
            <strong>Delivery</strong>
            <span>Free delivery across India • 2-5 days • COD available</span>
          </div>

          <div className="purchase-actions">
            <button className="primary-btn large" onClick={addToCart}>Add to Cart</button>
            <button className="secondary-btn large" onClick={() => navigate('/checkout')}>Buy Now</button>
          </div>
        </div>
      </div>

      <section className="review-panel">
        <div className="section-heading">
          <h2>Customer reviews</h2>
        </div>

        <div className="review-summary">
          <div className="review-score">
            <strong>4.8</strong>
            <span>★★★★★</span>
          </div>
          <div className="review-bars">
            {[90, 78, 56, 34, 22].map((value, index) => (
              <div key={index} className="review-bar-row">
                <span>{5 - index}</span>
                <div className="review-bar-track">
                  <div className="review-bar-fill" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="review-list">
          {[
            { author: 'Riya S.', text: 'Excellent quality and the delivery arrived ahead of schedule. Looks premium and feels worth the price.' },
            { author: 'Vikas M.', text: 'Very smooth ordering and great packaging. The product matched the photos and the support was helpful.' },
            { author: 'Megha P.', text: 'I love the finish and the fast checkout experience. This feels like a proper marketplace app.' },
          ].map((review) => (
            <div key={review.author} className="review-card">
              <div className="review-author">{review.author}</div>
              <div className="stars">★★★★★</div>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="related-section">
        <div className="section-heading">
          <h2>Customers also viewed</h2>
        </div>

        <div className="deal-grid">
          {relatedProducts.map((item) => (
            <article key={item._id} className="deal-card" onClick={() => navigate(`/product/${item._id}`)}>
              <div className="deal-image small">
                <img src={item.mainimg} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <div className="deal-pricing">
                <strong>₹{Math.round(item.price * (1 - (item.discount || 0) / 100))}</strong>
                <span>₹{item.price}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}