'use client';

import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, Orbit } from 'lucide-react';

interface PlanetInfo {
  name: string;
  type: string;
  fact: string;
  size: string;
  glowColor: string;
  borderColor: string;
}

export const PlanetSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const planets: PlanetInfo[] = [
    {
      name: 'Mars',
      type: 'Rocky Terrestrial Planet',
      fact: 'Iron oxide on the surface gives it a reddish, rusty hue. Liquid water once flowed here.',
      size: 'w-48 h-48 md:w-56 md:h-56',
      glowColor: 'shadow-[0_0_50px_rgba(239,68,68,0.4)]',
      borderColor: 'border-red-500/50',
    },
    {
      name: 'Jupiter',
      type: 'Massive Gas Giant',
      fact: 'Houses the Great Red Spot—a massive hurricane larger than Earth that has raged for centuries.',
      size: 'w-56 h-56 md:w-64 md:h-64',
      glowColor: 'shadow-[0_0_60px_rgba(245,158,11,0.3)]',
      borderColor: 'border-amber-500/50',
    },
    {
      name: 'Kepler-22b',
      type: 'Habitable Zone Exoplanet',
      fact: 'Orbiting a Sun-like G-type star 635 light-years away. Likely a water-world with a warm climate.',
      size: 'w-44 h-44 md:w-52 md:h-52',
      glowColor: 'shadow-[0_0_50px_rgba(59,130,246,0.4)]',
      borderColor: 'border-blue-500/50',
    },
    {
      name: 'Proxima Centauri b',
      type: 'Closest Known Exoplanet',
      fact: 'Orbits the red dwarf Proxima Centauri, just 4.24 light-years away. Resides in the stellar habitable zone.',
      size: 'w-40 h-40 md:w-48 md:h-48',
      glowColor: 'shadow-[0_0_50px_rgba(168,85,247,0.4)]',
      borderColor: 'border-purple-500/50',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % planets.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [planets.length]);

  const activePlanet = planets[currentIndex];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-5xl mx-auto py-8">
      {/* 3D-ish Sphere Indicator */}
      <div className="flex-1 flex justify-center items-center relative h-[320px] w-full">
        {/* Orbit Line Ring */}
        <div className="absolute w-[280px] h-[280px] md:w-[350px] md:h-[350px] border border-slate-800 rounded-full animate-[spin_20s_linear_infinite]" />
        
        {/* Planet Body */}
        <div
          className={`relative rounded-full border-2 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800 transition-all duration-1000 ease-out flex items-center justify-center overflow-hidden ${activePlanet.size} ${activePlanet.borderColor} ${activePlanet.glowColor}`}
        >
          {/* Surface texture mock */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-slate-800 to-black mix-blend-overlay" />
          <div className="absolute w-full h-1/2 bg-white/5 top-0 rotate-12 transform origin-top-left" />
          <div className="absolute w-2/3 h-2/3 bg-black/60 rounded-full blur-xl translate-x-12 translate-y-12" />

          {/* Core Icons Overlay */}
          <Orbit className="h-10 w-10 text-white/30 animate-[spin_12s_linear_infinite]" />
        </div>

        {/* Orbiting Satellite particles */}
        <div className="absolute w-3 h-3 bg-[#FFC947] rounded-full shadow-[0_0_10px_#FFC947] animate-[ping_3s_infinite]" style={{ transform: 'translate(-100px, 80px)' }} />
        <div className="absolute w-2 h-2 bg-[#6C5CE7] rounded-full shadow-[0_0_10px_#6C5CE7] animate-[ping_4s_infinite]" style={{ transform: 'translate(120px, -90px)' }} />
      </div>

      {/* Planet Description Details */}
      <div className="flex-1 space-y-6 text-center lg:text-left max-w-md">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400">
          <Compass className="h-3.5 w-3.5 text-[#6C5CE7] animate-pulse" />
          <span>Interactive Cosmic Spotlight</span>
        </div>

        <h3 className="font-display font-extrabold text-4xl text-white tracking-wide transition-all duration-500">
          {activePlanet.name}
        </h3>
        
        <p className="text-[#FFC947] font-semibold text-sm tracking-widest uppercase">
          {activePlanet.type}
        </p>

        <p className="text-[#94A3B8] text-base leading-relaxed h-[80px] overflow-hidden">
          {activePlanet.fact}
        </p>

        {/* Dots Navigator */}
        <div className="flex justify-center lg:justify-start space-x-3 pt-4">
          {planets.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-[#6C5CE7]' : 'w-2.5 bg-slate-700 hover:bg-slate-600'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
