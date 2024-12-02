import { useOkto } from 'okto-sdk-react';
import { useStore } from '../store/useStore';
import { PredictionContract } from '../contracts/prediction';

export function usePredictionContract() {
  const okto = useOkto();
  const { selectedChain } = useStore();
  const contract = new PredictionContract(okto, selectedChain.id);

  return {
    submitPrediction: contract.submitPrediction.bind(contract),
    claimRewards: contract.claimRewards.bind(contract)
  };
}