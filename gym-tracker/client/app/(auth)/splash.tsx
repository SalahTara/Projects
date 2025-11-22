import { Link } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import ImageSlider from "@/components/imageSlider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";

WebBrowser.maybeCompleteAuthSession();

export default function Splash() {
  const { signIn } = useAuth();
  // Google Cloud Services Client ID for each platform
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  });

  // useEffect(() => {
  //   console.log(
  //     "Current redirect URI:",
  //     AuthSession.makeRedirectUri({
  //       scheme: "gymtracker",
  //       path: "auth",
  //     })
  //   );
  // }, []);

  // useEffect(() => {
  //   console.log("AUTH REQUEST URL:", request?.url);
  // }, [request]);

  return (
    <View style={styles.container}>
      <ImageSlider />

      <Pressable
        style={({ pressed }) => {
          return [styles.btn, pressed && { backgroundColor: "#D4D4D4" }];
        }}
        onPress={signIn}
      >
        <Ionicons style={styles.icon} name="logo-google" size={20} />
        <Text style={styles.btntext}>Sign up with Google</Text>
      </Pressable>

      {/* <Pressable
        style={({ pressed }) => {
          return [styles.btn, pressed && { backgroundColor: "#D4D4D4" }];
        }}
      >
        <Ionicons style={styles.appleIcon} name="logo-apple" size={20} />
        <Text style={styles.btntext}>Sign up with Apple</Text>
      </Pressable> */}

      <Pressable
        onPress={() => router.push("/(auth)/email-sign-up")}
        style={({ pressed }) => {
          return [styles.btn, pressed && { backgroundColor: "#D4D4D4" }];
        }}
      >
        <Ionicons style={styles.appleIcon} name="mail-outline" size={20} />
        <Text style={styles.btntext}>Sign up with Email</Text>
      </Pressable>

      <Link style={styles.link} href={"/(auth)/sign-in"}>
        Already Have an Account?
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  link: {
    flex: 1,
    textAlign: "center",
    color: "#0690f3ff",
    paddingLeft: 4,
    marginTop: 10,
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
    marginRight: 20,
    marginLeft: 20,
    padding: 8,
    paddingRight: 40,
    marginBottom: 5,
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
  slider: {
    marginBottom: 10,
  },
});
