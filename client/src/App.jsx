import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import OrderDetails from './pages/OrderDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import OrderConfirmation from './pages/OrderConfirmation';
import AuthPage from './pages/AuthPage';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('/api/cart?userId=guest');
        const data = await response.json();
        setCartItems(Array.isArray(data) ? data : []);
        setCartCount(Array.isArray(data) ? data.reduce((sum, item) => sum + (item.quantity || 0), 0) : 0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, []);

  const refreshCart = async () => {
    try {
      const response = await fetch('/api/cart?userId=guest');
      const data = await response.json();
      setCartItems(Array.isArray(data) ? data : []);
      setCartCount(Array.isArray(data) ? data.reduce((sum, item) => sum + (item.quantity || 0), 0) : 0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/products" element={<Products onCartRefresh={refreshCart} />} />
            <Route path="/product/:productId" element={<OrderDetails onCartRefresh={refreshCart} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/order-success" element={<OrderConfirmation />} />
          </Routes>
        </main>

        <aside className={cartOpen ? 'mini-cart-drawer open' : 'mini-cart-drawer'}>
          <div className="mini-cart-header">
            <h3>Your cart</h3>
            <button type="button" onClick={() => setCartOpen(false)}>Close</button>
          </div>

          <div className="mini-cart-body">
            {cartItems.length === 0 ? (
              <p className="empty-state">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item._id} className="mini-cart-item">
                  <img src={item.mainimg} alt={item.title} />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.quantity} item(s)</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mini-cart-footer">
            <button type="button" className="secondary-btn" onClick={() => setCartOpen(false)}>Continue shopping</button>
            <button type="button" className="primary-btn" onClick={() => { setCartOpen(false); window.location.href = '/checkout'; }}>Checkout</button>
          </div>
        </aside>
      </div>
    </Router>
  );
}

export default App;