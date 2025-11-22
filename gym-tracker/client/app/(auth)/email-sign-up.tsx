import { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { router } from "expo-router";

export default function EmailSignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const URL = `http://${process.env.EXPO_PUBLIC_API_URL}:3000/auth/sign-up`;

  const handleSubmit = async () => {
    try {
      const response = await axios.post(URL, { username, email, password });
      console.log(response.data);
      router.push("/(auth)/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Username</Text>
      <TextInput
        style={styles.signInInfo}
        onChangeText={(text) => {
          setUsername(text);
        }}
        placeholder="username"
      />

      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.signInInfo}
        placeholder="example@gmail.com"
        onChangeText={(text) => {
          setEmail(text);
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

      <Pressable
        style={({ pressed }) => {
          return [styles.loginBtn, pressed && { backgroundColor: "#D4D4D4" }];
        }}
        onPress={handleSubmit}
      >
        <Text style={styles.loginBtnText}>Continue</Text>
      </Pressable>
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
