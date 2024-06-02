import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  FlatList,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { urlPath, getValueFor } from "../lib";
import COLORS from "../../assets/Colors/colors";
import * as ImagePicker from "expo-image-picker";
import ImageView from "react-native-image-viewing";
import { AntDesign } from "@expo/vector-icons";

const PropertyDetailsDashboard = ({ route }) => {
  const navigation = useNavigation();
  const { property } = route.params;

  const [name, setName] = useState(property.name);
  const [description, setDescription] = useState(property.description);
  const [price, setPrice] = useState(property.price.toString());

  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState(property.propertyImages.map(img => img.imgUrl));

  const handleSave = async () => {
    try {
      const token = await getValueFor("token");

      if (!token) {
        throw new Error("Token not found");
      }

      const propertyName = name;
      const propertyDescription = description;
      const propertyPrice = parseInt(price);

      const data = {
        id: property.id,
        name: propertyName,
        description: propertyDescription,
        price: propertyPrice,
      };

      const url = `${urlPath}/property/`;

      Alert.alert(
        "Confirm Save",
        "Are you sure you want to save the changes?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Save canceled"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              setLoading(true);

              try {
                const response = await axios.put(url, data, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                });

                console.log(JSON.stringify(response.data));
                navigation.navigate("PropertyDetailsDashboard", {
                  property: {
                    ...property,
                    name: propertyName,
                    description: propertyDescription,
                    price: propertyPrice,
                  },
                });
                navigation.goBack();
              } catch (error) {
                console.log(error);
              } finally {
                setLoading(false);
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this Post?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion canceled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            setLoading(true);
            try {
              const token = await getValueFor("token");

              if (!token) {
                throw new Error("Token not found");
              }

              const url = `${urlPath}/property/${property.id}`;

              const response = await axios.delete(url, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              });

              console.log(JSON.stringify(response.data));
              navigation.goBack();
            } catch (error) {
              console.log(error);
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const UploadDocument = async () => {
    try {
      const token = await getValueFor("token");
  
      // Ask for permission to access the photo library
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission to access photo library denied');
      }
  
      // Open the device's photo library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.cancelled) {
        let data = new FormData();
        // Append the selected image to FormData
        data.append("image", {
          uri: result.assets[0].uri,
          name: `image.png`,
          type: "image/png",
        });
        data.append('property-id', property.id);
  
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: urlPath+'/document/',
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: data,
        };
  
        let response = await axios(config);
        console.log(JSON.stringify(response.data));
        Alert.alert("Success", "Image uploaded successfully");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Image upload failed");
    }
  };

  const handlePhotos = async () => {
    try {
      const token = await getValueFor("token");
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        allowsEditing: false,
        quality: 1,
      });
  
      if (!result.cancelled) {
        let formData = new FormData();
        result.assets.map((asset, index) => {
          formData.append("images", {
            uri: asset.uri,
            name: `image${index}.png`,
            type: "image/png",
          });
          console.log(asset.uri);
        });
  
        let config = {
          method: "put",
          url: `${urlPath}/property/image/${property.id}`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        };
  
        let response = await axios(config);
        console.log(response.data);
        Alert.alert("Success", "Images uploaded successfully");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Image upload failed");
    }
  };

  const openImageViewer = (index) => {
    setCurrentIndex(index);
    setVisible(true);
  };

  const toggleVRStatus = async (imageId, currentStatus) => {
    try {
      const token = await getValueFor("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const url = currentStatus
        ? `${urlPath}/property/image/deactive/${imageId}`
        : `${urlPath}/property/image/active/${imageId}`;
      const response = await axios.put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      property.propertyImages = property.propertyImages.map((image) =>
        image.id === imageId ? { ...image, vr: !currentStatus } : image
      );
      setImages(property.propertyImages.map(img => img.imgUrl));
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update VR status");
    }
  };

  const handleDocumentPress = () => {
    navigation.navigate("DocumentPage", { propertyId: property.id });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )}
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Edit Property Details</Text>
          <View style={styles.imageContainer}>
            <FlatList
              data={property.propertyImages}
              renderItem={({ item, index }) => (
                <View style={styles.imageWrapper}>
                  <TouchableOpacity onPress={() => openImageViewer(index)}>
                    <Image source={{ uri: item.imgUrl }} style={styles.image} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.vrButton}
                    onPress={() => toggleVRStatus(item.id, item.vr)}
                  >
                    <Text style={styles.vrButtonText}>
                      {item.vr ? "Deactivate VR" : "Activate VR"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <ImageView
            images={property.propertyImages.map((image) => ({
              uri: image.imgUrl,
            }))}
            imageIndex={currentIndex}
            visible={visible}
            onRequestClose={() => setVisible(false)}
          />

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Property Title</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter title"
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
              onSubmitEditing={() => Keyboard.dismiss()}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.saveButton, styles.doubleWidth]}
              onPress={handleSave}
            >
              <AntDesign
                name="save"
                size={22}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.deleteButton, styles.doubleWidth]}
              onPress={handleDelete}
            >
              <AntDesign
                name="delete"
                size={22}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.saveButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer1}>
            <TouchableOpacity
              style={[styles.saveButton, styles.doubleWidth]}
              onPress={UploadDocument}
            >
              <AntDesign
                name="addfile"
                size={22}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.saveButtonText}>Upload Document</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveButton, styles.doubleWidth]}
              onPress={handlePhotos}
            >
              <AntDesign
                name="upload"
                size={22}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.saveButtonText}>Upload Photos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer1}>
            <TouchableOpacity
              style={[styles.saveButton, styles.doubleWidth]}
              onPress={handleDocumentPress}
            >
              <AntDesign
                name="filetext1"
                size={22}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.saveButtonText}>
                Look at Property Document
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  buttonContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -15,
    marginHorizontal: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -20,
    marginHorizontal: 18,
  },
  doubleWidth: {
    flex: 1,
    marginHorizontal: 2,
  },
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
    marginTop: 80,
    paddingHorizontal: 20,
    textAlign: "center",
    color: COLORS.primary,
  },
  imageContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  imageWrapper: {
    position: "relative",
    marginRight: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
  vrButton: {
    position: "absolute",
    bottom: 5,
    left: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    padding: 5,
  },
  vrButtonText: {
    color: "white",
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 20,
    color: COLORS.primary,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  multilineInput: {
    height: 100,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: COLORS.darkGray,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
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
