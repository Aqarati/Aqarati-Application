import * as React from "react";
import { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import FormData from "form-data";

export default function AddScreen() {
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  };

  const uploadImages = async () => {
    let formData = new FormData();
    images.forEach((uri, index) => {
      formData.append("images", {
        uri: uri,
        name: `image${index}.png`,
        type: "image/png",
      });
    });

    let config = {
      method: "put",
      url: "http://172.20.10.2:8888/property/image/1105",
      headers: {
        Authorization:
          "Bearer " +
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhaGFtZGFoQG91dGxvb2suY29tIiwidWlkIjoiNjYxMTVkNWZkZDU2ZDA1ZjkyODM5OWYzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE2OTA2NjAyLCJleHAiOjE3MTY5OTMwMDJ9.hzvdPNyspac-RIaZbLB6iyKAPVyBcelNTe9oPfxKO2c",
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };
    try {
      let response = await axios(config);
      console.log("config");
      console.log(config);

      console.log("\n \nFinist");
      console.log(response.data);
      Alert.alert("Success", "Images uploaded successfully");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Image upload failed");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Pick images from camera roll" onPress={pickImage} />
      </View>
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>
      {images.length > 0 && (
        <View style={styles.buttonContainer}>
          <Button title="Upload Images" onPress={uploadImages} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 111,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginBottom: 200,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});
