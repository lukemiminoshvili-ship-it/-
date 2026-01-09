import React from 'react';
import { PlayerStats } from '../types';
import { PRICES } from '../constants';

interface Props {
  stats: PlayerStats;
  onBack: () => void;
  onUnlockVip: () => void;
}

const Shop: React.FC<Props> = ({ stats, onBack, onUnlockVip }) => {
  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all text-white active:scale-90"
        >
          ⬅
        </button>
        <h2 className="text-2xl font-black text-white">მაღაზია</h2>
        <div className="bg-yellow-400 text-black px-4 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-lg border-b-2 border-yellow-700">
          <span className="text-lg">🪙</span>
          <span className="font-black">{stats.coins.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-6 overflow-y-auto scrollbar-hide">
        {/* VIP Section */}
        <div className="p-6 bg-gradient-to-br from-yellow-500/30 to-orange-600/30 border-2 border-yellow-500/50 rounded-[32px] shadow-xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-7xl opacity-20 transform group-hover:rotate-12 transition-transform">
            👑
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-black text-yellow-400 mb-1">VIP პაკეტი</h3>
                <p className="text-sm text-yellow-100/70 font-bold leading-tight">
                  მიიღეთ წვდომა ექსტრემალურ <br /> ტურებზე და გაორმაგებულ ჯილდოზე!
                </p>
              </div>
            </div>

            {stats.unlockedVip ? (
              <div className="w-full py-4 bg-green-500/30 text-green-300 border border-green-500/50 rounded-2xl text-center font-black flex items-center justify-center gap-2">
                <span>უკვე გააქტიურებულია</span>
                <span className="text-xl">✅</span>
              </div>
            ) : (
              <button
                onClick={onUnlockVip}
                disabled={stats.coins < PRICES.VIP_UNLOCK}
                className={`w-full py-4 rounded-2xl font-black text-lg shadow-lg transition-all active:scale-95 ${stats.coins >= PRICES.VIP_UNLOCK
                    ? 'bg-yellow-400 text-black hover:bg-yellow-300 border-b-4 border-yellow-700 active:border-b-0'
                    : 'bg-white/10 text-white/40 cursor-not-allowed grayscale'
                  }`}
              >
                {stats.coins >= PRICES.VIP_UNLOCK
                  ? `განბლოკვა 🪙 ${PRICES.VIP_UNLOCK}`
                  : `აკლია ${PRICES.VIP_UNLOCK - stats.coins} 🪙`}
              </button>
            )}
          </div>
        </div>

        {/* Placeholder Sections */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-[32px] flex justify-between items-center opacity-60">
          <div>
            <h3 className="text-xl font-black text-white">ახალი თემები</h3>
            <p className="text-sm text-white/50">შეცვალე თამაშის ვიზუალი</p>
          </div>
          <div className="text-[10px] font-black uppercase bg-indigo-500/30 text-indigo-300 px-3 py-1.5 rounded-full border border-indigo-500/50 tracking-widest">
            მალე
          </div>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-[32px] flex justify-between items-center opacity-60">
          <div>
            <h3 className="text-xl font-black text-white">მინიშნებები</h3>
            <p className="text-sm text-white/50">შეიძინე მინიშნებების პაკეტი</p>
          </div>
          <div className="text-[10px] font-black uppercase bg-indigo-500/30 text-indigo-300 px-3 py-1.5 rounded-full border border-indigo-500/50 tracking-widest">
            მალე
          </div>
        </div>
      </div>

      <div className="mt-auto text-center p-6 opacity-30 text-xs font-bold uppercase tracking-[0.2em] text-white">
        Next Update: February 2026
      </div>
    </div>
  );
};

export default Shop;