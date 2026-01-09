
import React from 'react';
import { Language } from '../types';

interface Props {
  lang: Language;
  onStart: () => void;
}

const IntroPopup: React.FC<Props> = ({ lang, onStart }) => {
  const content = {
    ka: {
      title: "მოგესალმებით!",
      body: "ამ თამაშში სიტყვების ზოგიერთი ასო ჩანაცვლებულია ემოჯებით.\nთითოეული ემოჯი ცვლის ერთ ასოს — იმ ასოს, რომლითაც იწყება ემოჯის დასახელება.\nშენი მიზანია გამოიცნო სიტყვა სწორად.\nყველა სიტყვაში ყველა ასო არ არის დამალული, ამიტომ ყურადღებით დააკვირდი.",
      btn: "დაწყება"
    },
    en: {
      title: "Welcome!",
      body: "In this game, some letters in words are replaced with emojis.\nEach emoji replaces one letter — the first letter of the emoji’s name.\nYour goal is to guess the word correctly.\nNot all letters are hidden, so pay close attention.",
      btn: "Start Game"
    }
  };

  const text = content[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="max-w-md w-full bg-white text-indigo-900 rounded-[40px] p-8 shadow-2xl animate-in zoom-in duration-300">
        <h2 className="text-3xl font-black mb-6 text-center text-[#d000ff]">{text.title}</h2>
        <p className="text-lg leading-relaxed mb-8 text-center whitespace-pre-line font-medium opacity-90">
          {text.body}
        </p>
        <button 
          onClick={onStart}
          className="w-full py-4 bg-[#d000ff] text-white rounded-2xl text-xl font-bold shadow-xl shadow-indigo-200 transition-transform active:scale-95"
        >
          {text.btn}
        </button>
      </div>
    </div>
  );
};

export default IntroPopup;
