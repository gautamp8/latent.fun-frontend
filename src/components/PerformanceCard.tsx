import React, { useState } from 'react';
import { Trophy, ThumbsUp, Heart, Lock } from 'lucide-react';
import type { Performance } from '../types';
import { useStore } from '../store/useStore';
import { useAudienceActions } from '../hooks/useAudienceActions';
import { VideoPlayer } from './video/VideoPlayer';
import { calculatePerformanceStats } from '../utils/earnings';
import { executeWithFeedback } from '../utils/transactionFeedback';
import { TransactionHash } from './TransactionHash';

export function PerformanceCard({ performance }: { performance: Performance }) {
  const { 
    connected, 
    addPrediction, 
    setSelectedPerformanceId,
    walletAddress,
    toggleLike,
    getLikes,
    hasLiked,
    hasPredicted,
    getPrediction,
    predictions,
    getTokenSymbol
  } = useStore();
  
  const { submitAudienceScore } = useAudienceActions();
  const [predictionScore, setPredictionScore] = useState(5);
  const [stakeAmount, setStakeAmount] = useState(10);
  const [showPrediction, setShowPrediction] = useState(false);
  const [isStaking, setIsStaking] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const initialLikes = performance.likes || 0;
  const additionalLikes = getLikes('performance', performance.id.toString());
  const totalLikes = initialLikes + additionalLikes;
  const isLiked = hasLiked('performance', performance.id.toString());
  const isOwnPerformance = performance.creatorAddress === walletAddress;
  const hasMadePrediction = hasPredicted(performance.id);
  const prediction = getPrediction(performance.id);
  const stats = calculatePerformanceStats(performance, predictions);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!connected) return;
    toggleLike('performance', performance.id.toString());
  };

  const handlePredict = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!connected) return;
    
    setIsStaking(true);
    
    try {
      const result = await executeWithFeedback(
        async () => submitAudienceScore(performance.id, predictionScore, stakeAmount),
        {
          successMessage: 'Prediction submitted successfully!',
          errorMessage: 'Failed to submit prediction'
        }
      );
      
      if (result.success) {
        setTransactionHash(result.hash || null);
        addPrediction({
          performanceId: performance.id,
          predictorAddress: walletAddress!,
          predictedScore: predictionScore,
          stakedAmount: stakeAmount,
          timestamp: Date.now(),
        });
        
        setShowPrediction(false);
      }
    } finally {
      setIsStaking(false);
    }
  };

  const handlePredictClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOwnPerformance || hasMadePrediction) return;
    setShowPrediction(!showPrediction);
  };

  return (
    <div 
      onClick={() => setSelectedPerformanceId(performance.id)}
      className={`bg-gray-900 rounded-xl overflow-hidden cursor-pointer hover:bg-gray-800 transition-colors ${
        stats.isWinner ? 'ring-2 ring-yellow-500' : ''
      }`}
    >
      {stats.isWinner && (
        <div className="bg-yellow-500 text-black px-4 py-1 text-sm font-medium flex items-center justify-center gap-2">
          <Trophy className="w-4 h-4" />
          Winning Performance!
        </div>
      )}
      
      <VideoPlayer src={performance.videoUrl} />
      
      <div className="p-4">
        {transactionHash && (
          <TransactionHash hash={transactionHash} />
        )}

        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-white">{performance.creatorName}</h3>
          <div className="flex items-center gap-2">
            {stats.totalPredictions > 0 && (
              <span className="text-sm text-gray-400">
                {stats.winningPredictions}/{stats.totalPredictions} correct
              </span>
            )}
            {isOwnPerformance ? (
              <span className="text-white font-bold">{performance.selfScore}/10</span>
            ) : hasMadePrediction ? (
              <div className="flex items-center gap-1">
                <span className="text-white font-bold">{prediction?.predictedScore}/10</span>
                {prediction?.won && <span className="text-green-500 text-sm">(Won!)</span>}
              </div>
            ) : (
              <Lock className="w-4 h-4 text-gray-500" />
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isOwnPerformance && !hasMadePrediction && (
              <button
                onClick={handlePredictClick}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Predict & Stake</span>
              </button>
            )}
            <button
              onClick={handleLike}
              disabled={!connected}
              className={`flex items-center gap-1 text-sm ${
                isLiked ? 'text-pink-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{totalLikes}</span>
            </button>
          </div>
          <span className="text-sm text-gray-500">
            {new Date(performance.timestamp).toLocaleDateString()}
          </span>
        </div>

        {showPrediction && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg space-y-4" onClick={e => e.stopPropagation()}>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Your Score Prediction (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={predictionScore}
                onChange={(e) => setPredictionScore(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-white font-bold">{predictionScore}</div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Stake Amount (${getTokenSymbol()})</label>
              <input
                type="number"
                min="1"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
              />
            </div>
            
            <button
              onClick={handlePredict}
              disabled={!connected || isStaking}
              className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isStaking ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Staking...
                </>
              ) : (
                'Confirm Prediction'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}