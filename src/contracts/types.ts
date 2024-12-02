// Blockchain transaction types and interfaces
export interface TalentShowTransaction {
  network_name: string;
  transaction: {
    function: string;
    type_arguments: string[];
    arguments: string[];
  };
}

export interface PerformanceData {
  performanceId: string;
  creatorAddress: string;
  selfScore: number;
  totalStake: number;
  predictions: number;
  status: 'active' | 'completed';
}

export interface PredictionData {
  performanceId: string;
  predictorAddress: string;
  predictedScore: number;
  stake: number;
  timestamp: number;
}

// Smart contract event types
export type PerformanceSubmittedEvent = {
  performanceId: string;
  creator: string;
  stake: number;
};

export type PredictionSubmittedEvent = {
  performanceId: string;
  predictor: string;
  stake: number;
  predictedScore: number;
};