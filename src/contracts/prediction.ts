import { OktoContextType } from 'okto-sdk-react';
import { CONTRACT_ADDRESS, TRANSACTION_FUNCTIONS } from './constants';
import type { TalentShowTransaction, TransactionResult } from './types';

export class PredictionContract {
  constructor(
    private okto: OktoContextType,
    private network: string
  ) {}

  async submitPrediction(
    performanceId: number,
    predictedScore: number,
    stake: number
  ): Promise<TransactionResult> {
    const txData: TalentShowTransaction = {
      network_name: this.network,
      transaction: {
        function: `${CONTRACT_ADDRESS}::talent_show::${TRANSACTION_FUNCTIONS.SUBMIT_PREDICTION}`,
        type_arguments: [],
        arguments: [performanceId.toString(), predictedScore.toString(), stake.toString()]
      }
    };

    try {
      const result = await this.okto.executeRawTransaction(txData);
      return { success: true, hash: result.hash };
    } catch (error) {
      return { success: false, error };
    }
  }

  async claimRewards(performanceId: number): Promise<TransactionResult> {
    const txData: TalentShowTransaction = {
      network_name: this.network,
      transaction: {
        function: `${CONTRACT_ADDRESS}::talent_show::${TRANSACTION_FUNCTIONS.CLAIM_REWARDS}`,
        type_arguments: [],
        arguments: [performanceId.toString()]
      }
    };

    try {
      const result = await this.okto.executeRawTransaction(txData);
      return { success: true, hash: result.hash };
    } catch (error) {
      return { success: false, error };
    }
  }
}