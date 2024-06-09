import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { getStoredBoolValue } from "../../assets/theme";
const users = [
  {
    img: require("../../assets/images/moh.jpg"),
    name: "Mohammed Ahmed",
    phone: "+962790543018",
  },
];
import { useFocusEffect } from "@react-navigation/native";
export default function Example() {
  const [darkMode, setDarkMode] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const result = getStoredBoolValue();
      const darkMode = result.storedBoolValue;
      setDarkMode(darkMode);
    }, [])
  );

  const [input, setInput] = useState("");
  const filteredRows = useMemo(() => {
    const rows = [];
    const query = input.toLowerCase();

    for (const item of users) {
      const nameIndex = item.name.toLowerCase().search(query);

      if (nameIndex !== -1) {
        rows.push({
          ...item,
          index: nameIndex,
        });
      }
    }

    return rows.sort((a, b) => a.index - b.index);
  }, [input]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles(darkMode).container}>
        <View style={styles(darkMode).searchWrapper}>
          <View style={styles(darkMode).search}>
            <View style={styles(darkMode).searchIcon}>
              <FeatherIcon color="#848484" name="search" size={17} />
            </View>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(val) => setInput(val)}
              placeholder="Start typing.."
              placeholderTextColor="#848484"
              returnKeyType="done"
              style={styles(darkMode).searchControl}
              value={input}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles(darkMode).searchContent}>
          {filteredRows.length ? (
            filteredRows.map(({ img, name, phone }, index) => {
              return (
                <View key={index} style={styles.cardWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}
                  >
                    <View style={styles(darkMode).card}>
                      {img ? (
                        <Image
                          alt=""
                          resizeMode="cover"
                          source={img}
                          style={styles(darkMode).cardImg}
                        />
                      ) : (
                        <View
                          style={[
                            styles(darkMode).cardImg,
                            styles(darkMode).cardAvatar,
                          ]}
                        >
                          <Text style={styles(darkMode).cardAvatarText}>
                            {name[0]}
                          </Text>
                        </View>
                      )}

                      <View style={styles(darkMode).cardBody}>
                        <Text style={styles(darkMode).cardTitle}>{name}</Text>

                        <Text style={styles(darkMode).cardPhone}>{phone}</Text>
                      </View>

                      <View style={styles(darkMode).cardAction}>
                        <FeatherIcon
                          color="#9ca3af"
                          name="chevron-right"
                          size={25}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <Text style={styles(darkMode).searchEmpty}>No results</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = (darkMode) =>
  StyleSheet.create({
    container: {
      paddingBottom: 24,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      backgroundColor: darkMode ? "#000" : "#fff", // Adjust background color for dark mode
    },
    /** Search */
    search: {
      position: "relative",
      backgroundColor: darkMode ? "#333" : "#efefef", // Adjust background color for dark mode
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    searchWrapper: {
      paddingTop: 8,
      paddingHorizontal: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderColor: darkMode ? "#444" : "#efefef", // Adjust border color for dark mode
    },
    searchIcon: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 34,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
      backgroundColor: darkMode ? "#555" : "#fff", // Adjust background color for dark mode
    },
    searchControl: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      paddingLeft: 34,
      width: "100%",
      fontSize: 16,
      fontWeight: "500",
      color: darkMode ? "#fff" : "#000", // Adjust text color for dark mode
    },
    searchContent: {
      paddingLeft: 24,
    },
    searchEmpty: {
      textAlign: "center",
      paddingTop: 16,
      fontWeight: "500",
      fontSize: 15,
      color: darkMode ? "#ccc" : "#9ca1ac", // Adjust text color for dark mode
    },
    /** Card */
    card: {
      paddingVertical: 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: darkMode ? "#444" : "#fff", // Adjust background color for dark mode
    },
    cardWrapper: {
      borderBottomWidth: 1,
      borderColor: darkMode ? "#666" : "#d6d6d6", // Adjust border color for dark mode
    },
    cardImg: {
      width: 42,
      height: 42,
      borderRadius: 12,
    },
    cardAvatar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: darkMode ? "#666" : "#9ca1ac", // Adjust background color for dark mode
    },
    cardAvatarText: {
      fontSize: 19,
      fontWeight: "bold",
      color: "#fff",
    },
    cardBody: {
      marginRight: "auto",
      marginLeft: 12,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: darkMode ? "#fff" : "#000", // Adjust text color for dark mode
    },
    cardPhone: {
      fontSize: 15,
      lineHeight: 20,
      fontWeight: "500",
      color: darkMode ? "#ccc" : "#616d79", // Adjust text color for dark mode
      marginTop: 3,
    },
    cardAction: {
      paddingRight: 16,
    },
  });
