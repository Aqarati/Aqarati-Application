import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../assets/Colors/colors";
import { getValueFor, urlPath } from "../lib";
import axios from "axios";
const PropertyCardDashboard = ({
  property,
  darkMode,
  handleDarkModeToggle,
}) => {
  const navigation = useNavigation();

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

  const handleCardPress = () => {
    // Navigate to the details screen, passing the property object as a parameter
    navigation.navigate("PropertyDetailsDashboard", {
      property,
      darkMode,
      handleDarkModeToggle,
    });
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this Post?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion canceled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const token = await getValueFor("token");

              if (!token) {
                throw new Error("Token not found");
              }

              const url = `${urlPath}/property/${property.id}`;

              const response = await axios.delete(url, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              });
              navigation.goBack();
              console.log(JSON.stringify(response.data));
            } catch (error) {
              console.log(error);
            } finally {
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.card}>
        <View style={styles.cardDeleteWrapper}>
          <TouchableOpacity onPress={handleDelete}>
            <View style={styles.cardDelete}>
              <MaterialIcons color={COLORS.rejected} name="delete" size={30} />
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
            <Text style={styles.description}>{property.description}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
  },
  card: {
    position: "relative",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardDeleteWrapper: {
    position: "absolute",
    zIndex: 1,
    top: 12,
    right: 12,
  },
  cardDelete: {
    width: 40,
    height: 40,
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
  description: {
    fontSize: 16,
    color: "#666",
  },
});

export default PropertyCardDashboard;
