import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

type TokenCahce = {
  getToken: (key: string) => Promise<string | null>;
  saveToken: (key: string, token: string) => Promise<void>;
  deleteToken: (key: string) => Promise<void>;
};
const createCacheToken = (): TokenCahce => {
  return {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (!item) {
          console.log("No Cache Session");
        } else {
          console.log("Session Restored From Cache");
        }
        return item;
      } catch (error) {
        await SecureStore.deleteItemAsync(key);
        console.log("Error getting key", error);
        return null;
      }
    },

    async saveToken(key: string, token: string) {
      return SecureStore.setItemAsync(key, token);
    },

    async deleteToken(key: string) {
      return SecureStore.deleteItemAsync(key);
    },
  };
};

export const tokenCache = createCacheToken();
