
import React from 'react';
import { Tour, PlayerStats } from '../types';
import { PRICES } from '../constants';

interface Props {
  tours: Tour[];
  stats: PlayerStats;
  onSelectTour: (tour: Tour) => void;
  onBack: () => void;
  onUnlockVip: () => void;
}

const LevelMap: React.FC<Props> = ({ tours, stats, onSelectTour, onBack, onUnlockVip }) => {
  const isTourUnlocked = (tour: Tour) => {
    if (tour.isVip) return stats.unlockedVip;
    if (tour.id === 1) return true;
    return stats.completedTours.includes(tour.id - 1);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-8 px-2">
        <button onClick={onBack} className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
          ⬅
        </button>
        <h2 className="text-2xl font-bold">ტურების რუკა</h2>
        <div className="bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/50 flex items-center gap-1">
          <span className="text-yellow-400">🪙</span>
          <span className="font-bold text-yellow-400 text-sm">{stats.coins}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 px-2 pb-10 scrollbar-hide">
        {tours.map((tour) => {
          const unlocked = isTourUnlocked(tour);
          const completed = stats.completedTours.includes(tour.id);

          return (
            <div 
              key={tour.id}
              onClick={() => unlocked ? onSelectTour(tour) : tour.isVip && onUnlockVip()}
              className={`relative p-6 rounded-3xl cursor-pointer transition-all duration-300 transform active:scale-95 ${
                unlocked 
                  ? tour.isVip 
                    ? 'bg-gradient-to-br from-yellow-500/20 to-amber-600/30 border-2 border-yellow-500 shadow-lg shadow-yellow-500/10' 
                    : 'bg-white/10 hover:bg-white/15 border border-white/10'
                  : 'bg-black/30 opacity-60 border border-white/5 grayscale'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-indigo-400 mb-1 uppercase tracking-tighter">
                    {tour.isVip ? 'VIP ტური' : `ტური ${tour.id}`}
                  </div>
                  <h3 className={`text-xl font-bold ${tour.isVip ? 'text-yellow-400' : 'text-white'}`}>
                    {tour.name}
                  </h3>
                </div>
                <div className="text-3xl">
                  {completed ? '✅' : unlocked ? '▶' : tour.isVip ? '👑' : '🔒'}
                </div>
              </div>

              {!unlocked && tour.isVip && (
                <div className="mt-4 flex items-center justify-center py-2 bg-yellow-500 rounded-xl text-black font-bold text-sm">
                  განბლოკვა 🪙 {PRICES.VIP_UNLOCK}
                </div>
              )}
            </div>
          );
        })}

        {/* Placeholder for future levels */}
        <div className="p-6 rounded-3xl border border-dashed border-white/10 text-center text-white/20 font-bold italic">
          მალე დაემატება...
        </div>
      </div>
    </div>
  );
};

export default LevelMap;
