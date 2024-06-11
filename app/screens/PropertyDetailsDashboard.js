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
  Platform,
  Modal,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { urlPath, getValueFor } from "../lib";
import COLORS from "../../assets/Colors/colors";
import * as ImagePicker from "expo-image-picker";
import ImageView from "react-native-image-viewing";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
const PropertyDetailsDashboard = ({ route }) => {
  const navigation = useNavigation();
  const { property } = route.params;
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [status, setStatus] = useState(property.status); // State for property status

  const [name, setName] = useState(property.name);
  const [description, setDescription] = useState(property.description);
  const [price, setPrice] = useState(property.price.toString());
  const { darkMode, handleDarkModeToggle } = route.params;
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState(
    property.propertyImages.map((img) => img.imgUrl)
  );

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

  const UploadDocument = async () => {
    try {
      const token = await getValueFor("token");

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        let data = new FormData();

        data.append("image", {
          uri: result.assets[0].uri,
          name: `image.png`,
          type: "image/png",
        });
        data.append("property-id", property.id);

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: urlPath + "/document/",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: data,
        };
        console.log(config);
        let response = await axios(config);
        console.log(response);
        console.log(JSON.stringify(response.data));
        Toast.show({
          type: "success",
          text1: "Image Uploaded successfully",
          text2: "The Document Uploaded ..",
        });
      }
    } catch (error) {}
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
    } catch (error) {}
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
      setImages(property.propertyImages.map((img) => img.imgUrl));
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update VR status");
    }
  };

  const handleDocumentPress = () => {
    navigation.navigate("DocumentPage", {
      propertyId: property.id,
      handleDarkModeToggle,
      darkMode,
    });
  };

  const updateStatus = async (newStatus) => {
    let status;
    switch (newStatus) {
      case "Rented":
        status = "RENTED";
        break;
      case "Available":
        status = "AVAILABLE";
        break;
      case "Undermaintenance":
        status = "UNDER_MAINTENANCE";
        break;
    }
    try {
      const token = await getValueFor("token");

      if (!token) {
        throw new Error("Token not found");
      }
      let statusresult = await status.toString();
      console.log(statusresult);
      let data = JSON.stringify({
        id: property.id,
        propertyStatus: statusresult,
      });

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: urlPath + "/property/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };
      setModalVisible(false); // Hide modal

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));

      Toast.show({
        type: "success",
        text1: "Status Updated",
        text2: `Property status updated to ${newStatus}`,
        visibilityTime: 1500, // 3 seconds
        autoHide: true,
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Status Update Failed",
        text2: `Failed to update property status to ${newStatus}`,
        visibilityTime: 1500, // 3 seconds
        autoHide: true,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles(darkMode).container}>
        {loading && (
          <View style={styles(darkMode).loadingOverlay}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )}
        <ScrollView
          contentContainerStyle={styles(darkMode).scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles(darkMode).title}>Edit Property Details</Text>
          <View style={styles(darkMode).imageContainer}>
            <FlatList
              data={property.propertyImages}
              renderItem={({ item, index }) => (
                <View style={styles(darkMode).imageWrapper}>
                  <TouchableOpacity onPress={() => openImageViewer(index)}>
                    <Image
                      source={{ uri: item.imgUrl }}
                      style={styles(darkMode).image}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles(darkMode).vrButton}
                    onPress={() => toggleVRStatus(item.id, item.vr)}
                  >
                    <Text style={styles(darkMode).vrButtonText}>
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

          <View style={styles(darkMode).inputContainer}>
            <Text style={styles(darkMode).inputLabel}>Property Title</Text>
            <TextInput
              style={styles(darkMode).input}
              value={name}
              onChangeText={setName}
              placeholder="Enter title"
            />
          </View>

          <View style={styles(darkMode).inputContainer}>
            <Text style={styles(darkMode).inputLabel}>
              Property Description
            </Text>
            <TextInput
              style={[styles(darkMode).input, styles(darkMode).multilineInput]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
              multiline
            />
          </View>

          <View style={styles(darkMode).inputContainer}>
            <Text style={styles(darkMode).inputLabel}>Property Price</Text>
            <TextInput
              style={styles(darkMode).input}
              value={price}
              onChangeText={setPrice}
              placeholder="Enter price"
              onSubmitEditing={() => Keyboard.dismiss()}
              keyboardType="numeric"
            />
          </View>

          <View style={styles(darkMode).buttonContainer}>
            <TouchableOpacity
              style={[
                styles(darkMode).saveButton,
                styles(darkMode).doubleWidth,
              ]}
              onPress={handleSave}
            >
              <AntDesign
                name="save"
                size={22}
                color="white"
                style={styles(darkMode).icon}
              />
              <Text style={styles(darkMode).saveButtonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles(darkMode).saveButton,
                styles(darkMode).doubleWidth,
              ]}
              onPress={() => setModalVisible(true)}
            >
              <Feather
                name="menu"
                size={22}
                color="white"
                style={styles(darkMode).icon}
              />
              <Text style={styles(darkMode).saveButtonText}>Status</Text>
            </TouchableOpacity>
          </View>

          <View style={styles(darkMode).buttonContainer1}>
            <TouchableOpacity
              style={[
                styles(darkMode).saveButton,
                styles(darkMode).doubleWidth,
              ]}
              onPress={UploadDocument}
            >
              <AntDesign
                name="addfile"
                size={22}
                color="white"
                style={styles(darkMode).icon}
              />
              <Text style={styles(darkMode).saveButtonText}>
                Upload Document
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles(darkMode).saveButton,
                styles(darkMode).doubleWidth,
              ]}
              onPress={handlePhotos}
            >
              <AntDesign
                name="upload"
                size={22}
                color="white"
                style={styles(darkMode).icon}
              />
              <Text style={styles(darkMode).saveButtonText}>Upload Photos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles(darkMode).buttonContainer1}>
            <TouchableOpacity
              style={[
                styles(darkMode).saveButton,
                styles(darkMode).doubleWidth,
              ]}
              onPress={handleDocumentPress}
            >
              <AntDesign
                name="filetext1"
                size={22}
                color="white"
                style={styles(darkMode).icon}
              />
              <Text style={styles(darkMode).saveButtonText}>
                Look at Property Document
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableOpacity
              style={styles(darkMode).modalBackground}
              activeOpacity={1}
              onPressOut={() => setModalVisible(false)}
            >
              <View style={styles(darkMode).modalContainer}>
                <Text style={styles(darkMode).modalTitle}>Update Status</Text>
                {[
                  {
                    status: "Available",
                    color: COLORS.approved,
                    icon: "check-circle",
                  },
                  {
                    status: "Undermaintenance",
                    color: COLORS.pending,
                    icon: "build",
                  },
                  { status: "Rented", color: COLORS.rejected, icon: "home" },
                ].map((statusOption) => (
                  <TouchableOpacity
                    key={statusOption.status}
                    style={[
                      styles(darkMode).modalButton,
                      { backgroundColor: statusOption.color },
                      status === statusOption.status &&
                        styles(darkMode).modalButtonSelected,
                    ]}
                    onPress={() => updateStatus(statusOption.status)}
                  >
                    <MaterialIcons
                      name={statusOption.icon}
                      size={24}
                      color={status === statusOption.status ? "#fff" : "#fff"}
                      style={{ marginRight: 10 }}
                    />
                    <Text
                      style={[
                        styles(darkMode).modalButtonText,
                        status === statusOption.status &&
                          styles(darkMode).modalButtonTextSelected,
                      ]}
                    >
                      {statusOption.status.charAt(0).toUpperCase() +
                        statusOption.status.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      </View>
      <Toast></Toast>
    </KeyboardAvoidingView>
  );
};
const styles = (darkMode) =>
  StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: darkMode
        ? "rgba(255, 255, 255, 0.5)"
        : "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      width: "80%",
      backgroundColor: darkMode ? "#333" : "#fff",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 16,
      color: darkMode ? "#fff" : COLORS.primary,
    },
    modalButton: {
      width: "100%",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginVertical: 8,
      flexDirection: "row",
      alignItems: "center",
    },
    modalButtonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold",
    },
    modalButtonSelected: {
      backgroundColor: COLORS.secondary,
    },
    modalButtonTextSelected: {
      color: "#fff",
    },

    button: {
      flex: 1,
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 8,
    },

    uploadButton: {
      backgroundColor: COLORS.secondary,
    },
    documentButton: {
      backgroundColor: COLORS.tertiary,
    },
    statusButton: {
      backgroundColor: COLORS.quaternary,
    },

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
      backgroundColor: darkMode ? "#333" : "#fff",
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
      color: darkMode ? COLORS.primary : COLORS.primary,
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
      borderColor: darkMode ? "#999" : "#ccc",
      padding: 10,
      borderRadius: 5,
      color: darkMode ? "#fff" : "#000",
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
    gOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: darkMode ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
    },
  });

export default PropertyDetailsDashboard;
