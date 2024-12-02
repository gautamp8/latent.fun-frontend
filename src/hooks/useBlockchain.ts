import { useOkto } from 'okto-sdk-react';
import { TalentShowContract } from '../contracts/talentShow';
import { useStore } from '../store/useStore';

export function useBlockchain() {
  const okto = useOkto();
  const { selectedChain } = useStore();
  
  // Initialize contract with current network
  const contract = new TalentShowContract(okto, selectedChain.id);

  /**
   * Submit a new performance to the blockchain
   * @param videoHash - IPFS hash of the performance video
   * @param selfScore - Creator's self-assessment score
   * @param stake - Amount to stake
   */
  const submitPerformance = async (
    videoHash: string,
    selfScore: number,
    stake: number
  ) => {
    try {
      const hash = await contract.submitPerformance(videoHash, selfScore, stake);
      return { success: true, hash };
    } catch (error) {
      console.error('Failed to submit performance:', error);
      return { success: false, error };
    }
  };

  /**
   * Submit a prediction for a performance
   * @param performanceId - ID of the performance
   * @param predictedScore - Predicted score
   * @param stake - Amount to stake
   */
  const submitPrediction = async (
    performanceId: string,
    predictedScore: number,
    stake: number
  ) => {
    try {
      const hash = await contract.submitPrediction(
        performanceId,
        predictedScore,
        stake
      );
      return { success: true, hash };
    } catch (error) {
      console.error('Failed to submit prediction:', error);
      return { success: false, error };
    }
  };

  /**
   * Claim rewards for a winning prediction
   * @param performanceId - ID of the performance
   * @param predictionId - ID of the prediction
   */
  const claimRewards = async (performanceId: string, predictionId: string) => {
    try {
      const hash = await contract.claimRewards(performanceId, predictionId);
      return { success: true, hash };
    } catch (error) {
      console.error('Failed to claim rewards:', error);
      return { success: false, error };
    }
  };

  return {
    submitPerformance,
    submitPrediction,
    claimRewards
  };
}