import { useOkto, type OktoContextType } from 'okto-sdk-react';
import { CONTRACT_ADDRESS } from '../config/constants';
import { executeTransaction } from '../utils/transactions';
import { useTransactionSimulator } from './useTransactionSimulator';

export function useAudienceActions() {
  const { executeRawTransaction } = useOkto() as OktoContextType;
  const { simulateTransaction } = useTransactionSimulator();

  const submitAudienceScore = async (
    performanceId: number, 
    score: number,
    stakeAmount: number
  ) => {
    if (!performanceId || typeof score !== 'number' || score < 1 || score > 10) {
      throw new Error('Invalid prediction data provided');
    }

    return executeTransaction(
      'submitAudienceScore',
      async () => {
        const result = await simulateTransaction('submitAudienceScore', {
          performanceId,
          score,
          stakeAmount,
          timestamp: Date.now()
        });

        if (!result.success) {
          throw new Error('Failed to submit prediction');
        }

        return result;
      },
      {
        loadingMessage: 'Submitting prediction...',
        successMessage: 'Prediction submitted successfully!',
        errorMessage: 'Failed to submit prediction'
      }
    );
  };

  return { submitAudienceScore };
}