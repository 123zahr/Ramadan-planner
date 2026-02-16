
import React from 'react';

export const Lantern: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`animate-sway ${className}`}>
    <svg width="40" height="80" viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="glow-gold">
      <path d="M20 0V15" stroke="#D4AF37" strokeWidth="2"/>
      <rect x="10" y="15" width="20" height="30" rx="4" stroke="#D4AF37" fill="#FDF6E3" fillOpacity="0.8"/>
      <path d="M10 25H30M10 35H30" stroke="#D4AF37" strokeWidth="1"/>
      <path d="M15 45L10 60H30L25 45H15Z" fill="#D4AF37"/>
      <circle cx="20" cy="30" r="5" fill="#FFD700" className="animate-pulse" />
    </svg>
  </div>
);

export const HangingMoon: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`animate-sway ${className}`} style={{ animationDelay: '0.5s' }}>
    <svg width="30" height="70" viewBox="0 0 30 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="glow-gold">
      <path d="M15 0V20" stroke="#D4AF37" strokeWidth="1.5"/>
      <path d="M25 45C25 53.2843 18.2843 60 10 60C7.24264 60 4.67157 59.2548 2.45584 57.9442C7.31139 56.6322 11 52.2426 11 47C11 41.7574 7.31139 37.3678 2.45584 36.0558C4.67157 34.7452 7.24264 34 10 34C18.2843 34 25 40.7157 25 45Z" fill="#FFD700" stroke="#D4AF37"/>
    </svg>
  </div>
);

export const BackgroundStars: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(40)].map((_, i) => (
        <div 
          key={i} 
          className="absolute text-white animate-twinkle"
          style={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 10 + 5}px`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.5 + 0.2
          }}
        >
          ✦
        </div>
      ))}
    </div>
  );
};
