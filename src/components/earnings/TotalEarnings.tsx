import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function TotalEarnings({ amount }: { amount: number }) {
  const { getTokenSymbol } = useStore();
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="w-5 h-5 text-purple-500" />
        <span className="text-lg text-gray-300">Total Earnings</span>
      </div>
      <p className="text-3xl font-bold text-white">
        {amount.toFixed(2)} ${getTokenSymbol()}
      </p>
    </div>
  );
}