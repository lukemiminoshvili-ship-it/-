import React from 'react';
import { PlayerStats } from '../types';
import { PRICES } from '../constants';

interface Props {
  stats: PlayerStats;
  onBack: () => void;
  // დავამატეთ ფუნქცია VIP-ის განსაბლოკად
  onUnlockVip: () => void;
}

const Shop: React.FC<Props> = ({ stats, onBack, onUnlockVip }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-8 px-2">
        <button onClick={onBack} className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
          ⬅
        </button>
        <h2 className="text-2xl font-bold">მაღაზია</h2>
        <div className="bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/50 flex items-center gap-1">
          <span className="text-yellow-400">🪙</span>
          <span className="font-bold text-yellow-400 text-sm">{stats.coins}</span>
        </div>
      </div>

      <div className="space-y-4 px-2">
        <div className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-3xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-bold text-yellow-400">VIP პაკეტი</h3>
              <p className="text-sm text-yellow-200/60">მიიღეთ წვდომა ექსტრემალურ ტურებზე</p>
            </div>
            <div className="text-3xl">👑</div>
          </div>

          {stats.unlockedVip ? (
            <div className="w-full py-3 bg-green-500/20 text-green-400 border border-green-500/50 rounded-xl text-center font-bold">
              უკვე გააქტიურებულია ✅
            </div>
          ) : (
            <button
              // ახლა ღილაკი რეალურად იყიდის VIP-ს
              onClick={onUnlockVip}
              disabled={stats.coins < PRICES.VIP_UNLOCK}
              className={`w-full py-3 rounded-xl font-bold transition-transform active:scale-95 ${stats.coins >= PRICES.VIP_UNLOCK
                  ? 'bg-yellow-500 text-black hover:scale-105'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
            >
              {stats.coins >= PRICES.VIP_UNLOCK
                ? `განბლოკვა 🪙 ${PRICES.VIP_UNLOCK}`
                : 'არ გაქვთ საკმარისი მონეტები'}
            </button>
          )}
        </div>

        {/* ... დანარჩენი სექციები უცვლელია ... */}
        <div className="p-6 glass rounded-3xl flex justify-between items-center opacity-50">
          <div>
            <h3 className="text-xl font-bold">ახალი თემები</h3>
            <p className="text-sm">შეცვალე თამაშის ვიზუალი</p>
          </div>
          <div className="text-xs uppercase bg-white/10 px-2 py-1 rounded">მალე</div>
        </div>
      </div>

      <div className="mt-auto text-center p-8 opacity-40 text-sm italic">
        უფრო მეტი კონტენტი დაემატება შემდეგ განახლებაში!
      </div>
    </div>
  );
};

export default Shop;