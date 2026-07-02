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
        <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Products</a></li>
        <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Cart</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;