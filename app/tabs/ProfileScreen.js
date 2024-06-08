import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Linking,
  Alert,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { urlPath, getValueFor, delete_token } from "../lib";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import COLORS from "../../assets/Colors/colors";
import { Profilestyles } from "./AddScreenStyles";
import { storeBoolValue } from "../../assets/theme";
const SucessMessage = () => {
  Toast.show({
    type: "success",
    text1: "Logout Message",
    text2: "Logout Successfully",
    autoHide: false,
    visibilityTime: 3000,
    position: "top",
  });
};

const resetToFirstScreen = (navigation) => {
  navigation.reset({
    index: 0,
    routes: [{ name: "Home" }],
  });
};

export default function ProfileScreen({ navigation }) {
  const [darkMode, setDarkMode] = useState(false);
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });
  const [userData, setUserData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadDarkModeState = async () => {
    try {
      const darkModeState = await AsyncStorage.getItem("darkMode");
      if (darkModeState !== null) {
        setDarkMode(JSON.parse(darkModeState));
      }
    } catch (error) {
      console.error("Error loading Dark Mode state:", error);
    }
  };

  const saveDarkModeState = async (darkMode) => {
    try {
      await AsyncStorage.setItem("darkMode", JSON.stringify(darkMode));
    } catch (error) {
      console.error("Error saving Dark Mode state:", error);
    }
  };

  // Function to handle Dark Mode toggle
  const handleDarkModeToggle = (darkMode) => {
    console.log(darkMode); // Confirm that the value of darkMode is correct
    setDarkMode(darkMode); // Update the state immediately to reflect the change
    storeBoolValue(darkMode); // Store the boolean value in local storage
    saveDarkModeState(darkMode); // Save the dark mode state (if needed, e.g., in AsyncStorage)
  };
  useEffect(() => {
    loadDarkModeState();
  }, []);

  const fetchData = async () => {
    console.log("fetch data for profile");
    const url = urlPath + "/user/profile";
    console.log("url : " + url);
    const token = await getValueFor("token");
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    console.log(config);
    await axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        const data = response.data;

        // Set default names if firstName or lastName is null
        if (!data.firstName || !data.lastName) {
          data.firstName = data.firstName || "";
          data.lastName = data.lastName || "";
        }

        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData()
      .then(() => setRefreshing(false))
      .catch((error) => {
        console.error("Error refreshing data:", error);
        setRefreshing(false);
      });
  };

  const bugreport = () => {
    const formurl = "https://forms.gle/QZLQoRXa3G9RKzKE6";
    Linking.openURL(formurl)
      .then(() => console.log("Form URL: " + formurl))
      .catch((error) => console.error("Error opening Form:", error));
  };

  const instahandlePress = () => {
    const username = "aqaratiofficial";
    const instagramUrl = `https://www.instagram.com/${username}/`;
    Linking.openURL(instagramUrl)
      .then(() => console.log("Instagram profile opened"))
      .catch((error) =>
        console.error("Error opening Instagram profile:", error)
      );
  };

  const xhandlePress = () => {
    const username = "Aqaratiofficial";
    const xUrl = `https://twitter.com/${username}/`;
    Linking.openURL(xUrl)
      .then(() => console.log("X profile opened"))
      .catch((error) => console.error("Error opening X profile:", error));
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            SucessMessage();
            delete_token();
            resetToFirstScreen(navigation);
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: darkMode ? COLORS.backgroundDark : COLORS.white,
      }}
    >
      <View style={Profilestyles(darkMode).container}>
        <View style={Profilestyles(darkMode).header}>
          <Text style={Profilestyles(darkMode).title}>Settings</Text>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View style={Profilestyles(darkMode).profile}>
            <View style={Profilestyles(darkMode).profileHeader}>
              {userData && userData.imageUrl ? (
                <Image
                  source={{ uri: userData.imageUrl }}
                  style={Profilestyles(darkMode).profileAvatar}
                />
              ) : (
                <Image
                  source={require("../../assets/images/userD.png")}
                  style={Profilestyles(darkMode).profileAvatar}
                />
              )}

              <View>
                <Text style={Profilestyles(darkMode).profileName}>
                  {userData ? `${userData.firstName} ${userData.lastName}` : ""}
                </Text>

                <Text style={Profilestyles(darkMode).profileHandle}>
                  {userData ? `@${userData.uname}` : ""}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("editprofile", {
                  darkMode,
                  handleDarkModeToggle,
                });
              }}
            >
              <View style={Profilestyles(darkMode).profileAction}>
                <Text style={Profilestyles(darkMode).profileActionText}>
                  Edit Profile
                </Text>

                <FeatherIcon color={COLORS.white} name="edit-3" size={16} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={Profilestyles(darkMode).section}>
            <Text style={Profilestyles(darkMode).sectionTitle}>Management</Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("dashboard", {
                  darkMode,
                  handleDarkModeToggle,
                });
              }}
              style={Profilestyles(darkMode).row}
            >
              <View
                style={[
                  Profilestyles(darkMode).rowIcon,
                  { backgroundColor: COLORS.ligh },
                ]}
              >
                <FeatherIcon
                  color={COLORS.primary}
                  name="book-open"
                  size={20}
                />
              </View>

              <Text style={Profilestyles(darkMode).rowLabel}>Dashboard</Text>
              <View style={Profilestyles(darkMode).rowSpacer} />

              <FeatherIcon
                color={COLORS.primary}
                name="chevron-right"
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("myproperty", {
                  darkMode,
                  handleDarkModeToggle,
                });
              }}
              style={Profilestyles(darkMode).row}
            >
              <View
                style={[
                  Profilestyles(darkMode).rowIcon,
                  { backgroundColor: COLORS.ligh },
                ]}
              >
                <FontAwesome6 color={COLORS.primary} name="house" size={20} />
              </View>

              <Text style={Profilestyles(darkMode).rowLabel}>My property</Text>
              <View style={Profilestyles(darkMode).rowSpacer} />

              <FeatherIcon
                color={COLORS.primary}
                name="chevron-right"
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={Profilestyles(darkMode).section}>
            <Text style={Profilestyles(darkMode).sectionTitle}>
              Preferences
            </Text>

            <TouchableOpacity
              onPress={() => {}}
              style={Profilestyles(darkMode).row}
            >
              <View
                style={[
                  Profilestyles(darkMode).rowIcon,
                  { backgroundColor: COLORS.ligh },
                ]}
              >
                <FeatherIcon color={COLORS.primary} name="globe" size={20} />
              </View>

              <Text style={Profilestyles(darkMode).rowLabel}>Language</Text>

              <View style={Profilestyles(darkMode).rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <View style={Profilestyles(darkMode).row}>
              <View
                style={[
                  Profilestyles(darkMode).rowIcon,
                  { backgroundColor: COLORS.ligh },
                ]}
              >
                <FeatherIcon color={COLORS.primary} name="moon" size={20} />
              </View>

              <Text style={Profilestyles(darkMode).rowLabel}>Dark Mode</Text>

              <View style={Profilestyles(darkMode).rowSpacer} />

              <Switch
                onValueChange={(darkMode) => handleDarkModeToggle(darkMode)}
                value={darkMode}
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={darkMode ? "#fff" : "#f4f3f4"}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={Profilestyles(darkMode).row}
            >
              <View
                style={[
                  Profilestyles(darkMode).rowIcon,
                  { backgroundColor: COLORS.ligh },
                ]}
              >
                <FeatherIcon
                  color={COLORS.primary}
                  name="navigation"
                  size={20}
                />
              </View>

              <Text style={Profilestyles(darkMode).rowLabel}>Location</Text>

              <View style={Profilestyles.rowSpacer} />

              <FeatherIcon
                color={COLORS.primary}
                name="chevron-right"
                size={20}
              />
            </TouchableOpacity>

            <View style={Profilestyles(darkMode).row}>
              <View
                style={[
                  Profilestyles(darkMode).rowIcon,
                  { backgroundColor: COLORS.ligh },
                ]}
              >
                <FeatherIcon color={COLORS.primary} name="at-sign" size={20} />
              </View>

              <Text style={Profilestyles(darkMode).rowLabel}>
                Email Notifications
              </Text>

              <View style={Profilestyles(darkMode).rowSpacer} />

              <Switch
                onValueChange={(emailNotifications) =>
                  setForm({ ...form, emailNotifications })
                }
                value={form.emailNotifications}
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={form.emailNotifications ? "#fff" : "#f4f3f4"}
              />
            </View>

            <View style={Profilestyles(darkMode).row}>
              <View
                style={[
                  Profilestyles(darkMode).rowIcon,
                  { backgroundColor: COLORS.ligh },
                ]}
              >
                <FeatherIcon color={COLORS.primary} name="bell" size={20} />
              </View>

              <Text style={Profilestyles(darkMode).rowLabel}>
                Push Notifications
              </Text>

              <View style={Profilestyles(darkMode).rowSpacer} />

              <Switch
                onValueChange={(pushNotifications) =>
                  setForm({ ...form, pushNotifications })
                }
                value={form.pushNotifications}
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={form.pushNotifications ? "#fff" : "#f4f3f4"}
              />
            </View>
          </View>

          <View style={Profilestyles(darkMode).section}>
            <Text style={Profilestyles(darkMode).sectionTitle}>Resources</Text>

            <TouchableOpacity
              onPress={bugreport}
              style={Profilestyles(darkMode).row}
            >
              <View
                style={[
                  Profilestyles(darkMode).rowIcon,
                  { backgroundColor: COLORS.ligh },
                ]}
              >
                <FeatherIcon color={COLORS.primary} name="flag" size={20} />
              </View>

              <Text style={Profilestyles(darkMode).rowLabel}>Report Bug</Text>

              <View style={Profilestyles(darkMode).rowSpacer} />

              <FeatherIcon
                color={COLORS.primary}
                name="chevron-right"
                size={20}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={instahandlePress}
              style={Profilestyles(darkMode).row}
            >
              <View
                style={[
                  Profilestyles(darkMode).rowIcon,
                  { backgroundColor: COLORS.ligh },
                ]}
              >
                <FeatherIcon color={COLORS.primary} name="mail" size={20} />
              </View>

              <Text style={Profilestyles(darkMode).rowLabel}>Contact Us</Text>

              <View style={Profilestyles(darkMode).rowSpacer} />

              <FeatherIcon
                color={COLORS.primary}
                name="chevron-right"
                size={20}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={Profilestyles(darkMode).row}
            >
              <View
                style={[
                  Profilestyles(darkMode).rowIcon,
                  { backgroundColor: COLORS.ligh },
                ]}
              >
                <FeatherIcon color={COLORS.primary} name="star" size={20} />
              </View>

              <Text style={Profilestyles(darkMode).rowLabel}>
                Rate in App Store
              </Text>

              <View style={Profilestyles(darkMode).rowSpacer} />

              <FeatherIcon
                color={COLORS.primary}
                name="chevron-right"
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={Profilestyles(darkMode).section}>
            <Text style={Profilestyles(darkMode).sectionTitle}>
              Social media
            </Text>

            <TouchableOpacity
              onPress={instahandlePress}
              style={Profilestyles(darkMode).row}
            >
              <View
                style={[
                  Profilestyles(darkMode).rowIcon,
                  { backgroundColor: COLORS.ligh },
                ]}
              >
                <FeatherIcon
                  color={COLORS.primary}
                  name="instagram"
                  size={20}
                />
              </View>

              <Text style={Profilestyles(darkMode).rowLabel}>instagram</Text>
              <View style={Profilestyles(darkMode).rowSpacer} />

              <FeatherIcon
                color={COLORS.primary}
                name="chevron-right"
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={Profilestyles(darkMode).row}
            >
              <View
                style={[
                  Profilestyles(darkMode).rowIcon,
                  { backgroundColor: COLORS.ligh },
                ]}
              >
                <FeatherIcon color={COLORS.primary} name="facebook" size={20} />
              </View>

              <Text style={Profilestyles(darkMode).rowLabel}>Facebook</Text>
              <View style={Profilestyles(darkMode).rowSpacer} />

              <FeatherIcon
                color={COLORS.primary}
                name="chevron-right"
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={xhandlePress}
              style={Profilestyles(darkMode).row}
            >
              <View
                style={[
                  Profilestyles(darkMode).rowIcon,
                  { backgroundColor: COLORS.ligh },
                ]}
              >
                <FeatherIcon color={COLORS.primary} name="x" size={20} />
              </View>

              <Text style={Profilestyles(darkMode).rowLabel}>X</Text>
              <View style={Profilestyles(darkMode).rowSpacer} />

              <FeatherIcon
                color={COLORS.primary}
                name="chevron-right"
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={Profilestyles(darkMode).section}>
            <Text style={Profilestyles(darkMode).sectionTitle}>Account</Text>

            <TouchableOpacity
              onPress={handleLogout}
              style={Profilestyles(darkMode).row}
            >
              <View
                style={[
                  Profilestyles(darkMode).rowIcon,
                  { backgroundColor: COLORS.ligh },
                ]}
              >
                <FeatherIcon color={COLORS.primary} name="log-out" size={20} />
              </View>

              <Text style={Profilestyles(darkMode).rowLabel}>
                Account Log out
              </Text>
              <View style={Profilestyles(darkMode).rowSpacer} />

              <FeatherIcon
                color={COLORS.primary}
                name="chevron-right"
                size={20}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Toast></Toast>
    </SafeAreaView>
  );
}
