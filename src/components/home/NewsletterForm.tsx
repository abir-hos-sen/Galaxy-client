'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Send, Star } from 'lucide-react';
import { newsletterSchema } from '@/lib/validations';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = newsletterSchema.safeParse({ email });
    if (!validation.success) {
      toast.error(validation.error.flatten().fieldErrors.email?.[0] || 'Invalid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || 'Successfully subscribed!');
        setEmail('');
      } else {
        toast.error(data.error || 'Failed to subscribe.');
      }
    } catch (error) {
      console.error('Newsletter submission error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-6">
      <div className="relative flex items-center bg-[#111430]/80 backdrop-blur-md rounded-full border border-slate-800 p-1.5 focus-within:border-[#6C5CE7] focus-within:ring-2 focus-within:ring-[#6C5CE7]/20 transition-all duration-300">
        <input
          type="email"
          placeholder="Enter your email to receive space updates"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          className="w-full pl-5 pr-12 py-2 text-sm bg-transparent outline-none border-none text-white placeholder-slate-500 rounded-full"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="absolute right-1.5 bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white rounded-full p-2.5 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
          title="Subscribe"
        >
          {isSubmitting ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>
    </form>
  );
};
