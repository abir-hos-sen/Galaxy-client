'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Rocket, Eye, EyeOff, LogIn, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }
    setIsSubmitting(true);
    const success = await login({ email, password });
    if (success) {
      router.push('/explore');
    }
    setIsSubmitting(false);
  };

  const handleDemoLogin = async (role: 'user' | 'admin') => {
    setIsSubmitting(true);
    const credentials =
      role === 'admin'
        ? { email: 'admin@galaxyexplorer.com', password: 'Admin@1234' }
        : { email: 'demo.user@galaxyexplorer.com', password: 'Demo@1234' };

    const success = await login(credentials);
    if (success) {
      router.push(role === 'admin' ? '/admin' : '/explore');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="p-4 bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 rounded-2xl">
              <Rocket className="h-10 w-10 text-[#6C5CE7]" />
            </div>
          </div>
          <h1 className="font-display font-extrabold text-3xl text-white tracking-wide">
            Welcome Back
          </h1>
          <p className="text-sm text-[#94A3B8]">
            Log in to the Galaxy Explorer registry to manage your space discoveries.
          </p>
        </div>

        {/* Demo Login Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleDemoLogin('user')}
            disabled={isSubmitting}
            className="flex flex-col items-center justify-center py-4 px-3 bg-[#111430]/60 border border-slate-700 hover:border-[#6C5CE7]/60 rounded-2xl transition-all text-center space-y-1.5 disabled:opacity-50"
          >
            <Sparkles className="h-5 w-5 text-[#FFC947]" />
            <span className="text-xs font-bold text-white">Demo User</span>
            <span className="text-[10px] text-slate-400">demo.user@galaxyexplorer.com</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('admin')}
            disabled={isSubmitting}
            className="flex flex-col items-center justify-center py-4 px-3 bg-[#111430]/60 border border-[#FFC947]/30 hover:border-[#FFC947]/60 rounded-2xl transition-all text-center space-y-1.5 disabled:opacity-50"
          >
            <Sparkles className="h-5 w-5 text-[#6C5CE7]" />
            <span className="text-xs font-bold text-[#FFC947]">Demo Admin</span>
            <span className="text-[10px] text-slate-400">admin@galaxyexplorer.com</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-xs text-slate-500 shrink-0">or login with your credentials</span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#111430]/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 space-y-6"
        >
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
                placeholder="Enter your password"
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center space-x-2 transition-all hover:shadow-[0_0_20px_rgba(108,92,231,0.35)] active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                <span>Log In to Registry</span>
              </>
            )}
          </button>

          <p className="text-center text-xs text-slate-500">
            No account yet?{' '}
            <Link href="/register" className="text-[#6C5CE7] font-semibold hover:text-[#6C5CE7]/80">
              Create a free researcher profile
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
