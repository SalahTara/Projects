import { Redirect } from "expo-router";
import { useContext } from "react";
import { useAuth } from "@/context/authContext";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.isLoadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!user) {
    // not logged in → go to auth (e.g. login screen)
    return <Redirect href="/(auth)/splash" />;
  }
  // logged in → go to tabs
  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  isLoadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
