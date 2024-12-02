import { useOkto, type OktoContextType } from 'okto-sdk-react';
import { useStore } from '../store/useStore';

export function useWallet() {
  const { getWallets, executeRawTransaction } = useOkto() as OktoContextType;
  const { walletAddress } = useStore();

  const fetchWallets = async () => {
    try {
      const wallets = await getWallets();
      return wallets;
    } catch (error) {
      console.error('Error fetching wallets:', error);
      throw error;
    }
  };

  const stakePrediction = async (amount: number) => {
    if (!walletAddress) return;

    const networkName = "APTOS";
    const transactionData = {
      transactions: [
        {
          function: "0x865116a37cf65e048114ef19570e31ef6990f342042718242cac86276555306d::custom_token::stake_prediction",
          typeArguments: [],
          functionArguments: [
            amount.toString(),
            walletAddress
          ]
        }
      ]
    };

    try {
      const result = await executeRawTransaction({
        network_name: networkName,
        transaction: transactionData,
      });
      return result;
    } catch (error) {
      console.error('Transaction error:', error);
      throw error;
    }
  };

  return {
    fetchWallets,
    stakePrediction
  };
}