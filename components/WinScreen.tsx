import React from 'react';
import { Language } from '../types';

interface Props {
  reward: number;
  onNext: () => void;
  isTourComplete: boolean;
  lang: Language;
}

const WinScreen: React.FC<Props> = ({ reward, onNext, isTourComplete, lang }) => {
  const isKa = String(lang) === 'ka';

  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 p-6 animate-in fade-in zoom-in duration-500 w-full max-w-md mx-auto">
      {/* ანიმაციური ემოჯი */}
      <div className="text-9xl animate-bounce drop-shadow-2xl">
        {isTourComplete ? '🏆' : '🎉'}
      </div>

      <div>
        <h2 className="text-5xl font-black mb-2 text-white drop-shadow-lg">
          {isTourComplete
            ? (isKa ? 'ტური დასრულდა!' : 'Tour Complete!')
            : (isKa ? 'ყოჩაღ!' : 'Well Done!')}
        </h2>
        <p className="text-2xl text-yellow-300 font-bold opacity-90 animate-pulse">
          {isKa ? 'სწორი პასუხია!' : 'Correct Answer!'}
        </p>
      </div>

      {/* ჯილდოს ბარათი */}
      <div className="bg-yellow-400 text-black px-10 py-5 rounded-[32px] shadow-2xl shadow-yellow-500/40 transform rotate-3 border-4 border-white">
        <div className="text-xs font-black uppercase tracking-widest opacity-70 mb-1">
          {isKa ? 'მიღებული ჯილდო' : 'Reward Gained'}
        </div>
        <div className="text-5xl font-black flex items-center justify-center gap-3">
          <span>🪙</span>
          <span>+{reward}</span>
        </div>
      </div>

      {/* ღილაკი */}
      <button
        onClick={onNext}
        className="w-full py-5 bg-white text-indigo-900 rounded-3xl text-2xl font-black transition-all active:scale-90 hover:scale-105 shadow-[0_10px_0_rgb(224,224,224)] active:shadow-none active:translate-y-2"
      >
        {isKa ? 'გაგრძელება' : 'Next'} {isTourComplete ? (isKa ? '▶' : 'Tour ▶') : (isKa ? '▶' : 'Round ▶')}
      </button>

      {isTourComplete && (
        <p className="text-white/50 text-sm font-bold uppercase tracking-widest">
          {isKa ? 'ახალი ტური განბლოკილია!' : 'New Tour Unlocked!'}
        </p>
      )}
    </div>
  );
};

export default WinScreen;