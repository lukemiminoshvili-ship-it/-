
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
    <div className="flex flex-col items-center justify-between h-full py-12">
      <div className="text-center relative w-full">
        <button 
          onClick={onToggleLang}
          className="absolute right-6 top-0 bg-white/10 p-3 rounded-full border border-white/20 transition-all hover:bg-white/20 active:scale-90"
        >
          {isKa ? '🇬🇪 ⇄ 🇬🇧' : '🇬🇧 ⇄ 🇬🇪'}
        </button>

        <div className="flex justify-center mb-6">
          <div className="text-6xl animate-float">🎮</div>
        </div>
        <h1 className="text-5xl font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
          EMOJI WORDS
        </h1>
        <p className="text-indigo-200 text-lg opacity-80">
          {isKa ? 'გამოიცანი და მოიგე! 🪙' : 'Guess and Win! 🪙'}
        </p>
      </div>

      <div className="w-full space-y-4 px-6">
        <button 
          onClick={onPlay}
          className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl text-2xl font-bold shadow-xl shadow-green-900/40 transition-transform active:scale-95 hover:scale-105"
        >
          {isKa ? 'თამაში ▶' : 'Play ▶'}
        </button>
        
        <button 
          onClick={onShop}
          className="w-full py-4 glass rounded-2xl text-xl font-bold transition-all hover:bg-white/20 active:scale-95"
        >
          {isKa ? 'მაღაზია 🛍' : 'Shop 🛍'}
        </button>

        <div className="flex justify-center gap-4 pt-4">
          <div className="bg-slate-800/80 px-4 py-2 rounded-full border border-yellow-500/50 flex items-center gap-2">
            <span className="text-xl">🪙</span>
            <span className="font-bold text-yellow-400">{stats.coins.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="text-xs text-indigo-300 opacity-50 uppercase tracking-widest">
        Level Designer: Professional Dev
      </div>
    </div>
  );
};

export default HomeScreen;
