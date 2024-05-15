import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Linking,
} from "react-native";
import axios from "axios";
import { delete_token } from "../lib";
import FeatherIcon from "react-native-vector-icons/Feather";
import COLORS from "../../assets/Colors/colors";
import Toast from "react-native-toast-message";

import { urlPath, getValueFor } from "../lib";

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
    routes: [{ name: "Home" }], // Replace 'Details' with the name of your first screen
  });
};

export default function ProfileScreen({ navigation }) {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });
  const [userData, setUserData] = useState(null); // Add this line to initialize user data state
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

  useEffect(() => {
    console.log("profile use effect called");
    fetchData();
  }, []);

  const instahandlePress = () => {
    // Your Instagram username
    const username = "aqaratiofficial";
    // Construct the Instagram URL
    const instagramUrl = "https://www.instagram.com/${username}/";

    // Open the Instagram profile in the browser
    Linking.openURL(instagramUrl)
      .then(() => console.log("Instagram profile opened"))
      .catch((error) =>
        console.error("Error opening Instagram profile:", error)
      );
  };
  const xhandlePress = () => {
    // Your Instagram username
    const username = "Aqaratiofficial";
    // Construct the Instagram URL
    const xUrl = "https://twitter.com/${username}/";

    // Open the Instagram profile in the browser
    Linking.openURL(xUrl)
      .then(() => console.log("X profile opened"))
      .catch((error) => console.error("Error opening X profile:", error));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <ScrollView>
          <View style={styles.profile}>
            <View style={styles.profileHeader}>
              <Image
                alt=""
                source={{
                  uri: userData && userData.imageUrl ? userData.imageUrl : "s",
                }}
                style={styles.profileAvatar}
              />

              <View>
                <Text style={styles.profileName}>
                  {userData
                    ? `${userData.firstName} ${userData.lastName}`
                    : " "}
                </Text>

                <Text style={styles.profileHandle}>
                  {userData ? `@${userData.uname}` : ""}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("editprofile");
              }}
            >
              <View style={styles.profileAction}>
                <Text style={styles.profileActionText}>Edit Profile</Text>

                <FeatherIcon color={COLORS.white} name="edit-3" size={16} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: COLORS.ligh }]}>
                <FeatherIcon color={COLORS.primary} name="globe" size={20} />
              </View>

              <Text style={styles.rowLabel}>Language</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: COLORS.ligh }]}>
                <FeatherIcon color={COLORS.primary} name="moon" size={20} />
              </View>

              <Text style={styles.rowLabel}>Dark Mode</Text>

              <View style={styles.rowSpacer} />

              <Switch
                onValueChange={(darkMode) => setForm({ ...form, darkMode })}
                value={form.darkMode}
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={form.darkMode ? "#fff" : "#f4f3f4"}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: COLORS.ligh }]}>
                <FeatherIcon
                  color={COLORS.primary}
                  name="navigation"
                  size={20}
                />
              </View>

              <Text style={styles.rowLabel}>Location</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color={COLORS.primary}
                name="chevron-right"
                size={20}
              />
            </TouchableOpacity>

            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: COLORS.ligh }]}>
                <FeatherIcon color={COLORS.primary} name="at-sign" size={20} />
              </View>

              <Text style={styles.rowLabel}>Email Notifications</Text>

              <View style={styles.rowSpacer} />

              <Switch
                onValueChange={(emailNotifications) =>
                  setForm({ ...form, emailNotifications })
                }
                value={form.emailNotifications}
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={form.emailNotifications ? "#fff" : "#f4f3f4"}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: COLORS.ligh }]}>
                <FeatherIcon color={COLORS.primary} name="bell" size={20} />
              </View>

              <Text style={styles.rowLabel}>Push Notifications</Text>

              <View style={styles.rowSpacer} />

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

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resources</Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: COLORS.ligh }]}>
                <FeatherIcon color={COLORS.primary} name="flag" size={20} />
              </View>

              <Text style={styles.rowLabel}>Report Bug</Text>

              <View style={styles.rowSpacer} />

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
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: COLORS.ligh }]}>
                <FeatherIcon color={COLORS.primary} name="mail" size={20} />
              </View>

              <Text style={styles.rowLabel}>Contact Us</Text>

              <View style={styles.rowSpacer} />

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
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: COLORS.ligh }]}>
                <FeatherIcon color={COLORS.primary} name="star" size={20} />
              </View>

              <Text style={styles.rowLabel}>Rate in App Store</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color={COLORS.primary}
                name="chevron-right"
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Social media</Text>

            <TouchableOpacity onPress={instahandlePress} style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: COLORS.ligh }]}>
                <FeatherIcon
                  color={COLORS.primary}
                  name="instagram"
                  size={20}
                />
              </View>

              <Text style={styles.rowLabel}>instagram</Text>
              <View style={styles.rowSpacer} />

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
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: COLORS.ligh }]}>
                <FeatherIcon color={COLORS.primary} name="facebook" size={20} />
              </View>

              <Text style={styles.rowLabel}>Facebook</Text>
              <View style={styles.rowSpacer} />

              <FeatherIcon
                color={COLORS.primary}
                name="chevron-right"
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={xhandlePress} style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: COLORS.ligh }]}>
                <FeatherIcon color={COLORS.primary} name="x" size={20} />
              </View>

              <Text style={styles.rowLabel}>X</Text>
              <View style={styles.rowSpacer} />

              <FeatherIcon
                color={COLORS.primary}
                name="chevron-right"
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>

            <TouchableOpacity
              onPress={() => {
                SucessMessage();
                delete_token();
                resetToFirstScreen(navigation);
              }}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: COLORS.ligh }]}>
                <FeatherIcon color={COLORS.primary} name="log-out" size={20} />
              </View>

              <Text style={styles.rowLabel}>Account Log out</Text>
              <View style={styles.rowSpacer} />

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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },

  /** Profile */
  profile: {
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 12,
  },
  profileName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#3d3d3d",
  },
  profileHandle: {
    marginTop: 4,
    fontSize: 15,
    color: "#989898",
  },
  profileAction: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  /** Section */
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#9e9e9e",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  /** Row */
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "400",
    color: "#0c0c0c",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
