import { toast } from 'react-hot-toast';

export interface TransactionState {
  isProcessing: boolean;
  hash: string | null;
  error: string | null;
}

export interface TransactionOptions {
  minDelay?: number;
  maxDelay?: number;
  successMessage?: string;
  errorMessage?: string;
}

export const executeWithFeedback = async <T>(
  action: () => Promise<T>,
  options: TransactionOptions = {}
): Promise<{ success: boolean; data?: T; hash?: string }> => {
  const {
    minDelay = 1000,
    maxDelay = 2000,
    successMessage = 'Transaction successful!',
    errorMessage = 'Transaction failed'
  } = options;

  const delay = minDelay + Math.random() * (maxDelay - minDelay);
  const hash = '0x' + Math.random().toString(36).substr(2, 32);

  const toastId = toast.loading('Processing transaction...');

  try {
    await new Promise(resolve => setTimeout(resolve, delay));
    const result = await action();
    
    toast.success(successMessage, { id: toastId });
    return { success: true, data: result, hash };
  } catch (error) {
    const message = error instanceof Error ? error.message : errorMessage;
    toast.error(message, { id: toastId });
    return { success: false, error: message };
  }
};