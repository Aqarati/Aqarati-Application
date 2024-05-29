import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import COLORS from "../../assets/Colors/colors";
import { getValueFor, urlPath } from "../lib";
import { useNavigation,useRoute  } from '@react-navigation/native';

const MyAccountItem = ({ title, value, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.label}>{title}</Text>
    <Text numberOfLines={1} style={styles.value}>
      {value}
    </Text>
    {/* Render edit icon only if onPress is provided */}
    {onPress && (
      <AntDesign
        name="edit"
        size={20}
        color={COLORS.primary}
        style={styles.editIcon}
      />
    )}
  </TouchableOpacity>
);

const EditFieldModal = ({ visible, onClose, title, value, onSave}) => {
  const [newValue, setNewValue] = useState(value);

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(newValue);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit {title}</Text>
          <TextInput
            style={styles.input}
            value={newValue}
            onChangeText={setNewValue}
            placeholder={`Enter new ${title}`}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <MaterialIcons name="cancel" size={26} color="#fff" />
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <AntDesign name="edit" size={26} color="#fff" />
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const MyAccountScreen = () => {
  const navigation = useNavigation();
  const [editingField, setEditingField] = useState(null);
  const [userData, setUserData] = useState({});
  const route = useRoute(); // Use useRoute hook to get the route object

  const fetchUserProfileData = async () => {
    try {
      const url = urlPath + "/user/profile";
      const token = await getValueFor("token");
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await axios.request(config);
      console.log("User profile data:", response.data);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user profile data:", error);
    }
  };

  useEffect(() => {
    fetchUserProfileData();
    requestMediaLibraryPermissions();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // If the screen should be refreshed
      if (route.params?.refresh) {
        // Fetch user profile data or any other necessary refresh operation
        fetchUserProfileData();
      }
    });
  
    return unsubscribe;
  }, [navigation, route.params?.refresh]);

  const requestMediaLibraryPermissions = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    } catch (error) {
      console.error("Error requesting media library permissions:", error);
    }
  };

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = async (newValue, field) => {
    try {
      // Update the specific field in the userData state
      setUserData((prevUserData) => ({
        ...prevUserData,
        [field]: newValue,
      }));
  
      // Construct the data object with updated values
      const updatedData = { ...userData, [field]: newValue };
  
      // Extract the relevant fields from updatedData
      const { firstName, lastName } = updatedData;
  
      const url = urlPath + "/user/profile";
      const token = await getValueFor("token");
      const config = {
        method: "put",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        data: { firstName, lastName }, // Send both firstName and lastName
      };
  
      const response = await axios.request(config);
      console.log("Update response:", response.data);
  
      // Navigate back to the previous screen and pass a parameter indicating refresh
      navigation.goBack({ refresh: true });
    } catch (error) {
      console.error("Error updating user profile data:", error);
    }
  };

  const handleCloseModal = () => {
    setEditingField(null);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setBackgroundImage(result.uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={selectImage}>
        <Image
          style={profilestyle.avatar}
          source={
            userData.imageUrl
              ? { uri: userData.imageUrl }
              : require("../../assets/images/logo.png")
          }
        />
      </TouchableOpacity>
      <Text style={styles.screenTitle}>MY ACCOUNT</Text>
      <ScrollView style={styles.listContainer}>
        {/* First Name */}
        <MyAccountItem
          key="firstName"
          title="First Name"
          value={userData.firstName}
          onPress={() => handleEdit("firstName")}
          onSave={(newValue) => handleSave(newValue, "firstName")}
        />
        {/* Last Name */}
        <MyAccountItem
          key="lastName"
          title="Last Name"
          value={userData.lastName}
          onPress={() => handleEdit("lastName")}
          onSave={(newValue) => handleSave(newValue, "lastName")}
        />
      </ScrollView>
      <EditFieldModal
        visible={!!editingField}
        onClose={handleCloseModal}
        title={editingField}
        value={userData[editingField]}
        onSave={(newValue) => handleSave(newValue, editingField)}
      />
    </View>
  );
};
const profilestyle = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end", // Aligns children (the avatar) to the right
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 9999,
  },
});

const styles = StyleSheet.create({
  touchable: {
    alignItems: "center",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
    backgroundColor: "#fff",
  },
  photoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 25,
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
  item: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: "auto",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "grey",
    marginBottom: 20,
    width: "100%",
    maxWidth: 600,
  },
  label: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    width: "30%",
  },
  value: {
    fontSize: 16,
    color: "black",
    width: "62%",
    overflow: "hidden",
  },
  editIcon: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.primary,
    width: "80%",
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "grey",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 10,
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: COLORS.light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    width: 120,
    height: 60,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: COLORS.light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    width: 120,
    height: 60,
  },
  cancelButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 18,
  },
});

export default MyAccountScreen;
