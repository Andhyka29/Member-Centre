'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Users, UserPlus, Search } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil data user dari localStorage atau cookie
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Jika tidak ada data, redirect ke login
      router.push('/');
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    if (confirm('Yakin ingin keluar?')) {
      document.cookie = "isLoggedIn=; path=/; max-age=0";
      localStorage.removeItem('user');
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-950">
      <nav className="backdrop-blur-2xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Users className="text-blue-400" size={24} />
            </div>
            <h1 className="text-xl font-light text-white">Member Center</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-light text-white text-sm">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 px-4 py-2 rounded-xl transition border border-white/10"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-light text-white">
            Welcome, {user?.name?.split(' ')[0]}
          </h2>
          <p className="text-gray-400 mt-1 text-sm">Kelola Member mu dengan efisien</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <button
            onClick={() => router.push('/members')}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition group"
          >
            <Users size={32} className="text-blue-400 mb-4 group-hover:scale-110 transition" />
            <h3 className="text-lg font-light text-white">View Members</h3>
            <p className="text-gray-400 text-sm mt-1">Browse all member data</p>
          </button>

          <button
            onClick={() => router.push('/members/new')}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition group"
          >
            <UserPlus size={32} className="text-blue-400 mb-4 group-hover:scale-110 transition" />
            <h3 className="text-lg font-light text-white">Add Member</h3>
            <p className="text-gray-400 text-sm mt-1">Create new member entry</p>
          </button>
        </div>
      </div>
    </div>
  )
}