import React, { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const defaultForm = {
  fullName: '',
  username: '',
  email: '',
  password: '',
  region: 'North',
  usertype: 'customer',
};

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = useMemo(() => location.pathname === '/signup', [location.pathname]);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
      const payload = isSignup ? form : { email: form.email, password: form.password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Authentication failed');
      }

      localStorage.setItem('shopezUser', JSON.stringify(result.user));
      navigate('/products');
    } catch (err) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto', background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)' }}>
      <h2 style={{ marginBottom: '8px', color: '#111827' }}>{isSignup ? 'Create account' : 'Welcome back'}</h2>
      <p style={{ marginBottom: '20px', color: '#64748b' }}>
        {isSignup ? 'Register for nationwide shopping on ShopEZ.' : 'Sign in to continue shopping across India.'}
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
        {isSignup && (
          <>
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full name" style={inputStyle} />
            <input name="username" value={form.username} onChange={handleChange} placeholder="Username" style={inputStyle} />
          </>
        )}

        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email address" style={inputStyle} />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" style={inputStyle} />

        {isSignup && (
          <>
            <select name="region" value={form.region} onChange={handleChange} style={inputStyle}>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="North East">North East</option>
              <option value="Central">Central</option>
            </select>
            <select name="usertype" value={form.usertype} onChange={handleChange} style={inputStyle}>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </>
        )}

        {error && <div style={{ color: '#b91c1c', fontWeight: 600 }}>{error}</div>}

        <button type="submit" disabled={loading} style={{ background: '#2563eb', color: 'white', border: 'none', padding: '14px 18px', borderRadius: '12px', fontWeight: 700 }}>
          {loading ? 'Please wait...' : isSignup ? 'Create account' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: '18px', color: '#475569' }}>
        {isSignup ? 'Already have an account?' : 'Need an account?'}{' '}
        <button type="button" onClick={() => navigate(isSignup ? '/login' : '/signup')} style={{ background: 'transparent', border: 'none', color: '#2563eb', fontWeight: 700, cursor: 'pointer' }}>
          {isSignup ? 'Login' : 'Sign up'}
        </button>
      </p>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '12px',
  border: '1px solid #d1d5db',
  fontSize: '1rem',
};
