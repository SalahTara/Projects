// app/_layout.jsx
import { Stack } from "expo-router";
import { useState } from "react";
import { AuthProvider } from "@/context/authContext";

export default function RootLayout() {
  const [authState, setAuthState] = useState({
    username: "",
    status: false,
  });

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
