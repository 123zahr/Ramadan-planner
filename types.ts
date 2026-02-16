
export interface PrayerEntry {
  farz: boolean;
  sunnat: boolean;
  nafil: boolean;
}

export interface DailyData {
  date: string;
  fastingDay: number;
  quran: {
    recitation: { surah: string; ayah: string };
    memorization: { surah: string; ayah: string };
  };
  prayers: {
    fajr: PrayerEntry;
    zohar: PrayerEntry;
    asr: PrayerEntry;
    magrib: PrayerEntry;
    ishan: PrayerEntry;
    tarawih: PrayerEntry;
    witr: PrayerEntry;
    tahajjud: PrayerEntry;
    extra: PrayerEntry;
  };
  health: {
    water: number; // 0-8
    sleep: string;
    skincare: { morning: boolean; night: boolean };
    exercise: boolean;
    selfcare: boolean;
  };
  goodDeeds: {
    zikr: boolean;
    names99: boolean;
    charity: boolean;
    custom: string[];
  };
  goals: { text: string; achieved: boolean }[];
  gratefulFor: string;
  mood: 'happy' | 'neutral' | 'sad' | null;
  notes: string;
}

export type AppView = 'intro' | 'landing' | 'planner' | 'tracker' | 'ai-memories' | 'eid';
