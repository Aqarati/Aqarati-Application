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
  Keyboard 
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { urlPath, getValueFor } from "../lib";
import COLORS from "../../assets/Colors/colors";
import * as ImagePicker from "expo-image-picker";
import ImageView from "react-native-image-viewing";
import { AntDesign } from '@expo/vector-icons';

const PropertyDetailsDashboard = ({ route }) => {
  const navigation = useNavigation();

  const { property } = route.params;

  const [name, setName] = useState(property.name);
  const [description, setDescription] = useState(property.description);
  const [price, setPrice] = useState(property.price.toString());

  const [loading, setLoading] = useState(false);
  
  const [currentIndex, setCurrentIndex] = useState(0); // For tracking current image index
  const [visible, setVisible] = useState(false);


  const handleSave = async () => {
    try {
      const token = await getValueFor("token");

      if (!token) {
        throw new Error("Token not found");
      }
  
      const propertyId = property.id;
      const propertyName = name;
      const propertyDescription = description;
      const propertyPrice = parseInt(price);
  
      const data = {
        id: propertyId,
        name: propertyName,
        description: propertyDescription,
        price: propertyPrice,
       
      };
  
      const url = urlPath + "/property/";
  
      Alert.alert(
        "Confirm Save",
        "Are you sure you want to save this item?",
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
                // Reload the screen
                navigation.navigate("PropertyDetailsDashboard", {
                  property: {
                    ...property,
                    name: propertyName,
                    description: propertyDescription,
                    price: propertyPrice,
                  },
                });
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
            setLoading(true);
            try {
              const token = await getValueFor("token");

              if (!token) {
                throw new Error("Token not found");
              }

              const propertyId = property.id;
              const url = `${urlPath}/property/${propertyId}`;

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

    // Open the camera or photo library
    const handleImagePress = async () => {
      const token = await getValueFor("token");
      try {
        // Ask for permission to access the photo library
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Permission to access photo library denied');
        }
    
        // Open the device's photo library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          quality: 1,
        });
    
        if (!result.cancelled) {
          let formData = new FormData();
          // Append the selected image to FormData
          formData.append("images", {
            uri: result.uri,
            name: `image.png`,
            type: "image/png",
          });
    
          // Set the headers and other configurations for the Axios request
          let config = {
            method: "put",
            url: urlPath +"/document/",
            headers: {
              Authorization:
                "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
            data: formData,
          };
        
          // Send the request using Axios
          let response = await axios(config);
    
          console.log("\n \nFinish");
          console.log(response.data);
          Alert.alert("Success", "Images uploaded successfully");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Image upload failed");
      }
    };

    const [images, setImages] = useState([]);

  

    const handlePhotos = async () => {
    const token = await getValueFor("token");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      allowsEditing: false,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
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
      url: urlPath+"property/image/"+property.id,
      headers: {
        Authorization:
          "Bearer " +
         token,
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
  const openImageViewer = (index) => {
    setCurrentIndex(index);
    setVisible(true);
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
        <View style={styles.imageContainer}>
  {/* FlatList to display images */}
  <FlatList
    data={property.propertyImages}
    renderItem={({ item, index }) => (
      <TouchableOpacity onPress={() => openImageViewer(index)}>
        <Image source={{ uri: item.imgUrl }} style={styles.image} />
      </TouchableOpacity>
    )}
    keyExtractor={(item, index) => index.toString()} // Use index as the key
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
            placeholder="Enter property name"
            onSubmitEditing={() => Keyboard.dismiss()} // Dismiss keyboard on submit
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
            onSubmitEditing={() => Keyboard.dismiss()} // Dismiss keyboard on submit
            keyboardType="numeric"
          />
        </View>

        <View style={styles.buttonContainer}>
  <TouchableOpacity style={[styles.saveButton, styles.doubleWidth]} onPress={handleSave}>
    <AntDesign name="save" size={22} color="white" style={styles.icon} />
    <Text style={styles.saveButtonText}>Save</Text>
  </TouchableOpacity>

  <TouchableOpacity style={[styles.deleteButton, styles.doubleWidth]} onPress={handleDelete}>
    <AntDesign name="delete" size={22} color="white" style={styles.icon} />
    <Text style={styles.saveButtonText}>Delete</Text>
  </TouchableOpacity>
</View>

<View style={styles.buttonContainer1}>
  <TouchableOpacity style={[styles.saveButton, styles.doubleWidth]} onPress={handleImagePress}>
    <AntDesign name="addfile" size={22} color="white" style={styles.icon} />
    <Text style={styles.saveButtonText}>Upload Document</Text>
  </TouchableOpacity>

  <TouchableOpacity style={[styles.saveButton, styles.doubleWidth]} onPress={handlePhotos}>
    <AntDesign name="upload" size={22} color="white" style={styles.icon} />
    <Text style={styles.saveButtonText}>Upload Photos</Text>
  </TouchableOpacity>
</View>
        
      </ScrollView>
    </View>
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
   marginTop:-20,
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
  icon:{
    marginRight: 10,
  },
  
  vrButton: {
    position: "absolute",
    bottom: 5,
    left: 5,
    backgroundColor: "blue",
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
    height: 80,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 10, // Adjusted for better alignment
    flexDirection: "row", // Added to display icon and text in a row
    alignItems: "center", // Added to vertically center align icon and text
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
    marginHorizontal: 10, // Adjusted for better alignment
    flexDirection: "row", // Added to display icon and text in a row
    alignItems: "center", // Added to vertically center align icon and text
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