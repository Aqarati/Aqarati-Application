import React, { useState } from "react";
import { View, Button, TouchableOpacity, Text, StyleSheet } from "react-native";

const LikeSection = ({ p }) => {
  const [liked, setLiked] = useState(false);

  const handleLikePress = () => {
    setLiked(!liked);
  };

  const handleContactPress = () => {
    // Logic to contact the owner can be added here
    alert("Contact owner functionality to be implemented");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleContactPress}>
        <Text style={styles.buttonText}>Contact Owner</Text>
      </TouchableOpacity>
      <View style={styles.buttonWrapper}>
        <Button title={liked ? "Unlike" : "Like"} onPress={handleLikePress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    paddingHorizontal: 80,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  buttonWrapper: {
    marginRight: 20, // Adjust margin-right as needed
  },
});

export default LikeSection;
