import { toast } from 'react-hot-toast';

export interface TransactionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function executeTransaction<T>(
  action: string,
  handler: () => Promise<T>,
  options: {
    loadingMessage?: string;
    successMessage?: string;
    errorMessage?: string;
  } = {}
): Promise<TransactionResult<T>> {
  const {
    loadingMessage = 'Processing transaction...',
    successMessage = 'Transaction successful!',
    errorMessage = 'Transaction failed'
  } = options;

  try {
    const toastId = toast.loading(loadingMessage);
    const result = await handler();
    
    toast.success(successMessage, { id: toastId });
    return { success: true, data: result };
  } catch (error) {
    const message = error instanceof Error ? error.message : errorMessage;
    toast.error(message);
    return { success: false, error: message };
  }
}