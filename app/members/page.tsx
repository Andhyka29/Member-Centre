'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

interface Member {
  id: string;
  nama: string;
  email: string;
  noWa?: string;
  alamat?: string;
  kota?: string;
  provinsi?: string;
  createdAt: Date;
}

export default function MembersPage() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/members?search=${encodeURIComponent(search)}`);
      if (!res.ok) throw new Error('Gagal mengambil data');
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error(error);
      alert('Gagal memuat data member');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [search]);

  const handleDelete = async (id: string, nama: string) => {
    if (!confirm(`Yakin ingin menghapus member "${nama}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/members/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchMembers();
      } else {
        alert('Gagal menghapus member');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    }
    setDeletingId(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-light text-white">Members</h1>
            <p className="text-gray-400 text-sm mt-1">{members.length} members</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center bg-white/5 border border-white/10 text-gray-300 px-4 py-2 rounded-xl hover:bg-white/10 transition"
            >
              Dashboard
            </button>
            <button
              onClick={() => router.push('/members/new')}
              className="flex items-center bg-white/5 border border-white/10 text-gray-300 px-4 py-2 rounded-xl hover:bg-white/10 transition"
            >
              <Plus size={16} />
              Add Member
            </button>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-gray-300 font-light text-sm">Name</th>
                <th className="px-6 py-4 text-left text-gray-300 font-light text-sm">Email</th>
                <th className="px-6 py-4 text-left text-gray-300 font-light text-sm">WhatsApp</th>
                <th className="px-6 py-4 text-left text-gray-300 font-light text-sm">City</th>
                <th className="px-6 py-4 text-left text-gray-300 font-light text-sm">Province</th>
                <th className="px-6 py-4 text-center text-gray-300 font-light text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">Loading...</td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">Tidak ada member yang tersedia</td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="border-t border-white/10">
                    <td className="px-6 py-4 text-white">{member.nama}</td>
                    <td className="px-6 py-4 text-gray-300">{member.email}</td>
                    <td className="px-6 py-4 text-gray-300">{member.noWa || '-'}</td>
                    <td className="px-6 py-4 text-gray-300">{member.kota || '-'}</td>
                    <td className="px-6 py-4 text-gray-300">{member.provinsi || '-'}</td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button
                        onClick={() => router.push(`/members/edit/${member.id}`)}
                        className="p-2 text-blue-400 hover:bg-white/10 rounded-lg transition"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id, member.nama)}
                        disabled={deletingId === member.id}
                        className="p-2 text-red-400 hover:bg-white/10 rounded-lg transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}