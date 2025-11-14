import { Stack } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";

export default function signUp() {
  // Email or Username
  const [identifier, setIdentidier] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <TextInput placeholder="Email..." />
      <TextInput placeholder="Password..." secureTextEntry />
    </View>
  );
}
