import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeatherIcon from "react-native-vector-icons/Feather";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../assets/theme";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();

const items = [
  {
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    address: "Apartments for Rent",
  },
  {
    img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    address: "Houses for Rent",
  },
];
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <SafeAreaView style={{ backgroundColor: "#fff" }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>What would you like to advertise?</Text>
          <Text style={styles.subtitle}>
            Choose the appropriate section to add the advertisement
          </Text>
          {items.map(({ img, address }, index) => {
            return (
              <View
                key={index}
                style={[styles.card, index === 0 && { borderTopWidth: 0 }]}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.push("Detail1");
                  }}
                >
                  <Image
                    alt=""
                    resizeMode="cover"
                    source={{ uri: img }}
                    style={styles.cardImg}
                  />

                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{address}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 26,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 15,
  },
  /** Card */
  card: {
    borderColor: "#e3e3e3",
    marginBottom: 18,
  },
  cardImg: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginRight: 16,
  },
  cardBody: {
    paddingVertical: 15,
  },
  cardTitle: {
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 8,
    justifyContent: "center",
    textAlign: "center",
  },
});

const lessons = [
  {
    name: "Apartments for Rent",
  },
  {
    name: "Apartments for sale",
  },
  {
    name: "Hotel apartments and suites",
  },
  {
    name: "Student apartments",
  },
  {
    name: "Apartments for sale",
  },
];
function DetailsScreen1({ navigation }) {
  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles1.title}>
          Choose the appropriate section to add the advertisement
        </Text>

        {lessons.map(({ name }, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.push("Detail2");
              }}
            >
              <View style={styles1.card}>
                <View>
                  <Text style={styles1.cardTitle}>{name}</Text>
                  <View style={styles1.cardStats}>
                    <View style={styles1.cardStatsItem}></View>
                  </View>
                </View>

                <View style={styles1.cardAction}>
                  <FeatherIcon color="#9ca3af" name="chevron-right" size={22} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles1 = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.primary2,
    marginBottom: 12,
  },
  /** Card */
  card: {
    paddingVertical: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  cardTitle: {
    fontSize: 25,
    fontWeight: "600",
    color: COLORS.primary2,
    marginBottom: 8,
  },

  cardAction: {
    marginLeft: "auto",
  },
});
function DetailsScreen2({ navigation }) {
  const initialPhotos = new Array(12).fill(null);
  const [photos, setPhotos] = useState(initialPhotos);

  // Function to handle adding photos
  const addPhoto = (index) => {
    // This function would be replaced by your image picker logic
    // and would update the photos state with the new image.
    console.log(`Add photo at position ${index}`);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={index === 0 ? styles2.firstPhotoBox : styles2.photoBox}
      onPress={() => addPhoto(index)}
    >
      {item ? (
        <Image source={{ uri: item }} style={styles2.photo} />
      ) : (
        <View
          style={index === 0 ? styles2.firstAddIconBox : styles2.addIconBox}
        >
          <AntDesign name="pluscircleo" size={24} color={COLORS.primary2} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles2.container}>
      <Text style={styles2.title}>Add pictures to the advertise</Text>
      <View style={styles2.dashedBox}>
        <Text style={styles2.dashedBoxText}>
          Up to 12 photos can be added{"\n"}
          Pictures increase the number of views{"\n"}
          Hint: You can rearrange photos by dragging them from one place to
          another
        </Text>
      </View>

      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        columnWrapperStyle={styles2.row}
      />

      <TouchableOpacity
        style={styles2.bottomButton}
        onPress={() => {
          navigation.push("Detail3");
        }}
      >
        <Text style={styles2.bottomButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dashedBox: {
    borderWidth: 1,
    borderColor: "lightblue",
    borderRadius: 5,
    borderStyle: "dashed",
    padding: 10,
    marginBottom: 10,
  },
  dashedBoxText: {
    color: "grey",
    textAlign: "left",
  },

  photoBox: {
    width: "30%", // this will ensure three boxes per line in a full-width container
    height: 100,
    borderColor: "grey",
    borderWidth: 3, // updated as requested
    borderRadius: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  addIconBox: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  addIconText: {
    color: COLORS.white,
    fontSize: 18,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  bottomButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 4,
    marginBottom: 16,
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  firstPhotoBox: {
    width: "30%",
    height: 100,
    borderColor: "grey",
    borderWidth: 3,
    borderRadius: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary, // This is your different color for the first box
  },
  firstAddIconBox: {
    width: 25,
    height: 25,
    // Assuming you want to keep the "+" white
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },

  // Add more styles as needed
});

function DetailsScreen3() {
  return (
    <View>
      <Text>hello</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="First">
          {() => (
            <SettingsStack.Navigator>
              <SettingsStack.Screen
                name="Details"
                component={DetailsScreen}
                options={{ headerShown: true }}
              />
              <SettingsStack.Screen
                name="Detail1"
                component={DetailsScreen1}
                options={{ headerShown: true }}
              />
              <SettingsStack.Screen
                name="Detail2"
                component={DetailsScreen2}
                options={{ headerShown: true }}
              />
              <SettingsStack.Screen
                name="Detail3"
                component={DetailsScreen3}
                options={{ headerShown: true }}
              />
            </SettingsStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
