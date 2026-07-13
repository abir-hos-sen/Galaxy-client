import React from 'react';
import Link from 'next/link';
import {
  Rocket,
  Globe,
  Sparkles,
  Sun,
  User,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { SpaceCard } from '@/components/ui/SpaceCard';
import { PlanetSlider } from '@/components/home/PlanetSlider';
import { HomeCharts } from '@/components/home/HomeCharts';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { NewsletterForm } from '@/components/home/NewsletterForm';

export default async function Home() {
  let featuredMissions: any[] = [];
  let spotlightAstronauts: any[] = [];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    const missionsRes = await fetch(`${apiUrl}/api/entries?category=Mission&limit=4&sort=rating`, {
      cache: 'no-store',
    });
    if (missionsRes.ok) {
      const data = await missionsRes.json();
      featuredMissions = data.entries || [];
    }

    const astronautsRes = await fetch(`${apiUrl}/api/entries?category=Astronaut&limit=3&sort=newest`, {
      cache: 'no-store',
    });
    if (astronautsRes.ok) {
      const data = await astronautsRes.json();
      spotlightAstronauts = data.entries || [];
    }
  } catch (error) {
    console.error('Failed to load home page space data:', error);
  }

  const categories = [
    { name: 'Planets', query: 'Planet', icon: Globe, color: 'text-emerald-400 border-emerald-500/20 hover:border-emerald-500/50 bg-emerald-500/5' },
    { name: 'Missions', query: 'Mission', icon: Rocket, color: 'text-blue-400 border-blue-500/20 hover:border-blue-500/50 bg-blue-500/5' },
    { name: 'Stars', query: 'Star', icon: Sun, color: 'text-amber-400 border-amber-500/20 hover:border-amber-500/50 bg-amber-500/5' },
    { name: 'Galaxies', query: 'Galaxy', icon: Sparkles, color: 'text-purple-400 border-purple-500/20 hover:border-purple-500/50 bg-purple-500/5' },
    { name: 'Nebulae', query: 'Nebula', icon: CompassIcon, color: 'text-pink-400 border-pink-500/20 hover:border-pink-500/50 bg-pink-500/5' },
    { name: 'Astronauts', query: 'Astronaut', icon: User, color: 'text-teal-400 border-teal-500/20 hover:border-teal-500/50 bg-teal-500/5' },
  ];

  function CompassIcon(props: any) {
    return <Sparkles {...props} className={`${props.className} rotate-45`} />;
  }

  const testimonials = [
    {
      name: 'Dr. Evelyn Carter',
      role: 'Astrophysicist & Educator',
      text: 'Galaxy Explorer is my go-to classroom tool. The structured layout and rich details on historic launches give my students an interactive window into space exploration history.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150',
    },
    {
      name: 'Markus Vance',
      role: 'Space Photographer',
      text: 'The catalog organization is incredibly clean. Being able to browse celestial coordinates, agencies, and distance timelines in one dashboard makes finding references for my stargazing plans easy.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
    },
    {
      name: 'Aanya Sharma',
      role: 'Aerospace Student',
      text: 'I love submitting my own custom planetary findings from my local university observatory logs! The community reviewing system encourages collaborative cataloging.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
    },
  ];

  return (
    <div className="space-y-24">
      <section className="relative min-h-[70vh] flex items-center pt-8">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#6C5CE7]/15 border border-[#6C5CE7]/30 text-xs font-semibold text-[#6C5CE7]">
              <span>Venture Into The Unknown</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
              Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] to-[#FFC947]">Infinite Universe</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover historical spaceflight missions, cosmic planetary systems, deep space nebulae, and the brave astronauts who made it all possible. Join the explorer registry to submit your own discoveries.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4">
              <Link
                href="/explore"
                className="w-full sm:w-auto text-center bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(108,92,231,0.4)] flex items-center justify-center space-x-2"
              >
                <span>Explore the Universe</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#categories"
                className="w-full sm:w-auto text-center border border-slate-700 hover:border-slate-500 text-slate-300 font-semibold px-8 py-3.5 rounded-full transition-all hover:bg-slate-800/40"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <PlanetSlider />
          </div>
        </div>
      </section>

      <section id="categories" className="max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-wide">
            Explore by Category
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Navigate the cosmos by filtering active celestial objects, deep space galaxies, or human space travel achievements.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/explore?category=${cat.query}`}
              className={`p-6 rounded-2xl border flex flex-col items-center text-center space-y-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${cat.color}`}
            >
              <cat.icon className="h-8 w-8 transition-transform duration-300 hover:rotate-12" />
              <span className="font-display font-bold text-sm tracking-wide text-white">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16">
          <div className="space-y-3">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-wide">
              Featured Space Missions
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl">
              Highlighting the boldest human and robotic voyages that expanded the frontiers of our astronomical knowledge.
            </p>
          </div>
          <Link
            href="/explore?category=Mission"
            className="text-xs sm:text-sm font-semibold text-[#6C5CE7] hover:text-[#6C5CE7]/80 flex items-center space-x-1.5 group shrink-0"
          >
            <span>View All Missions</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {featuredMissions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMissions.map((entry) => (
              <SpaceCard key={entry._id} entry={entry} />
            ))}
          </div>
        ) : (
          <div className="h-48 rounded-2xl bg-[#111430]/20 border border-slate-800 flex items-center justify-center">
            <p className="text-slate-400 text-sm">No featured space missions available. Run the seeding script to populate records.</p>
          </div>
        )}
      </section>

      <section className="bg-[#070914]/50 border-y border-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FFC947]/10 border border-[#FFC947]/20 text-xs font-semibold text-[#FFC947]">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Cosmic Statistics</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-wide">
              Observatory Telemetry & Stats
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              Live platform metrics comparing astronomical distances, historical launch frequencies, and cataloged space fleets.
            </p>
          </div>

          <HomeCharts />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-wide">
            Astronaut Spotlight
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Honoring the brave pioneers who traveled beyond Earth's protective envelope to expand human horizons.
          </p>
        </div>

        {spotlightAstronauts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {spotlightAstronauts.map((astronaut) => (
              <div
                key={astronaut._id}
                className="group bg-[#111430]/40 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-[#6C5CE7]/45 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={astronaut.imageUrl}
                    alt={astronaut.title}
                    className="h-16 w-16 object-cover rounded-full border border-slate-700 bg-slate-900 group-hover:border-[#6C5CE7]"
                  />
                  <div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-[#6C5CE7] transition-colors">
                      {astronaut.title}
                    </h3>
                    <p className="text-xs text-[#FFC947] font-semibold tracking-wider uppercase">
                      {astronaut.agency}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-[#94A3B8] leading-relaxed line-clamp-3">
                  {astronaut.shortDescription}
                </p>

                <div className="pt-4 border-t border-slate-800/40 flex justify-between items-center">
                  <span className="text-[11px] text-slate-400">
                    Active Flight: {new Date(astronaut.date).getFullYear()}
                  </span>
                  <Link
                    href={`/explore/${astronaut._id}`}
                    className="text-xs font-semibold text-[#6C5CE7] group-hover:text-white flex items-center space-x-1"
                  >
                    <span>Flight Bio</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-32 rounded-2xl bg-[#111430]/20 border border-slate-800 flex items-center justify-center">
            <p className="text-slate-400 text-sm">No astronaut profiles available. Run seed script to load data.</p>
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-wide">
            What Space Enthusiasts Say
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Feedback and stories from stargazers, astrophysics professors, and planetary researchers worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <div
              key={index}
              className="bg-[#111430]/30 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between space-y-6 relative"
            >
              <span className="absolute top-6 right-8 text-7xl font-serif text-[#6C5CE7]/10 select-none">“</span>
              <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8] italic relative z-10">
                "{test.text}"
              </p>
              <div className="flex items-center space-x-4">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="h-10 w-10 rounded-full object-cover border border-slate-700 bg-slate-800"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white">{test.name}</h4>
                  <p className="text-xs text-slate-400">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6">
        <div className="bg-gradient-to-br from-[#111430] to-[#0A0D1D] border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#6C5CE7]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#FFC947]/5 rounded-full blur-3xl pointer-events-none" />

          <Sparkles className="h-10 w-10 text-[#FFC947] mx-auto animate-bounce" />
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-wide">
            Subscribe to Celestial Dispatches
          </h2>
          <p className="text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
            Stay updated with real-time astronomical discoveries, upcoming launch timelines, and platform modifications. No spam, only space.
          </p>

          <NewsletterForm />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-wide">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Have questions about the space archive, submissions, or account capabilities? Find answers below.
          </p>
        </div>

        <FaqAccordion />
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-gradient-to-r from-[#6C5CE7] to-[#8070E6] rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col md:flex-row justify-between items-center gap-8 shadow-[0_0_50px_rgba(108,92,231,0.15)]">
          <div className="space-y-4 text-center md:text-left max-w-xl">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
              Begin Loggin Your Discoveries Today
            </h2>
            <p className="text-sm sm:text-base text-purple-100 leading-relaxed">
              Create a free researcher profile, leave reviews, and document celestial objects or new spaceflight milestones in our community database.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link
              href="/register"
              className="bg-white hover:bg-slate-50 text-[#6C5CE7] font-bold text-center px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-md w-full sm:w-auto"
            >
              Sign Up Now
            </Link>
            <Link
              href="/explore"
              className="border border-white/30 hover:border-white/60 text-white font-semibold text-center px-8 py-4 rounded-xl transition-all duration-200 hover:bg-white/5 w-full sm:w-auto"
            >
              Explore Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
