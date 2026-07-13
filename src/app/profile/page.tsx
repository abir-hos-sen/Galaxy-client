'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Camera, Save, Loader2, Shield, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, loading: authLoading, checkUserSession } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login?redirect=/profile');
      } else {
        setName(user.name || '');
        setEmail(user.email || '');
        setAvatarUrl(user.avatarUrl || '');
      }
    }
  }, [user, authLoading, router]);

  const generateRandomAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(2, 10);
    const newAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${randomSeed}`;
    setAvatarUrl(newAvatar);
    toast.success('Generated a new robot seed!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFieldErrors({});

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, avatarUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setFieldErrors(data.errors);
          const firstError = Object.values(data.errors)[0] as string[];
          toast.error(firstError[0] || 'Validation failed');
        } else {
          toast.error(data.error || 'Failed to update profile');
        }
      } else {
        toast.success('Profile updated successfully!');
        // Refresh Auth Context session state to sync Navbar and entire UI
        await checkUserSession();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Connection error. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="h-10 w-10 border-2 border-[#6C5CE7] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pb-16 space-y-8">
      {/* Back to Home Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-sm font-semibold text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Registry</span>
        </Link>

        {user.role === 'admin' ? (
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#FFC947]/10 border border-[#FFC947]/20 text-xs font-extrabold text-[#FFC947] tracking-wider uppercase">
            <Shield className="h-3.5 w-3.5" />
            <span>Admin Account</span>
          </div>
        ) : (
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 text-xs font-extrabold text-[#6C5CE7] tracking-wider uppercase">
            <span>Cosmic Explorer</span>
          </div>
        )}
      </div>

      {/* Main Form Title */}
      <div className="space-y-2 text-center md:text-left">
        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-wide">
          Account Registry Settings
        </h1>
        <p className="text-sm text-[#94A3B8]">
          Update your cosmic identity credentials and profile picture in the database.
        </p>
      </div>

      {/* Profile Edit Card */}
      <div className="bg-[#111430]/40 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6C5CE7]/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFC947]/5 rounded-full blur-3xl -z-10" />

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar Settings */}
          <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-slate-800/60">
            <div className="relative group">
              <img
                src={avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name || 'default')}`}
                alt={name}
                className="h-24 w-24 rounded-full border-2 border-[#6C5CE7] bg-slate-800 object-cover shadow-lg shadow-[#000]/40 transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/bottts/svg?seed=fallback';
                }}
              />
              <div className="absolute inset-0 bg-[#0B0E23]/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className="flex-1 space-y-3 text-center md:text-left w-full">
              <h3 className="text-base font-bold text-white">Profile Avatar</h3>
              <p className="text-xs text-[#94A3B8] max-w-md">
                Provide a URL to your hosted avatar, or use the generator to roll a random custom robot seed.
              </p>
              <button
                type="button"
                onClick={generateRandomAvatar}
                className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold px-4 py-2 rounded-xl text-white transition-colors border border-slate-700/50"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Roll Random Robot</span>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-slate-300 flex items-center space-x-2">
                <User className="h-4 w-4 text-[#6C5CE7]" />
                <span>Full Name</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
                className={`w-full bg-[#0B0E23]/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#6C5CE7] focus:ring-1 focus:ring-[#6C5CE7] transition-all ${
                  fieldErrors.name ? 'border-rose-500/80 ring-1 ring-rose-500/40' : 'border-slate-800'
                }`}
              />
              {fieldErrors.name && (
                <p className="text-xs text-rose-400 font-medium pl-1">{fieldErrors.name[0]}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-300 flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#6C5CE7]" />
                <span>Email Address</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
                className={`w-full bg-[#0B0E23]/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#6C5CE7] focus:ring-1 focus:ring-[#6C5CE7] transition-all ${
                  fieldErrors.email ? 'border-rose-500/80 ring-1 ring-rose-500/40' : 'border-slate-800'
                }`}
              />
              {fieldErrors.email && (
                <p className="text-xs text-rose-400 font-medium pl-1">{fieldErrors.email[0]}</p>
              )}
            </div>

            {/* Avatar URL Input */}
            <div className="space-y-2">
              <label htmlFor="avatarUrl" className="text-sm font-semibold text-slate-300 flex items-center space-x-2">
                <Camera className="h-4 w-4 text-[#6C5CE7]" />
                <span>Avatar URL</span>
              </label>
              <input
                id="avatarUrl"
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className={`w-full bg-[#0B0E23]/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#6C5CE7] focus:ring-1 focus:ring-[#6C5CE7] transition-all ${
                  fieldErrors.avatarUrl ? 'border-rose-500/80 ring-1 ring-rose-500/40' : 'border-slate-800'
                }`}
              />
              {fieldErrors.avatarUrl && (
                <p className="text-xs text-rose-400 font-medium pl-1">{fieldErrors.avatarUrl[0]}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-800/40">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all hover:shadow-[0_0_15px_rgba(108,92,231,0.35)] active:scale-95 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving Updates...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Registry Changes</span>
                </>
              )}
            </button>
            
            <Link
              href="/"
              className="sm:w-32 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-center text-slate-400 hover:text-white font-semibold py-3.5 rounded-xl transition-all"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
