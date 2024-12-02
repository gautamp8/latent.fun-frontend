import { useOkto, type OktoContextType } from 'okto-sdk-react';
import { CONTRACT_ADDRESS } from '../config/constants';

export function useJudgeActions() {
  const { executeRawTransaction } = useOkto() as OktoContextType;

  const submitJudgeScore = async (
    performanceId: number, 
    score: number
  ) => {
    const txData = {
      network_name: "APTOS_TESTNET",
      transaction: {
        function: `${CONTRACT_ADDRESS}::talent_show::submit_judge_score`,
        type_arguments: [],
        arguments: [
          String(performanceId),
          String(score)
        ]
      }
    };

    try {
      const result = await executeRawTransaction(txData);
      console.log("Judge score submitted successfully:", result);
      return result;
    } catch (error) {
      console.error("Error submitting judge score:", error);
      throw new Error(error instanceof Error ? error.message : 'Failed to submit judge score');
    }
  };

  return { submitJudgeScore };
}