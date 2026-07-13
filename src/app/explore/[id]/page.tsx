'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Star, MapPin, Calendar, Compass, ShieldAlert, ArrowLeft, Send, Sparkles, Clock, Globe } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { SpaceCard } from '@/components/ui/SpaceCard';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import toast from 'react-hot-toast';
import { reviewSchema } from '@/lib/validations';

export default function SpaceEntryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const id = params?.id as string;

  const [entry, setEntry] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [rating, setRating] = useState<number>(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);

  const fetchDetailData = async () => {
    try {
      setLoading(true);
      const entryRes = await fetch(`/api/entries/${id}`);
      if (entryRes.status === 404) {
        toast.error('Space entry not found');
        router.push('/explore');
        return;
      }
      if (!entryRes.ok) throw new Error('Failed to load entry details');
      const entryData = await entryRes.json();
      setEntry(entryData);

      const reviewsRes = await fetch(`/api/entries/${id}/reviews`);
      if (reviewsRes.ok) {
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData);
      }

      const relatedRes = await fetch(`/api/entries?category=${entryData.category}&limit=5`);
      if (relatedRes.ok) {
        const relatedData = await relatedRes.json();
        const filtered = relatedData.entries.filter((item: any) => item._id !== id).slice(0, 3);
        setRelated(filtered);
      }

    } catch (error) {
      console.error('Error fetching detail page data:', error);
      toast.error('Could not load details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetailData();
    }
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to leave a review.');
      return;
    }

    setSubmittingReview(true);

    const validation = reviewSchema.safeParse({ rating, comment });
    if (!validation.success) {
      const firstError = Object.values(validation.error.flatten().fieldErrors)[0] as string[];
      toast.error(firstError[0] || 'Invalid rating or comment.');
      setSubmittingReview(false);
      return;
    }

    try {
      const res = await fetch(`/api/entries/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Failed to submit review');
      } else {
        toast.success('Thank you for your review!');
        setComment('');
        setRating(5);
        await fetchDetailData();
      }
    } catch (error) {
      console.error('Review submission error:', error);
      toast.error('Connection error. Failed to post review.');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 space-y-12 animate-pulse pt-8">
        <div className="h-6 bg-slate-800 rounded w-24" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 h-[450px] bg-slate-800 rounded-2xl" />
          <div className="lg:col-span-5 space-y-6">
            <div className="h-8 bg-slate-800 rounded w-3/4" />
            <div className="h-4 bg-slate-800 rounded w-1/2" />
            <div className="h-24 bg-slate-800 rounded w-full" />
            <div className="h-12 bg-slate-800 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!entry) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'Completed':
        return 'bg-[#94A3B8]';
      case 'Planned':
        return 'bg-[#FFC947]';
      default:
        return 'bg-slate-500';
    }
  };

  const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-16 pt-4">
      <Link
        href="/explore"
        className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Catalog</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="relative h-[400px] md:h-[500px] w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={entry.imageUrl}
              alt={entry.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 px-4.5 py-1.5 bg-[#0B0E23]/80 backdrop-blur-md border border-slate-700/50 rounded-full text-xs font-bold text-white tracking-wide">
              {entry.category}
            </div>
            <div className="absolute top-6 right-6 flex items-center space-x-2 bg-[#0B0E23]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/50">
              <span className={`h-2.5 w-2.5 rounded-full ${getStatusColor(entry.status)}`} />
              <span className="text-xs font-semibold text-slate-200">{entry.status}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8 bg-[#111430]/40 border border-slate-800 p-8 rounded-3xl">
          <div className="space-y-3">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-wide">
              {entry.title}
            </h1>
            
            <div className="flex items-center space-x-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4.5 w-4.5 ${
                    i < Math.round(entry.rating) ? 'text-[#FFC947] fill-[#FFC947]' : 'text-slate-600'
                  }`}
                />
              ))}
              <span className="text-sm font-semibold text-slate-300 ml-1">
                {entry.rating > 0 ? `${entry.rating.toFixed(1)} / 5.0` : 'No ratings'}
              </span>
              <span className="text-xs text-slate-500 ml-1.5">
                ({reviews.length} community reviews)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-800/40">
            <div className="flex items-start space-x-3">
              <Compass className="h-5 w-5 text-[#6C5CE7] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Distance</p>
                <p className="text-sm font-medium text-white">{entry.distanceFromEarth}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-[#FFC947] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Launch / Flight Date</p>
                <p className="text-sm font-medium text-white">{formattedDate}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Globe className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Operating Agency</p>
                <p className="text-sm font-medium text-white">{entry.agency}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Registry Status</p>
                <p className="text-sm font-medium text-white">{entry.status}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800/40">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">Full Biography & Data</h3>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              {entry.fullDescription}
            </p>
          </div>

          {entry.createdBy && (
            <div className="pt-6 border-t border-slate-800/40 flex items-center space-x-3 text-xs text-slate-400">
              <img
                src={entry.createdBy.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=placeholder'}
                alt="Creator avatar"
                className="h-7 w-7 rounded-full bg-slate-800 border border-[#6C5CE7]/30"
              />
              <span>Logged in database by <strong className="text-slate-300 font-semibold">{entry.createdBy.name}</strong></span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
        <div className="lg:col-span-5 bg-[#111430]/40 border border-slate-800 p-8 rounded-3xl space-y-6 h-fit">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-xl text-white tracking-wide flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-[#FFC947]" />
              <span>Leave Your Review</span>
            </h2>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Share your scientific review or catalog validation comments with fellow researchers.
            </p>
          </div>

          {user ? (
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-semibold text-slate-400">Your Rating (1 - 5 Stars)</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isLit = hoveredRating !== null ? star <= hoveredRating : star <= rating;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(null)}
                        className="p-1 hover:scale-110 transition-transform focus:outline-none"
                      >
                        <Star
                          className={`h-7 w-7 ${
                            isLit ? 'text-[#FFC947] fill-[#FFC947]' : 'text-slate-600'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-xs font-semibold text-slate-400">Review Comments</label>
                <textarea
                  placeholder="Enter details of your observation/review (minimum 10 characters)..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={submittingReview}
                  rows={4}
                  className="w-full bg-[#0B0E23]/60 border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-500 outline-none focus:border-[#6C5CE7] transition-all resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submittingReview}
                className="w-full bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center space-x-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {submittingReview ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Review</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="p-6 border border-dashed border-slate-700/50 rounded-2xl text-center space-y-4">
              <ShieldAlert className="h-8 w-8 text-[#FFC947] mx-auto animate-pulse" />
              <h4 className="text-sm font-semibold text-white">Review Submissions Locked</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                You must be logged in with a certified registry account to rate or review space entities.
              </p>
              <Link
                href={`/login?redirect=/explore/${id}`}
                className="inline-block bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-transform active:scale-95"
              >
                Log In / Register
              </Link>
            </div>
          )}
        </div>

        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-display font-bold text-xl text-white tracking-wide">
            Community Observations ({reviews.length})
          </h2>

          {reviews.length > 0 ? (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {reviews.map((rev) => (
                <div
                  key={rev._id}
                  className="bg-[#111430]/30 border border-slate-800/60 p-5 rounded-2xl space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <img
                        src={rev.userId?.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=placeholder'}
                        alt={rev.userId?.name || 'Anonymous User'}
                        className="h-8 w-8 rounded-full border border-slate-700 bg-slate-800"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white">
                          {rev.userId?.name || 'Anonymous User'}
                        </h4>
                        <span className="text-[10px] text-slate-500">
                          {new Date(rev.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < rev.rating ? 'text-[#FFC947] fill-[#FFC947]' : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 border border-slate-800/50 rounded-2xl text-center text-slate-500 text-sm">
              No astronomical observations logged yet for this object. Be the first!
            </div>
          )}
        </div>
      </div>

      <div className="space-y-8 pt-8 border-t border-slate-900">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-2xl text-white tracking-wide">
              Related space {entry.category}s
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Continue exploring similar items in the catalog.
            </p>
          </div>
          <Link
            href={`/explore?category=${entry.category}`}
            className="text-xs sm:text-sm font-semibold text-[#6C5CE7] hover:text-[#6C5CE7]/85"
          >
            Explore Category
          </Link>
        </div>

        {related.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((item) => (
              <SpaceCard key={item._id} entry={item} />
            ))}
          </div>
        ) : (
          <div className="py-12 border border-slate-800/40 rounded-2xl text-center text-slate-500 text-sm">
            No other space {entry.category}s are currently logged.
          </div>
        )}
      </div>
    </div>
  );
}
