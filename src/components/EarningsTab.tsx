import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { WinningAnimation } from './WinningAnimation';
import { TotalEarnings } from './earnings/TotalEarnings';
import { PerformanceEarnings } from './earnings/PerformanceEarnings';
import { PredictionEarnings } from './earnings/PredictionEarnings';

type TabType = 'predictions' | 'performances';

export function EarningsTab() {
  const { predictions, getUserPerformances } = useStore();
  const [activeTab, setActiveTab] = useState<TabType>('predictions');
  const [showWinningAnimation, setShowWinningAnimation] = useState(false);
  
  const userPerformances = getUserPerformances();
  
  const totalPredictionEarnings = predictions.reduce((total, prediction) => {
    if (prediction.won) {
      return total + prediction.stakedAmount;
    }
    return total - prediction.stakedAmount;
  }, 0);
  
  const totalPerformanceEarnings = userPerformances.length * -100; // Negative because it's staked
  const totalEarnings = totalPredictionEarnings + totalPerformanceEarnings;

  useEffect(() => {
    if (predictions.some(p => p.won)) {
      setShowWinningAnimation(true);
      const timer = setTimeout(() => setShowWinningAnimation(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [predictions]);

  return (
    <div className="space-y-6">
      <WinningAnimation show={showWinningAnimation} />
      
      <TotalEarnings amount={totalEarnings} />

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('predictions')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            activeTab === 'predictions'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          Predictions
        </button>
        <button
          onClick={() => setActiveTab('performances')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            activeTab === 'performances'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          Performances
        </button>
      </div>

      {activeTab === 'predictions' ? (
        <PredictionEarnings predictions={predictions} />
      ) : (
        <PerformanceEarnings performances={userPerformances} />
      )}
    </div>
  );
}