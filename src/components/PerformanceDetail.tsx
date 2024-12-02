import React, { useEffect, useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, Share2, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Comment, JudgeFeedback } from '../types';
import { JudgeFeedbackPanel } from './JudgeFeedbackPanel';
import { LoadingMessage } from './LoadingMessage';
import { submitVideoForRoasting } from '../services/roastingService';
import { VideoPlayer } from './video/VideoPlayer';

export function PerformanceDetail() {
  const { 
    performances, 
    selectedPerformanceId, 
    setSelectedPerformanceId,
    setActiveTab,
    comments,
    addComment,
    connected,
    toggleLike,
    getLikes,
    hasLiked,
    walletAddress,
    hasPredicted,
    getPrediction
  } = useStore();
  
  const [loading, setLoading] = useState(true);
  const [judgeFeedback, setJudgeFeedback] = useState<JudgeFeedback[]>([]);
  const [newComment, setNewComment] = useState('');
  
  const performance = performances.find(p => p.id === selectedPerformanceId);
  const performanceComments = comments.filter(c => c.performanceId === selectedPerformanceId);
  const isLiked = performance ? hasLiked('performance', performance.id.toString()) : false;
  const likeCount = performance ? getLikes('performance', performance.id.toString()) : 0;
  const hasMadePrediction = performance ? hasPredicted(performance.id) : false;
  const prediction = performance ? getPrediction(performance.id) : undefined;
  const isOwnPerformance = performance?.creatorAddress === walletAddress;

  useEffect(() => {
    if (performance?.videoUrl && !performance.judgeFeedback) {
      setLoading(true);
      submitVideoForRoasting(performance.videoUrl)
        .then(feedback => {
          setJudgeFeedback(feedback);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error getting roasts:', error);
          setLoading(false);
        });
    }
  }, [performance]);

  if (!performance) return null;

  const handleBack = () => {
    setSelectedPerformanceId(null);
  };

  const handleLike = () => {
    if (!connected || !performance) return;
    toggleLike('performance', performance.id.toString());
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !performance || !newComment.trim()) return;

    addComment({
      id: Math.random().toString(36).slice(2),
      performanceId: performance.id,
      userAddress: walletAddress!,
      userName: 'Anonymous User',
      content: newComment.trim(),
      timestamp: Date.now(),
      likes: 0
    });

    setNewComment('');
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            disabled={!connected}
            className={`flex items-center gap-1 ${
              isLiked ? 'text-pink-500' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likeCount}</span>
          </button>
          <button className="text-gray-400 hover:text-white">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <VideoPlayer src={performance.videoUrl} />

      <div className="bg-gray-900 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">{performance.creatorName}</h2>
          <span className="text-sm text-gray-500">
            {new Date(performance.timestamp).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isOwnPerformance ? (
            <p className="text-gray-400">Self Score: {performance.selfScore}/10</p>
          ) : hasMadePrediction ? (
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Your Prediction: {prediction?.predictedScore}/10</span>
              {prediction?.won && <span className="text-green-500 text-sm">(Won!)</span>}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-400">
              <Lock className="w-4 h-4" />
              <span>Make a prediction to see the score</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Judge Feedback</h3>
        {loading ? (
          <LoadingMessage />
        ) : (
          <div className="space-y-4">
            {judgeFeedback.map((feedback, index) => (
              <JudgeFeedbackPanel 
                key={feedback.id || index} 
                feedback={feedback}
              />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Comments</h3>
        <form onSubmit={handleComment} className="space-y-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={connected ? "Add a comment..." : "Connect wallet to comment"}
            disabled={!connected}
            className="w-full bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500 disabled:opacity-50"
            rows={3}
          />
          <button
            type="submit"
            disabled={!connected || !newComment.trim()}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium disabled:opacity-50"
          >
            Comment
          </button>
        </form>
        <div className="space-y-4">
          {performanceComments.map((comment) => (
            <div key={comment.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">{comment.userName}</span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-300">{comment.content}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => toggleLike('comment', comment.id)}
                  disabled={!connected}
                  className={`flex items-center gap-1 text-sm ${
                    hasLiked('comment', comment.id)
                      ? 'text-pink-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${
                    hasLiked('comment', comment.id) ? 'fill-current' : ''
                  }`} />
                  <span>{getLikes('comment', comment.id)}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}