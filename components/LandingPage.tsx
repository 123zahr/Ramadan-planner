
import React from 'react';
import { Lantern, HangingMoon } from './Decorations';

interface Props {
  onStart: () => void;
}

const LandingPage: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-8 relative overflow-hidden">
      
      {/* Hanging elements for landing */}
      <div className="absolute top-0 w-full flex justify-around opacity-80">
        <Lantern className="mt-[-10px]" />
        <HangingMoon className="mt-[-20px]" />
        <Lantern className="mt-[-5px]" />
      </div>

      <div className="text-center z-10 space-y-8 animate-[fadeIn_2s_ease-out]">
        <div className="relative inline-block">
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-4xl animate-pulse text-yellow-500 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">🌙</span>
            <h1 className="text-7xl md:text-9xl font-playfair italic text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-tight">
              Ramadan<br/>
              <span className="text-[#d4af37] font-dancing lowercase tracking-normal">Planner</span>
            </h1>
        </div>
        
        <p className="text-gray-400 max-w-sm mx-auto font-light tracking-widest text-xs uppercase opacity-60">
          Cultivate Mindfulness • Track Progress • Capture Memories
        </p>

        <div className="pt-10">
            <button 
              onClick={onStart}
              className="group relative bg-[#d4af37] text-black font-bold py-5 px-14 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all transform hover:-translate-y-1 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">ENTER THE SANCTUARY</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
        </div>
      </div>

      {/* Ground fog / clouds */}
      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-white/5 to-transparent pointer-events-none"></div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
