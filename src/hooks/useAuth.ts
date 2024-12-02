import { useOkto, type OktoContextType } from 'okto-sdk-react';
import { toast } from 'react-hot-toast';

export function useAuth() {
  const { authenticate } = useOkto() as OktoContextType;

  const handleAuthentication = async (idToken: string): Promise<string | null> => {
    try {
      return new Promise((resolve, reject) => {
        authenticate(idToken, (authResponse, error) => {
          if (authResponse?.auth_token) {
            resolve(authResponse.auth_token);
          } else {
            console.error('Authentication failed:', error);
            reject(new Error(error?.message || 'Authentication failed'));
          }
        });
      });
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  };

  return { handleAuthentication };
}