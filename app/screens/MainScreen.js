import React from "react";
import {
  View,
  Button,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  Text,
  Pressable,
} from "react-native";
import COLORS from "../../assets/Colors/colors.js";
import { Colors } from "react-native/Libraries/NewAppScreen";

const MainScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Text>Hello world</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 420,
    width: "100%",
    borderBottomLeftRadius: 130,
  },
  indicatorContainer: {
    height: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    height: 5,
    width: 30,
    backgroundColor: COLORS.grey,
    marginHorizontal: 4,
    borderRadius: 5,
  },
  indicatorActive: {
    backgroundColor: COLORS.dark,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: COLORS.grey,
  },
  btn: {
    height: 60,
    marginHorizontal: 20,
    backgroundColor: COLORS.dark,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MainScreen;
