'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewMemberPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        nama: '',
        email: '',
        noWa: '',
        alamat: '',
        kota: '',
        provinsi: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/members', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                alert('Member berhasil ditambahkan!');
                router.push('/members');
            } else {
                alert(data.message || 'Gagal menambahkan member');
            }
        } catch (error) {
            alert('Terjadi kesalahan saat menyimpan');
        }

        setLoading(false);
    };

    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-light text-white mb-8">Add New Member</h1>

        <form onSubmit={handleSubmit} className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-8 space-y-5">
          <div>
            <input
              type="text"
              required
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
            />
          </div>

          <div>
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="WhatsApp Number"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition"
              value={form.noWa}
              onChange={(e) => setForm({ ...form, noWa: e.target.value })}
            />
          </div>

          <div>
            <textarea
              rows={3}
              placeholder="Address"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition resize-none"
              value={form.alamat}
              onChange={(e) => setForm({ ...form, alamat: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition"
              value={form.kota}
              onChange={(e) => setForm({ ...form, kota: e.target.value })}
            />
            <input
              type="text"
              placeholder="Province"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition"
              value={form.provinsi}
              onChange={(e) => setForm({ ...form, provinsi: e.target.value })}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push('/members')}
              className="flex-1 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}