
import React, { useState, useEffect, useMemo } from 'react';
import { GameState, PlayerStats, Tour, Language } from './types';
import { generateTours, VIP_TOURS_KA, VIP_TOURS_EN, PRICES } from './constants';
import HomeScreen from './components/HomeScreen';
import LevelMap from './components/LevelMap';
import GameScreen from './components/GameScreen';
import WinScreen from './components/WinScreen';
import Shop from './components/Shop';
import IntroPopup from './components/IntroPopup';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.HOME);
  const [stats, setStats] = useState<PlayerStats>(() => {
    const saved = localStorage.getItem('emoji_words_stats');
    return saved ? JSON.parse(saved) : {
      coins: 200,
      completedRounds: 0,
      completedTours: [],
      unlockedVip: false,
      language: 'ka',
      hasSeenIntro: false
    };
  });

  const [currentTour, setCurrentTour] = useState<Tour | null>(null);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [lastReward, setLastReward] = useState(0);

  useEffect(() => {
    localStorage.setItem('emoji_words_stats', JSON.stringify(stats));
  }, [stats]);

  const tours = useMemo(() => generateTours(stats.language), [stats.language]);
  const vipTours = stats.language === 'ka' ? VIP_TOURS_KA : VIP_TOURS_EN;

  const handleStartTour = (tour: Tour) => {
    setCurrentTour(tour);
    setCurrentRoundIndex(0);
    setGameState(GameState.PLAYING);
  };

  const handleWinRound = (reward: number) => {
    const isLastRound = currentTour && currentRoundIndex === currentTour.rounds.length - 1;
    setStats(prev => ({
      ...prev,
      coins: prev.coins + reward,
      completedRounds: prev.completedRounds + 1,
      completedTours: isLastRound && currentTour 
        ? [...new Set([...prev.completedTours, currentTour.id])] 
        : prev.completedTours
    }));
    setLastReward(reward);
    setGameState(GameState.WIN);
  };

  const handleNext = () => {
    if (!currentTour) return;
    if (currentRoundIndex < currentTour.rounds.length - 1) {
      setCurrentRoundIndex(prev => prev + 1);
      setGameState(GameState.PLAYING);
    } else {
      setGameState(GameState.MAP);
    }
  };

  const deductCoins = (amount: number): boolean => {
    if (stats.coins >= amount) {
      setStats(prev => ({ ...prev, coins: prev.coins - amount }));
      return true;
    }
    return false;
  };

  const toggleLanguage = () => {
    setStats(prev => ({
      ...prev,
      language: prev.language === 'ka' ? 'en' : 'ka',
      completedTours: [] // Reset progress when language changes as words change
    }));
  };

  const markIntroSeen = () => {
    setStats(prev => ({ ...prev, hasSeenIntro: true }));
  };

  return (
    <div className="min-h-screen bg-[#d000ff] text-white overflow-hidden flex flex-col items-center">
      <div className="w-full h-screen flex flex-col relative">
        {!stats.hasSeenIntro && (
          <IntroPopup lang={stats.language} onStart={markIntroSeen} />
        )}

        {gameState === GameState.HOME && (
          <HomeScreen 
            onPlay={() => setGameState(GameState.MAP)} 
            onShop={() => setGameState(GameState.SHOP)} 
            onToggleLang={toggleLanguage}
            stats={stats} 
          />
        )}

        {gameState === GameState.MAP && (
          <LevelMap 
            tours={[...tours, ...vipTours]} 
            stats={stats} 
            onSelectTour={handleStartTour} 
            onBack={() => setGameState(GameState.HOME)} 
            onUnlockVip={() => deductCoins(PRICES.VIP_UNLOCK) && setStats(p => ({...p, unlockedVip: true}))}
          />
        )}

        {gameState === GameState.PLAYING && currentTour && (
          <GameScreen 
            tour={currentTour}
            roundIndex={currentRoundIndex}
            onWin={handleWinRound}
            onBack={() => setGameState(GameState.MAP)}
            coins={stats.coins}
            onDeductCoins={deductCoins}
            lang={stats.language}
          />
        )}

        {gameState === GameState.WIN && (
          <WinScreen 
            reward={lastReward} 
            onNext={handleNext} 
            isTourComplete={currentTour ? currentRoundIndex === currentTour.rounds.length - 1 : false}
            lang={stats.language}
          />
        )}

        {gameState === GameState.SHOP && (
          <Shop stats={stats} onBack={() => setGameState(GameState.HOME)} />
        )}
      </div>
    </div>
  );
};

export default App;
