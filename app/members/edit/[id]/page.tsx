'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Member {
    id: string;
    nama: string;
    email: string;
    noWa?: string;
    alamat?: string;
    kota?: string;
    provinsi?: string;
}

export default function EditMemberPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [member, setMember] = useState<Member | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchMember();
    }, []);

    const fetchMember = async () => {
        const res = await fetch(`/api/members/${params.id}`);
        const data = await res.json();
        setMember(data);
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!member) return;

        setSaving(true);
        const res = await fetch(`/api/members/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
        });

        if (res.ok) {
        alert('Data member berhasil diupdate!');
        router.push('/members');
        } else {
        alert('Gagal mengupdate data');
        }
        setSaving(false);
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;
    if (!member) return <div className="p-10 text-center">Member tidak ditemukan</div>;

    return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-950 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-light text-white mb-8">Edit Member</h1>

        <form onSubmit={handleSubmit} className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-8 space-y-5">
          <input
            type="text"
            value={member.nama || ''}
            required
            placeholder="Full Name"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition"
            onChange={(e) => setMember({ ...member, nama: e.target.value })}
          />

          <input
            type="email"
            value={member.email || ''}
            required
            placeholder="Email"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition"
            onChange={(e) => setMember({ ...member, email: e.target.value })}
          />

          <input
            type="text"
            value={member.noWa || ''}
            placeholder="WhatsApp Number"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition"
            onChange={(e) => setMember({ ...member, noWa: e.target.value })}
          />

          <textarea
            rows={3}
            placeholder="Address"
            value={member.alamat || ''}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition resize-none"
            onChange={(e) => setMember({ ...member, alamat: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              value={member.kota || ''}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition"
              onChange={(e) => setMember({ ...member, kota: e.target.value })}
            />
            <input
              type="text"
              placeholder="Province"
              value={member.provinsi || ''}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition"
              onChange={(e) => setMember({ ...member, provinsi: e.target.value })}
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
              disabled={saving}
              className="flex-1 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}