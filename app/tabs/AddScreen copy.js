import * as React from "react";
import { Button, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import FormData from "form-data";

export default function AddScreen() {
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    let formData = new FormData();
    formData.append("images", {
      uri: uri,
      name: "1.png",
      type: "image/png",
    });
    console.log(formData);
    let config = {
      method: "put",
      url: "http://172.20.10.2:8888/property/image/1105",
      headers: {
        Authorization:
          "Bearer " +
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhaGFtZGFoQG91dGxvb2suY29tIiwidWlkIjoiNjYxMTVkNWZkZDU2ZDA1ZjkyODM5OWYzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE2OTA2NjAyLCJleHAiOjE3MTY5OTMwMDJ9.hzvdPNyspac-RIaZbLB6iyKAPVyBcelNTe9oPfxKO2c", // Replace {{Authorization}} with your actual authorization token
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    try {
      let response = await axios(config);
      console.log("\n \nFinist");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
