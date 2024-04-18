import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";

import COLORS from "../../assets/Colors/colors";

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/images/img1.jpg")}
      style={styles.image}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome To Aqarati</Text>
          <Text style={styles.subtitle}>
            Your Gateway to Dream Properties. Please log in to discover
            exclusive real estate deals and find your perfect home or
            investment.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login With Email</Text>
        </TouchableOpacity>

        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Don't Have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signupText}> Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 35,
  },

  subtitle: {
    fontSize: 18,
    color: "#1D2B53",
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 395,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    color: COLORS.darkGray,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.darkGray,
    textAlign: "center",
    paddingHorizontal: 20, // Adjust as needed for proper text wrapping
    marginBottom: 50, // Adjust as needed
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    marginBottom: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomText: {
    color: COLORS.darkGray,
    fontSize: 16,
  },
  signupText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
