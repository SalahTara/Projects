import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

// Home Tab ('/')
export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>See</Text>
      <Link style={styles.button} href={"/settings"}>
        Settings
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
  button: {
    fontSize: 20,
    color: "#fff",
    textDecorationLine: "underline",
  },
});
