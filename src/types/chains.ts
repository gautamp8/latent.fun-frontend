export type ChainType = 'APTOS_TEST' | 'BASE';

export interface Chain {
  id: ChainType;
  name: string;
  tokenSymbol: string;
}

export const SUPPORTED_CHAINS: Chain[] = [
  {
    id: 'APTOS_TEST',
    name: 'Aptos Testnet',
    tokenSymbol: 'APTOS'
  },
  {
    id: 'BASE',
    name: 'Base',
    tokenSymbol: 'ETH'
  }
];