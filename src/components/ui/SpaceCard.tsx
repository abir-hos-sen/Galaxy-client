import React from 'react';
import Link from 'next/link';
import { Star, MapPin, Calendar, Compass, ShieldAlert } from 'lucide-react';

interface SpaceCardProps {
  entry: {
    _id: string;
    title: string;
    category: 'Mission' | 'Planet' | 'Star' | 'Galaxy' | 'Nebula' | 'Astronaut';
    shortDescription: string;
    imageUrl: string;
    date: string | Date;
    distanceFromEarth: string;
    agency: string;
    rating: number;
    status: 'Active' | 'Completed' | 'Planned';
  };
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ entry }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Mission':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      case 'Planet':
        return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
      case 'Star':
        return 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
      case 'Galaxy':
        return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
      case 'Nebula':
        return 'bg-pink-500/20 text-pink-300 border border-pink-500/30';
      case 'Astronaut':
        return 'bg-teal-500/20 text-teal-300 border border-teal-500/30';
      default:
        return 'bg-[#6C5CE7]/20 text-[#6C5CE7] border border-[#6C5CE7]/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'Completed':
        return 'bg-[#94A3B8]';
      case 'Planned':
        return 'bg-[#FFC947]';
      default:
        return 'bg-slate-500';
    }
  };

  const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="group relative w-full h-[480px] bg-[#111430]/60 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:border-[#6C5CE7]/50 hover:shadow-[0_0_30px_rgba(108,92,231,0.25)]">
      <div>
        {/* Card Image */}
        <div className="relative w-full h-[200px] overflow-hidden bg-slate-900">
          <img
            src={entry.imageUrl}
            alt={entry.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Category Badge */}
          <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(entry.category)}`}>
            {entry.category}
          </span>
          {/* Status Dot */}
          <div className="absolute top-4 right-4 flex items-center space-x-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-slate-700/50">
            <span className={`h-2.5 w-2.5 rounded-full ${getStatusColor(entry.status)}`} />
            <span className="text-[10px] font-medium text-slate-300">{entry.status}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col">
          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.round(entry.rating) ? 'text-[#FFC947] fill-[#FFC947]' : 'text-slate-600'
                }`}
              />
            ))}
            <span className="text-xs font-semibold text-slate-400 ml-1.5">
              {entry.rating > 0 ? entry.rating.toFixed(1) : 'No reviews'}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-lg text-white group-hover:text-[#6C5CE7] transition-colors duration-200 truncate">
            {entry.title}
          </h3>

          {/* Short Description */}
          <p className="text-sm text-[#94A3B8] mt-2 line-clamp-3 leading-relaxed">
            {entry.shortDescription}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-5 pt-3 border-t border-slate-800/40 bg-slate-900/10">
        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-2 text-xs text-[#94A3B8] mb-4">
          <div className="flex items-center space-x-1.5 min-w-0">
            <Compass className="h-3.5 w-3.5 text-[#6C5CE7] shrink-0" />
            <span className="truncate" title={entry.distanceFromEarth}>
              {entry.distanceFromEarth}
            </span>
          </div>
          <div className="flex items-center space-x-1.5 min-w-0">
            <Calendar className="h-3.5 w-3.5 text-[#FFC947] shrink-0" />
            <span className="truncate" title={formattedDate}>
              {formattedDate}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/explore/${entry._id}`}
          className="block w-full text-center bg-slate-800 hover:bg-[#6C5CE7] text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 group-hover:bg-[#6C5CE7]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
