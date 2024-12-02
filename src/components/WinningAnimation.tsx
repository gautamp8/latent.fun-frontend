import React from 'react';

interface WinningAnimationProps {
  show: boolean;
}

export function WinningAnimation({ show }: WinningAnimationProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="relative">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-500 rounded-full"
            style={{
              animation: `confetti-${i} 1s ease-out forwards`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0,
            }}
          />
        ))}
        <div className="text-4xl font-bold text-yellow-500 animate-bounce">
          🎉 Winner! 🎉
        </div>
      </div>
      <style>
        {Array.from({ length: 20 }).map((_, i) => `
          @keyframes confetti-${i} {
            to {
              transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 720}deg);
              opacity: 0;
            }
          }
        `).join('\n')}
      </style>
    </div>
  );
}