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
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const MyAccountItem = ({ title, value, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.label}>{title}</Text>
    <Text numberOfLines={1} style={styles.value}>
      {value}
    </Text>
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

const EditFieldModal = ({ visible, onClose, title, value, onSave }) => {
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
            placeholderTextColor="#aaa" 
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
  const route = useRoute();

  const fetchUserProfileData = async () => {
    try {
      const url = `${urlPath}/user/profile`;
      const token = await getValueFor("token");
      const config = {
        method: "get",
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
    const unsubscribe = navigation.addListener("focus", () => {
      if (route.params?.refresh) {
        fetchUserProfileData();
      }
    });

    return unsubscribe;
  }, [navigation, route.params?.refresh]);

  const requestMediaLibraryPermissions = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
      setUserData((prevUserData) => ({
        ...prevUserData,
        [field]: newValue,
      }));

      const updatedData = { ...userData, [field]: newValue };
      const { firstName, lastName } = updatedData;

      const url = `${urlPath}/user/profile`;
      const token = await getValueFor("token");
      const config = {
        method: "put",
        url: url,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        data: { firstName, lastName },
      };

      const response = await axios.request(config);
      console.log("Update response:", response.data);
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
      // Request permission to access the photo library
      let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access the photo library is required!');
        return;
      }
  
      // Launch the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: false,
        allowsEditing: true, // Enable editing to allow cropping
        aspect: [1, 1], // Set aspect ratio to 1:1 for a square crop
        quality: 1,
      });
  
     
  
      console.log(result);
      let data = new FormData();
      const token = await getValueFor("token");
  
      data.append("profile-image", {
        uri: result.assets[0].uri, // Use result.uri directly since assets is not defined
        name: `image.png`,
        type: "image/png",
      });
  
      let config = {
        method: "put",
        url: `${urlPath}/user/profile/image`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };
  
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
  
      setUserData((prevData) => ({
        ...prevData,
        imageUrl: response.data.imageUrl,
      }));
  
      // Fetch updated user profile data to refresh the imageUrl
      await fetchUserProfileData();
  
      // Navigate to the previous screen and refresh the data
      navigation.goBack();
      navigation.navigate("Main", { refresh: true });
    } catch (error) {
     
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={selectImage}>
      <View>
      <Image
          style={profilestyle.avatar}
          source={
            userData.imageUrl && userData.imageUrl !== ""
              ? { uri: userData.imageUrl }
              : require("../../assets/images/userD.png")
          }
        />
        
        </View>
      </TouchableOpacity>
      <Text style={styles.screenTitle}>MY ACCOUNT</Text>
      <ScrollView style={styles.listContainer}>
        <MyAccountItem
          key="firstName"
          title="First Name"
          value={userData.firstName}
          onPress={() => handleEdit("firstName")}
        />
        <MyAccountItem
          key="lastName"
          title="Last Name"
          value={userData.lastName}
          onPress={() => handleEdit("lastName")}
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
  avatar: {
    width: 225,
    height: 225,
    borderRadius: 9999,
  },
  avatarWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 250,
    borderRadius: 9999,
    backgroundColor:"#fff", // Fallback background color
  },
  icon: {
    alignSelf: "center",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 250,
    borderRadius: 9999,
    backgroundColor: COLORS.primary,
  }
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
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  listContainer: {
    flex: 1,
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: "#333",
  },
  editIcon: {
    position: "absolute",
    right: 10,
    top: 40,
    transform: [{ translateY: -10 }],
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flexDirection: "row",
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
  },
  saveButton: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 5,
  },
});

export default MyAccountScreen;
