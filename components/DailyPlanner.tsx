
import React, { useState, useEffect } from 'react';
import { DailyData, PrayerEntry } from '../types';

interface Props {
  day: number;
  data?: DailyData;
  onSave: (data: DailyData) => void;
  onDayChange: (day: number) => void;
}

const DEFAULT_DATA = (day: number): DailyData => ({
  date: new Date().toLocaleDateString(),
  fastingDay: day,
  quran: {
    recitation: { surah: '', ayah: '' },
    memorization: { surah: '', ayah: '' },
  },
  prayers: {
    fajr: { farz: false, sunnat: false, nafil: false },
    zohar: { farz: false, sunnat: false, nafil: false },
    asr: { farz: false, sunnat: false, nafil: false },
    magrib: { farz: false, sunnat: false, nafil: false },
    ishan: { farz: false, sunnat: false, nafil: false },
    tarawih: { farz: false, sunnat: false, nafil: false },
    witr: { farz: false, sunnat: false, nafil: false },
    tahajjud: { farz: false, sunnat: false, nafil: false },
    extra: { farz: false, sunnat: false, nafil: false },
  },
  health: {
    water: 0,
    sleep: '',
    skincare: { morning: false, night: false },
    exercise: false,
    selfcare: false,
  },
  goodDeeds: {
    zikr: false,
    names99: false,
    charity: false,
    custom: [],
  },
  goals: Array(5).fill(null).map(() => ({ text: '', achieved: false })),
  gratefulFor: '',
  mood: null,
  notes: '',
});

