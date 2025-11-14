import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

type Category = {
  id: number;
  category: string;
};

// Home Tab ('/')
export default function Index() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [clicked, setClicked] = useState(false);
  const API = `http://${process.env.EXPO_PUBLIC_API_URL}:3000`;
  console.log(API);
  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(`${API}/category`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.recentWorkout}>Current Workout</Text>

      <View style={styles.exerciseCatergoriesContainer}>
        {categories.map((c) => (
          <Pressable
            key={c.id}
            // onPressIn={}
            // style={({ pressed }) => [pressed && styles.buttonPressed]}
          >
            <Text style={styles.exerciseCategories}>{c.category}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    // alignItems: "center",
    // justifyContent: "center",
  },
  recentWorkout: {
    color: "#fff",
    paddingLeft: 10,
    paddingTop: 10,
    fontWeight: "800",
  },
  button: {
    fontSize: 20,
    color: "#fff",
    textDecorationLine: "underline",
  },
  exerciseCatergoriesContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  exerciseCategories: {
    color: "#fff",
    paddingHorizontal: 15,
    marginRight: 4,
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "solid",
    borderRadius: 7,
  },
  buttonPressed: {
    backgroundColor: "#007BFF22", // translucent blue while pressed
    borderColor: "#007BFF",
    borderWidth: 1,
    borderStyle: "solid",
  },
});
