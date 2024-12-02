import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useStore } from '../store/useStore';
import { SUPPORTED_CHAINS } from '../types/chains';

export function ChainSelector() {
  const { selectedChain, setSelectedChain } = useStore();

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-full text-sm text-gray-300 hover:bg-gray-700"
        onClick={() => {
          const nextChainIndex = (SUPPORTED_CHAINS.findIndex(c => c.id === selectedChain.id) + 1) % SUPPORTED_CHAINS.length;
          setSelectedChain(SUPPORTED_CHAINS[nextChainIndex]);
        }}
      >
        <span>{selectedChain.name}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );
}