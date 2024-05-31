import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../assets/Colors/colors";

const PropertyCard = ({ property }) => {
  const navigation = useNavigation();

  // Default image URL
  let imageUrl = "https://aqarati-app.s3.me-so1.amazonaws.com/property-image";
  // let imageUrl =
  //   "aqarati-app.s3.me-south-1.amazonaws.com/property-image/153/102.png";

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
    navigation.navigate("PropertyDetails", { property });
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.card}>
        <View style={styles.cardLikeWrapper}>
          <TouchableOpacity onPress={handleCardPress}>
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
              <Text style={{ fontWeight: "600" }}>{property.price} JD</Text>
            </Text>
          </View>

          <View style={styles.cardFooter}>
            <Text style={style.description}>{property.description}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
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
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  divider: {
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "#000",
  },
});

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
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: "400",
    color: "#232425",
  },
  cardFooter: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardStars: {
    marginLeft: 2,
    marginRight: 6,
    fontSize: 14,
    fontWeight: "500",
    color: "#232425",
  },
  cardReviews: {
    fontSize: 14,
    fontWeight: "400",
    color: "#595a63",
  },
});
export default PropertyCard;
