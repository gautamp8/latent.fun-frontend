import { useOkto } from 'okto-sdk-react';
import { useStore } from '../store/useStore';
import { PerformanceContract } from '../contracts/performance';

export function usePerformanceContract() {
  const okto = useOkto();
  const { selectedChain } = useStore();
  const contract = new PerformanceContract(okto, selectedChain.id);

  return {
    submitPerformance: contract.submitPerformance.bind(contract),
    getPerformance: contract.getPerformance.bind(contract)
  };
}