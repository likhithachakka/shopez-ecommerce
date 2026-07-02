import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import OrderDetails from './pages/OrderDetails';
import OrderConfirmation from './pages/OrderConfirmation';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        {/* ప్రతి పేజీ పైన Navbar కనిపిస్తుంది */}
        <Navbar /> 
        <main style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order/:productId" element={<OrderDetails />} />
            <Route path="/order-success" element={<OrderConfirmation />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;