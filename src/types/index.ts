export interface Performance {
  id: number;
  videoBlob?: Blob;
  videoUrl: string;
  creatorAddress: string;
  creatorName: string;
  selfScore: number;
  timestamp: number;
  judgeFeedback?: JudgeFeedback[];
  likes?: number;
}

export interface JudgeFeedback {
  panel: string;
  roast: string;
  audioUrl?: string;
  thumbnail?: string;
  score?: number;
  id?: string;
}

export interface Comment {
  id: string;
  performanceId: number;
  userAddress: string;
  userName: string;
  content: string;
  timestamp: number;
  likes: number;
}

export interface Prediction {
  performanceId: number;
  predictorAddress: string;
  predictedScore: number;
  stakedAmount: number;
  won?: boolean;
  timestamp: number;
  reward?: number;
}

export interface Like {
  type: 'performance' | 'comment' | 'feedback';
  itemId: string;
  userAddress: string;
  timestamp: number;
}