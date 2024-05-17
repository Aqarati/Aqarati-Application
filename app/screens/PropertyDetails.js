import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ImageView from "react-native-image-viewing";

const PropertyDetails = ({ route }) => {
  const { property } = route.params;
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderImageItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleImagePress(index)}>
      <Image source={{ uri: item.imgUrl }} style={styles.image} />
    </TouchableOpacity>
  );

  const handleImagePress = (index) => {
    setCurrentIndex(index);
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{property.name}</Text>
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
        <Text style={styles.description}>{property.description}</Text>

        <Text style={styles.price}>Price: {property.price}</Text>

        {/* Add more details here */}
      </View>
      <ImageView
        images={property.propertyImages.map((image) => ({ uri: image.imgUrl }))}
        imageIndex={currentIndex}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 15,
    paddingHorizontal: 20,
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
});

export default PropertyDetails;
