import React, { useState, useEffect } from 'react';
import { getRandomLoadingMessage } from '../services/roastingService';

export function LoadingMessage() {
  const [message, setMessage] = useState(getRandomLoadingMessage());

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(getRandomLoadingMessage());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
      <p className="text-gray-400 mt-4">{message}</p>
    </div>
  );
}