
import React, { useState, useEffect } from 'react';
import { DailyData, AppView } from './types';
import LandingPage from './components/LandingPage';
import DailyPlanner from './components/DailyPlanner';
import MonthlyTracker from './components/MonthlyTracker';
import ImageEditor from './components/ImageEditor';
import Navigation from './components/Navigation';
import IntroSplash from './components/IntroSplash';
import EidMubarak from './components/EidMubarak';
import { BackgroundStars, Lantern, HangingMoon } from './components/Decorations';

const STORAGE_KEY = 'ramadan_planner_data';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('intro');
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [allDaysData, setAllDaysData] = useState<Record<number, DailyData>>({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setAllDaysData(JSON.parse(saved));
    }
  }, []);

  const saveData = (day: number, data: DailyData) => {
    const newData = { ...allDaysData, [day]: data };
    setAllDaysData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const renderView = () => {
    switch (view) {
      case 'intro':
        return <IntroSplash onComplete={() => setView('landing')} />;
      case 'landing':
        return <LandingPage onStart={() => setView('planner')} />;
      case 'planner':
        return (
          <DailyPlanner 
            day={currentDay} 
            data={allDaysData[currentDay]} 
            onSave={(data) => saveData(currentDay, data)}
            onDayChange={(d) => setCurrentDay(d)}
          />
        );
      case 'tracker':
        return <MonthlyTracker data={allDaysData} onSelectDay={(d) => { 
          if (d > 30) setView('eid');
          else { setCurrentDay(d); setView('planner'); }
        }} />;
      case 'ai-memories':
        return <ImageEditor />;
      case 'eid':
        return <EidMubarak onBack={() => setView('tracker')} />;
      default:
        return <LandingPage onStart={() => setView('planner')} />;
    }
  };

  const isDarkBaseView = view === 'intro' || view === 'eid' || view === 'landing';

  return (
    <div className={`min-h-screen flex flex-col max-w-4xl mx-auto shadow-2xl relative overflow-hidden transition-colors duration-1000 ${isDarkBaseView ? 'bg-[#0a0a0a]' : 'bg-[#fff5f7]'}`}>
      {/* Universal Background Elements */}
      {view !== 'intro' && <BackgroundStars />}
      
      {/* Top Hanging Decor - Persistent on major functional screens */}
      {(view === 'planner' || view === 'tracker' || view === 'ai-memories') && (
        <div className="absolute top-0 left-0 right-0 h-32 flex justify-between px-8 pointer-events-none opacity-60">
          <Lantern />
          <HangingMoon className="hidden md:block" />
          <Lantern />
          <HangingMoon className="hidden md:block" />
          <Lantern />
        </div>
      )}

      <main className="flex-1 overflow-y-auto pb-20 relative z-10">
        {renderView()}
      </main>

      {view !== 'landing' && view !== 'intro' && view !== 'eid' && (
        <Navigation currentView={view} onViewChange={setView} />
      )}
    </div>
  );
};

export default App;
