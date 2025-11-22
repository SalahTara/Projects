import { Link, router, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import axios from "axios";
import { useAuth } from "@/context/authContext";

export default function signIn() {
  // Email or Username
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const URL = `http://${process.env.EXPO_PUBLIC_API_URL}:3000/auth/sign-in`;

  // Google Sign In
  const { signIn } = useAuth();

  const handleEmailLogin = async () => {
    const response = await axios.post(URL, { identifier, password });
    router.push("/(tabs)");
    console.log(response.data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email or Username</Text>
      <TextInput
        style={styles.signInInfo}
        placeholder="example@gmail.com"
        onChangeText={(text) => {
          setIdentifier(text);
        }}
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.signInInfo}
        placeholder="Minimum 6 characters"
        secureTextEntry
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <View style={styles.signUpContainer}>
        <Link style={styles.changePasswordLink} href={"/(auth)/splash"}>
          Forgot Password?
        </Link>
      </View>
      <Pressable
        style={({ pressed }) => {
          return [styles.loginBtn, pressed && { backgroundColor: "#D4D4D4" }];
        }}
        onPress={handleEmailLogin}
      >
        <Text style={styles.loginBtnText}>Login</Text>
      </Pressable>
      <Text style={styles.textCenter}>or</Text>

      {/* Google Sign In */}
      <Pressable
        style={({ pressed }) => {
          return [styles.btn, pressed && { backgroundColor: "#D4D4D4" }];
        }}
        onPress={signIn}
      >
        <Ionicons style={styles.icon} name="logo-google" size={20} />
        <Text style={styles.btntext}>Sign in with Google</Text>
      </Pressable>
      {/* <Pressable
        style={({ pressed }) => {
          return [styles.btn, pressed && { backgroundColor: "#D4D4D4" }];
        }}
      >
        <Ionicons style={styles.appleIcon} name="logo-apple" size={20} />
        <Text style={styles.btntext}>Sign in with Apple</Text>
      </Pressable> */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>New Here?</Text>
        <Link style={styles.signUpLink} href={"/(auth)/splash"}>
          Sign Up
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "flex-start",
    paddingLeft: 15,
    paddingRight: 15,
  },
  signUpContainer: {
    flexDirection: "row",
    color: "#E6E6E6",
    justifyContent: "center",
    marginTop: 7,
  },
  signUpText: {
    color: "#E6E6E6",
  },
  signUpLink: {
    color: "#0690f3ff",
    paddingLeft: 4,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#E6E6E6",
    borderColor: "#E6E6E6",
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 10,
    marginRight: 35,
    marginLeft: 35,
    padding: 7,
    paddingRight: 40,
  },
  icon: {
    marginRight: 10,
  },
  appleIcon: {
    marginRight: 10,
  },
  btntext: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
    textAlign: "center",
  },
  signInInfo: {
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingVertical: 2,
    borderBottomColor: "#E6E6E6",
    color: "#E6E6E6",
  },
  textCenter: {
    textAlign: "center",
    color: "#E6E6E6",
    paddingTop: 7,
    fontWeight: "bold",
  },
  text: {
    color: "#E6E6E6",
  },
  loginBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#E6E6E6",
    borderColor: "#E6E6E6",
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 10,
    marginRight: 35,
    marginLeft: 35,
    padding: 7,
  },
  loginBtnText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
    textAlign: "center",
  },
  changePasswordLink: {
    flex: 1,
    color: "#0690f3ff",
    paddingLeft: 4,
    textAlign: "right",
  },
});
