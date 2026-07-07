import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#1a1a1a',
      color: 'white',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    }}>
      <div className="logo">
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>
          ShopEZ 🛍️
        </Link>
      </div>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', margin: 0, padding: 0 }}>
        <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link></li>
        <li><Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>Cart</Link></li>
        <li><Link to="/orders" style={{ color: 'white', textDecoration: 'none' }}>Orders</Link></li>
        <li><Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Admin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;