import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const PropertyDetails = ({ route }) => {
  // Extract the property object from the route parameters
  const { property } = route.params;

  const imageUrl = property.image
    ? property.image
    : "https://aqarati-app.s3.me-south-1.amazonaws.com/property-image/153/102.png";

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{property.name}</Text>
        <Text style={styles.description}>{property.description}</Text>
        <Text style={styles.price}>Price: {property.price}</Text>
        {/* Add more details here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: "#000",
    marginBottom: 10,
  },
  // Add more styles for additional details if needed
});

export default PropertyDetails;
