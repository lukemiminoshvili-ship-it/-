import React from 'react';
import { PlayerStats } from '../types';

interface Props {
  onPlay: () => void;
  onShop: () => void;
  onToggleLang: () => void;
  stats: PlayerStats;
}

const HomeScreen: React.FC<Props> = ({ onPlay, onShop, onToggleLang, stats }) => {
  const isKa = stats.language === 'ka';

  return (
    <div className="flex flex-col items-center justify-between h-full py-12 w-full max-w-md mx-auto">
      <div className="text-center relative w-full px-6">
        {/* ენა გადასართველი */}
        <button
          onClick={onToggleLang}
          className="absolute right-6 top-0 bg-white/10 p-3 rounded-full border border-white/20 transition-all hover:bg-white/20 active:scale-90 z-10"
        >
          <span className="text-xl">{isKa ? '🇬🇪' : '🇬🇧'}</span>
        </button>

        <div className="flex justify-center mb-6 mt-12">
          <div className="text-7xl animate-bounce">🎮</div>
        </div>

        <h1 className="text-5xl font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-sm">
          EMOJI WORDS
        </h1>
        <p className="text-indigo-200 text-lg font-medium opacity-90">
          {isKa ? 'გამოიცანი და მოიგე! 🪙' : 'Guess and Win! 🪙'}
        </p>
      </div>

      <div className="w-full space-y-4 px-8">
        {/* Play Button */}
        <button
          onClick={onPlay}
          className="w-full py-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl text-2xl font-black text-white shadow-xl shadow-green-900/40 transition-all active:scale-95 hover:brightness-110"
        >
          {isKa ? 'თამაში ▶' : 'Play ▶'}
        </button>

        {/* Shop Button */}
        <button
          onClick={onShop}
          className="w-full py-4 bg-white/10 border border-white/20 rounded-3xl text-xl font-bold text-white transition-all hover:bg-white/20 active:scale-95 backdrop-blur-md"
        >
          {isKa ? 'მაღაზია 🛍' : 'Shop 🛍'}
        </button>

        {/* Coins Display */}
        <div className="flex justify-center pt-4">
          <div className="bg-black/40 px-6 py-2 rounded-full border border-yellow-500/50 flex items-center gap-2 backdrop-blur-sm">
            <span className="text-xl">🪙</span>
            <span className="font-black text-yellow-400 text-lg">
              {Number(stats.coins).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-white/30 font-bold uppercase tracking-[0.3em]">
        Level Designer: Professional Dev
      </div>
    </div>
  );
};

export default HomeScreen;