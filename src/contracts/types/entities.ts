export interface PerformanceData {
  performanceId: number;
  creatorAddress: string;
  selfScore: number;
  totalStake: number;
  predictions: number;
  status: 'active' | 'completed';
}

export interface PredictionData {
  performanceId: number;
  predictorAddress: string;
  predictedScore: number;
  stake: number;
  timestamp: number;
}