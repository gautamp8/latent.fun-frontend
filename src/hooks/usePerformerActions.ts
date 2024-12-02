import { useOkto, type OktoContextType } from 'okto-sdk-react';
import { CONTRACT_ADDRESS, REQUIRED_STAKE_AMOUNT } from '../config/constants';
import { useTransactionSimulator } from './useTransactionSimulator';

export function usePerformerActions() {
  const { executeRawTransaction } = useOkto() as OktoContextType;
  const { simulateTransaction } = useTransactionSimulator();

  const submitPerformance = async (
    videoLink: string, 
    selfScore: number
  ) => {
    if (!videoLink || typeof selfScore !== 'number' || selfScore < 1 || selfScore > 10) {
      throw new Error('Invalid performance data provided');
    }

    console.log('📝 Submitting performance:', {
      videoLink,
      selfScore,
      stakeAmount: REQUIRED_STAKE_AMOUNT,
      contractAddress: CONTRACT_ADDRESS
    });

    try {
      const result = await simulateTransaction('submitPerformance', {
        videoLink,
        selfScore,
        stakeAmount: REQUIRED_STAKE_AMOUNT,
        timestamp: Date.now()
      });

      console.log('✅ Performance submitted successfully:', { txHash: result.hash });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to submit performance';
      console.error('❌ Performance submission failed:', error);
      throw new Error(errorMessage);
    }
  };

  return { submitPerformance };
}