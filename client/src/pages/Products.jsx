import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem('shopze-wishlist') || '[]');
  } catch {
    return [];
  }
};

const fallbackProducts = [
  {
    _id: 'sample-1',
    title: 'Urban Running Sneakers',
    description: 'Lightweight everyday sneakers designed for commutes, fitness routines, and long city walks.',
    price: 1999,
    discount: 10,
    mainimg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    category: 'Fashion',
    region: 'North',
    stock: 20,
  },
  {
    _id: 'sample-2',
    title: 'Classic Smart Watch',
    description: 'Elegant smartwatch with health tracking, Bluetooth calling, and a premium metallic finish.',
    price: 3499,
    discount: 15,
    mainimg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    category: 'Electronics',
    region: 'South',
    stock: 12,
  },
  {
    _id: 'sample-3',
    title: 'Noise Cancelling Headphones',
    description: 'High-quality wireless headphones for work calls, travel, and entertainment across long hours.',
    price: 2499,
    discount: 20,
    mainimg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    category: 'Electronics',
    region: 'West',
    stock: 18,
  },
  {
    _id: 'sample-4',
    title: 'Smart Air Purifier',
    description: 'Compact purifier for home and office spaces, helping maintain cleaner indoor air daily.',
    price: 2799,
    discount: 12,
    mainimg: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
    category: 'Home Essentials',
    region: 'Central',
    stock: 15,
  },
  {
    _id: 'sample-5',
    title: 'Premium Leather Wallet',
    description: 'Minimal stainless card holder built for daily carry and professional styling.',
    price: 1299,
    discount: 5,
    mainimg: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800',
    category: 'Fashion',
    region: 'East',
    stock: 25,
  },
  {
    _id: 'sample-6',
    title: 'Wellness Smart Band',
    description: 'Fitness tracker for sleep, heart rate, and daily activity with a comfortable all-day fit.',
    price: 1699,
    discount: 18,
    mainimg: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800',
    category: 'Wellness',
    region: 'North East',
    stock: 30,
  },
];

const categories = ['all', 'Fashion', 'Electronics', 'Home Essentials', 'Wellness'];
const regions = ['all', 'North', 'South', 'East', 'West', 'North East', 'Central'];

const filterProducts = (items, search, category, region) => {
  return items.filter((product) => {
    const matchesCategory = category === 'all' || product.category.toLowerCase() === category.toLowerCase();
    const matchesRegion = region === 'all' || product.region === region;
    const matchesSearch = search
      ? [product.title, product.description, product.category, product.region].some((value) =>
          value.toLowerCase().includes(search.toLowerCase())
        )
      : true;
    return matchesCategory && matchesRegion && matchesSearch;
  });
};

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(fallbackProducts);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [region, setRegion] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState(getWishlist());
  const [loading, setLoading] = useState(false);

  const toggleWishlist = (productId) => {
    const next = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];
    setWishlist(next);
    localStorage.setItem('shopze-wishlist', JSON.stringify(next));
  };

  const addToCart = async (product) => {
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

  const fetchProducts = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category !== 'all') params.set('category', category);
    if (region !== 'all') params.set('region', region);

    try {
      const response = await fetch(`/api/products?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Server responded with error');
      }
      const data = await response.json();
      if (data.length) {
        setProducts(data);
      } else {
        setProducts(filterProducts(fallbackProducts, search, category, region));
      }
    } catch (fetchError) {
      console.error(fetchError);
      setProducts(filterProducts(fallbackProducts, search, category, region));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, region]);

  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortBy === 'price-low') return list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') return list.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') return list.sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
    return list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
  }, [products, sortBy]);

  const groupedProducts = useMemo(() => {
    return sortedProducts.reduce((acc, product) => {
      const key = product.category || 'Others';
      if (!acc[key]) acc[key] = [];
      acc[key].push(product);
      return acc;
    }, {});
  }, [sortedProducts]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px', flexWrap: 'wrap', gap: '18px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#2f3542' }}>Nationwide Product Catalogue</h2>
          <p style={{ color: '#6b7280' }}>Explore trusted products available across India with fast delivery and nationwide availability.</p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products across the country"
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', minWidth: '240px' }}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>
          <select value={region} onChange={(e) => setRegion(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
            {regions.map((item) => (
              <option key={item} value={item}>{item === 'all' ? 'All Regions' : item}</option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : Object.keys(groupedProducts).length ? (
        Object.entries(groupedProducts).map(([categoryName, items]) => (
          <div key={categoryName} style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, color: '#111827' }}>{categoryName}</h3>
              <span style={{ color: '#6b7280' }}>{items.length} item{items.length !== 1 ? 's' : ''}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {items.map((product) => (
                <div key={product._id} style={{ backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 18px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
                  <img src={product.mainimg} alt={product.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                  <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '13px', color: '#6b7280' }}>{product.category}</span>
                      <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 700 }}>{product.region || 'National'}</span>
                      <span style={{ fontSize: '13px', color: product.stock > 0 ? '#16a34a' : '#dc2626' }}>
                        {product.stock > 0 ? 'In stock' : 'Out of stock'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ fontSize: '13px', color: '#f59e0b' }}>★★★★★ <span style={{ color: '#64748b' }}>{product.rating || 4.7}</span></div>
                      <button type="button" className={wishlist.includes(product._id) ? 'wishlist-btn active' : 'wishlist-btn'} onClick={() => toggleWishlist(product._id)}>
                        {wishlist.includes(product._id) ? '♥ Saved' : '♡ Save'}
                      </button>
                    </div>
                    <h4 style={{ margin: '0 0 10px 0', color: '#111827' }}>{product.title}</h4>
                    <p style={{ color: '#6b7280', fontSize: '14px', flexGrow: 1, marginBottom: '16px' }}>{product.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
                      <div>
                        <span style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>₹{Math.round(product.price * (1 - (product.discount || 0) / 100))}</span>
                        {product.discount > 0 && (
                          <span style={{ marginLeft: '10px', color: '#ef4444', fontSize: '14px' }}>
                            {product.discount}% off
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => navigate(`/product/${product._id}`)}
                          style={{ backgroundColor: '#e2e8f0', color: '#0f172a', border: 'none', padding: '10px 14px', borderRadius: '8px', cursor: 'pointer' }}
                        >
                          View
                        </button>
                        <button
                          onClick={() => addToCart(product)}
                          style={{ backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '10px 14px', borderRadius: '8px', cursor: 'pointer' }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: '#475569' }}>No products match your search. Try a different keyword or select another category.</p>
      )}
    </div>
  );
}
