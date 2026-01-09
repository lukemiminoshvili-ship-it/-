
import React from 'react';
import { Language } from '../types';

interface Props {
  reward: number;
  onNext: () => void;
  isTourComplete: boolean;
  lang: Language;
}

const WinScreen: React.FC<Props> = ({ reward, onNext, isTourComplete, lang }) => {
  const isKa = lang === 'ka';
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-in fade-in zoom-in duration-300">
      <div className="text-8xl">🎉</div>
      <div>
        <h2 className="text-4xl font-black mb-2 text-green-400">
          {isTourComplete ? (isKa ? 'ტური დასრულდა!' : 'Tour Complete!') : (isKa ? 'ყოჩაღ!' : 'Well Done!')}
        </h2>
        <p className="text-xl text-white/70">{isKa ? 'სწორია!' : 'Correct!'}</p>
      </div>

      <div className="bg-yellow-400 text-black px-8 py-4 rounded-3xl shadow-xl shadow-yellow-500/20 transform rotate-2">
        <div className="text-sm font-bold uppercase tracking-widest opacity-60">{isKa ? 'ჯილდო' : 'Reward'}</div>
        <div className="text-4xl font-black flex items-center justify-center gap-2">
          <span>🪙</span>
          <span>+{reward}</span>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="w-full max-w-xs py-4 bg-white text-indigo-900 rounded-2xl text-xl font-bold transition-transform active:scale-95 shadow-xl"
      >
        {isKa ? 'შემდეგი' : 'Next'} {isTourComplete ? (isKa ? 'ტური' : 'Tour') : (isKa ? 'რაუნდი' : 'Round')} ▶
      </button>
    </div>
  );
};

export default WinScreen;
