'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Image as ImageIcon, Rocket, Globe, Orbit } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const CATEGORIES = ['Mission', 'Planet', 'Star', 'Galaxy', 'Nebula', 'Astronaut'];
const STATUSES = ['Active', 'Completed', 'Planned'];

export default function AddEntryPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: '',
    category: 'Mission',
    status: 'Active',
    date: '',
    agency: '',
    distanceFromEarth: '',
    shortDescription: '',
    fullDescription: '',
    imageUrl: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'imageUrl') {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.shortDescription || !form.fullDescription || !form.agency || !form.date) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (form.shortDescription.length < 10) {
      toast.error('Short description must be at least 10 characters.');
      return;
    }
    if (form.fullDescription.length < 50) {
      toast.error('Full description must be at least 50 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.errors) {
          const firstError = Object.values(data.errors)[0] as string[];
          toast.error(firstError[0]);
        } else {
          toast.error(data.error || 'Failed to submit entry.');
        }
        return;
      }

      toast.success('Space entry logged successfully!');
      router.push('/items/manage');
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 space-y-12 pb-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 text-xs font-semibold text-[#6C5CE7]">
          <PlusCircle className="h-3.5 w-3.5" />
          <span>Researcher Contribution</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-wide">
          Log a Space Entry
        </h1>
        <p className="text-sm text-[#94A3B8] max-w-xl leading-relaxed">
          Contribute to the galaxy registry by documenting a celestial body, historic mission, or astronaut record. All fields marked with * are required.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Entry Title *
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Apollo 11 Moon Landing"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full bg-[#0B0E23]/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#6C5CE7] transition-all"
            />
          </div>

          {/* Category + Status Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-[#0B0E23]/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none focus:border-[#6C5CE7] transition-all"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Status *
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full bg-[#0B0E23]/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none focus:border-[#6C5CE7] transition-all"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Agency + Date Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Agency / Organization *
              </label>
              <input
                type="text"
                name="agency"
                placeholder="e.g. NASA"
                value={form.agency}
                onChange={handleChange}
                required
                className="w-full bg-[#0B0E23]/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#6C5CE7] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Flight / Discovery Date *
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full bg-[#0B0E23]/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none focus:border-[#6C5CE7] transition-all"
              />
            </div>
          </div>

          {/* Distance from Earth */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Distance from Earth *
            </label>
            <input
              type="text"
              name="distanceFromEarth"
              placeholder="e.g. 384,400 km · 4.24 light years · 225 million km"
              value={form.distanceFromEarth}
              onChange={handleChange}
              required
              className="w-full bg-[#0B0E23]/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#6C5CE7] transition-all"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              placeholder="https://images.nasa.gov/..."
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full bg-[#0B0E23]/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#6C5CE7] transition-all"
            />
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Short Description * <span className="text-slate-600 text-[10px] normal-case font-normal">(min 10 chars)</span>
            </label>
            <textarea
              name="shortDescription"
              placeholder="A concise summary of this space entry shown on catalog cards..."
              value={form.shortDescription}
              onChange={handleChange}
              rows={3}
              required
              className="w-full bg-[#0B0E23]/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#6C5CE7] transition-all resize-none"
            />
            <p className="text-[10px] text-slate-500 text-right">{form.shortDescription.length} chars</p>
          </div>

          {/* Full Description */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Full Biography / Description * <span className="text-slate-600 text-[10px] normal-case font-normal">(min 50 chars)</span>
            </label>
            <textarea
              name="fullDescription"
              placeholder="A detailed scientific description of the mission objectives, celestial properties, timeline of events, personnel involved, and discoveries made..."
              value={form.fullDescription}
              onChange={handleChange}
              rows={8}
              required
              className="w-full bg-[#0B0E23]/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#6C5CE7] transition-all resize-none"
            />
            <p className="text-[10px] text-slate-500 text-right">{form.fullDescription.length} chars</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white font-bold py-4 rounded-2xl text-sm flex items-center justify-center space-x-2 transition-all hover:shadow-[0_0_25px_rgba(108,92,231,0.35)] active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Rocket className="h-4 w-4" />
                <span>Submit to Galaxy Registry</span>
              </>
            )}
          </button>
        </form>

        {/* Live Image Preview Sidebar */}
        <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-28">
          <div className="space-y-3">
            <h3 className="font-display font-bold text-white text-base flex items-center space-x-2">
              <ImageIcon className="h-4 w-4 text-[#6C5CE7]" />
              <span>Live Image Preview</span>
            </h3>
            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-[#111430]/60 border border-slate-800 flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Entry preview"
                  className="w-full h-full object-cover"
                  onError={() => setImagePreview('')}
                />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3 text-slate-600">
                  <Orbit className="h-12 w-12 animate-spin-slow" />
                  <span className="text-xs">Paste an image URL above to preview</span>
                </div>
              )}
            </div>
          </div>

          {/* Hints Box */}
          <div className="bg-[#111430]/40 border border-slate-800/60 rounded-2xl p-5 space-y-4 text-xs text-slate-400">
            <h4 className="font-semibold text-white text-sm flex items-center space-x-2">
              <Globe className="h-4 w-4 text-[#FFC947]" />
              <span>Image Sources</span>
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://images.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-[#6C5CE7] hover:text-[#6C5CE7]/80 underline underline-offset-2">
                  NASA Image Library
                </a>
                {' '}— Free space photography
              </li>
              <li>
                <a href="https://unsplash.com/s/photos/space" target="_blank" rel="noopener noreferrer" className="text-[#6C5CE7] hover:text-[#6C5CE7]/80 underline underline-offset-2">
                  Unsplash Space
                </a>
                {' '}— High-res cosmic photos
              </li>
              <li>
                <a href="https://hubblesite.org/images" target="_blank" rel="noopener noreferrer" className="text-[#6C5CE7] hover:text-[#6C5CE7]/80 underline underline-offset-2">
                  Hubble Images
                </a>
                {' '}— Deep space telescope shots
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
