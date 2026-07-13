'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  Users,
  BookOpen,
  Star,
  Trash2,
  Eye,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);
  const [entries, setEntries] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [deletingEntryId, setDeletingEntryId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'entries'>('overview');

  // Guard: redirect non-admins
  useEffect(() => {
    if (!authLoading && user && user.role !== 'admin') {
      toast.error('Access denied. Admin privileges required.');
      router.push('/');
    }
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch('/api/admin/users');
      if (!res.ok) throw new Error('Failed to load users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      toast.error('Could not load users list.');
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchEntries = async () => {
    setLoadingEntries(true);
    try {
      const res = await fetch('/api/entries?limit=100');
      if (!res.ok) throw new Error('Failed to load entries');
      const data = await res.json();
      setEntries(data.entries);
    } catch (err) {
      toast.error('Could not load registry entries.');
    } finally {
      setLoadingEntries(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
      fetchEntries();
    }
  }, [user]);

  const handleDeleteUser = async (id: string, name: string) => {
    if (!confirm(`Delete user "${name}"? This will remove their account, entries, and reviews.`)) return;
    setDeletingUserId(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Failed to delete user.');
      } else {
        toast.success(`User "${name}" removed.`);
        setUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch {
      toast.error('Network error during user deletion.');
    } finally {
      setDeletingUserId(null);
    }
  };

  const handleDeleteEntry = async (id: string, title: string) => {
    if (!confirm(`Delete entry "${title}"?`)) return;
    setDeletingEntryId(id);
    try {
      const res = await fetch(`/api/entries/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Failed to delete entry.');
      } else {
        toast.success(`"${title}" deleted.`);
        setEntries((prev) => prev.filter((e) => e._id !== id));
      }
    } catch {
      toast.error('Network error during deletion.');
    } finally {
      setDeletingEntryId(null);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="h-10 w-10 border-2 border-[#6C5CE7] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user.role !== 'admin') return null;

  // Stats
  const totalUsers = users.length;
  const totalEntries = entries.length;
  const activeEntries = entries.filter((e) => e.status === 'Active').length;
  const avgRating =
    entries.length > 0
      ? (entries.reduce((sum, e) => sum + (e.rating || 0), 0) / entries.length).toFixed(1)
      : '0.0';

  const stats = [
    { label: 'Registered Users', value: totalUsers, icon: Users, color: 'text-[#6C5CE7]', bg: 'bg-[#6C5CE7]/10 border-[#6C5CE7]/20' },
    { label: 'Total Catalog Entries', value: totalEntries, icon: BookOpen, color: 'text-[#FFC947]', bg: 'bg-[#FFC947]/10 border-[#FFC947]/20' },
    { label: 'Active Missions/Objects', value: activeEntries, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Average Entry Rating', value: avgRating, icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  ];

  const tabs = [
    { key: 'overview', label: 'Overview', icon: TrendingUp },
    { key: 'users', label: `Users (${totalUsers})`, icon: Users },
    { key: 'entries', label: `Entries (${totalEntries})`, icon: BookOpen },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-16 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FFC947]/10 border border-[#FFC947]/20 text-xs font-bold text-[#FFC947]">
            <Shield className="h-3.5 w-3.5" />
            <span>Administrator Control Panel</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl text-white tracking-wide">
            Admin Dashboard
          </h1>
          <p className="text-sm text-[#94A3B8]">
            Full-spectrum moderation access for the Galaxy & Space Explorer registry.
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-[#111430]/60 border border-slate-800 rounded-2xl px-5 py-3">
          <img
            src={user.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=admin'}
            alt="Admin"
            className="h-9 w-9 rounded-full border border-[#FFC947]/40"
          />
          <div>
            <p className="text-sm font-bold text-white">{user.name}</p>
            <p className="text-[10px] text-[#FFC947] font-semibold uppercase tracking-wider">Administrator</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center space-x-2 px-5 py-3 text-sm font-semibold rounded-t-xl transition-all -mb-px border-b-2 ${
              activeTab === tab.key
                ? 'text-[#6C5CE7] border-[#6C5CE7] bg-[#6C5CE7]/5'
                : 'text-slate-400 border-transparent hover:text-white hover:bg-slate-900/30'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-10">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className={`bg-[#111430]/40 border rounded-2xl p-6 space-y-4 ${stat.bg}`}>
                <div className={`p-3 rounded-xl w-fit ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="font-display font-extrabold text-3xl text-white">{stat.value}</p>
                  <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Category Breakdown */}
          <div className="bg-[#111430]/40 border border-slate-800 rounded-3xl p-8 space-y-6">
            <h2 className="font-display font-bold text-white text-lg">Catalog Breakdown by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {['Mission', 'Planet', 'Star', 'Galaxy', 'Nebula', 'Astronaut'].map((cat) => {
                const count = entries.filter((e) => e.category === cat).length;
                const pct = entries.length > 0 ? Math.round((count / entries.length) * 100) : 0;
                return (
                  <div key={cat} className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 text-center space-y-2">
                    <p className="text-2xl font-display font-extrabold text-white">{count}</p>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{cat}</p>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-[#6C5CE7] h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-500">{pct}%</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Users Preview */}
          <div className="bg-[#111430]/40 border border-slate-800 rounded-3xl p-8 space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="font-display font-bold text-white text-lg">Recent Registrations</h2>
              <button onClick={() => setActiveTab('users')} className="text-xs font-semibold text-[#6C5CE7] hover:text-[#6C5CE7]/80">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {users.slice(0, 5).map((u) => (
                <div key={u._id} className="flex items-center justify-between py-3 border-b border-slate-800/40 last:border-0">
                  <div className="flex items-center space-x-3">
                    <img
                      src={u.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=placeholder'}
                      alt={u.name}
                      className="h-8 w-8 rounded-full border border-slate-700"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">{u.name}</p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${u.role === 'admin' ? 'text-[#FFC947] bg-[#FFC947]/10 border-[#FFC947]/20' : 'text-slate-300 bg-slate-700/30 border-slate-700'}`}>
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* USERS TAB */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          {loadingUsers ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-800/30 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="overflow-hidden bg-[#111430]/40 border border-slate-800 rounded-3xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">User</th>
                    <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-4 hidden sm:table-cell">Email</th>
                    <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-4">Role</th>
                    <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-4 hidden md:table-cell">Joined</th>
                    <th className="text-right text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-900/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={u.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=placeholder'}
                            alt={u.name}
                            className="h-9 w-9 rounded-full border border-slate-700 bg-slate-800"
                          />
                          <span className="font-semibold text-white text-sm truncate max-w-[120px]">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-400 hidden sm:table-cell">{u.email}</td>
                      <td className="px-4 py-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${u.role === 'admin' ? 'text-[#FFC947] bg-[#FFC947]/10 border-[#FFC947]/20' : 'text-slate-300 bg-slate-700/30 border-slate-700'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-400 hidden md:table-cell">
                        {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {u._id !== user.id ? (
                          <button
                            onClick={() => handleDeleteUser(u._id, u.name)}
                            disabled={deletingUserId === u._id}
                            className="p-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all disabled:opacity-40"
                            title="Delete user"
                          >
                            {deletingUserId === u._id ? (
                              <div className="h-4 w-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-600 italic px-2">You</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ENTRIES TAB */}
      {activeTab === 'entries' && (
        <div className="space-y-6">
          {loadingEntries ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-800/30 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="overflow-hidden bg-[#111430]/40 border border-slate-800 rounded-3xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Entry</th>
                    <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-4 hidden sm:table-cell">Category</th>
                    <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-4">Status</th>
                    <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-4 hidden md:table-cell">Rating</th>
                    <th className="text-right text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {entries.map((entry) => (
                    <tr key={entry._id} className="hover:bg-slate-900/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={entry.imageUrl || 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=60'}
                            alt={entry.title}
                            className="h-10 w-14 object-cover rounded-lg bg-slate-800 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-white text-xs truncate max-w-[160px]">{entry.title}</p>
                            <p className="text-[10px] text-slate-500 truncate max-w-[160px]">{entry.agency}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <span className="text-[10px] font-semibold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full">
                          {entry.category}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                          entry.status === 'Active' ? 'text-green-400 bg-green-500/10 border-green-500/20'
                          : entry.status === 'Planned' ? 'text-[#FFC947] bg-[#FFC947]/10 border-[#FFC947]/20'
                          : 'text-slate-300 bg-slate-700/30 border-slate-700'
                        }`}>
                          {entry.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <div className="flex items-center space-x-1">
                          <Star className={`h-3 w-3 ${entry.rating > 0 ? 'text-[#FFC947] fill-[#FFC947]' : 'text-slate-600'}`} />
                          <span className="text-xs text-slate-400">{entry.rating > 0 ? entry.rating.toFixed(1) : '—'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end items-center space-x-2">
                          <Link
                            href={`/explore/${entry._id}`}
                            className="p-2 rounded-lg text-[#6C5CE7] hover:bg-[#6C5CE7]/10 transition-all"
                            title="View entry"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteEntry(entry._id, entry.title)}
                            disabled={deletingEntryId === entry._id}
                            className="p-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all disabled:opacity-40"
                            title="Delete entry"
                          >
                            {deletingEntryId === entry._id ? (
                              <div className="h-4 w-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
