export type PerformanceSubmittedEvent = {
  performanceId: number;
  creator: string;
  stake: number;
};

export type PredictionSubmittedEvent = {
  performanceId: number;
  predictor: string;
  stake: number;
  predictedScore: number;
};