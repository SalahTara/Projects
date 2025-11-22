import {
  AccessTokenRequest,
  AuthError,
  AuthRequestConfig,
  DiscoveryDocument,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import { useEffect, createContext, useState, useContext } from "react";
import * as WebBrowser from "expo-web-browser";
import { BASE_URL, REDIRECT_URI, TOKEN_KEY_NAME } from "../constants.ts";
import axios from "axios";
import * as jose from "jose";
import * as Google from "expo-auth-session/providers/google";
import { tokenCache } from "../utils/cache.ts";

WebBrowser.maybeCompleteAuthSession();

// ----- Types -----
export type AuthUser = {
  id: string;
  email: string;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  email_verified?: boolean;
  provider?: string;
  exp?: number;
  cookieExpiration?: number;
};

export type AuthContextType = {
  user: AuthUser | null;
  signIn: () => Promise<void>;
  signOut: () => void;
  fetchwithAuth: (url: string, options?: RequestInit) => Promise<Response>;
  isLoading: boolean;
  error: AuthError | null;
};

// ----- Default Context -----
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ----- Provider -----
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  // const [request, response, promptAsync] = useAuthRequest(config, discovery);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1025144183250-q7kmkr1kgvfcjf5h8mbjojhd6qk72lib.apps.googleusercontent.com",
    iosClientId:
      "1025144183250-9kn4glvtg892ruolo72ap2m3v9gs4gdd.apps.googleusercontent.com",
  });
  const [accessToken, setAccessToken] = useState();

  // Google OAuth Response Handler
  useEffect(() => {
    handleResponse();
  }, [response]);

  const signIn = async () => {
    try {
      if (!request) {
        console.log("No Request");
        return;
      }
      await promptAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const handleResponse = async () => {
    if (response?.type === "success") {
      console.log(response);

      const auth = response.authentication;

      const idToken = auth?.idToken || (response.params as any)?.id_token;

      if (!idToken) {
        console.log("No idToken found in response");
        return;
      }

      const apiResponse = await axios.post(`${BASE_URL}/auth/google`, {
        idToken,
      });
    }
  };

  const signOut = () => {};

  const fetchwithAuth = async (url: string, options?: RequestInit) => {
    return fetch(url, options);
  };

  return (
    <AuthContext.Provider
      value={{
        user: null,
        signIn,
        signOut,
        fetchwithAuth,
        isLoading: false,
        error: null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ----- Hook -----
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
