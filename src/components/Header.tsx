import React from 'react';
import { Menu, Wallet } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useOkto } from 'okto-sdk-react';
import { GoogleLogin } from '@react-oauth/google';
import { ChainSelector } from './ChainSelector';
import { toast } from 'react-hot-toast';

export function Header() {
  const { connected, connectWallet, disconnectWallet, walletAddress, balance, getTokenSymbol } = useStore();
  const { authenticate } = useOkto();

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse.credential;
      authenticate(idToken, (authResponse, error) => {
        if (authResponse) {
          connectWallet(authResponse.auth_token);
          toast.success('Successfully connected wallet');
        }
        if (error) {
          console.error("Authentication error:", error);
          toast.error(error.message || 'Failed to authenticate');
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      toast.error('Failed to connect wallet');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Menu className="w-6 h-6 text-gray-300" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Latent.fun
        </h1>
        {!connected ? (
          <div className="flex items-center gap-2">
            <ChainSelector />
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error('Login Failed')}
              useOneTap
              type="icon"
              shape="circle"
              theme="filled_black"
              context="signin"
            />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <ChainSelector />
            <div className="text-sm text-gray-300">
              <span className="font-medium">{balance}</span>
              <span className="ml-1 text-gray-500">${getTokenSymbol()}</span>
            </div>
            <button
              onClick={disconnectWallet}
              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium"
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">{walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}