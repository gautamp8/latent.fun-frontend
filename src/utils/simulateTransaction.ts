import { TRANSACTION_SETTINGS } from '../config/constants';

interface TransactionResult {
  hash: string;
  success: boolean;
  timestamp: number;
  data?: any;
}

export const simulateTransaction = async (
  action: string,
  data: Record<string, any>
): Promise<TransactionResult> => {
  try {
    console.log('📝 Transaction:', action, data);
    
    if (!action || typeof action !== 'string') {
      throw new Error('Invalid action provided');
    }

    const { MIN_DELAY, MAX_DELAY, FAILURE_RATE } = TRANSACTION_SETTINGS.SIMULATION;
    await new Promise(resolve => 
      setTimeout(resolve, MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY))
    );

    if (Math.random() < FAILURE_RATE) {
      throw new Error(`Transaction failed: Network error during ${action}`);
    }

    const result = {
      hash: '0x' + Math.random().toString(36).substring(2, 15),
      success: true,
      timestamp: Date.now(),
      data
    };

    console.log('✅ Transaction completed:', action, result);
    return result;
  } catch (error) {
    console.error('❌ Transaction failed:', action, error);
    throw error;
  }
};