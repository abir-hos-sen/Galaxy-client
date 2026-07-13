'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Rocket, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email || !password || !confirmPassword) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match. Please re-enter.');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }

    setIsSubmitting(true);
    const success = await register({ name: name.trim(), email, password });
    if (success) {
      router.push('/explore');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="p-4 bg-[#FFC947]/10 border border-[#FFC947]/20 rounded-2xl">
              <Rocket className="h-10 w-10 text-[#FFC947]" />
            </div>
          </div>
          <h1 className="font-display font-extrabold text-3xl text-white tracking-wide">
            Join the Registry
          </h1>
          <p className="text-sm text-[#94A3B8]">
            Create a free account to log space discoveries, rate entries, and submit observations.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#111430]/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 space-y-5"
        >
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Dr. Evelyn Carter"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              required
              className="w-full bg-[#0B0E23]/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#6C5CE7] focus:ring-1 focus:ring-[#6C5CE7]/20 transition-all"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
              className="w-full bg-[#0B0E23]/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#6C5CE7] focus:ring-1 focus:ring-[#6C5CE7]/20 transition-all"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                required
                className="w-full bg-[#0B0E23]/60 border border-slate-800 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-slate-500 outline-none focus:border-[#6C5CE7] focus:ring-1 focus:ring-[#6C5CE7]/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isSubmitting}
              required
              className={`w-full bg-[#0B0E23]/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all ${
                confirmPassword && confirmPassword !== password
                  ? 'border-rose-500/60 focus:border-rose-500'
                  : 'border-slate-800 focus:border-[#6C5CE7] focus:ring-1 focus:ring-[#6C5CE7]/20'
              }`}
            />
            {confirmPassword && confirmPassword !== password && (
              <p className="text-xs text-rose-400">Passwords do not match</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || (confirmPassword !== '' && confirmPassword !== password)}
            className="w-full bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center space-x-2 transition-all hover:shadow-[0_0_20px_rgba(108,92,231,0.35)] active:scale-95 disabled:opacity-50 mt-2"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                <span>Create Researcher Profile</span>
              </>
            )}
          </button>

          <p className="text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="text-[#6C5CE7] font-semibold hover:text-[#6C5CE7]/80">
              Log in to your dashboard
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
