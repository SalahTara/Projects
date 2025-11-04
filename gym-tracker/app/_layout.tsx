import { Stack } from "expo-router";

// Root Layout
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
