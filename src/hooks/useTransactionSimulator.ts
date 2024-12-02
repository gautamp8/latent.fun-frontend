import { TRANSACTION_SETTINGS } from '../config/constants';

interface TransactionResult {
  hash: string;
  success: boolean;
  timestamp: number;
  data?: any;
}

export const useTransactionSimulator = () => {
  const simulateTransaction = async (
    action: string,
    data: Record<string, any>
  ): Promise<TransactionResult> => {
    const { MIN_DELAY, MAX_DELAY, FAILURE_RATE } = TRANSACTION_SETTINGS.SIMULATION;
    
    await new Promise(resolve => 
      setTimeout(resolve, MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY))
    );

    // Reduce failure rate to improve user experience
    if (Math.random() < FAILURE_RATE / 2) {
      throw new Error(`Transaction failed: Please try again`);
    }

    return {
      hash: '0x' + Math.random().toString(36).substring(2, 15),
      success: true,
      timestamp: Date.now(),
      data
    };
  };

  return { simulateTransaction };
};