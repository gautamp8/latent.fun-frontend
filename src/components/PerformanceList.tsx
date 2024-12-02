import React from 'react';
import { useStore } from '../store/useStore';
import { PerformanceCard } from './PerformanceCard';

export function PerformanceList() {
  const { performances, walletAddress } = useStore();
  const otherPerformances = performances.filter(p => p.creatorAddress !== walletAddress);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Latest Performances</h2>
      <div className="grid gap-6 max-w-md mx-auto">
        {otherPerformances.map((performance) => (
          <PerformanceCard key={performance.id} performance={performance} />
        ))}
        {otherPerformances.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No performances available. Be the first to submit!
          </div>
        )}
      </div>
    </div>
  );
}