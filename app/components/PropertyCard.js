import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../assets/Colors/colors";
import { getStoredBoolValue } from "../tabs/AddScreenStyles";

const PropertyCard = ({ property }) => {
  const navigation = useNavigation();
  const darkMode = getStoredBoolValue();
  // Default image URL

  let imageUrls =
    "https://aqarati-app.s3.me-south-1.amazonaws.com/property-image/153/102.png";

  let imageUrl = "https://aqarati-app.s3.me-so1.amazonaws.com/property-image";
  // let imageUrl =
  //   "aqarati-app.s3.me-south-1.amazonaws.com/property-image/153/102.png";

  // Check if propertyImages array exists and has at least one image
  if (property.propertyImages && property.propertyImages.length > 0) {
    // Loop through propertyImages array to find the first non-VR image
    for (let i = 0; i < property.propertyImages.length; i++) {
      if (!property.propertyImages[i].vr) {
        imageUrls = property.propertyImages[i].imgUrl;
        break;
      }
    }
  }

  const handleCardPress = () => {
    // Navigate to the details screen, passing the property object as a parameter
    navigation.navigate("PropertyDetails", { property });
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles(darkMode).card}>
        <View style={styles(darkMode).cardLikeWrapper}>
          <TouchableOpacity onPress={handleCardPress}>
            <View style={styles(darkMode).cardLike}>
              <MaterialIcons color={COLORS.primary} name="verified" size={22} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles(darkMode).cardTop}>
          <Image
            alt=""
            resizeMode="cover"
            style={styles(darkMode).cardImg}
            source={{ uri: imageUrls }}
          />
        </View>

        <View style={styles(darkMode).cardBody}>
          <View style={styles(darkMode).cardHeader}>
            <Text style={styles(darkMode).cardTitle}>{property.name}</Text>

            <Text style={styles(darkMode).cardPrice}>
              <Text style={{ fontWeight: "600" }}>{property.price} JD</Text>
            </Text>
          </View>

          <View style={styles(darkMode).cardFooter}>
            <Text style={styles(darkMode).description}>
              {property.description}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = (darkMode) =>
  StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: darkMode ? COLORS.backgroundDark : "#fff", // Dark mode or fallback background color
    },
    card: {
      position: "relative",
      borderRadius: 8,
      backgroundColor: darkMode ? COLORS.darkGray : "#fff", // Dark mode or fallback background color
      marginBottom: 20,
      shadowColor: darkMode ? COLORS.black : "#000", // Dark mode or fallback shadow color
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: darkMode ? 0.6 : 0.2, // Dark mode or fallback shadow opacity
      shadowRadius: 1.41,
      elevation: darkMode ? 4 : 2, // Dark mode or fallback elevation
    },
    cardLikeWrapper: {
      position: "absolute",
      zIndex: 1,
      top: 12,
      right: 12,
    },
    cardLike: {
      width: 32,
      height: 32,
      borderRadius: 9999,
      backgroundColor: darkMode ? COLORS.white : "#fff", // Dark mode or fallback background color
      alignItems: "center",
      justifyContent: "center",
    },
    cardTop: {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    cardImg: {
      width: "100%",
      height: 160,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    cardBody: {
      padding: 10,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cardTitle: {
      fontSize: 17,
      fontWeight: "500",
      color: darkMode ? COLORS.textDark : "#232425", // Dark mode or fallback text color
      flex: 1,
      flexShrink: 1,
      marginRight: 10, // Add some space between the title and price
    },
    cardPrice: {
      fontSize: 15,
      fontWeight: "400",
      color: darkMode ? COLORS.textDark : "#232425", // Dark mode or fallback text color
    },
    cardFooter: {
      marginTop: 8,
    },
    description: {
      fontSize: 16,
      color: darkMode ? COLORS.gray : "#666", // Dark mode or fallback text color
    },
  });
export default PropertyCard;
