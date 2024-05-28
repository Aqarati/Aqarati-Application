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
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { urlPath, getValueFor } from "../lib";
import COLORS from "../../assets/Colors/colors";
import * as ImagePicker from "expo-image-picker";
const PropertyDetailsDashboard = ({ route }) => {
  const navigation = useNavigation();

  const { property } = route.params;

  const [name, setName] = useState(property.name);
  const [description, setDescription] = useState(property.description);
  const [price, setPrice] = useState(property.price.toString());
  const [propertyImages, setPropertyImages] = useState(property.propertyImages);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);


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
    const handleImagePress = async (index) => {
      // Open the device's photo library
      const FormData = require('form-data');
        let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      allowsEditing: false,
      quality: 1,
    });

    console.log(result);
    const url = urlPath;
    console.log(url);
    let data = new FormData();
    console.log(result.assets[0].uri);
    console.log(property.id);
    data.append('image', result.assets[0].uri);
    data.append('property-id', property.id);
    
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: url+'/document/',
      headers: { 
        'Authorization': '{{Authorization}}', 
        ...data.getHeaders()
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    
  };


  const renderImageItem = ({ item, index }) => (
    <View style={styles.imageWrapper}>
      <Image source={{ uri: item.imgUrl }} style={styles.image} />
   
      {item.vr && (
        <TouchableOpacity
          style={styles.vrButton}
          onPress={() => handleVRPress(item.vr_url)}
        >
          <Text style={styles.vrButtonText}>View VR</Text>
        </TouchableOpacity>
      )}
    </View>
  );

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
          <FlatList
            data={property.propertyImages}
            renderItem={renderImageItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

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
        <TouchableOpacity style={styles.docButton} onPress={handleImagePress}>
          <Text style={styles.saveButtonText}>Upload Document</Text>
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
    marginHorizontal: 20,
  },
  deleteButton: {
    backgroundColor: COLORS.darkGray,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 20,
  },
  docButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
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