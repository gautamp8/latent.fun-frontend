import { useOkto, type OktoContextType } from 'okto-sdk-react';
import { CONTRACT_ADDRESS } from '../config/constants';

export function useAdminActions() {
  const { executeRawTransaction } = useOkto() as OktoContextType;

  const initializeTalentShow = async (judgeAddresses: string[]) => {
    const txData = {
      network_name: "APTOS_TESTNET",
      transaction: {
        function: `${CONTRACT_ADDRESS}::talent_show::initialize`,
        type_arguments: [],
        arguments: [judgeAddresses]
      }
    };

    try {
      const result = await executeRawTransaction(txData);
      console.log("Talent show initialized successfully:", result);
      return result;
    } catch (error) {
      console.error("Error initializing talent show:", error);
      throw new Error(error instanceof Error ? error.message : 'Failed to initialize talent show');
    }
  };

  const distributeRewards = async (performanceId: number) => {
    const txData = {
      network_name: "APTOS_TESTNET",
      transaction: {
        function: `${CONTRACT_ADDRESS}::talent_show::distribute_rewards`,
        type_arguments: [],
        arguments: [String(performanceId)]
      }
    };

    try {
      const result = await executeRawTransaction(txData);
      console.log("Rewards distributed successfully:", result);
      return result;
    } catch (error) {
      console.error("Error distributing rewards:", error);
      throw new Error(error instanceof Error ? error.message : 'Failed to distribute rewards');
    }
  };

  return { initializeTalentShow, distributeRewards };
}