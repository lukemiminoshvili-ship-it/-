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
    <div className="flex flex-col items-center justify-between h-full py-12 w-full max-w-md mx-auto overflow-hidden">
      <div className="text-center relative w-full px-6">
        {/* ენის გადასართველი - განახლებული სტილით */}
        <button
          onClick={onToggleLang}
          className="absolute right-6 top-0 bg-white/10 px-4 py-2 rounded-full border border-white/20 transition-all hover:bg-white/20 active:scale-90 z-10 flex items-center gap-2 text-white font-black text-xs tracking-wider backdrop-blur-md"
        >
          {isKa ? (
            <><span>GEO</span> <span>🇬🇪</span></>
          ) : (
            <><span>ENG</span> <span>🇬🇧</span></>
          )}
        </button>

        {/* ანიმაციური ემოჯი (index.css-ის float ანიმაციით) */}
        <div className="flex justify-center mb-6 mt-16">
          <div className="text-8xl animate-float drop-shadow-2xl">🎮</div>
        </div>

        <h1 className="text-5xl font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-sm">
          EMOJI WORDS
        </h1>
        <p className="text-indigo-200 text-lg font-bold opacity-90">
          {isKa ? 'გამოიცანი და მოიგე! 🪙' : 'Guess and Win! 🪙'}
        </p>
      </div>

      <div className="w-full space-y-4 px-8">
        {/* Play Button */}
        <button
          onClick={onPlay}
          className="w-full py-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-[32px] text-2xl font-black text-white shadow-xl shadow-green-900/40 transition-all active:scale-95 hover:brightness-110 border-b-4 border-green-800"
        >
          {isKa ? 'თამაში ▶' : 'Play ▶'}
        </button>

        {/* Shop Button */}
        <button
          onClick={onShop}
          className="w-full py-4 bg-white/10 border border-white/20 rounded-[32px] text-xl font-black text-white transition-all hover:bg-white/20 active:scale-95 backdrop-blur-md"
        >
          {isKa ? 'მაღაზია 🛍' : 'Shop 🛍'}
        </button>

        {/* Coins Display */}
        <div className="flex justify-center pt-4">
          <div className="bg-black/40 px-8 py-2.5 rounded-full border border-yellow-500/50 flex items-center gap-3 backdrop-blur-sm shadow-inner">
            <span className="text-2xl animate-pulse">🪙</span>
            <span className="font-black text-yellow-400 text-xl tracking-tight">
              {Number(stats.coins).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">
        Level Designer: Professional Dev
      </div>
    </div>
  );
};

export default HomeScreen;