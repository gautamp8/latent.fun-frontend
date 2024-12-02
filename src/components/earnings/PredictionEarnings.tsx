import React from 'react';
import { useStore } from '../../store/useStore';
import type { Prediction } from '../../types';
import { calculatePredictionEarnings } from '../../utils/earnings';

export function PredictionEarnings({ predictions }: { predictions: Prediction[] }) {
  const { getTokenSymbol, performances } = useStore();
  
  const totalEarned = predictions.reduce((total, prediction) => {
    const performance = performances.find(p => p.id === prediction.performanceId);
    if (!performance) return total;
    
    const performancePredictions = predictions.filter(p => p.performanceId === prediction.performanceId);
    const totalStaked = performancePredictions.reduce((sum, p) => sum + p.stakedAmount, 0);
    
    return total + calculatePredictionEarnings(prediction, performance, totalStaked);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-4">
        <p className="text-sm text-gray-400 mb-1">Total Prediction Earnings</p>
        <p className={`text-xl font-bold ${totalEarned >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {totalEarned.toFixed(2)} ${getTokenSymbol()}
        </p>
      </div>

      <div className="space-y-4">
        {predictions.map((prediction) => {
          const performance = performances.find(p => p.id === prediction.performanceId);
          if (!performance) return null;

          const performancePredictions = predictions.filter(p => p.performanceId === prediction.performanceId);
          const totalStaked = performancePredictions.reduce((sum, p) => sum + p.stakedAmount, 0);
          const earnings = calculatePredictionEarnings(prediction, performance, totalStaked);

          return (
            <div
              key={`${prediction.performanceId}-${prediction.timestamp}`}
              className="bg-gray-800 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">
                  Performance #{prediction.performanceId}
                </span>
                <span className={`text-sm ${prediction.won ? 'text-green-500' : 'text-red-500'}`}>
                  {prediction.won ? 'Won' : 'Lost'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Predicted Score: {prediction.predictedScore}/10</span>
                <span className={earnings >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {earnings >= 0 ? '+' : ''}{earnings.toFixed(2)} ${getTokenSymbol()}
                </span>
              </div>
              {prediction.won && (
                <p className="text-sm text-gray-500 mt-2">
                  Pool size: {totalStaked.toFixed(2)} ${getTokenSymbol()}
                </p>
              )}
            </div>
          );
        })}
        {predictions.length === 0 && (
          <p className="text-gray-400 text-center py-8">
            You haven't made any predictions yet.
          </p>
        )}
      </div>
    </div>
  );
}