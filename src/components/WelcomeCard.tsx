import React from 'react';
import { Heart } from 'lucide-react';

export function WelcomeCard() {
  const [likes, setLikes] = React.useState(0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full mx-auto">
      <img
        src="https://images.unsplash.com/photo-1581276879432-15e50529f34b?auto=format&fit=crop&w=1950&q=80"
        alt="Hello World"
        className="w-full h-48 object-cover rounded-lg mb-6"
      />
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Welcome to Our App
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        This is a responsive mobile-first web application built with React and Tailwind CSS.
        It features a modern design with dark mode support and interactive elements.
      </p>
      <button
        onClick={() => setLikes(prev => prev + 1)}
        className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
      >
        <Heart className="w-5 h-5" />
        <span>Like ({likes})</span>
      </button>
    </div>
  );
}