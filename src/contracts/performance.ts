import { OktoContextType } from 'okto-sdk-react';
import { CONTRACT_ADDRESS, TRANSACTION_FUNCTIONS } from './constants';
import type { TalentShowTransaction, TransactionResult, PerformanceData } from './types';

export class PerformanceContract {
  constructor(
    private okto: OktoContextType,
    private network: string
  ) {}

  async submitPerformance(
    videoUrl: string,
    selfScore: number,
    stake: number
  ): Promise<TransactionResult> {
    const txData: TalentShowTransaction = {
      network_name: this.network,
      transaction: {
        function: `${CONTRACT_ADDRESS}::talent_show::${TRANSACTION_FUNCTIONS.SUBMIT_PERFORMANCE}`,
        type_arguments: [],
        arguments: [videoUrl, selfScore.toString(), stake.toString()]
      }
    };

    try {
      const result = await this.okto.executeRawTransaction(txData);
      return { success: true, hash: result.hash };
    } catch (error) {
      return { success: false, error };
    }
  }

  async getPerformance(performanceId: number): Promise<PerformanceData> {
    const txData: TalentShowTransaction = {
      network_name: this.network,
      transaction: {
        function: `${CONTRACT_ADDRESS}::talent_show::${TRANSACTION_FUNCTIONS.GET_PERFORMANCE}`,
        type_arguments: [],
        arguments: [performanceId.toString()]
      }
    };

    const result = await this.okto.executeRawTransaction(txData);
    return this.parsePerformanceData(result);
  }

  private parsePerformanceData(rawData: any): PerformanceData {
    return {
      performanceId: Number(rawData.performance_id),
      creatorAddress: rawData.creator,
      selfScore: Number(rawData.self_score),
      totalStake: Number(rawData.total_stake),
      predictions: Number(rawData.predictions_count),
      status: rawData.status
    };
  }
}