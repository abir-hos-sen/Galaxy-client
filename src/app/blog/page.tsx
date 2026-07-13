import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, Calendar } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Space Blog — Galaxy & Space Explorer',
  description: 'Read in-depth articles about space exploration, missions, celestial discoveries, and astronomical science from the Galaxy Explorer team.',
};

const BLOG_POSTS = [
  {
    slug: 'artemis-return-to-moon',
    title: 'Artemis III: Humanity\'s Return to the Lunar Surface',
    excerpt: 'After more than five decades since Apollo 17, NASA\'s Artemis program aims to land the first woman and next man on the Moon. We explore the mission architecture, crew selection, and long-term implications for a permanent lunar base.',
    date: '2025-07-01',
    category: 'Mission',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1532413992378-f169ac26fff0?q=80&w=600',
  },
  {
    slug: 'webb-deep-field-discoveries',
    title: 'James Webb Space Telescope\'s Most Stunning Deep Field Images',
    excerpt: 'The JWST continues to rewrite our understanding of the early universe. This article examines the record-breaking galaxy clusters, stellar nurseries, and atmospheric compositions revealed in the telescope\'s first two years of operation.',
    date: '2025-06-15',
    category: 'Telescope',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1608178398319-48f814d0750c?q=80&w=600',
  },
  {
    slug: 'exoplanet-water-detection',
    title: 'Water Detected in Atmospheres of 7 New Exoplanets',
    excerpt: 'Spectroscopic analysis from ground-based observatories and the Hubble Space Telescope has confirmed water vapor signatures in the atmospheres of seven newly discovered exoplanets, raising fresh questions about extraterrestrial habitability.',
    date: '2025-05-30',
    category: 'Exoplanets',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9d4d?q=80&w=600',
  },
  {
    slug: 'mars-sample-return-update',
    title: 'Mars Sample Return: Timeline, Challenges, and What\'s at Stake',
    excerpt: 'The ambitious Mars Sample Return mission, a joint NASA-ESA endeavor, plans to retrieve soil and rock samples collected by the Perseverance rover. The scientific community weighs the risks and rewards of this unprecedented interplanetary retrieval mission.',
    date: '2025-05-10',
    category: 'Mission',
    readTime: '10 min read',
    imageUrl: 'https://images.unsplash.com/photo-1636819488537-a9b1ffde9fdf?q=80&w=600',
  },
  {
    slug: 'black-hole-merger-gravitational-waves',
    title: 'LIGO Detects Most Massive Black Hole Merger Ever Observed',
    excerpt: 'Gravitational wave detectors registered a signal from a collision between two black holes with a combined mass exceeding 150 solar masses, challenging existing models of stellar evolution and black hole formation in dense star clusters.',
    date: '2025-04-22',
    category: 'Astrophysics',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=600',
  },
  {
    slug: 'space-tourism-economy-2025',
    title: 'The Commercial Space Tourism Industry: A 2025 Market Overview',
    excerpt: 'From SpaceX\'s Starship tourist contracts to Virgin Galactic\'s suborbital flights, we analyze the rapidly evolving space tourism landscape, ticket prices, safety records, and the broader economic implications of commercializing low Earth orbit.',
    date: '2025-04-05',
    category: 'Industry',
    readTime: '9 min read',
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=600',
  },
];

const categoryColors: Record<string, string> = {
  Mission: 'text-blue-300 bg-blue-500/10 border-blue-500/20',
  Telescope: 'text-purple-300 bg-purple-500/10 border-purple-500/20',
  Exoplanets: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  Astrophysics: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  Industry: 'text-teal-300 bg-teal-500/10 border-teal-500/20',
};

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 pt-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 text-xs font-semibold text-[#6C5CE7]">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Space Knowledge Hub</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl text-white tracking-wide">
          Galaxy Explorer Blog
        </h1>
        <p className="text-sm text-[#94A3B8] leading-relaxed">
          In-depth articles, mission briefings, and astronomical discoveries written by our team of researchers, scientists, and space journalists.
        </p>
      </div>

      {/* Featured Post */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 h-[380px] group">
        <img
          src={BLOG_POSTS[0].imageUrl}
          alt={BLOG_POSTS[0].title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E23] via-[#0B0E23]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
          <div className="flex items-center space-x-3">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColors[BLOG_POSTS[0].category] || 'text-slate-300 bg-slate-500/10 border-slate-500/20'}`}>
              {BLOG_POSTS[0].category}
            </span>
            <span className="text-xs text-slate-400">{BLOG_POSTS[0].readTime}</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-tight max-w-2xl">
            {BLOG_POSTS[0].title}
          </h2>
          <p className="text-sm text-slate-300 max-w-xl leading-relaxed line-clamp-2">
            {BLOG_POSTS[0].excerpt}
          </p>
          <Link
            href={`/blog/${BLOG_POSTS[0].slug}`}
            className="inline-flex items-center space-x-2 bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-105"
          >
            <span>Read Article</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.slice(1).map((post) => (
          <div
            key={post.slug}
            className="group bg-[#111430]/40 border border-slate-800 rounded-2xl overflow-hidden hover:border-[#6C5CE7]/40 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="h-48 overflow-hidden bg-slate-900">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${categoryColors[post.category] || 'text-slate-300 bg-slate-500/10 border-slate-500/20'}`}>
                  {post.category}
                </span>
                <span className="text-[10px] text-slate-500">{post.readTime}</span>
              </div>
              <h3 className="font-display font-bold text-base text-white leading-tight group-hover:text-[#6C5CE7] transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <div className="pt-3 border-t border-slate-800/40 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-500">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-[#6C5CE7] hover:text-[#6C5CE7]/80 flex items-center space-x-1 group/link"
                >
                  <span>Read More</span>
                  <ArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