const DailyPlanner: React.FC<Props> = ({ day, data, onSave, onDayChange }) => {
  const [localData, setLocalData] = useState<DailyData>(data || DEFAULT_DATA(day));

  useEffect(() => {
    setLocalData(data || DEFAULT_DATA(day));
  }, [day, data]);

  const updateField = (path: string, value: any) => {
    const keys = path.split('.');
    const newData = { ...localData };
    let current: any = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setLocalData(newData);
    onSave(newData);
  };

  const handlePrayerToggle = (prayer: keyof DailyData['prayers'], type: keyof PrayerEntry) => {
    const newVal = !localData.prayers[prayer][type];
    updateField(`prayers.${prayer}.${type}`, newVal);
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <header className="flex justify-between items-center border-b border-pink-100 pb-4">
        <div>
          <h2 className="text-3xl font-dancing text-pink-500">Daily Planner</h2>
          <p className="text-gray-500 text-sm">Fasting Day: <span className="font-bold text-pink-600">{day}</span></p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onDayChange(Math.max(1, day - 1))} className="p-2 bg-pink-50 rounded hover:bg-pink-100 transition">←</button>
          <button onClick={() => onDayChange(Math.min(30, day + 1))} className="p-2 bg-pink-50 rounded hover:bg-pink-100 transition">→</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quran Recitation */}
        <section className="bg-pink-50 p-4 rounded-2xl shadow-sm border border-pink-100">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">📖 Quran Recitation</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <input 
                placeholder="Surah" 
                className="p-2 rounded border border-white focus:outline-pink-300"
                value={localData.quran.recitation.surah}
                onChange={(e) => updateField('quran.recitation.surah', e.target.value)}
              />
              <input 
                placeholder="Ayah" 
                className="p-2 rounded border border-white focus:outline-pink-300"
                value={localData.quran.recitation.ayah}
                onChange={(e) => updateField('quran.recitation.ayah', e.target.value)}
              />
            </div>
            <h4 className="text-sm font-semibold text-pink-700">Memorization</h4>
            <div className="grid grid-cols-2 gap-2">
              <input 
                placeholder="Surah" 
                className="p-2 rounded border border-white focus:outline-pink-300"
                value={localData.quran.memorization.surah}
                onChange={(e) => updateField('quran.memorization.surah', e.target.value)}
              />
              <input 
                placeholder="Ayah" 
                className="p-2 rounded border border-white focus:outline-pink-300"
                value={localData.quran.memorization.ayah}
                onChange={(e) => updateField('quran.memorization.ayah', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Health */}
        <section className="bg-blue-50 p-4 rounded-2xl shadow-sm border border-blue-100">
          <h3 className="font-bold text-lg mb-3">💧 Health</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">Water:</span>
              <div className="flex gap-1">
                {[...Array(8)].map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => updateField('health.water', i + 1)}
                    className={`w-6 h-6 rounded border ${localData.health.water > i ? 'bg-blue-400 border-blue-500' : 'bg-white border-blue-200'}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm">Sleep:</span>
                <input 
                  className="p-1 text-sm rounded flex-1 border border-white" 
                  placeholder="e.g. 7 hours"
                  value={localData.health.sleep}
                  onChange={(e) => updateField('health.sleep', e.target.value)}
                />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={localData.health.skincare.morning} onChange={(e) => updateField('health.skincare.morning', e.target.checked)} /> Skincare (AM)
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={localData.health.skincare.night} onChange={(e) => updateField('health.skincare.night', e.target.checked)} /> Skincare (PM)
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={localData.health.exercise} onChange={(e) => updateField('health.exercise', e.target.checked)} /> Exercise
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={localData.health.selfcare} onChange={(e) => updateField('health.selfcare', e.target.checked)} /> Selfcare
              </label>
            </div>
          </div>
        </section>

        {/* Prayer Tracker */}
        <section className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 md:col-span-2">
          <h3 className="font-bold text-lg mb-4 text-center">🕌 Prayer Tracker</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="text-xs text-gray-500 uppercase tracking-wider">
                  <th className="pb-2"></th>
                  <th className="pb-2">Farz</th>
                  <th className="pb-2">Sunnat</th>
                  <th className="pb-2">Nafil</th>
                </tr>
              </thead>
              <tbody>
                {(Object.keys(localData.prayers) as Array<keyof DailyData['prayers']>).map((p) => (
                  <tr key={p} className="border-t border-gray-50">
                    <td className="py-2 text-left font-medium capitalize text-sm">{p === 'ishan' ? 'Isha' : p}</td>
                    <td className="py-2">
                      <input type="checkbox" checked={localData.prayers[p].farz} onChange={() => handlePrayerToggle(p, 'farz')} className="w-5 h-5 accent-pink-500" />
                    </td>
                    <td className="py-2">
                      <input type="checkbox" checked={localData.prayers[p].sunnat} onChange={() => handlePrayerToggle(p, 'sunnat')} className="w-5 h-5 accent-pink-500" />
                    </td>
                    <td className="py-2">
                      <input type="checkbox" checked={localData.prayers[p].nafil} onChange={() => handlePrayerToggle(p, 'nafil')} className="w-5 h-5 accent-pink-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Good Deeds & Goals */}
        <div className="space-y-6">
            <section className="bg-green-50 p-4 rounded-2xl border border-green-100">
                <h3 className="font-bold text-lg mb-3">✨ Good Deeds</h3>
                <div className="space-y-2">
                    {['zikr', 'names99', 'charity'].map((key) => (
                        <label key={key} className="flex items-center justify-between text-sm">
                            <span className="capitalize">{key === 'names99' ? '99 Names of Allah' : key}</span>
                            <input type="checkbox" checked={(localData.goodDeeds as any)[key]} onChange={(e) => updateField(`goodDeeds.${key}`, e.target.checked)} className="w-4 h-4" />
                        </label>
                    ))}
                </div>
            </section>

            <section className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                <h3 className="font-bold text-lg mb-3">🎯 Daily Goals</h3>
                <div className="space-y-2">
                    {localData.goals.map((goal, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <input 
                              placeholder={`Goal ${i+1}`} 
                              className="flex-1 text-sm p-1 rounded border border-white"
                              value={goal.text}
                              onChange={(e) => {
                                const newGoals = [...localData.goals];
                                newGoals[i].text = e.target.value;
                                updateField('goals', newGoals);
                              }}
                            />
                            <input 
                              type="checkbox" 
                              checked={goal.achieved} 
                              onChange={(e) => {
                                const newGoals = [...localData.goals];
                                newGoals[i].achieved = e.target.checked;
                                updateField('goals', newGoals);
                              }} 
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>

        {/* Gratitude & Mood */}
        <div className="space-y-6">
            <section className="bg-amber-50 p-4 rounded-2xl border border-amber-100 h-full">
                <h3 className="font-bold text-lg mb-2 text-amber-800 italic">Alhamdulillah, I am grateful for...</h3>
                <textarea 
                  className="w-full bg-white/50 p-3 rounded h-32 focus:outline-amber-300 resize-none"
                  value={localData.gratefulFor}
                  onChange={(e) => updateField('gratefulFor', e.target.value)}
                />
                
                <div className="mt-4 flex items-center justify-around">
                    <span className="text-sm font-bold text-amber-900">Mood:</span>
                    <button onClick={() => updateField('mood', 'happy')} className={`text-2xl grayscale transition hover:grayscale-0 ${localData.mood === 'happy' ? 'grayscale-0 scale-125' : ''}`}>😊</button>
                    <button onClick={() => updateField('mood', 'neutral')} className={`text-2xl grayscale transition hover:grayscale-0 ${localData.mood === 'neutral' ? 'grayscale-0 scale-125' : ''}`}>😐</button>
                    <button onClick={() => updateField('mood', 'sad')} className={`text-2xl grayscale transition hover:grayscale-0 ${localData.mood === 'sad' ? 'grayscale-0 scale-125' : ''}`}>😔</button>
                </div>
            </section>
        </div>
      </div>

      {/* Notes */}
      <section className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
        <h3 className="font-bold text-lg mb-2">Notes</h3>
        <textarea 
          className="w-full p-4 rounded min-h-[100px] border border-gray-200 focus:outline-pink-300"
          placeholder="Reflections, events, or reminders..."
          value={localData.notes}
          onChange={(e) => updateField('notes', e.target.value)}
        />
      </section>
    </div>
  );
};

export default DailyPlanner;
