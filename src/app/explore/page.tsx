'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, RotateCcw, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { SpaceCard } from '@/components/ui/SpaceCard';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import toast from 'react-hot-toast';

function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>(searchParams.get('search') || '');
  const [category, setCategory] = useState<string>(searchParams.get('category') || '');
  const [status, setStatus] = useState<string>(searchParams.get('status') || '');
  const [sort, setSort] = useState<string>(searchParams.get('sort') || 'newest');
  const [page, setPage] = useState<number>(parseInt(searchParams.get('page') || '1', 10));
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalEntries, setTotalEntries] = useState<number>(0);

  const limit = 8;

  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory !== null) {
      setCategory(urlCategory);
      setPage(1);
    }
  }, [searchParams]);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      if (category) query.append('category', category);
      if (status) query.append('status', status);
      if (sort) query.append('sort', sort);
      query.append('page', page.toString());
      query.append('limit', limit.toString());

      const newUrl = `/explore?${query.toString()}`;
      window.history.pushState({ path: newUrl }, '', newUrl);

      const res = await fetch(`/api/entries?${query.toString()}`);
      if (!res.ok) {
        throw new Error('Failed to load space entries');
      }

      const data = await res.json();
      setEntries(data.entries);
      setTotalPages(data.pagination.totalPages);
      setTotalEntries(data.pagination.total);
    } catch (error) {
      console.error('Error loading catalog:', error);
      toast.error('Could not load space entries. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [category, status, sort, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchEntries();
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('');
    setStatus('');
    setSort('newest');
    setPage(1);
    router.push('/explore');
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const categories = ['Mission', 'Planet', 'Star', 'Galaxy', 'Nebula', 'Astronaut'];
  const statuses = ['Active', 'Completed', 'Planned'];

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-12">
      <div className="space-y-4">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-wide">
          Cosmic Registry
        </h1>
        <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
          Search the database for specific planets, stars, historic flights, and spacecraft. Use categories and sorting tools below to narrow your flight paths.
        </p>
      </div>

      <div className="bg-[#111430]/40 border border-slate-800 p-6 rounded-3xl space-y-6">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search by title, features, description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#0B0E23]/60 border border-slate-850 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:border-[#6C5CE7] transition-all"
            />
          </div>
          <button
            type="submit"
            className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white font-semibold px-6 py-3 rounded-xl text-sm flex items-center justify-center space-x-2 shrink-0 transition-transform active:scale-95"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>
          <button
            type="button"
            onClick={handleResetFilters}
            className="border border-slate-700 hover:border-slate-500 hover:bg-slate-800/30 text-slate-300 font-semibold px-6 py-3 rounded-xl text-sm flex items-center justify-center space-x-2 shrink-0 transition-transform active:scale-95"
            title="Reset Filters"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="md:hidden lg:inline">Reset</span>
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800/40">
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="bg-[#0B0E23]/60 border border-slate-850 text-slate-300 py-2.5 px-3 rounded-xl text-sm outline-none focus:border-[#6C5CE7]"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Status</label>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="bg-[#0B0E23]/60 border border-slate-850 text-slate-300 py-2.5 px-3 rounded-xl text-sm outline-none focus:border-[#6C5CE7]"
            >
              <option value="">All Statuses</option>
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Sort By</label>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="bg-[#0B0E23]/60 border border-slate-850 text-slate-300 py-2.5 px-3 rounded-xl text-sm outline-none focus:border-[#6C5CE7]"
            >
              <option value="newest">Newest Additions</option>
              <option value="rating">Highest Reviews</option>
              <option value="distance-asc">Distance (Near to Far)</option>
              <option value="distance-desc">Distance (Far to Near)</option>
            </select>
          </div>

          <div className="flex items-end justify-start sm:justify-end text-xs text-slate-400 pb-2">
            <span>
              Showing {entries.length} of {totalEntries} catalog items
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : entries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {entries.map((entry) => (
            <SpaceCard key={entry._id} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#111430]/20 border border-slate-800 rounded-3xl space-y-4">
          <SlidersHorizontal className="h-12 w-12 text-slate-600 mx-auto" />
          <h3 className="font-display font-bold text-xl text-white">No Objects Match Your Coordinates</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            Try adjusting your search queries, clearing category filters, or resetting sorting selectors.
          </p>
          <button
            onClick={handleResetFilters}
            className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white font-semibold text-xs px-5 py-2.5 rounded-full mt-2"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-6">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="p-2.5 rounded-xl border border-slate-800 bg-[#111430]/40 text-slate-300 hover:border-[#6C5CE7] hover:text-white transition-colors disabled:opacity-30 disabled:hover:border-slate-800"
            title="Previous Page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`h-10 w-10 rounded-xl text-sm font-semibold transition-all ${
                  page === pageNum
                    ? 'bg-[#6C5CE7] text-white shadow-[0_0_15px_rgba(108,92,231,0.3)]'
                    : 'border border-slate-800 bg-[#111430]/40 text-slate-400 hover:border-[#6C5CE7] hover:text-white'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="p-2.5 rounded-xl border border-slate-800 bg-[#111430]/40 text-slate-300 hover:border-[#6C5CE7] hover:text-white transition-colors disabled:opacity-30 disabled:hover:border-slate-800"
            title="Next Page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-6 space-y-12 animate-pulse">
        <div className="h-8 bg-slate-800 rounded w-1/4" />
        <div className="h-32 bg-slate-800 rounded w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-96 bg-slate-800 rounded-2xl" />
          ))}
        </div>
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}
