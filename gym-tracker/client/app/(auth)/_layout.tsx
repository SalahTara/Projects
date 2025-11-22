import { AuthContext } from "@/context/authContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Stack, Tabs } from "expo-router";
import { useContext } from "react";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#25292e" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="sign-in"
        options={{
          title: "Log In",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="splash"
        options={{
          title: "",
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="email-sign-up"
        options={{
          title: "Create Account",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
