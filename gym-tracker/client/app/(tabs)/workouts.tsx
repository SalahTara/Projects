import { StyleSheet, Text, View } from "react-native";

// Settings Tab
export default function workouts() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the settings screen</Text>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
