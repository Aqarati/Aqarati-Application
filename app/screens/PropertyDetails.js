import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  ScrollView,
  Animated,
} from "react-native";
import ImageView from "react-native-image-viewing";
import LikeSection from "./components/likeSection";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../assets/Colors/colors";

const PropertyDetails = ({ route }) => {
  const { property } = route.params;
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

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

  const handleImagePress = (index) => {
    setCurrentIndex(index);
    setVisible(true);
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
          <View style={styles.priceContainer}>
            <MaterialIcons name="attach-money" size={24} color={COLORS.primary} />
            <Text style={styles.price}>{property.price}</Text>
          </View>
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:0,
    
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
    marginTop: 60,
    paddingHorizontal: 20,
    color: COLORS.primary,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "cover",
    marginRight: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    color: COLORS.primary,
    marginLeft: 5,
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default PropertyDetails;
