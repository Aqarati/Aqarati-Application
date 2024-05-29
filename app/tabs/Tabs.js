import React, { useRef, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Platform, Animated, Easing } from "react-native";
import COLORS from "../../assets/Colors/colors";
import AddScreen from "./AddScreen";
import ChatScreen from "./ChatScreen";
import LikeScreen from "./LikeScreen";
import SearchScreen from "./SearchScreen";
import MainScreen from "../screens/MainScreen";

const Tab = createBottomTabNavigator();

function Tabs() {
  const mainScreenRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const screenComponents = {
    Main: MainScreen,
    Favorite: LikeScreen,
    Post: AddScreen,
    chat: ChatScreen,
    search: SearchScreen,
  };

 const handleTabPress = (navigation, screen) => {
  if (screen === "Main" && mainScreenRef.current) {
    mainScreenRef.current.scrollToTop();
    // Trigger animation when scrolling up
   
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // Navigate to the "Main" screen after animation
      navigation.navigate(screen);
    });
  } else {
    navigation.navigate(screen);
  }
};

  useEffect(() => {
    // Reset animation value when component unmounts
    return () => {
      fadeAnim.setValue(0);
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "Post":
              size = 45;
              iconName = "plus-circle";
              break;
            case "chat":
              iconName = "comments";
              break;
            case "Main":
              iconName = "home";
              break;
            case "Favorite":
              iconName = "heart";
              break;
            case "search":
              iconName = "search";
              break;
            default:
              iconName = "user"; // Assuming default for 'profile'
              break;
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        headerShown: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "white",
          paddingBottom: Platform.OS === "ios" ? 25 : 5,
          height: 80,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          position: "absolute",
          borderRadius: 20,
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
          marginTop: 10,
        },
      })}
    >
      {Object.keys(screenComponents).map((screen) => (
        <Tab.Screen
          options={{ headerShown: false }}
          key={screen}
          name={screen}
          component={
            screen === "Main"
              ? (props) => (
                  <MainScreen
                    ref={mainScreenRef}
                    animation={fadeAnim}
                    {...props}
                  />
                )
              : screenComponents[screen]
          }
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault(); // Prevent default action
              handleTabPress(navigation, screen); // Handle tab press
            },
          })}
        />
      ))}
    </Tab.Navigator>
  );
}

export default Tabs;
