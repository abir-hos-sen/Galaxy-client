'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

export const HomeCharts: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[350px]">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-[350px] bg-[#111430]/30 border border-slate-800 rounded-2xl animate-pulse flex items-center justify-center">
            <span className="text-sm text-slate-500">Loading visualization data...</span>
          </div>
        ))}
      </div>
    );
  }

  // Data 1: Missions Launched per decade (mock historical representation)
  const decadeData = [
    { decade: '1950s', launches: 2 },
    { decade: '1960s', launches: 12 },
    { decade: '1970s', launches: 8 },
    { decade: '1980s', launches: 14 },
    { decade: '1990s', launches: 19 },
    { decade: '2000s', launches: 28 },
    { decade: '2010s', launches: 45 },
    { decade: '2020s', launches: 62 },
  ];

  // Data 2: Planetary distances from Earth (in million km)
  const distanceData = [
    { name: 'Moon', distance: 0.38 },
    { name: 'Sun', distance: 149.6 },
    { name: 'Mars', distance: 225.0 },
    { name: 'Jupiter', distance: 778.0 },
    { name: 'Saturn', distance: 1400.0 },
  ];

  // Data 3: Space agency share (active catalog records)
  const agencyData = [
    { name: 'NASA (US)', value: 45 },
    { name: 'ESA (Europe)', value: 25 },
    { name: 'SpaceX (Private)', value: 15 },
    { name: 'ISRO (India)', value: 10 },
    { name: 'Others', value: 5 },
  ];

  const COLORS = ['#6C5CE7', '#FFC947', '#3B82F6', '#10B981', '#EC4899'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Decades Line/Area Chart */}
      <div className="bg-[#111430]/60 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
        <div>
          <h4 className="font-display font-semibold text-white text-base">Stellar Milestones</h4>
          <p className="text-xs text-slate-400 mt-1 mb-4">Total exploratory space missions launched per decade</p>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={decadeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLaunches" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6C5CE7" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6C5CE7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="decade" stroke="#94A3B8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#111430', borderColor: 'rgba(108, 92, 231, 0.3)', borderRadius: '12px' }}
                labelClassName="text-[#FFC947] font-semibold text-xs"
              />
              <Area type="monotone" dataKey="launches" stroke="#6C5CE7" strokeWidth={2} fillOpacity={1} fill="url(#colorLaunches)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Planetary Distance Bar Chart */}
      <div className="bg-[#111430]/60 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
        <div>
          <h4 className="font-display font-semibold text-white text-base">Cosmic Proximities</h4>
          <p className="text-xs text-slate-400 mt-1 mb-4">Average distance from Earth (in millions of kilometers)</p>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distanceData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#111430', borderColor: 'rgba(108, 92, 231, 0.3)', borderRadius: '12px' }}
                formatter={(value: any) => [`${value}M km`, 'Distance']}
              />
              <Bar dataKey="distance" fill="#FFC947" radius={[6, 6, 0, 0]}>
                {distanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 2 ? '#6C5CE7' : '#FFC947'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Space Agency Share Pie Chart */}
      <div className="bg-[#111430]/60 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
        <div>
          <h4 className="font-display font-semibold text-white text-base">Agency Fleets</h4>
          <p className="text-xs text-slate-400 mt-1 mb-4">Approximate distribution of cataloged space assets</p>
        </div>
        <div className="h-[250px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={agencyData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {agencyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#111430', borderColor: 'rgba(108, 92, 231, 0.3)', borderRadius: '12px' }}
                formatter={(value: any) => [`${value}%`, 'Catalog Share']}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconSize={8}
                iconType="circle"
                wrapperStyle={{ fontSize: '10px', color: '#94A3B8' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
