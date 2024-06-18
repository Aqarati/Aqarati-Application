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
    console.log(property.userId);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}></Text>
          <View style={styles.imageContainer}>
            <FlatList
              data={property.propertyImages || []}
              renderItem={renderImageItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.otherDetailsContainer}>
              <Text style={styles.otherDetailsTitle}>Apartment Details</Text>
              <View style={styles.detailsRow}>
                <View style={styles.detailsItem}>
                  <MaterialIcons
                    name="location-city"
                    size={20}
                    color={COLORS.primary}
                    style={styles.detailsIcon}
                  />
                  <Text style={styles.otherDetailsText}>
                    {property.province}
                  </Text>
                </View>
                <View style={styles.detailsItem}>
                  <MaterialIcons
                    name="location-on"
                    size={20}
                    color={COLORS.primary}
                    style={styles.detailsIcon}
                  />
                  <Text style={styles.otherDetailsText}>{property.region}</Text>
                </View>
                <View style={styles.detailsItem}>
                  <MaterialIcons
                    name="hotel"
                    size={20}
                    color={COLORS.primary}
                    style={styles.detailsIcon}
                  />
                  <Text style={styles.otherDetailsText}>
                    {property.numberOfRooms}
                  </Text>
                </View>
              </View>
              <View style={styles.detailsRow}>
                <View style={styles.detailsItem}>
                  <MaterialIcons
                    name="bathtub"
                    size={20}
                    color={COLORS.primary}
                    style={styles.detailsIcon}
                  />
                  <Text style={styles.otherDetailsText}>
                    {property.numberOfBathrooms}
                  </Text>
                </View>
                <View style={styles.detailsItem}>
                  <MaterialIcons
                    name="date-range"
                    size={20}
                    color={COLORS.primary}
                    style={styles.detailsIcon}
                  />
                  <Text style={styles.otherDetailsText}>
                    {property.buildingAge} years
                  </Text>
                </View>
                <View style={styles.detailsItem}>
                  <MaterialIcons
                    name="format-list-numbered"
                    size={20}
                    color={COLORS.primary}
                    style={styles.detailsIcon}
                  />
                  <Text style={styles.otherDetailsText}>{property.floor}</Text>
                </View>
              </View>
              <View style={styles.detailsRow}>
                <View style={styles.detailsItem}>
                  <MaterialIcons
                    name="square-foot"
                    size={20}
                    color={COLORS.primary}
                    style={styles.detailsIcon}
                  />
                  <Text style={styles.otherDetailsText}>
                    {property.propertyArea}
                  </Text>
                </View>
                {/* Add additional details items here */}
              </View>
            </View>
            <View style={styles.featuresContainer}>
              <Text style={styles.featuresTitle}>Features</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.featureList}
              >
                {(property.features || []).map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
            <View style={styles.nearbyLocationsContainer}>
              <Text style={styles.nearbyLocationsTitle}>Nearby Locations</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.locationList}
              >
                {(property.nearbyLocations || []).map((location, index) => (
                  <View key={index} style={styles.locationItem}>
                    <Text style={styles.locationText}>{location}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
          <ImageView
            images={(property.propertyImages || []).map((image) => ({
              uri: image.imgUrl,
            }))}
            imageIndex={currentIndex}
            visible={visible}
            onRequestClose={() => setVisible(false)}
          />
        </ScrollView>
      </Animated.View>
      <View style={styles.likeSectionContainer}>
        <LikeSection
          p={property}
          price={property.price}
          userid={property.userId}
        />
      </View>
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
    marginTop: 60,
    paddingHorizontal: 20,
    color: COLORS.primary,
    textAlign: "center",
  },
  adName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.primary,
  },
  adDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    fontFamily: "Helvetica",
    fontWeight: "bold",
  },
  imageContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
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
    paddingHorizontal: 20,
  },

  featuresContainer: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.primary,
  },
  featureList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  featureItem: {
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: "center",
    fontWeight: "bold",
  },
  nearbyLocationsContainer: {
    marginBottom: 20,
  },
  nearbyLocationsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.primary,
  },
  locationList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  locationItem: {
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  locationText: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: "center",
    fontWeight: "bold",
  },
  otherDetailsContainer: {
    marginBottom: 20,
  },
  otherDetailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.primary,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailsItem: {
    width: "30%",
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  detailsIcon: {
    marginBottom: 5,
  },
  otherDetailsText: {
    fontSize: 14,
    color: COLORS.primary,
    textAlign: "center",
    fontWeight: "bold",
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
    bottom: 1,
    width: "100%",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
export default PropertyDetails;
