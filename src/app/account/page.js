"use client";

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../AuthContext';

export default function AccountPage() {
  const { user, login, logout } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin 
      ? JSON.stringify({ email: formData.email, password: formData.password })
      : JSON.stringify({ username: formData.name, email: formData.email, password: formData.password, role: 'customer' });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (isLogin) {
          const userData = { id: data.userId, name: data.username, role: data.role };
          login(userData, data.token);
      } else {
        // After registration, prompt user to log in
        setIsLogin(true);
        setError('Registration successful! Please log in.');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <>
        <Header activePage="account" />
        <main className="pt-32 pb-24 px-8 md:px-12 max-w-6xl mx-auto">
          <section className="text-center py-24">
            <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter text-on-surface mb-6">
              Welcome, {user.name}!
            </h1>
            <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-lg mb-8">
              You are logged in. You can now manage your builds, track orders, and update your preferences.
            </p>
            <button
              onClick={logout}
              className="bg-primary text-on-primary font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Logout
            </button>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header activePage="account" />
      <main className="pt-32 pb-24 px-8 md:px-12 max-w-6xl mx-auto">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-headline font-bold text-center mb-4">{isLogin ? 'Login' : 'Sign Up'}</h1>
          <form onSubmit={handleAuth}>
            <div className="space-y-6">
              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-surface-container-high rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-surface-container-high rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-surface-container-high rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition-colors mt-8"
            >
              {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>
          <div className="text-center mt-6">
            <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
