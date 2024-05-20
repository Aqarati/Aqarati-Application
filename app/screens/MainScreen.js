import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import COLORS from "../../assets/Colors/colors";
import { urlPath, getValueFor } from "../lib";
import Toast from "react-native-toast-message";
import PropertyCard from "../components/PropertyCard";
const initialItems = [
  {
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    name: "Marbella, Spain",
    price: 200,
    stars: 4.45,
    reviews: 124,
    saved: false,
  },
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    name: "Baveno, Italy",
    price: 320,
    stars: 4.81,
    reviews: 409,
    saved: false,
  },
  {
    img: "https://cio.com/wp-content/uploads/2023/07/shutterstock_676661263.jpg?resize=1024%2C683&quality=50&strip=all",
    name: "Marbella, Spain",
    price: 2000,
    stars: 4.45,
    reviews: 124,
    saved: false,
  },
  {
    img: "https://i2.au.reastatic.net/1000x750-format=webp/4d352958ceb83faf067d03131d84b91ae959420f5fa892202186a0c809631646/main.jpg",
    name: "Tucson, Arizona",
    price: 695,
    stars: 4.3,
    reviews: 72,
    saved: false,
  },
  {
    img: "https://i2.au.reastatic.net/1000x750-format=webp/fbf8d820df00160986236a098a4f7b845ed154ab6deea187e5b7e93c9ded2592/image.jpg",
    name: "Marbella, Spain",
    price: 200,
    stars: 4.45,
    reviews: 124,
    saved: false,
  },
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    name: "Baveno, Italy",
    price: 320,
    stars: 4.81,
    reviews: 409,
    saved: false,
  },
  {
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    name: "Tucson, Arizona",
    price: 695,
    stars: 4.3,
    reviews: 72,
    saved: false,
  },
  {
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    name: "Marbella, Spain",
    price: 200,
    stars: 4.45,
    reviews: 124,
    saved: false,
  },
];
const categories = [
  {
    img: "https://img.icons8.com/?size=256&id=J3w76cMS9cUS&format=png",
    label: "Building",
    color: COLORS.primary,
    screen: "rentapartment",
  },
  {
    img: "https://img.icons8.com/?size=256&id=wFfu6zXx15Yk&format=png",
    label: "Home",
    color: COLORS.primary,
    screen: "renthome",
  },
  {
    img: "https://img.icons8.com/?size=256&id=n8CmSai8XFrN&format=png",
    label: "Land",
    color: COLORS.primary,
    screen: "ownland",
  },
  {
    img: "https://img.icons8.com/?size=256&id=ErXKPcLO7sA5&format=png",
    label: "Own",
    color: COLORS.primary,
    screen: "ownhome",
  },
  {
    img: "https://img.icons8.com/?size=256&id=20037&format=png",
    label: "Invest",
    color: COLORS.primary,
    screen: "invest",
  },
];

export default function MainScreen({ navigation }) {
  const [userData, setUserData] = useState(null); // Add this line to initialize user data state
  const [properties, setProperties] = useState([]);
  const fetchUserProfileData = async () => {
    console.log("fetch data for profile");
    const url = urlPath + "/user/profile";
    console.log("url : " + url);
    const token = await getValueFor("token");
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: "Bearer  " + token,
      },
    };
    console.log(config);
    await axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchUserPropertyData = async () => {
    console.log("fetch data for Property");
    const url = urlPath + "/property";
    console.log("url : " + url);
    const token = await getValueFor("token");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {},
    };

    console.log(config);
    await axios
      .request(config)
      .then((response) => {
        setProperties(response.data);
        console.log("\n \n");
        console.log(properties);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    console.log("Main screen use effect called");
    fetchUserProfileData();
    fetchUserPropertyData();
  }, []);

  const handleCardPress = (itemDetails) => {
    navigation.navigate("Details", { itemDetails });
  };
  const Message = () => {
    Toast.show({
      type: "success",
      text1: "Under Maintenance",
      text2: "Enhancing your experience. Please bear with us!",
      autoHide: true,
      visibilityTime: 2000,
      position: "top",
    });
  };
  const [items, setItems] = useState(initialItems);
  // State to track the opened card

  const handleLikePress = (index) => {
    const newItems = [...items];
    newItems[index].saved = !newItems[index].saved;
    setItems(newItems);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: 0, backgroundColor: "#fff" },
        ]}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={profilestyle.container}>
            <View style={profilestyle.header}>
              <Text style={styles.title}>Places to stay</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("profilescreen")}
              >
                <Image
                  source={{
                    uri:
                      userData && userData.imageUrl
                        ? userData.imageUrl
                        : "default_image_url",
                  }} // Replace with actual default image URL
                  style={profilestyle.avatar}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
        <View style={Categories_styles.container}>
          <View style={Categories_styles.list}>
            <View style={Categories_styles.listHeader}></View>
            <ScrollView
              contentContainerStyle={Categories_styles.listContent}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {categories.map(({ img, label, color, screen }, index) => (
                <TouchableOpacity key={index} onPress={Message}>
                  <View
                    style={[Categories_styles.card, { backgroundColor: color }]}
                  >
                    <Image
                      source={{ uri: img }}
                      style={Categories_styles.cardImg}
                    />
                    <Text style={Categories_styles.cardLabel}>{label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        <ScrollView style={{ backgroundColor: "#fff" }}>
          {Array.isArray(properties) &&
            properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
        </ScrollView>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}

const Categories_styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#fff",
  },
  title: {
    paddingHorizontal: 24,
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  list: {
    marginBottom: 0,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  listTitle: {
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 28,
    color: "#323142",
  },
  listAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  listActionText: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    color: "#706f7b",
    marginRight: 2,
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  card: {
    width: 80,
    paddingVertical: 16,
    paddingHorizontal: 6,
    borderRadius: 12,
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 6,
  },
  cardImg: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  cardLabel: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.white,
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 33,
    fontWeight: "700",
    color: "#1d1d1d",
    marginEnd: 70,
    color: COLORS.primary,
  },
});

const profilestyle = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end", // Aligns children (the avatar) to the right
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
});
