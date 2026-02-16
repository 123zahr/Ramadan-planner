
import React from 'react';
import { DailyData, PrayerEntry } from '../types';

interface Props {
  data: Record<number, DailyData>;
  onSelectDay: (day: number) => void;
}

const MonthlyTracker: React.FC<Props> = ({ data, onSelectDay }) => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const getProgressColor = (day: number) => {
    const dayData = data[day];
    if (!dayData) return 'bg-white/40';
    
    let count = 0;
    (Object.values(dayData.prayers) as PrayerEntry[]).forEach(p => {
      if (p.farz) count++;
      if (p.sunnat) count++;
      if (p.nafil) count++;
    });

    if (count > 15) return 'bg-green-300/80';
    if (count > 5) return 'bg-yellow-200/80';
    return 'bg-pink-100/80';
  };

  return (
    <div className="p-8 relative">
        <div className="text-center mb-10 mt-10">
            <h2 className="text-5xl font-dancing text-pink-500 mb-2">Ramadan Tracker</h2>
            <p className="text-gray-500 italic">Tracking your 30-day journey of faith</p>
        </div>

        <div className="grid grid-cols-5 md:grid-cols-6 gap-4">
            {days.map(day => (
                <button
                    key={day}
                    onClick={() => onSelectDay(day)}
                    className={`aspect-square flex flex-col items-center justify-center rounded-2xl border border-white/50 glass transition-all transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-lg ${getProgressColor(day)}`}
                >
                    <span className="text-[10px] text-gray-500 font-bold uppercase">Day</span>
                    <span className="text-2xl font-bold text-gray-800">{day}</span>
                </button>
            ))}
            
            {/* Special Eid Button */}
            <button
                onClick={() => onSelectDay(31)}
                className="aspect-square flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 text-white shadow-lg transform hover:scale-110 transition-all border-2 border-white glow-gold"
            >
                <span className="text-[10px] font-bold">THE DAY</span>
                <span className="text-xl font-bold">EID</span>
                <span className="text-xs">✨</span>
            </button>
        </div>

        <div className="mt-12 bg-white/40 glass p-6 rounded-3xl border border-white/50 text-center">
            <h3 className="font-bold mb-4 text-pink-700 uppercase tracking-widest text-xs">Progress Legend</h3>
            <div className="flex justify-center flex-wrap gap-6 text-[10px] font-bold uppercase">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-white/40 border border-gray-300 rounded-sm"></div>
                    <span>No Entry</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-pink-100 border border-pink-200 rounded-sm"></div>
                    <span>Beginner</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-200 border border-yellow-300 rounded-sm"></div>
                    <span>Steadfast</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-300 border border-green-400 rounded-sm"></div>
                    <span>Divine Focus</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default MonthlyTracker;
