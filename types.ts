
export enum GameState {
  HOME = 'HOME',
  MAP = 'MAP',
  PLAYING = 'PLAYING',
  WIN = 'WIN',
  SHOP = 'SHOP',
  VIP_LOBBY = 'VIP_LOBBY'
}

export type Language = 'ka' | 'en';

export interface Round {
  id: number;
  display: string; 
  answer: string;  
  hintText: string;
}

export interface Tour {
  id: number;
  name: string;
  rounds: Round[];
  isVip?: boolean;
  requiredTours?: number;
}

export interface PlayerStats {
  coins: number;
  completedRounds: number; 
  completedTours: number[];
  unlockedVip: boolean;
  language: Language;
  hasSeenIntro: boolean;
}
