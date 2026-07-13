'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Pencil, Trash2, PlusCircle, Star, Calendar, Compass, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function ManageEntriesPage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMyEntries = async () => {
    setLoading(true);
    try {
      // Admins see all; users see filtered by their own entries on the client side
      // We fetch all, then filter by createdBy on client since there's no user-specific endpoint yet
      const res = await fetch('/api/entries?limit=100');
      if (!res.ok) throw new Error('Failed to load entries');
      const data = await res.json();

      // Filter for current user's entries (unless admin)
      const filtered =
        user?.role === 'admin'
          ? data.entries
          : data.entries.filter(
              (e: any) =>
                e.createdBy?._id === user?.id || e.createdBy === user?.id
            );

      setEntries(filtered);
    } catch (err) {
      console.error(err);
      toast.error('Could not load your space entries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyEntries();
    }
  }, [user]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This action cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/entries/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Failed to delete entry.');
      } else {
        toast.success(`"${title}" removed from the registry.`);
        setEntries((prev) => prev.filter((e) => e._id !== id));
      }
    } catch (err) {
      toast.error('Network error during deletion.');
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'Active') return 'text-green-400 bg-green-500/10 border-green-500/20';
    if (status === 'Completed') return 'text-slate-300 bg-slate-500/10 border-slate-500/20';
    return 'text-[#FFC947] bg-[#FFC947]/10 border-[#FFC947]/20';
  };

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-10 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="space-y-2">
          <h1 className="font-display font-extrabold text-3xl text-white tracking-wide">
            {user?.role === 'admin' ? 'All Registry Entries' : 'My Space Entries'}
          </h1>
          <p className="text-sm text-[#94A3B8]">
            {user?.role === 'admin'
              ? 'Moderating all submitted space entries as Administrator.'
              : 'Manage and edit your logged discoveries and mission records.'}
          </p>
        </div>
        <Link
          href="/items/add"
          className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white text-sm font-bold px-6 py-3 rounded-xl flex items-center space-x-2 transition-all hover:shadow-[0_0_15px_rgba(108,92,231,0.35)] active:scale-95 shrink-0"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add New Entry</span>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-[#111430]/30 border border-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="py-24 text-center bg-[#111430]/20 border border-dashed border-slate-800 rounded-3xl space-y-5">
          <ShieldAlert className="h-12 w-12 text-slate-600 mx-auto" />
          <h3 className="font-display font-bold text-xl text-white">No Entries Logged Yet</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            You haven't submitted any space entries to the registry. Start contributing today!
          </p>
          <Link
            href="/items/add"
            className="inline-block bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            Log Your First Entry
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden bg-[#111430]/40 border border-slate-800 rounded-3xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Entry</th>
                  <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-4">Category</th>
                  <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-4">Status</th>
                  <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-4">Rating</th>
                  <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-4">Date</th>
                  <th className="text-right text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {entries.map((entry) => (
                  <tr key={entry._id} className="hover:bg-slate-900/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={entry.imageUrl || 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=80'}
                          alt={entry.title}
                          className="h-12 w-16 object-cover rounded-lg bg-slate-800 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-white truncate group-hover:text-[#6C5CE7] transition-colors max-w-[200px]">
                            {entry.title}
                          </p>
                          <p className="text-xs text-slate-500 truncate max-w-[200px] mt-0.5">
                            {entry.agency}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-semibold text-slate-300 bg-slate-800/60 px-3 py-1 rounded-full border border-slate-700/40">
                        {entry.category}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(entry.status)}`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-1">
                        <Star className={`h-3.5 w-3.5 ${entry.rating > 0 ? 'text-[#FFC947] fill-[#FFC947]' : 'text-slate-600'}`} />
                        <span className="text-xs text-slate-300 font-medium">
                          {entry.rating > 0 ? entry.rating.toFixed(1) : '—'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-400">
                      {new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end items-center space-x-3">
                        <Link
                          href={`/explore/${entry._id}`}
                          className="text-xs font-semibold text-[#6C5CE7] hover:text-[#6C5CE7]/80 transition-colors"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(entry._id, entry.title)}
                          disabled={deletingId === entry._id}
                          className="p-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all disabled:opacity-40"
                          title="Delete entry"
                        >
                          {deletingId === entry._id ? (
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

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {entries.map((entry) => (
              <div
                key={entry._id}
                className="bg-[#111430]/40 border border-slate-800 rounded-2xl p-5 space-y-4"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={entry.imageUrl || 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=80'}
                    alt={entry.title}
                    className="h-14 w-20 object-cover rounded-xl bg-slate-800 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-white text-sm truncate">{entry.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{entry.agency}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${getStatusColor(entry.status)}`}>
                        {entry.status}
                      </span>
                      <span className="text-[10px] text-slate-400 bg-slate-800/60 px-2.5 py-0.5 rounded-full">
                        {entry.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-800/40">
                  <div className="flex items-center space-x-1 text-xs text-slate-400">
                    <Star className={`h-3 w-3 ${entry.rating > 0 ? 'text-[#FFC947] fill-[#FFC947]' : 'text-slate-600'}`} />
                    <span>{entry.rating > 0 ? entry.rating.toFixed(1) : '—'}</span>
                    <span className="mx-1">·</span>
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(entry.date).getFullYear()}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/explore/${entry._id}`}
                      className="text-xs font-semibold text-[#6C5CE7] hover:text-[#6C5CE7]/80"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(entry._id, entry.title)}
                      disabled={deletingId === entry._id}
                      className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all disabled:opacity-40"
                    >
                      {deletingId === entry._id ? (
                        <div className="h-3.5 w-3.5 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 text-center">
            Showing {entries.length} {entries.length === 1 ? 'entry' : 'entries'} in your registry
          </p>
        </>
      )}
    </div>
  );
}
