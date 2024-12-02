export interface TalentShowTransaction {
  network_name: string;
  transaction: {
    function: string;
    type_arguments: string[];
    arguments: string[];
  };
}

export interface TransactionResult {
  success: boolean;
  hash?: string;
  error?: unknown;
}