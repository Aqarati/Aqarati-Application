import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const PropertyCard = ({ property }) => {
  const navigation = useNavigation();

  const imageUrl = property.image
    ? property.image
    : "https://aqarati-app.s3.me-south-1.amazonaws.com/property-image/153/102.png";

  const handleCardPress = () => {
    // Navigate to the details screen, passing the property object as a parameter
    navigation.navigate("PropertyDetails", { property });
  };
  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Divider style={styles.divider} />
        <Text style={styles.title}>{property.name}</Text>
        <Text style={styles.description}>{property.description}</Text>
        <Text style={styles.price}>Price: {property.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  divider: {
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "#000",
  },
});

export default PropertyCard;
