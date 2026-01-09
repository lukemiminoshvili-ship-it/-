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
  // უსაფრთხო შემოწმება ტურის განბლოკვაზე
  const isTourUnlocked = (tour: Tour) => {
    if (tour.isVip) return stats.unlockedVip;

    // თუ ID ტექსტია (მაგ. VIP), პირდაპირ დავაბრუნოთ unlockedVip სტატუსი
    if (typeof tour.id === 'string') return stats.unlockedVip;

    // პირველი ტური ყოველთვის ღიაა
    if (tour.id === 1) return true;

    // წინა ტურის შემოწმება (მხოლოდ რიცხვითი ID-ებისთვის)
    return stats.completedTours.includes(tour.id - 1);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-white">
          ⬅
        </button>
        <h2 className="text-2xl font-black text-white">ტურების რუკა</h2>
        <div className="bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/50 flex items-center gap-1">
          <span className="text-yellow-400">🪙</span>
          <span className="font-bold text-yellow-400 text-sm">{stats.coins}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-10 scrollbar-hide">
        {tours.map((tour) => {
          const unlocked = isTourUnlocked(tour);
          // უსაფრთხოებისათვის ID-ს ვინახავთ როგორც სტრინგს ან რიცხვს
          const completed = stats.completedTours.includes(tour.id as any);

          return (
            <div
              key={tour.id}
              onClick={() => unlocked ? onSelectTour(tour) : (tour.isVip && !stats.unlockedVip ? onUnlockVip() : null)}
              className={`relative p-6 rounded-3xl cursor-pointer transition-all duration-300 transform active:scale-95 ${unlocked
                  ? tour.isVip
                    ? 'bg-gradient-to-br from-yellow-500/30 to-amber-600/40 border-2 border-yellow-500 shadow-lg'
                    : 'bg-white/10 hover:bg-white/15 border border-white/10'
                  : 'bg-black/40 opacity-60 border border-white/5 grayscale'
                }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-[10px] font-black mb-1 uppercase tracking-widest ${tour.isVip ? 'text-yellow-400' : 'text-indigo-300'}`}>
                    {tour.isVip ? '💎 VIP ტური' : `📍 ტური ${tour.id}`}
                  </div>
                  <h3 className={`text-xl font-black ${tour.isVip ? 'text-yellow-400' : 'text-white'}`}>
                    {tour.name || 'უსახელო ტური'}
                  </h3>
                </div>
                <div className="text-3xl drop-shadow-md">
                  {completed ? '✅' : unlocked ? '▶️' : tour.isVip ? '👑' : '🔒'}
                </div>
              </div>

              {!unlocked && tour.isVip && (
                <div className="mt-4 flex items-center justify-center py-3 bg-yellow-400 hover:bg-yellow-500 rounded-2xl text-black font-black text-sm shadow-xl transition-colors">
                  განბლოკვა 🪙 {PRICES.VIP_UNLOCK}
                </div>
              )}
            </div>
          );
        })}

        <div className="p-8 rounded-3xl border-2 border-dashed border-white/10 text-center text-white/20 font-black italic">
          მალე დაემატება...
        </div>
      </div>
    </div>
  );
};

export default LevelMap;