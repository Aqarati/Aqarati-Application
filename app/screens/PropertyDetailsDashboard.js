import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  Linking,
  ScrollView,
} from "react-native";
import axios from "axios";
import ImageView from "react-native-image-viewing";
import LikeSection from "./components/likeSection";
import { urlPath } from "../lib";
import COLORS from "../../assets/Colors/colors";
import { getValueFor } from "../lib";
const PropertyDetailsDashboard = ({ route }) => {
  const { property } = route.params;
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [name, setName] = useState(property.name);
  const [description, setDescription] = useState(property.description);
  const [price, setPrice] = useState(property.price.toString());

  const renderImageItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleImagePress(index)}>
      <View>
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
    </TouchableOpacity>
  );

  const handleVRPress = (vrUrl) => {
    if (vrUrl) {
      Linking.openURL(vrUrl);
    }
  };

  const handleSave = async () => {
    try {
        // Retrieve token asynchronously
        const token = await getValueFor("token");

        // Check if token is available
        if (!token) {
            throw new Error("Token not found");
        }

        const propertyId = 52; // Assuming propertyId is fixed
        const propertyName = name;
        const propertyDescription = description;
        const propertyPrice = parseFloat(price);

        // Construct the data object using the variables
        const data = {
            id: propertyId,
            name: propertyName,
            description: propertyDescription,
            price: propertyPrice
        };

        const url = urlPath + "/property";

        // Make the request with the token included in the headers
        const response = await axios.put(url, data, {
            headers: { 
                'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                'Content-Type': 'application/json'
            }
        });

        console.log(JSON.stringify(response.data));
        // Handle successful response
    } catch (error) {
        console.log(error);
        // Handle error
    }
};
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Edit Property Details</Text>
        <View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    value={name}
    onChangeText={setName}
    placeholder="Property Name"
  />
  <TextInput
    style={[styles.input, { height: 100 }]} // Increase height for multiline input
    value={description}
    onChangeText={setDescription}
    placeholder="Description"
    multiline
  />
  <TextInput
    style={styles.input}
    value={price}
    onChangeText={setPrice}
    placeholder="Price"
    keyboardType="numeric"
  />
  <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
    <Text style={styles.saveButtonText}>Save Changes</Text>
  </TouchableOpacity>
</View>
        <View style={styles.imageContainer}>
          <FlatList
            data={property.propertyImages}
            renderItem={renderImageItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.price}>Price: {price}</Text>
        </View>
        <ImageView
          images={property.propertyImages.map((image) => ({
            uri: image.imgUrl,
          }))}
          imageIndex={currentIndex}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />
      </ScrollView>
      <View style={styles.likeSectionContainer}>
        <LikeSection p={property} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    inputContainer: {
        padding: 20,
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
      },
      saveButton: {
        backgroundColor:COLORS.primary,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
      },
      saveButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
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
    marginTop: 15,
    paddingHorizontal: 20,
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
  },
  imageContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "cover",
    marginRight: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  price: {
    fontSize: 20,
    color: "#000",
    marginBottom: 10,
  },
  vrButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
  vrButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  likeSectionContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});

export default PropertyDetailsDashboard;
