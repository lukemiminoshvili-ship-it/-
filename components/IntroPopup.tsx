import React from 'react';
import { Language } from '../types';

interface Props {
  lang: Language;
  onStart: () => void;
}

const IntroPopup: React.FC<Props> = ({ lang, onStart }) => {
  // უსაფრთხოებისათვის ვამოწმებთ ენას
  const currentLang = lang === 'ka' ? 'ka' : 'en';

  const content = {
    ka: {
      title: "მოგესალმებით! 👋",
      body: "ამ თამაშში ზოგიერთი ასო ჩანაცვლებულია ემოჯით.\n\nთითოეული ემოჯი ცვლის იმ ასოს, რომლითაც იწყება მისი სახელი (მაგ: 🍎 = ა).\n\nგამოიყენე ლოგიკა და გამოიცანი სიტყვა!",
      btn: "გავიგე, დავიწყოთ!"
    },
    en: {
      title: "Welcome! 👋",
      body: "In this game, some letters are replaced with emojis.\n\nEach emoji represents the first letter of its name (e.g., 🍎 = A).\n\nUse your logic and guess the word!",
      btn: "Got it, let's play!"
    }
  };

  const text = content[currentLang];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-500">
      <div className="max-w-md w-full bg-white text-slate-800 rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in zoom-in duration-300">
        {/* ხატულა */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-4xl animate-bounce">
            💡
          </div>
        </div>

        <h2 className="text-3xl font-black mb-4 text-center text-[#d000ff]">
          {text.title}
        </h2>

        <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100">
          <p className="text-md leading-relaxed text-center whitespace-pre-line font-bold text-slate-600">
            {text.body}
          </p>
        </div>

        <button
          onClick={onStart}
          className="w-full py-5 bg-[#d000ff] text-white rounded-3xl text-xl font-black shadow-lg shadow-purple-200 transition-all active:scale-90 hover:brightness-110"
        >
          {text.btn}
        </button>
      </div>
    </div>
  );
};

export default IntroPopup;