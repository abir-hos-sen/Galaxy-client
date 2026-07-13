import React from 'react';
import Link from 'next/link';
import { Rocket, Globe, Users, Award, Sparkles, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Galaxy & Space Explorer',
  description: 'Learn about the mission, values, and team behind the Galaxy & Space Explorer astronomical registry platform.',
};

export default function AboutPage() {
  const milestones = [
    { year: '2020', event: 'Galaxy Explorer founded by a small team of astrophysics enthusiasts.' },
    { year: '2021', event: 'Launched the public catalog with 50+ seed entries sourced from NASA archives.' },
    { year: '2022', event: 'Introduced the community review system and user submission portal.' },
    { year: '2023', event: 'Reached 5,000 registered researchers and 500+ unique catalog entries.' },
    { year: '2024', event: 'Integrated live telemetry charts and expanded to 12 data categories.' },
    { year: '2025', event: 'Major platform redesign with AI-assisted entry validation and moderation tools.' },
  ];

  const values = [
    { icon: Globe, title: 'Open Knowledge', desc: 'All primary astronomical data is sourced from publicly available scientific archives and space agency databases.' },
    { icon: Users, title: 'Community Driven', desc: 'Researchers, students, and astronomers worldwide contribute and peer-review entries to maintain accuracy.' },
    { icon: Award, title: 'Scientific Integrity', desc: 'We adhere to established astronomical naming conventions and follow IAU-recognized classification standards.' },
    { icon: Sparkles, title: 'Inclusive Discovery', desc: 'Whether you are an amateur stargazer or a tenured professor, this platform is built for everyone passionate about space.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-24 pb-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-6 pt-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 text-xs font-semibold text-[#6C5CE7]">
          <Rocket className="h-3.5 w-3.5" />
          <span>Our Story</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-wide leading-tight">
          Built for Curious Minds<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] to-[#FFC947]">
            Who Look Upward
          </span>
        </h1>
        <p className="text-base text-[#94A3B8] leading-relaxed">
          Galaxy & Space Explorer began as a passion project: a structured, beautiful, and accurate reference platform documenting humankind's most extraordinary achievements beyond Earth's atmosphere.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="font-display font-bold text-3xl text-white">Our Mission</h2>
          <p className="text-[#94A3B8] leading-relaxed text-base">
            We believe that knowledge about the cosmos should be freely accessible, beautifully presented, and collaboratively maintained. Our mission is to create the world's most comprehensive and community-verified database of space entities — from the Moon to the edge of the observable universe.
          </p>
          <p className="text-[#94A3B8] leading-relaxed text-base">
            We partner with open science initiatives, university research groups, and independent astronomers to continuously expand and verify our catalog, ensuring every entry represents real, documented astronomical science.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center space-x-2 bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all hover:shadow-[0_0_15px_rgba(108,92,231,0.35)]"
          >
            <span>Explore the Catalog</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {values.map((val) => (
            <div
              key={val.title}
              className="bg-[#111430]/40 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-[#6C5CE7]/30 transition-all"
            >
              <val.icon className="h-7 w-7 text-[#6C5CE7]" />
              <h3 className="font-display font-bold text-sm text-white">{val.title}</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h2 className="font-display font-bold text-3xl text-white">Platform Timeline</h2>
          <p className="text-sm text-[#94A3B8]">Key milestones in Galaxy Explorer's development history.</p>
        </div>

        <div className="relative pl-8 border-l-2 border-[#6C5CE7]/20 space-y-10">
          {milestones.map((m) => (
            <div key={m.year} className="relative">
              <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-[#6C5CE7] border-4 border-[#0B0E23]" />
              <div className="space-y-1">
                <span className="font-display font-bold text-[#FFC947] text-sm">{m.year}</span>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{m.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-br from-[#111430] to-[#0A0D1D] border border-slate-800 rounded-3xl p-12 space-y-6 max-w-2xl mx-auto">
        <Sparkles className="h-10 w-10 text-[#FFC947] mx-auto animate-bounce" />
        <h2 className="font-display font-bold text-2xl text-white">Join the Explorer Registry</h2>
        <p className="text-sm text-[#94A3B8]">Create a free account and start logging your astronomical observations today.</p>
        <Link href="/register" className="inline-block bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all hover:scale-105">
          Get Started Free
        </Link>
      </div>
    </div>
  );
}
