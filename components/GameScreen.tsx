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

  const [inputs, setInputs] = useState<string[]>([]);
  const [hintUsed, setHintUsed] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const [isShifted, setIsShifted] = useState(false);

  const emojiMapRef = useRef<string[]>([]);

  // მონაცემების მომზადება და ემოჯების გენერაცია
  useEffect(() => {
    if (!round) return;

    const answerChars = round.answer.split('');
    const inputCount = answerChars.filter(c => c !== ' ').length;

    // ვირჩევთ აუზს ენის მიხედვით
    const currentEmojiPool = lang === 'ka' ? EMOJI_POOL_KA : EMOJI_POOL_EN;

    setInputs(new Array(inputCount).fill(''));
    setHintUsed(false);
    setRevealedIndices([]);
    setIsShifted(false);

    emojiMapRef.current = answerChars.map(char => {
      if (char === ' ') return ' ';

      const lower = char.toLowerCase();
      const pool = currentEmojiPool[lower as keyof typeof currentEmojiPool];

      // 40% შანსი რომ ჩანაცვლდეს ემოჯით
      const shouldEmoji = Math.random() > 0.4;

      if (shouldEmoji && pool && pool.length > 0) {
        return pool[Math.floor(Math.random() * pool.length)];
      }
      return char;
    });
  }, [roundIndex, round, lang]);

  const handleKeyPress = useCallback((char: string) => {
    if (!round) return;
    const answerChars = round.answer.split('');

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
          const reward = String(tour.id).includes('vip') ? 100 : 25;
          setTimeout(() => onWin(reward), 300);
        } else {
          setShakeTrigger(true);
          setTimeout(() => setShakeTrigger(false), 500);
        }
      }
      return newInputs;
    });
  }, [round, onWin, tour.id]);

  const handleBackspace = useCallback(() => {
    setInputs(prev => {
      const filledIndices = prev.map((val, idx) => val !== '' ? idx : -1).filter(idx => idx !== -1);
      if (filledIndices.length === 0) return prev;
      const lastIdx = filledIndices[filledIndices.length - 1];
      const newInputs = [...prev];
      newInputs[lastIdx] = '';
      return newInputs;
    });
  }, []);

  // ფიზიკური კლავიატურის მხარდაჭერა
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') handleBackspace();
      else if (e.key.length === 1) {
        if (lang === 'ka') {
          const mapped = LATIN_TO_GEO[e.key as keyof typeof LATIN_TO_GEO] || e.key;
          if (/^[ა-ჰ]$/.test(mapped)) handleKeyPress(mapped);
        } else {
          if (/^[a-zA-Z]$/.test(e.key)) handleKeyPress(e.key);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKeyPress, handleBackspace, lang]);

  if (!round) return null;

  const answerChars = round.answer.split('');
  const isKa = lang === 'ka';
  let inputCounter = 0;

  const renderKey = (char: string) => {
    const displayChar = isShifted && GEORGIAN_KEYBOARD_MAP[char]
      ? GEORGIAN_KEYBOARD_MAP[char]
      : char;
    return (
      <button
        key={char}
        onClick={() => handleKeyPress(displayChar)}
        className="flex-1 min-w-[28px] h-10 md:h-12 bg-white/10 hover:bg-white/20 active:scale-90 rounded-xl font-bold text-white border-b-2 border-black/20 transition-all"
      >
        {displayChar}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#d000ff] p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-3 bg-white/10 rounded-2xl text-white active:scale-90 transition-all">⬅</button>
        <div className="text-center">
          <div className="text-[10px] text-white/50 font-black uppercase tracking-widest">{tour.name}</div>
          <div className="text-white font-black">{isKa ? 'რაუნდი' : 'Round'} {roundIndex + 1}/{tour.rounds.length}</div>
        </div>
        <div className="bg-yellow-400 text-black px-4 py-1.5 rounded-2xl font-black shadow-lg">
          {coins} 🪙
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 min-h-0">
        <h2 className="text-2xl font-black text-white text-center">
          {isKa ? 'გამოიცანი სიტყვა ❤️' : 'Guess the Word ❤️'}
        </h2>

        {/* Emoji Display */}
        <div className={`flex flex-wrap justify-center gap-3 transition-all ${shakeTrigger ? 'animate-shake' : ''}`}>
          {emojiMapRef.current.map((charOrEmoji, i) => {
            if (charOrEmoji === ' ') return <div key={i} className="w-6" />;
            const isRevealed = revealedIndices.includes(i);
            const isEmoji = charOrEmoji.length > 1 || /\p{Emoji}/u.test(charOrEmoji);

            return (
              <div
                key={i}
                onClick={() => isEmoji && !isRevealed && onDeductCoins(PRICES.REVEAL_LETTER) && setRevealedIndices(p => [...p, i])}
                className={`relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-3xl border border-white/20 backdrop-blur-md shadow-2xl transition-all ${isEmoji && !isRevealed ? 'cursor-pointer hover:scale-110 bg-white/20' : 'bg-white/5'
                  } ${isRevealed ? 'bg-green-500/30 border-green-400' : ''}`}
              >
                <span className="text-4xl md:text-6xl select-none">
                  {isRevealed ? answerChars[i] : charOrEmoji}
                </span>
                {isEmoji && !isRevealed && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-[10px] px-2 py-0.5 rounded-full font-black text-black">
                    {PRICES.REVEAL_LETTER} 🪙
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Input Boxes */}
        <div className="flex flex-wrap justify-center gap-2">
          {answerChars.map((char, i) => {
            if (char === ' ') return <div key={i} className="w-4" />;
            const currentInput = inputs[inputCounter];
            inputCounter++;
            return (
              <div
                key={i}
                className={`w-10 h-12 md:w-14 md:h-18 border-b-4 flex items-center justify-center text-2xl md:text-4xl font-black rounded-xl transition-all ${currentInput ? 'border-white bg-white/20 text-white' : 'border-white/10 bg-black/20'
                  }`}
              >
                {currentInput}
              </div>
            );
          })}
        </div>

        {hintUsed && (
          <div className="bg-white text-purple-700 px-6 py-2 rounded-2xl font-black shadow-xl animate-bounce">
            💡 {round.hintText}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => onDeductCoins(PRICES.HINT) && setHintUsed(true)}
          disabled={hintUsed || coins < PRICES.HINT}
          className="flex-1 py-4 bg-yellow-400 text-black rounded-2xl font-black shadow-lg active:translate-y-1 transition-all disabled:opacity-50"
        >
          {isKa ? '🔍 მინიშნება' : '🔍 Hint'}
        </button>
        <button
          onClick={() => onDeductCoins(PRICES.SKIP) && onWin(0)}
          disabled={coins < PRICES.SKIP}
          className="flex-1 py-4 bg-white/10 text-white rounded-2xl font-black shadow-lg active:translate-y-1 transition-all disabled:opacity-50"
        >
          {isKa ? '⏭ გამოტოვება' : '⏭ Skip'}
        </button>
      </div>

      {/* Keyboard */}
      <div className="space-y-1.5 bg-black/20 p-3 rounded-[32px] backdrop-blur-xl border border-white/5">
        {isKa ? (
          <>
            <div className="flex justify-center gap-1">{["ქ", "წ", "ე", "რ", "ტ", "ყ", "უ", "ი", "ო", "პ"].map(renderKey)}</div>
            <div className="flex justify-center gap-1 px-4">{["ა", "ს", "დ", "ფ", "გ", "ჰ", "ჯ", "კ", "ლ"].map(renderKey)}</div>
            <div className="flex justify-center gap-1">
              <button onClick={() => setIsShifted(!isShifted)} className={`w-14 h-10 rounded-xl flex items-center justify-center font-bold border-b-2 ${isShifted ? 'bg-white text-purple-700' : 'bg-white/10 text-white border-black/20'}`}>⇧</button>
              {["ზ", "ხ", "ც", "ვ", "ბ", "ნ", "მ"].map(renderKey)}
              <button onClick={handleBackspace} className="w-14 h-10 bg-white/10 text-white rounded-xl flex items-center justify-center border-b-2 border-black/20">⌫</button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center gap-1">{["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map(renderKey)}</div>
            <div className="flex justify-center gap-1 px-4">{["A", "S", "D", "F", "G", "H", "J", "K", "L"].map(renderKey)}</div>
            <div className="flex justify-center gap-1">
              <div className="w-14" />
              {["Z", "X", "C", "V", "B", "N", "M"].map(renderKey)}
              <button onClick={handleBackspace} className="w-14 h-10 bg-white/10 text-white rounded-xl flex items-center justify-center border-b-2 border-black/20">⌫</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GameScreen;