import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  RefreshControl,
  animation
} from "react-native";
import axios from "axios";
import COLORS from "../../assets/Colors/colors";
import { urlPath, getValueFor } from "../lib";
import Toast from "react-native-toast-message";
import PropertyCard from "../components/PropertyCard";

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

const MainScreen = forwardRef(({navigation}, ref) => {
  const [userData, setUserData] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef(null); // Add a ref for the ScrollView
  useEffect(() => {
    if (animation) {
      // Start animation when animation value changes
      Animated.timing(animation, {
        toValue: 0, // Reset to initial value
        duration: 500, // Adjust duration as needed
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
      
    }
  }, [animation]);
  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
     
    },
  }));

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
      headers: {
        Authorization: "Bearer  " + token,
      },
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
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false); // Set refreshing to false when data is fetched
      });
  };
  useEffect(() => {
    fetchUserProfileData();
    fetchUserPropertyData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserProfileData();
    fetchUserPropertyData();
    setRefreshing(false); // Set refreshing to false when manual refresh is done
  };

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        ref={scrollViewRef} // Attach the ref here
        contentContainerStyle={[
          styles.container,
          { paddingBottom: 0, backgroundColor: "#fff" },
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={profilestyle.container}>
            <View style={profilestyle.header}>
              <Text style={styles.title}>Places to stay</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("profilescreen")}
              >
              <Image
  source={userData && userData.imageUrl ? { uri: userData.imageUrl } : require("../../assets/images/userD.png")}
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
        <ScrollView style={{ backgroundColor: "#fff", marginBottom: 50 }}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : (
            Array.isArray(properties) &&
            properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          )}
        </ScrollView>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
});

const Categories_styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#fff",
    marginTop: -30,
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
    marginEnd: 70,
    color: COLORS.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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
    justifyContent: "flex-end",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
});

export default MainScreen;