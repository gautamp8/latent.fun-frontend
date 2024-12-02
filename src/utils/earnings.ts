import type { Performance, Prediction } from '../types';

export const calculatePredictionEarnings = (
  prediction: Prediction,
  performance: Performance,
  totalStaked: number
): number => {
  if (!prediction.won) return -prediction.stakedAmount;
  
  // Winners get their stake back plus 50% of the total pool
  const winningShare = totalStaked * 0.5;
  return prediction.stakedAmount + winningShare;
};

export const calculatePerformanceStats = (
  performance: Performance,
  predictions: Prediction[]
): {
  totalStaked: number;
  isWinner: boolean;
  winningPredictions: number;
  totalPredictions: number;
} => {
  const performancePredictions = predictions.filter(p => p.performanceId === performance.id);
  const totalStaked = performancePredictions.reduce((sum, p) => sum + p.stakedAmount, 0);
  const winningPredictions = performancePredictions.filter(p => p.won).length;
  
  // A performance is considered winning if more than 70% of predictions were correct
  const winRate = winningPredictions / performancePredictions.length;
  const isWinner = winRate >= 0.7;

  return {
    totalStaked,
    isWinner,
    winningPredictions,
    totalPredictions: performancePredictions.length
  };
};