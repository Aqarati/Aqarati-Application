import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import COLORS from "../../assets/Colors/colors";

const MyPropertyCards = ({ property }) => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Default image URL
  let imageUrl =
    "https://aqarati-app.s3.me-south-1.amazonaws.com/property-image/153/";

  // Check if propertyImages array exists and has at least one image
  if (property.propertyImages && property.propertyImages.length > 0) {
    // Loop through propertyImages array to find the first non-VR image
    for (let i = 0; i < property.propertyImages.length; i++) {
      if (!property.propertyImages[i].vr) {
        imageUrl = property.propertyImages[i].imgUrl;
        break;
      }
    }
  }

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleCardPress = () => {
    // Navigate to the details screen, passing the property object as a parameter
    // navigation.navigate("PropertyDetails", { property });
  };

  const renderStatus = (status) => {
    let iconName, color, text;

    switch (status) {
      case "AVAILABLE":
        iconName = "check-circle";
        color = "green";
        text = "Available";
        break;
      case "UNDER_MAINTENANCE":
        iconName = "tools";
        color = COLORS.pending;
        text = "Under Maintenance";
        break;
      case "RENTED":
        iconName = "home";
        color = COLORS.primary;
        text = "Rented";
        break;
      default:
        iconName = "check-circle";
        color = "green";
        text = "Available";
    }

    return (
      <Animated.View style={[styles.statusContainer, { opacity: fadeAnim }]}>
        <FontAwesome5 name={iconName} size={28} color={color} />
        <Text style={[styles.statusText, { color }]}>{text}</Text>
      </Animated.View>
    );
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.card}>
        <View style={styles.cardLikeWrapper}>
          <TouchableOpacity>
            <View style={styles.cardLike}>
              <MaterialIcons color={COLORS.primary} name="verified" size={22} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.cardTop}>
          <Image
            alt=""
            resizeMode="cover"
            style={styles.cardImg}
            source={{ uri: imageUrl }}
          />
        </View>

        <View style={styles.cardBody}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{property.name}</Text>
            <Text style={styles.cardPrice}>
              <Text style={{ fontWeight: "600" }}>{property.price} $</Text>
            </Text>
          </View>

          <View style={styles.cardFooter}>
            {renderStatus(property.propertyStatus)}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
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
    margin: 15,
    borderRadius: 9999,
    backgroundColor: "#fff",
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
    color: "#232425",
    flex: 1,
    flexShrink: 1,
    marginRight: 10, // Add some space between the title and price
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: "400",
    color: "#232425",
  },
  cardFooter: {
    marginTop: 8,
  },

  statusContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "center",
  },
  statusText: {
    fontSize: 25,
    marginLeft: 5,
    fontWeight: "600",
    color: "#232425",
  },
});

export default MyPropertyCards;
