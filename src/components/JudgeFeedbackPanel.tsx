import React, { useState } from 'react';
import { Volume2, Heart } from 'lucide-react';
import { JudgeFeedback } from '../types';
import { useStore } from '../store/useStore';

interface JudgeFeedbackPanelProps {
  feedback: JudgeFeedback;
  onLike?: () => void;
}

export function JudgeFeedbackPanel({ feedback, onLike }: JudgeFeedbackPanelProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { connected, hasLiked, getLikes, toggleLike } = useStore();
  const feedbackId = feedback.id || '';

  const handlePlayVoiceover = () => {
    if (!feedback.audioUrl) return;
    
    const audio = new Audio(feedback.audioUrl);
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      
      audio.onended = () => setIsPlaying(false);
    }
  };

  const handleLike = () => {
    if (!connected || !feedback.id) return;
    toggleLike('feedback', feedback.id);
    onLike?.();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-purple-500">
      <div className="flex items-start gap-4 mb-4">
        {feedback.thumbnail && (
          <img 
            src={feedback.thumbnail} 
            alt={feedback.panel} 
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-purple-400 font-bold">{feedback.panel}</span>
            <div className="flex items-center gap-4">
              {feedback.audioUrl && (
                <button 
                  onClick={handlePlayVoiceover}
                  className={`text-gray-400 hover:text-white ${
                    isPlaying ? 'text-purple-500' : ''
                  }`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              )}
              <button 
                onClick={handleLike}
                disabled={!connected}
                className={`text-gray-400 hover:text-white ${
                  hasLiked('feedback', feedbackId) ? 'text-pink-500' : ''
                }`}
              >
                <Heart className={`w-5 h-5 ${
                  hasLiked('feedback', feedbackId) ? 'fill-current' : ''
                }`} />
                <span className="text-sm ml-1">{getLikes('feedback', feedbackId)}</span>
              </button>
            </div>
          </div>
          <p className="text-gray-300 mt-2">{feedback.roast}</p>
        </div>
      </div>
    </div>
  );
}