
import React, { useEffect } from 'react';
import { BackgroundStars, Lantern, HangingMoon } from './Decorations';

const EidMubarak: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0f1f] to-[#3a1c3b] flex flex-col items-center justify-center p-8 relative overflow-hidden text-center">
      <BackgroundStars />
      
      {/* Hanging Decor */}
      <div className="absolute top-0 left-0 right-0 flex justify-around px-10">
        <Lantern className="mt-[-10px]" />
        <HangingMoon className="mt-[-20px]" />
        <Lantern className="mt-[-5px]" />
        <HangingMoon className="mt-[-15px]" />
        <Lantern className="mt-[-12px]" />
      </div>

      <div className="z-10 space-y-10 animate-[fadeInUp_1.5s_ease-out]">
        <div className="space-y-4">
          <h2 className="text-gold text-2xl font-dancing tracking-widest uppercase glow-gold">Taqabbalallahu Minna Wa Minkum</h2>
          <h1 className="text-7xl md:text-9xl font-playfair text-white italic drop-shadow-2xl">
            Eid <span className="text-[#d4af37]">Mubarak</span>
          </h1>
        </div>

        <p className="max-w-md mx-auto text-pink-100/80 text-lg leading-relaxed font-light">
          May the divine blessings of Allah bring you hope, faith, and joy on this special day and always. 
          Wishing you a blessed celebration with your loved ones.
        </p>

        <div className="pt-10">
          <button 
            onClick={onBack}
            className="bg-white/10 hover:bg-white/20 border border-[#d4af37]/30 text-[#d4af37] px-10 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 glass"
          >
            Return to Memories
          </button>
        </div>
      </div>

      {/* Floating lanterns at bottom */}
      <div className="absolute bottom-[-50px] flex gap-10 opacity-30">
         {[...Array(8)].map((_, i) => (
             <div key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.4}s` }}>🏮</div>
         ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default EidMubarak;
