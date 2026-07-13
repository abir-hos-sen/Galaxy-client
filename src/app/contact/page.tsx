'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (form.message.length < 10) {
      toast.error('Message must be at least 10 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Failed to send message.');
      } else {
        toast.success(data.message || 'Message sent!');
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pb-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 pt-8">
        <h1 className="font-display font-extrabold text-4xl text-white tracking-wide">
          Contact the Registry
        </h1>
        <p className="text-sm text-[#94A3B8] leading-relaxed">
          Have a question, data correction, partnership inquiry, or a bug report? Our team of space registry curators is here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* Info Panel */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#111430]/40 border border-slate-800 rounded-3xl p-8 space-y-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 rounded-xl shrink-0">
                <Mail className="h-5 w-5 text-[#6C5CE7]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Email</h3>
                <a href="mailto:contact@galaxyexplorer.com" className="text-sm text-[#94A3B8] hover:text-white transition-colors">
                  contact@galaxyexplorer.com
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-[#FFC947]/10 border border-[#FFC947]/20 rounded-xl shrink-0">
                <Phone className="h-5 w-5 text-[#FFC947]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Phone</h3>
                <span className="text-sm text-[#94A3B8]">+1 (800) SPACE-EX</span>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl shrink-0">
                <MapPin className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Location</h3>
                <span className="text-sm text-[#94A3B8]">100 Cosmos Boulevard, Nebula City</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-500 leading-relaxed">
                For data error reports or scientific citation issues, please include the full entry URL in your message for faster processing.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-6 bg-[#111430]/40 border border-slate-800 rounded-3xl p-10">
              <div className="p-5 bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 rounded-full">
                <MessageSquare className="h-12 w-12 text-[#6C5CE7]" />
              </div>
              <h2 className="font-display font-bold text-2xl text-white">Message Received!</h2>
              <p className="text-sm text-[#94A3B8] max-w-sm">
                Thank you for reaching out. Our team will review your inquiry and get back to you within 24–48 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm font-semibold text-[#6C5CE7] hover:text-[#6C5CE7]/80"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[#111430]/40 border border-slate-800 rounded-3xl p-8 space-y-6"
            >
              <h2 className="font-display font-bold text-xl text-white">Send Us a Message</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full bg-[#0B0E23]/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#6C5CE7] transition-all"
                  />
                </div>
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-[#0B0E23]/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#6C5CE7] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your inquiry, feedback, or data correction request in detail..."
                  rows={7}
                  required
                  className="w-full bg-[#0B0E23]/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#6C5CE7] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center space-x-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
