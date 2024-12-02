import { OktoContextType } from 'okto-sdk-react';
import type { TalentShowTransaction, PerformanceData, PredictionData } from './types';

// Contract address for the TalentShow smart contract
export const CONTRACT_ADDRESS = "1fd2ada641c9711e2bd7a9fb0ddd5ea2f535d8331eff349ad788af51488c31bc";

export class TalentShowContract {
  private okto: OktoContextType;
  private network: string;

  constructor(okto: OktoContextType, network: string = "APTOS_TESTNET") {
    this.okto = okto;
    this.network = network;
  }

  /**
   * Submits a new performance to the talent show
   * @param videoHash - IPFS hash of the performance video
   * @param selfScore - Creator's self-assessment score (1-10)
   * @param stake - Amount of tokens to stake
   */
  async submitPerformance(
    videoHash: string,
    selfScore: number,
    stake: number
  ): Promise<string> {
    const txData: TalentShowTransaction = {
      network_name: this.network,
      transaction: {
        function: `${CONTRACT_ADDRESS}::talent_show::submit_performance`,
        type_arguments: [],
        arguments: [videoHash, selfScore.toString(), stake.toString()]
      }
    };

    // Execute transaction through Okto wallet
    const result = await this.okto.executeRawTransaction(txData);
    return result.hash;
  }

  /**
   * Submit a prediction for a performance
   * @param performanceId - ID of the performance
   * @param predictedScore - Predicted score (1-10)
   * @param stake - Amount to stake on the prediction
   */
  async submitPrediction(
    performanceId: string,
    predictedScore: number,
    stake: number
  ): Promise<string> {
    const txData: TalentShowTransaction = {
      network_name: this.network,
      transaction: {
        function: `${CONTRACT_ADDRESS}::talent_show::submit_prediction`,
        type_arguments: [],
        arguments: [performanceId, predictedScore.toString(), stake.toString()]
      }
    };

    const result = await this.okto.executeRawTransaction(txData);
    return result.hash;
  }

  /**
   * Retrieves performance data from the contract
   * @param performanceId - ID of the performance to fetch
   */
  async getPerformance(performanceId: string): Promise<PerformanceData> {
    const txData: TalentShowTransaction = {
      network_name: this.network,
      transaction: {
        function: `${CONTRACT_ADDRESS}::talent_show::get_performance`,
        type_arguments: [],
        arguments: [performanceId]
      }
    };

    const result = await this.okto.executeRawTransaction(txData);
    return this.parsePerformanceData(result);
  }

  /**
   * Calculate rewards for a completed performance
   * @param performanceId - ID of the completed performance
   */
  async calculateRewards(performanceId: string): Promise<number> {
    const txData: TalentShowTransaction = {
      network_name: this.network,
      transaction: {
        function: `${CONTRACT_ADDRESS}::talent_show::calculate_rewards`,
        type_arguments: [],
        arguments: [performanceId]
      }
    };

    const result = await this.okto.executeRawTransaction(txData);
    return Number(result);
  }

  /**
   * Claim rewards for a winning prediction
   * @param performanceId - ID of the performance
   * @param predictionId - ID of the winning prediction
   */
  async claimRewards(performanceId: string, predictionId: string): Promise<string> {
    const txData: TalentShowTransaction = {
      network_name: this.network,
      transaction: {
        function: `${CONTRACT_ADDRESS}::talent_show::claim_rewards`,
        type_arguments: [],
        arguments: [performanceId, predictionId]
      }
    };

    const result = await this.okto.executeRawTransaction(txData);
    return result.hash;
  }

  // Private helper methods
  private parsePerformanceData(rawData: any): PerformanceData {
    // Transform contract data into PerformanceData type
    return {
      performanceId: rawData.performance_id,
      creatorAddress: rawData.creator,
      selfScore: Number(rawData.self_score),
      totalStake: Number(rawData.total_stake),
      predictions: Number(rawData.predictions_count),
      status: rawData.status
    };
  }
}