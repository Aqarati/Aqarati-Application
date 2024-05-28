import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const AddScreen = () => {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    // Request permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert("No image selected");
      return;
    }

    const apiUrl = "http://localhost:8888/property/image/603";
    const authorizationToken = "YOUR_AUTHORIZATION_TOKEN"; // Replace with your actual token

    const formData = new FormData();
    const fileUri = imageUri;

    // Create a file object for the image
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    const file = {
      uri: fileUri,
      name: fileInfo.uri.split("/").pop(),
      type: "image/jpeg",
    };

    formData.append("images", file);

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert("Image uploaded successfully");
      } else {
        Alert.alert("Failed to upload image");
      }
    } catch (error) {
      Alert.alert("Error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default AddScreen;
