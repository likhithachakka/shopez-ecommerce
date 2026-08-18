import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount = 0, onCartClick }) => {
  return (
    <nav className="amazon-nav">
      <div className="nav-top">
        <Link to="/" className="brand-mark">
          <span className="brand-logo">ShopEZ</span>
        </Link>

        <div className="nav-location">
          <span>Deliver to</span>
          <strong>India</strong>
        </div>

        <div className="nav-search">
          <select className="search-select">
            <option>All</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home</option>
          </select>
          <input type="text" placeholder="Search products, brands and more" />
          <button type="button">Search</button>
        </div>

        <div className="nav-actions">
          <Link to="/login">Sign in</Link>
          <Link to="/orders">Returns</Link>
          <button type="button" className="cart-link" onClick={onCartClick}>Cart ({cartCount})</button>
        </div>
      </div>

      <div className="nav-bottom">
        <Link to="/products">All Products</Link>
        <Link to="/products">Best Sellers</Link>
        <Link to="/products">Mobiles</Link>
        <Link to="/products">Fashion</Link>
        <Link to="/products">Electronics</Link>
        <Link to="/products">Home</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;