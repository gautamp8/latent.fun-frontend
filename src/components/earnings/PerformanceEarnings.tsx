import React from 'react';
import { PerformanceCard } from '../PerformanceCard';
import { useStore } from '../../store/useStore';
import type { Performance } from '../../types';
import { REQUIRED_STAKE_AMOUNT } from '../../config/constants';

export function PerformanceEarnings({ performances }: { performances: Performance[] }) {
  const { getTokenSymbol } = useStore();
  const totalStaked = performances.length * REQUIRED_STAKE_AMOUNT * -1; // Negative because it's staked

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-4">
        <p className="text-sm text-gray-400 mb-1">Total Performance Stakes</p>
        <p className="text-xl font-bold text-red-500">
          {totalStaked.toFixed(2)} ${getTokenSymbol()}
        </p>
      </div>

      <div className="space-y-4">
        {performances.map((performance) => (
          <div key={performance.id} className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Performance #{performance.id}</span>
              <span className="text-sm text-red-500">
                -{REQUIRED_STAKE_AMOUNT} ${getTokenSymbol()}
              </span>
            </div>
            <div className="text-sm text-gray-400">
              <p>Self Score: {performance.selfScore}/10</p>
              <p>Submitted: {new Date(performance.timestamp).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
        {performances.length === 0 && (
          <p className="text-gray-400 text-center py-8">
            You haven't submitted any performances yet.
          </p>
        )}
      </div>
    </div>
  );
}