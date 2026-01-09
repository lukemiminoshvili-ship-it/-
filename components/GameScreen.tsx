
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Tour, Language } from '../types';
import { GEORGIAN_KEYBOARD_MAP, PRICES, LATIN_TO_GEO, EMOJI_POOL_KA, EMOJI_POOL_EN } from '../constants';

interface Props {
  tour: Tour;
  roundIndex: number;
  onWin: (reward: number) => void;
  onBack: () => void;
  coins: number;
  onDeductCoins: (amount: number) => boolean;
  lang: Language;
}

const GameScreen: React.FC<Props> = ({ tour, roundIndex, onWin, onBack, coins, onDeductCoins, lang }) => {
  const round = tour.rounds[roundIndex];
  const answerChars = round.answer.split('');
  const emojiPool = lang === 'ka' ? EMOJI_POOL_KA : EMOJI_POOL_EN;
  
  const [inputs, setInputs] = useState<string[]>([]);
  const [hintUsed, setHintUsed] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const [isShifted, setIsShifted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const emojiMapRef = useRef<string[]>([]);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const inputCount = answerChars.filter(c => c !== ' ').length;
    setInputs(new Array(inputCount).fill(''));
    setHintUsed(false);
    setRevealedIndices([]);
    setIsShifted(false);

    emojiMapRef.current = answerChars.map(char => {
      if (char === ' ') return ' ';
      const lower = char.toLowerCase();
      const pool = emojiPool[lower];
      // Logic: Only some letters replaced by emojis to keep it playable
      const shouldEmoji = Math.random() > 0.4;
      return shouldEmoji && pool ? pool[Math.floor(Math.random() * pool.length)] : char;
    });
  }, [roundIndex, round.answer, lang]);

  const handleKeyPress = useCallback((char: string) => {
    setInputs(prev => {
      const nextEmpty = prev.indexOf('');
      if (nextEmpty === -1) return prev;
      const newInputs = [...prev];
      newInputs[nextEmpty] = char;
      const isFull = newInputs.every(c => c !== '');
      if (isFull) {
        let inputIdx = 0;
        const formedAnswer = answerChars.map(c => (c === ' ' ? ' ' : newInputs[inputIdx++])).join('');
        if (formedAnswer.toLowerCase() === round.answer.toLowerCase()) {
          setTimeout(() => onWin(tour.isVip ? 100 : 25), 300);
        } else {
          setShakeTrigger(true);
          setTimeout(() => setShakeTrigger(false), 500);
        }
      }
      return newInputs;
    });
  }, [round.answer, onWin, tour.isVip, answerChars]);

  const handleBackspace = useCallback(() => {
    setInputs(prev => {
      const lastFilled = [...prev].reverse().findIndex(x => x !== '');
      if (lastFilled === -1) return prev;
      const idx = prev.length - 1 - lastFilled;
      const newInputs = [...prev];
      newInputs[idx] = '';
      return newInputs;
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') handleBackspace();
      else if (e.key.length === 1) {
        if (lang === 'ka') {
          const mapped = LATIN_TO_GEO[e.key] || e.key;
          if (/^[ა-ჰ]$/.test(mapped)) handleKeyPress(mapped);
        } else {
          if (/^[a-zA-Z]$/.test(e.key)) handleKeyPress(e.key);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKeyPress, handleBackspace, lang]);

  const onEmojiClick = (idx: number) => {
    if (revealedIndices.includes(idx)) return;
    if (onDeductCoins(PRICES.REVEAL_LETTER)) {
      setRevealedIndices(prev => [...prev, idx]);
      const charToReveal = answerChars[idx];
      if (charToReveal !== ' ') {
        let inputIdx = 0;
        for (let i = 0; i < idx; i++) { if (answerChars[i] !== ' ') inputIdx++; }
        setInputs(prev => {
          const next = [...prev];
          next[inputIdx] = charToReveal;
          return next;
        });
      }
    }
  };

  const renderKey = (char: string) => {
    const displayChar = isShifted && GEORGIAN_KEYBOARD_MAP[char] ? GEORGIAN_KEYBOARD_MAP[char] : char;
    return (
      <button
        key={char}
        onClick={() => handleKeyPress(displayChar)}
        className="flex-1 min-w-[24px] h-9 md:h-11 bg-white/10 hover:bg-white/30 active:scale-90 rounded-lg font-bold text-sm md:text-lg text-white border-b-2 border-black/30 shadow transition-colors"
      >
        {displayChar}
      </button>
    );
  };

  let inputCounter = 0;
  const isKa = lang === 'ka';

  return (
    <div className="flex flex-col h-full bg-[#d000ff] p-2 md:p-8 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="p-3 bg-white/15 rounded-2xl hover:bg-white/25 text-white font-bold transition-all active:scale-90">⬅</button>
        <div className="bg-white/10 px-6 py-2 rounded-2xl text-center border border-white/10 backdrop-blur-md">
          <div className="text-[10px] text-white/50 font-black uppercase tracking-widest">{tour.name}</div>
          <div className="text-sm font-black text-white">{isKa ? 'რაუნდი' : 'Round'} {roundIndex + 1}/5</div>
        </div>
        <div className="bg-yellow-400 text-black px-4 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-xl border-b-2 border-yellow-700">
          <span className="font-black text-lg">{coins} 🪙</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-6 md:space-y-10 overflow-hidden min-h-0">
        <h2 className="text-xl md:text-3xl font-black text-white drop-shadow-2xl">
          {isKa ? 'გამოიცანი სიტყვა ❤️' : 'Guess the Word ❤️'}
        </h2>
        
        <div className={`flex flex-wrap justify-center gap-2 md:gap-4 animate-float transition-all duration-300 ${shakeTrigger ? 'animate-shake' : ''}`}>
          {emojiMapRef.current.map((charOrEmoji, i) => {
            if (charOrEmoji === ' ') return <div key={i} className="w-4 md:w-8" />;
            const isRevealed = revealedIndices.includes(i);
            const isEmoji = charOrEmoji.length > 1 || /\p{Emoji}/u.test(charOrEmoji);
            return (
              <div 
                key={i}
                onClick={() => isEmoji && onEmojiClick(i)}
                className={`group relative p-3 md:p-5 rounded-2xl md:rounded-3xl border border-white/20 backdrop-blur-xl shadow-2xl transition-all ${
                  isEmoji ? 'cursor-pointer hover:scale-110 active:scale-95' : ''
                } ${isRevealed ? 'bg-green-500/40 border-green-400' : 'bg-white/15'}`}
              >
                <span className="text-4xl md:text-6xl select-none">
                  {isRevealed ? answerChars[i] : charOrEmoji}
                </span>
                {isEmoji && !isRevealed && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-[9px] px-1.5 py-0.5 rounded-full font-black text-black shadow-lg">
                    {PRICES.REVEAL_LETTER} 🪙
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-1 md:gap-3 px-2">
          {answerChars.map((char, i) => {
            if (char === ' ') return <div key={i} className="w-5 md:w-10" />;
            const currentInput = inputs[inputCounter];
            const isCorrect = currentInput?.toLowerCase() === char.toLowerCase();
            inputCounter++;
            return (
              <div 
                key={i} 
                className={`w-8 h-10 md:w-14 md:h-18 border-b-4 flex items-center justify-center text-xl md:text-4xl font-black rounded-xl transition-all duration-300 shadow-lg ${
                  isCorrect 
                    ? 'border-green-400 bg-green-500/40 text-white scale-110' 
                    : currentInput 
                      ? 'border-white bg-white/20 text-white' 
                      : 'border-white/10 bg-black/20 text-white/10'
                }`}
              >
                {currentInput}
              </div>
            );
          })}
        </div>

        {hintUsed && (
          <div className="bg-white text-[#d000ff] px-6 py-2 rounded-2xl font-black shadow-2xl animate-bounce text-sm md:text-base border-2 border-indigo-100">
            💡 {round.hintText}
          </div>
        )}
      </div>

      <div className="flex gap-3 mb-4">
        <button onClick={() => onDeductCoins(PRICES.HINT) && setHintUsed(true)} disabled={hintUsed || coins < PRICES.HINT} className="flex-1 py-3.5 bg-yellow-400 text-black rounded-2xl font-black text-xs md:text-sm shadow-xl border-b-4 border-yellow-700 active:translate-y-1 transition-all disabled:opacity-50">
          {isKa ? `🔍 მინიშნება (-${PRICES.HINT} 🪙)` : `🔍 Hint (-${PRICES.HINT} 🪙)`}
        </button>
        <button onClick={() => onDeductCoins(PRICES.SKIP) && onWin(0)} disabled={coins < PRICES.SKIP} className="flex-1 py-3.5 bg-white/15 text-white rounded-2xl font-black text-xs md:text-sm shadow-xl border-b-4 border-black/30 active:translate-y-1 transition-all disabled:opacity-50">
          {isKa ? `⏭ გამოტოვება (-${PRICES.SKIP} 🪙)` : `⏭ Skip (-${PRICES.SKIP} 🪙)`}
        </button>
      </div>

      <div className={`space-y-1 bg-black/30 p-2 md:p-5 rounded-[30px] shadow-2xl backdrop-blur-3xl border border-white/5 ${!isTouchDevice ? 'opacity-40 hover:opacity-100 transition-opacity' : ''}`}>
        {isKa ? (
          <>
            <div className="flex justify-center gap-1">{["ქ", "წ", "ე", "რ", "ტ", "ყ", "უ", "ი", "ო", "პ"].map(renderKey)}</div>
            <div className="flex justify-center gap-1 px-4 md:px-10">{["ა", "ს", "დ", "ფ", "გ", "ჰ", "ჯ", "კ", "ლ"].map(renderKey)}</div>
            <div className="flex justify-center gap-1">
              <button onClick={() => setIsShifted(!isShifted)} className={`w-12 md:w-16 h-9 md:h-11 rounded-lg flex items-center justify-center text-xl border-b-2 transition-all ${isShifted ? 'bg-white text-[#d000ff] border-white' : 'bg-white/10 text-white border-black/30'}`}>⇧</button>
              {["ზ", "ხ", "ც", "ვ", "ბ", "ნ", "მ"].map(renderKey)}
              <button onClick={handleBackspace} className="w-12 md:w-16 h-9 md:h-11 bg-white/10 text-white rounded-lg flex items-center justify-center text-xl border-b-2 border-black/30 active:scale-95 transition-all">⌫</button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center gap-1">{["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map(renderKey)}</div>
            <div className="flex justify-center gap-1 px-4 md:px-10">{["A", "S", "D", "F", "G", "H", "J", "K", "L"].map(renderKey)}</div>
            <div className="flex justify-center gap-1">
              <div className="w-12 md:w-16" />
              {["Z", "X", "C", "V", "B", "N", "M"].map(renderKey)}
              <button onClick={handleBackspace} className="w-12 md:w-16 h-9 md:h-11 bg-white/10 text-white rounded-lg flex items-center justify-center text-xl border-b-2 border-black/30 active:scale-95 transition-all">⌫</button>
            </div>
          </>
        )}
      </div>
      
      {!isTouchDevice && (
        <div className="text-[10px] text-center mt-2 opacity-30 font-black uppercase tracking-[0.2em] text-white">
          {isKa ? '⌨️ გამოიყენე ლეპტოპის კლავიატურა' : '⌨️ Use Laptop Keyboard'}
        </div>
      )}
    </div>
  );
};

export default GameScreen;
