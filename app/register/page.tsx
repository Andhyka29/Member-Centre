"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (form.password !== form.confirmPassword) {
            alert('Password dan Konfirmasi Password tidak sama');
            return;
        }

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            alert('Yeey Register berhasil! Silahkan login');
            router.push('/login');
        } else {
            const data = await response.json();
            alert(data.message || 'Yahh Register gagal');
        }

        setLoading(false);
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950 p-4">
      <div className="w-full max-w-sm">
        <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-8 shadow-2xl">
          <h1 className="text-2xl font-light text-center mb-1 text-white">Create Account</h1>
          <p className="text-center text-gray-400 text-xs mb-8">Join us today</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition"
            />

            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Sign Up'}
            </button>

            <p className="text-center text-xs text-gray-500 pt-2">
              Already have an account?{' '}
              <button onClick={() => router.push('/')} className="text-blue-400 hover:text-blue-300 transition">
                Sign In
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}