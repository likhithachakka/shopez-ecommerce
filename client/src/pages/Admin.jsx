import React, { useEffect, useState } from 'react';

const emptyForm = {
  title: '',
  description: '',
  category: 'Fashion',
  region: 'North',
  price: '',
  discount: '0',
  stock: '10',
  mainimg: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800',
};

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);

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

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: form.title,
        description: form.description,
        category: form.category,
        region: form.region,
        price: Number(form.price),
        discount: Number(form.discount),
        stock: Number(form.stock),
        mainimg: form.mainimg,
        carousel: [form.mainimg],
        sizes: ['One Size'],
        gender: 'Unisex',
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setForm(emptyForm);
        fetchProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <div>
        <h2 style={{ color: '#2f3542' }}>Admin Inventory Management</h2>
        <p style={{ color: '#64748b' }}>Add new region-specific products and manage the nationwide catalog.</p>
      </div>

      <form onSubmit={handleAddProduct} style={{ background: 'white', padding: '24px', borderRadius: '18px', boxShadow: '0 15px 30px rgba(15,23,42,0.06)', display: 'grid', gap: '14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Product title" style={fieldStyle} />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" style={fieldStyle} />
          <input name="discount" value={form.discount} onChange={handleChange} placeholder="Discount %" type="number" style={fieldStyle} />
          <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" style={fieldStyle} />
        </div>
        <input name="mainimg" value={form.mainimg} onChange={handleChange} placeholder="Image URL" style={fieldStyle} />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Product description" rows="4" style={{ ...fieldStyle, resize: 'vertical' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <select name="category" value={form.category} onChange={handleChange} style={fieldStyle}>
            <option value="Fashion">Fashion</option>
            <option value="Electronics">Electronics</option>
            <option value="Home Essentials">Home Essentials</option>
            <option value="Wellness">Wellness</option>
          </select>
          <select name="region" value={form.region} onChange={handleChange} style={fieldStyle}>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North East">North East</option>
            <option value="Central">Central</option>
          </select>
        </div>
        <button type="submit" style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: '12px', padding: '12px 18px', fontWeight: 700, cursor: 'pointer' }}>
          Add Product
        </button>
      </form>

      {loading ? (
        <p>Loading inventory...</p>
      ) : (
        <div style={{ display: 'grid', gap: '18px' }}>
          {products.map((product) => (
            <div key={product._id} style={{ background: 'white', padding: '18px', borderRadius: '16px', boxShadow: '0 8px 25px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <div>
                  <h3 style={{ margin: 0 }}>{product.title}</h3>
                  <p style={{ margin: '6px 0 0 0', color: '#6b7280' }}>{product.category} · {product.region}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '700', color: '#111827' }}>₹{product.price}</div>
                  <div style={{ color: '#64748b' }}>Stock: {product.stock}</div>
                </div>
              </div>
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => handleDeleteProduct(product._id)} style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '10px', padding: '10px 16px', cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const fieldStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '12px',
  border: '1px solid #d1d5db',
  fontSize: '1rem',
};
