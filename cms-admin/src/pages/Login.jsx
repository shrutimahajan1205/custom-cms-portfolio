import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  Loader2
} from 'lucide-react';

import {
  api,
  setAuthToken,
  setCurrentUser
} from '../services/api';

import Register from './Register';

export default function Login({ onLoginSuccess }) {
  const [showRegister, setShowRegister] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const res = await api.login({
        username: username.trim(),
        password: password
      });

      setAuthToken(res.token);
      setCurrentUser(res.user);

      onLoginSuccess(res.user);

    } catch (err) {
      setError(
        err.message || 'Invalid username/email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  // AFTER REGISTRATION
  const handleRegisterSuccess = (registeredUsername) => {
    setShowRegister(false);
    setUsername(registeredUsername || '');
    setPassword('');
    setError('');
  };

  // SHOW REGISTRATION PAGE
  if (showRegister) {
    return (
      <Register
        onRegisterSuccess={handleRegisterSuccess}
        onBackToLogin={() => {
          setShowRegister(false);
          setError('');
        }}
      />
    );
  }

  // LOGIN PAGE
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative z-10">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-sky-500/20 mb-3">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold text-white tracking-tight">
            Custom CMS Admin
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Sign in to manage your portfolio content
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">

            <AlertCircle className="w-4 h-4 flex-shrink-0" />

            <span>{error}</span>

          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username / Email */}
          <div>

            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Username or Email
            </label>

            <div className="relative">

              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
                placeholder="Enter username or email"
              />

            </div>

          </div>

          {/* Password */}
          <div>

            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>

            <div className="relative">

              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
                placeholder="Enter password"
              />

            </div>

          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold rounded-lg text-sm flex items-center justify-center gap-2 transition disabled:opacity-50 mt-2 shadow-lg shadow-sky-500/20"
          >

            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}

          </button>

        </form>

        {/* CREATE ACCOUNT */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">

          <p className="text-xs text-slate-400">
            Don't have an account?
          </p>

          <button
            type="button"
            onClick={() => {
              setShowRegister(true);
              setError('');
            }}
            className="mt-2 text-sky-400 hover:text-sky-300 font-medium text-sm cursor-pointer"
          >
            Create Account
          </button>

        </div>

      </div>

    </div>
  );
}