"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function loginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data.user));
            document.cookie = "isLoggedIn=true; path=/; max-age=86400";
            router.push('/dashboard');
        } else {
            setError(data.message || 'Yahh Login gagal');
        }

        setLoading(false);
    }


    return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-gray-950 p-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-8 shadow-2xl">
          <h1 className="text-2xl font-light text-center mb-1 text-white">Sign In</h1>
          <p className="text-center text-gray-400 text-xs mb-8">Welcome back to your account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition"
              required
            />

            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition"
              required
            />

            {error && <p className="text-red-400 text-xs text-center -mt-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <p className="text-center text-xs text-gray-500 pt-2">
              Don't have an account?{`&apos;`}
              <button onClick={() => router.push('/register')} className="text-blue-400 hover:text-blue-300 transition">
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}