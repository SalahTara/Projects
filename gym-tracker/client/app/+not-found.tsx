import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: "404 Not Found" }} />
      <View style={styles.container}>
        <Text style={styles.text}>This Page Doesn't Exist</Text>
        <Link style={styles.textUnderline} href={"/"}>
          Go back to homepage
        </Link>
      </View>
    </>
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
  textUnderline: {
    textDecorationLine: "underline",
    color: "#fff",
  },
});
