import React, { useState } from 'react';
import { Upload, Link } from 'lucide-react';
import { useStore } from '../store/useStore';
import { VideoCapture } from './video/VideoCapture';
import { VideoPlayer } from './video/VideoPlayer';
import { usePerformerActions } from '../hooks/usePerformerActions';
import { REQUIRED_STAKE_AMOUNT } from '../config/constants';
import { executeWithFeedback } from '../utils/transactionFeedback';
import { TransactionHash } from './TransactionHash';
import { toast } from 'react-hot-toast';

export function SubmissionForm() {
  const [selfScore, setSelfScore] = useState(5);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [submissionType, setSubmissionType] = useState<'record' | 'url'>('record');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const { connected, addPerformance, walletAddress, canAffordStake, getTokenSymbol } = useStore();
  const { submitPerformance } = usePerformerActions();

  const handleVideoCapture = (blob: Blob) => {
    setVideoBlob(blob);
    setVideoUrl('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !canAffordStake()) {
      toast.error(`Insufficient ${getTokenSymbol()} balance`);
      return;
    }

    const finalVideoUrl = videoBlob ? URL.createObjectURL(videoBlob) : videoUrl;
    if (!finalVideoUrl) {
      toast.error('Please provide a video');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await executeWithFeedback(
        async () => submitPerformance(finalVideoUrl, selfScore),
        {
          successMessage: 'Performance submitted successfully!',
          errorMessage: 'Failed to submit performance'
        }
      );

      if (result.success && result.hash) {
        setTransactionHash(result.hash);
        addPerformance({
          id: Math.random(),
          videoBlob,
          videoUrl: finalVideoUrl,
          creatorAddress: walletAddress!,
          creatorName: 'Demo User',
          selfScore,
          timestamp: Date.now(),
          likes: 0
        });

        setVideoBlob(null);
        setVideoUrl('');
        setSelfScore(5);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-bold text-white mb-4">Submit Your Performance</h2>
      
      {transactionHash && (
        <TransactionHash hash={transactionHash} />
      )}

      <div className="flex gap-4 mb-6">
        <button
          type="button"
          onClick={() => setSubmissionType('record')}
          className={`flex-1 py-2 rounded-lg font-medium ${
            submissionType === 'record'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-800 text-gray-400'
          }`}
        >
          Record Video
        </button>
        <button
          type="button"
          onClick={() => setSubmissionType('url')}
          className={`flex-1 py-2 rounded-lg font-medium ${
            submissionType === 'url'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-800 text-gray-400'
          }`}
        >
          Video URL
        </button>
      </div>

      <div className="space-y-4">
        {submissionType === 'record' ? (
          <VideoCapture onVideoCapture={handleVideoCapture} />
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Video URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Enter video URL"
                className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-white"
              />
              <button
                type="button"
                className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white"
              >
                <Link className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
        
        {(videoBlob || videoUrl) && (
          <VideoPlayer src={videoBlob ? URL.createObjectURL(videoBlob) : videoUrl} />
        )}

        <div>
          <label htmlFor="score" className="block text-sm font-medium text-gray-300 mb-1">
            Self Score (1-10)
          </label>
          <input
            type="range"
            id="score"
            min="1"
            max="10"
            value={selfScore}
            onChange={(e) => setSelfScore(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-white font-bold">{selfScore}</div>
        </div>

        <div className="text-sm text-gray-400 mb-4">
          Required stake: {REQUIRED_STAKE_AMOUNT} ${getTokenSymbol()}
        </div>

        <button
          type="submit"
          disabled={!connected || !canAffordStake() || (!videoBlob && !videoUrl) || isSubmitting}
          className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Submit Performance
            </>
          )}
        </button>

        {!canAffordStake() && (
          <p className="text-red-500 text-sm mt-2">
            Insufficient balance. You need {REQUIRED_STAKE_AMOUNT} ${getTokenSymbol()} to submit a performance.
          </p>
        )}
      </div>
    </form>
  );
}