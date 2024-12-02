import { useOkto, type OktoContextType } from 'okto-sdk-react';
import { CONTRACT_ADDRESS } from '../config/constants';

export function usePerformanceStatus() {
  const { executeRawTransaction } = useOkto() as OktoContextType;

  const getPerformanceStatus = async (performanceId: number) => {
    const txData = {
      network_name: "APTOS_TESTNET",
      transaction: {
        function: `${CONTRACT_ADDRESS}::talent_show::get_performance_status`,
        type_arguments: [],
        arguments: [String(performanceId)]
      }
    };

    try {
      const result = await executeRawTransaction(txData);
      return result;
    } catch (error) {
      console.error("Error getting performance status:", error);
      throw new Error(error instanceof Error ? error.message : 'Failed to get performance status');
    }
  };

  const getTotalStake = async (performanceId: number) => {
    const txData = {
      network_name: "APTOS_TESTNET",
      transaction: {
        function: `${CONTRACT_ADDRESS}::talent_show::get_total_stake`,
        type_arguments: [],
        arguments: [String(performanceId)]
      }
    };

    try {
      const result = await executeRawTransaction(txData);
      return result;
    } catch (error) {
      console.error("Error getting total stake:", error);
      throw new Error(error instanceof Error ? error.message : 'Failed to get total stake');
    }
  };

  return { getPerformanceStatus, getTotalStake };
}