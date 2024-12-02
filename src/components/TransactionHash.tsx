import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface TransactionHashProps {
  hash: string | null;
  success?: boolean;
}

export function TransactionHash({ hash, success = true }: TransactionHashProps) {
  if (!hash) return null;

  return (
    <div className="flex items-center gap-2 text-sm font-mono bg-gray-800/50 rounded-lg p-2 mb-4">
      {success ? (
        <CheckCircle2 className="w-4 h-4 text-green-500" />
      ) : (
        <XCircle className="w-4 h-4 text-red-500" />
      )}
      <span className="text-gray-400">tx:</span>
      <span className="text-gray-300">{hash.slice(0, 10)}...{hash.slice(-8)}</span>
    </div>
  );
}