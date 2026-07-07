import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const fallbackProducts = [
  {
    _id: 'sample-1',
    title: 'Trendy Sneakers',
    description: 'Comfortable and stylish sports shoes for daily wear.',
    price: 1999,
    discount: 10,
    mainimg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    category: 'Footwear',
    stock: 20,
  },
  {
    _id: 'sample-2',
    title: 'Classic Leather Watch',
    description: 'Elegant luxury watch with premium leather strap.',
    price: 3499,
    discount: 15,
    mainimg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    category: 'Watches',
    stock: 12,
  },
  {
    _id: 'sample-3',
    title: 'Wireless Headphones',
    description: 'High bass noise-canceling bluetooth headphones.',
    price: 2499,
    discount: 20,
    mainimg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    category: 'Electronics',
    stock: 18,
  },
  {
    _id: 'sample-4',
    title: 'Smart Fitness Watch',
    description: 'Fitness tracker and smartwatch with heart rate monitoring.',
    price: 2799,
    discount: 12,
    mainimg: 'https://images.unsplash.com/photo-1519669556870-c5ca7b6f9e5d?w=800',
    category: 'Watches',
    stock: 15,
  },
  {
    _id: 'sample-5',
    title: 'Leather Wallet',
    description: 'Premium leather wallet with multiple card slots.',
    price: 1299,
    discount: 5,
    mainimg: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800',
    category: 'Accessories',
    stock: 25,
  },
];

const categories = ['all', 'Footwear', 'Accessories', 'Electronics', 'Watches'];

const filterProducts = (items, search, category) => {
  return items.filter((product) => {
    const matchesCategory = category === 'all' || product.category.toLowerCase() === category.toLowerCase();
    const matchesSearch = search
      ? [product.title, product.description, product.category].some((value) =>
          value.toLowerCase().includes(search.toLowerCase())
        )
      : true;
    return matchesCategory && matchesSearch;
  });
};

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(fallbackProducts);
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
      if (!response.ok) {
        throw new Error('Server responded with error');
      }
      const data = await response.json();
      if (data.length) {
        setProducts(data);
      } else {
        setProducts(filterProducts(fallbackProducts, search, category));
      }
    } catch (fetchError) {
      console.error(fetchError);
      setProducts(filterProducts(fallbackProducts, search, category));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const groupedProducts = useMemo(() => {
    return products.reduce((acc, product) => {
      const key = product.category || 'Others';
      if (!acc[key]) acc[key] = [];
      acc[key].push(product);
      return acc;
    }, {});
  }, [products]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px', flexWrap: 'wrap', gap: '18px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#2f3542' }}>Product Catalogue</h2>
          <p style={{ color: '#6b7280' }}>Search products, browse categories, and explore the ShopEZ collection.</p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product title, description, or category"
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', minWidth: '240px' }}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '13px', color: '#6b7280' }}>{product.category}</span>
                      <span style={{ fontSize: '13px', color: product.stock > 0 ? '#16a34a' : '#dc2626' }}>
                        {product.stock > 0 ? 'In stock' : 'Out of stock'}
                      </span>
                    </div>
                    <h4 style={{ margin: '0 0 10px 0', color: '#111827' }}>{product.title}</h4>
                    <p style={{ color: '#6b7280', fontSize: '14px', flexGrow: 1, marginBottom: '16px' }}>{product.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                        style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        View details
                      </button>
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
