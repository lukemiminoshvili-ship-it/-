import React, { useState, useEffect, useMemo } from 'react';
import { GameState, PlayerStats, Tour } from './types';
import { generateTours, VIP_TOURS_KA, VIP_TOURS_EN, PRICES } from './constants';
import HomeScreen from './components/HomeScreen';
import LevelMap from './components/LevelMap';
import GameScreen from './components/GameScreen';
import WinScreen from './components/WinScreen';
import Shop from './components/Shop';
import IntroPopup from './components/IntroPopup';
import { AuthScreen } from './components/AuthScreen';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState<GameState>(GameState.HOME);

  const [stats, setStats] = useState<PlayerStats>({
    coins: 200,
    completedRounds: 0,
    completedTours: [],
    unlockedVip: false,
    language: 'ka',
    hasSeenIntro: false
  });

  const [currentTour, setCurrentTour] = useState<Tour | null>(null);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [lastReward, setLastReward] = useState(0);

  // 1. ავტორიზაციის და მონაცემების ჩატვირთვა
  useEffect(() => {
    console.log("App: პროცესი დაიწყო...");
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          console.log("App: მომხმარებელი შესულია:", firebaseUser.uid);
          setUser(firebaseUser);

          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            console.log("App: მონაცემები ნაპოვნია Firestore-ში");
            setStats(userDoc.data() as PlayerStats);
          } else {
            console.log("App: მომხმარებელი ახალია, მონაცემები არ არის");
          }
        } else {
          console.log("App: მომხმარებელი არ არის ავტორიზებული");
          setUser(null);
        }
      } catch (error) {
        console.error("App: მონაცემების წაკითხვის შეცდომა:", error);
      } finally {
        setLoading(false); // ლოდინი სრულდება ნებისმიერ შემთხვევაში
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. პროგრესის შენახვა Firestore-ში
  useEffect(() => {
    const syncData = async () => {
      if (user && !loading) {
        try {
          await setDoc(doc(db, "users", user.uid), stats, { merge: true });
        } catch (error) {
          console.error("App: მონაცემების შენახვის შეცდომა:", error);
        }
      }
    };
    syncData();
  }, [stats, user, loading]);

  const tours = useMemo(() => {
    const generated = generateTours(stats.language);
    return Array.isArray(generated) ? generated : [];
  }, [stats.language]);

  const vipTours = useMemo(() => {
    const vips = stats.language === 'ka' ? VIP_TOURS_KA : VIP_TOURS_EN;
    return Array.isArray(vips) ? vips : [];
  }, [stats.language]);

  const allTours = useMemo(() => [...tours, ...vipTours], [tours, vipTours]);

  const deductCoins = (amount: number): boolean => {
    if (stats.coins >= amount) {
      setStats(prev => ({ ...prev, coins: prev.coins - amount }));
      return true;
    }
    return false;
  };

  const handleStartTour = (tour: Tour) => {
    if (!tour || !tour.rounds) return;
    setCurrentTour(tour);
    setCurrentRoundIndex(0);
    setGameState(GameState.PLAYING);
  };

  const handleWinRound = (reward: number) => {
    if (!currentTour) return;
    const isLastRound = currentRoundIndex === currentTour.rounds.length - 1;
    setStats(prev => ({
      ...prev,
      coins: prev.coins + reward,
      completedRounds: prev.completedRounds + 1,
      completedTours: isLastRound
        ? [...new Set([...prev.completedTours, currentTour.id])]
        : prev.completedTours
    }));
    setLastReward(reward);
    setGameState(GameState.WIN);
  };

  const handleNext = () => {
    if (!currentTour) {
      setGameState(GameState.MAP);
      return;
    }
    if (currentRoundIndex < currentTour.rounds.length - 1) {
      setCurrentRoundIndex(prev => prev + 1);
      setGameState(GameState.PLAYING);
    } else {
      setGameState(GameState.MAP);
    }
  };

  const toggleLanguage = () => {
    setStats(prev => ({
      ...prev,
      language: prev.language === 'ka' ? 'en' : 'ka',
      completedTours: []
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#d000ff] flex flex-col items-center justify-center text-white">
        <div className="mb-4">იტვირთება...</div>
        <button
          onClick={() => setLoading(false)}
          className="text-xs opacity-50 underline"
        >
          იძულებით ჩართვა
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#d000ff] flex items-center justify-center">
        <AuthScreen onAuthSuccess={(data) => {
          if (data) setStats(data);
        }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#d000ff] text-white overflow-hidden flex flex-col items-center">
      <div className="w-full h-screen flex flex-col relative">
        <button
          onClick={() => auth.signOut()}
          className="absolute top-2 right-2 z-50 bg-red-500 hover:bg-red-600 text-[10px] px-2 py-1 rounded"
        >
          გამოსვლა
        </button>

        {!stats.hasSeenIntro && (
          <IntroPopup lang={stats.language as any} onStart={() => setStats(p => ({ ...p, hasSeenIntro: true }))} />
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
            tours={allTours}
            stats={stats}
            onSelectTour={handleStartTour}
            onBack={() => setGameState(GameState.HOME)}
            onUnlockVip={() => {
              if (deductCoins(PRICES.VIP_UNLOCK)) {
                setStats(p => ({ ...p, unlockedVip: true }));
              }
            }}
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
            {...({ lang: stats.language } as any)}
          />
        )}

        {gameState === GameState.WIN && currentTour && (
          <WinScreen
            reward={lastReward}
            onNext={handleNext}
            isTourComplete={currentRoundIndex === currentTour.rounds.length - 1}
            {...({ lang: stats.language } as any)}
          />
        )}

        {gameState === GameState.SHOP && (
          <Shop
            stats={stats}
            onBack={() => setGameState(GameState.HOME)}
            onUnlockVip={() => {
              if (deductCoins(PRICES.VIP_UNLOCK)) {
                setStats(prev => ({ ...prev, unlockedVip: true }));
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;