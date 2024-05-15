import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  Pressable,
  Image,
} from "react-native";
import COLORS from "../../assets/Colors/colors.js";
import Carousel from "pinar";

const images = [
  {
    image: require("../../assets/images/OnboardImage.jpg"),
  },
  {
    image: require("../../assets/images/backImage1.jpg"),
  },
  {
    image: require("../../assets/images/backImage2.jpg"),
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light }}>
      <StatusBar translucent backgroundColor={{ color: COLORS.translucent }} />
      <Carousel
        autoplay
        autoplayTimeout={2500}
        loop
        index={0}
        pageSize={200}
        showsPageIndicator
        pageIndicatorStyle={{ backgroundColor: COLORS.light }}
        currentPageIndicatorStyle={{ backgroundColor: COLORS.light }}
        pageIndicatorOffset={20}
      >
        {images.map((imageData, index) => (
          <Image
            key={index}
            source={imageData.image}
            style={[styles.image, { resizeMode: "cover" }]}
          />
        ))}
      </Carousel>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> Welcome to Aqarati!</Text>
        <Text style={styles.text}>
          Unlock the door to your dream home with unparalleled ease and
          precision, discovering unmatched convenience along the way.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Get Started</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  image: {
    height: 420, // Increased height for larger image
    width: "100%",
    borderBottomLeftRadius: 140,
  },
  titleContainer: {
    marginTop: 40, // Adjusted marginTop for title
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 15,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: "center",
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  btn: {
    height: 60,
    backgroundColor: COLORS.dark,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    width: 330,
    marginTop: 40,
    marginBottom: 20,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeScreen;
