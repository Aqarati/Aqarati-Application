import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { urlPath, getValueFor } from "../lib";
import COLORS from "../../assets/Colors/colors";

const PropertyDetailsDashboard = ({ route }) => {
  const navigation = useNavigation();

  const { property } = route.params;

  const [name, setName] = useState(property.name);
  const [description, setDescription] = useState(property.description);
  const [price, setPrice] = useState(property.price.toString());
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      // Retrieve token asynchronously
      const token = await getValueFor("token");

      // Check if token is available
      if (!token) {
        throw new Error("Token not found");
      }

      const propertyId = property.id; // Assuming propertyId is fixed
      const propertyName = name;
      const propertyDescription = description;
      const propertyPrice = parseInt(price);

      // Construct the data object using the variables
      const data = {
        id: propertyId,
        name: propertyName,
        description: propertyDescription,
        price: propertyPrice,
      };

      const url = urlPath + "/property/";

      // Make the request with the token included in the headers
      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          "Content-Type": "application/json",
        },
      });

      console.log(JSON.stringify(response.data));
      // Handle successful response
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };
  const handleDelete = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion canceled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            setLoading(true); // Start loading
            try {
              // Retrieve token asynchronously
              const token = await getValueFor("token");

              // Check if token is available
              if (!token) {
                throw new Error("Token not found");
              }

              const propertyId = property.id; // Assuming propertyId is fixed

              const url = `${urlPath}/property/${propertyId}`;

              // Make the request with the token included in the headers
              const response = await axios.delete(url, {
                headers: {
                  Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                  "Content-Type": "application/json",
                },
              });

              console.log(JSON.stringify(response.data));
              // Handle successful response
              navigation.goBack();
            } catch (error) {
              console.log(error);
              // Handle error
            } finally {
              setLoading(false); // Stop loading
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Edit Property Details</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Property Title</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter property name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Property Description</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            multiline
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Property Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.saveButtonText}>Delete</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 70,
    paddingHorizontal: 20,
    textAlign: "center",
    color: COLORS.primary, // Example primary color
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 25,
    color: COLORS.primary, // Example primary color
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  multilineInput: {
    height: 100,
  },
  saveButton: {
    backgroundColor: COLORS.primary, // Example primary color
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 20,
  },
  deleteButton: {
    backgroundColor: COLORS.darkGray, // Example primary color
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 20,
  },
  saveButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});

export default PropertyDetailsDashboard;
