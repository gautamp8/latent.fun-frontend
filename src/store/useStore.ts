import { create } from 'zustand';
import type { Performance, Prediction, Comment, JudgeFeedback, Like } from '../types';
import type { Chain } from '../types/chains';
import { SUPPORTED_CHAINS } from '../types/chains';
import { REQUIRED_STAKE_AMOUNT } from '../config/constants';
import { demoPerformances } from '../data/demoPerformances';

interface Store {
  performances: Performance[];
  predictions: Prediction[];
  comments: Comment[];
  likes: Like[];
  connected: boolean;
  walletAddress: string | null;
  authToken: string | null;
  activeTab: string;
  selectedPerformanceId: number | null;
  balance: number;
  selectedChain: Chain;
  connectWallet: (authToken: string) => void;
  disconnectWallet: () => void;
  addPerformance: (performance: Performance) => void;
  addPrediction: (prediction: Prediction) => void;
  addComment: (comment: Comment) => void;
  toggleLike: (type: 'performance' | 'comment' | 'feedback', id: string) => void;
  getLikes: (type: 'performance' | 'comment' | 'feedback', id: string) => number;
  hasLiked: (type: 'performance' | 'comment' | 'feedback', id: string) => boolean;
  setActiveTab: (tab: string) => void;
  setSelectedPerformanceId: (id: number | null) => void;
  mockJudgeFeedback: (performanceId: number) => Promise<JudgeFeedback[]>;
  getUserPerformances: () => Performance[];
  hasPredicted: (performanceId: number) => boolean;
  getPrediction: (performanceId: number) => Prediction | undefined;
  updateBalance: (amount: number) => void;
  canAffordStake: () => boolean;
  getTokenSymbol: () => string;
  setSelectedChain: (chain: Chain) => void;
}

const INITIAL_BALANCE = 1000;
const WIN_PROBABILITY = 0.5; // Changed from 0.7 to 0.5 for 50-50 chance

export const useStore = create<Store>((set, get) => ({
  performances: [...demoPerformances],
  predictions: [],
  comments: [],
  likes: [],
  connected: false,
  walletAddress: null,
  authToken: null,
  activeTab: 'home',
  selectedPerformanceId: null,
  balance: INITIAL_BALANCE,
  selectedChain: SUPPORTED_CHAINS[0],

  connectWallet: (authToken: string) => set({ 
    connected: true, 
    walletAddress: '0x' + Math.random().toString(36).substring(2, 15),
    authToken,
    balance: INITIAL_BALANCE
  }),

  disconnectWallet: () => set({ 
    connected: false, 
    walletAddress: null,
    authToken: null,
    balance: 0
  }),

  updateBalance: (amount: number) => set(state => ({
    balance: Math.max(0, state.balance + amount)
  })),

  canAffordStake: () => {
    const state = get();
    return state.balance >= REQUIRED_STAKE_AMOUNT;
  },

  getTokenSymbol: () => {
    const state = get();
    return state.selectedChain.tokenSymbol;
  },

  setSelectedChain: (chain: Chain) => set({ selectedChain: chain }),

  addPerformance: (performance) => set((state) => {
    get().updateBalance(-REQUIRED_STAKE_AMOUNT);
    return { performances: [...state.performances, performance] };
  }),

  addPrediction: (prediction) => set((state) => {
    const won = Math.random() < WIN_PROBABILITY;
    const newPrediction = { ...prediction, won };
    
    if (won) {
      get().updateBalance(prediction.stakedAmount * 1.5);
    } else {
      get().updateBalance(-prediction.stakedAmount);
    }
    
    return { predictions: [...state.predictions, newPrediction] };
  }),

  addComment: (comment) => set((state) => ({ 
    comments: [...state.comments, comment] 
  })),

  toggleLike: (type, id) => set((state) => {
    const { walletAddress } = state;
    if (!walletAddress) return state;

    const existingLike = state.likes.find(
      like => like.type === type && 
      like.itemId === id && 
      like.userAddress === walletAddress
    );

    const likes = existingLike
      ? state.likes.filter(like => like !== existingLike)
      : [...state.likes, { 
          type, 
          itemId: id, 
          userAddress: walletAddress, 
          timestamp: Date.now() 
        }];

    return { likes };
  }),

  getLikes: (type, id) => {
    const state = get();
    return state.likes.filter(like => like.type === type && like.itemId === id).length;
  },

  hasLiked: (type, id) => {
    const state = get();
    return state.likes.some(
      like => like.type === type && 
      like.itemId === id && 
      like.userAddress === state.walletAddress
    );
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedPerformanceId: (id) => set({ selectedPerformanceId: id }),

  mockJudgeFeedback: async (performanceId: number) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return [
      {
        id: `${performanceId}-elon`,
        panel: "Elon",
        roast: "Your performance reminds me of my early rocket launches - lots of enthusiasm, but ultimately exploding mid-air. Maybe stick to TikTok dances?",
      },
      {
        id: `${performanceId}-trump`,
        panel: "Trump",
        roast: "Folks, let me tell you, I've seen many performances, the best performances, but this... this is something else. Not in a good way. Sad!",
      },
      {
        id: `${performanceId}-putin`,
        panel: "Putin",
        roast: "In my country, we have bears with better rhythm. Perhaps you should consider a career in... something else.",
      }
    ];
  },

  getUserPerformances: () => {
    const state = get();
    return state.performances.filter(p => p.creatorAddress === state.walletAddress);
  },

  hasPredicted: (performanceId: number) => {
    const state = get();
    return state.predictions.some(
      p => p.performanceId === performanceId && 
      p.predictorAddress === state.walletAddress
    );
  },

  getPrediction: (performanceId: number) => {
    const state = get();
    return state.predictions.find(
      p => p.performanceId === performanceId && 
      p.predictorAddress === state.walletAddress
    );
  }
}));