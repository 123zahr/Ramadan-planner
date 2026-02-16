
import React from 'react';
import { AppView } from '../types';

interface Props {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

const Navigation: React.FC<Props> = ({ currentView, onViewChange }) => {
  const navItems: { id: AppView; icon: string; label: string }[] = [
    { id: 'planner', icon: '📝', label: 'Plan' },
    { id: 'tracker', icon: '📊', label: 'Stats' },
    { id: 'ai-memories', icon: '✨', label: 'Memories' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-4xl mx-auto bg-white/80 backdrop-blur-md border-t border-pink-100 flex justify-around p-3 z-50">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onViewChange(item.id)}
          className={`flex flex-col items-center flex-1 transition-all ${
            currentView === item.id ? 'text-pink-500 scale-110' : 'text-gray-400'
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="text-[10px] font-bold uppercase mt-1">{item.label}</span>
          {currentView === item.id && (
            <div className="w-1 h-1 bg-pink-500 rounded-full mt-1"></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
