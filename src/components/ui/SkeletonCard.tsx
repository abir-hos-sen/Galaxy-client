import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="w-full h-[480px] bg-[#111430]/30 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between animate-pulse">
      <div>
        {/* Mock Image */}
        <div className="w-full h-[200px] bg-slate-800" />

        {/* Mock Body */}
        <div className="p-5 flex flex-col space-y-4">
          {/* Mock Rating */}
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-3 w-3 bg-slate-800 rounded-full" />
            ))}
          </div>

          {/* Mock Title */}
          <div className="h-5 bg-slate-800 rounded-md w-3/4" />

          {/* Mock Description */}
          <div className="space-y-2">
            <div className="h-3.5 bg-slate-800 rounded-md w-full" />
            <div className="h-3.5 bg-slate-800 rounded-md w-full" />
            <div className="h-3.5 bg-slate-800 rounded-md w-2/3" />
          </div>
        </div>
      </div>

      {/* Mock Footer */}
      <div className="p-5 space-y-4">
        {/* Mock Meta */}
        <div className="grid grid-cols-2 gap-2">
          <div className="h-3 bg-slate-800 rounded-md w-3/4" />
          <div className="h-3 bg-slate-800 rounded-md w-3/4" />
        </div>
        
        {/* Mock Button */}
        <div className="h-10 bg-slate-800 rounded-xl w-full" />
      </div>
    </div>
  );
};
