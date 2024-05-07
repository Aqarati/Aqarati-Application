import * as React from "react";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
} from "react-native";

import { COLORS } from "../../assets/theme";

import { AntDesign } from "@expo/vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import * as ImagePicker from "expo-image-picker";
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

const ListItems = ({ title, navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate("Detail2")}
    style={styles1.item}
  >
    <AntDesign name="arrowright" size={20} color="black" />
    <Text style={styles1.title}>{title}</Text>
  </TouchableOpacity>
);

const DetailsScreen1 = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <ListItems title={item.name} navigation={navigation} />
  );

  return (
    <View style={styles1.container}>
      <Text style={styles1.screenTitle}>Choose the ad type</Text>
      <FlatList
        data={lessons}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 70,
  },
  screenTitle: {
    fontSize: 25,

    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    textAlign: "center",
    backgroundColor: "#fff",
  },
});

function DetailsScreen2({ navigation }) {
  const initialPhotos = new Array(12).fill(null);
  const [photos, setPhotos] = useState(initialPhotos);

  useEffect(() => {
    // Request permission to access the camera and photo library
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
    })();
  }, []);

  const handleImagePress = async (index) => {
    // Open the device's photo library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      selectionLimit: 12,
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("ImagePicker result:", result); // Log the result object to see its structure and check for the URI

    if (!result.cancelled) {
      // If image is selected, update photoUri and keep changePhotoMode true
      const newPhotos = [...photos];
      newPhotos[index] = result.uri;
      setPhotos(newPhotos);

      // Log the updated newPhotos array to verify the saved image URI
      console.log("Updated newPhotos:", newPhotos);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={index === 0 ? styles2.firstPhotoBox : styles2.photoBox}
      onPress={() => handleImagePress(index)}
    >
      {item ? (
        <Image
          source={{ uri: item }}
          style={[styles2.photo, { resizeMode: "cover" }]}
        />
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
          <Octicons name="dot-fill" size={14} color={COLORS.primary} /> Up to 12
          photos can be added
        </Text>
        <Text style={styles2.dashedBoxText}>
          <Octicons name="dot-fill" size={14} color={COLORS.primary} /> Pictures
          increase the number of views
        </Text>
        <Text style={styles2.dashedBoxText}>
          <Octicons name="dot-fill" size={14} color={COLORS.primary} /> Hint:
          You can rearrange photos by dragging them from one place to another
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
    paddingTop: 70,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.primary, // Set the title color to primary
    textAlign: "center", // Center align the title for better aesthetics
  },
  dashedBox: {
    borderWidth: 1,
    borderColor: "lightblue",
    borderRadius: 5,
    borderStyle: "dashed",
    padding: 10,
    marginBottom: 30,
    marginTop: 30,
    marginLeft: 6,
    width: "95%", // Reduce width to 95% of its container to make it narrower
  },
  dashedBoxText: {
    color: "grey",
    textAlign: "left",
    fontSize: 16, // Increased font size for better readability
    paddingLeft: 5, // Add padding to allow space for the bullet
  },

  photoBox: {
    width: "25%", // Reduced width to decrease box area, ensuring four boxes per line
    height: 80, // Reduced height
    borderColor: "grey",
    borderWidth: 3,
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
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  bottomButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 36,
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  firstPhotoBox: {
    width: "25%", // Consistent with other photo boxes
    height: 80, // Consistent with other photo boxes
    borderColor: "grey",
    borderWidth: 3,
    borderRadius: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary, // Use primary color for distinct appearance
  },
  firstAddIconBox: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
});

const SettingItem = ({ text }) => {
  return (
    <View style={styles3.settingItem}>
      <Text style={styles3.settingText}>{text}</Text>
      <AntDesign
        name="checkcircleo"
        size={24}
        color={COLORS.primary}
        style={styles3.icon}
      />
    </View>
  );
};

function DetailsScreen3({ navigation }) {
  const addReel = () => {
    console.log("Add reel logic triggered");
  };

  return (
    <View style={styles3.container}>
      <Text style={styles3.title}>Add reel</Text>
      <SettingItem text="A video of up to 30 seconds can be added" />
      <SettingItem text="For Android users, pressing faster will speed up and secure" />
      <SettingItem text="Improving the quality of filming, they are programmed longitudinally" />
      <TouchableOpacity style={styles3.addReelBox} onPress={addReel}>
        <AntDesign name="pluscircleo" size={50} color={COLORS.primary2} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles3.button}
        onPress={() => navigation.navigate("Details4")} // Replace 'NextScreenName' with the actual name of your screen
      >
        <Text style={styles3.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles3 = StyleSheet.create({
  title: {
    marginLeft: 30, // Consider reducing or removing if unnecessary
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.primary, // Ensure COLORS.primary is defined and visually effective
    marginBottom: 20, // Adjusted for better spacing between elements
    marginTop: 10, // Reduced from 30 to minimize excessive vertical spacing
    textAlign: "center", // Centralize title if suitable for your layout
  },
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
    backgroundColor: COLORS.white, // Ensure COLORS.white is defined
    justifyContent: "center", // This centers items vertically within the container
  },
  addReelBox: {
    width: 300,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 20, // Ensures consistent vertical margin
    alignSelf: "center", // Center the box horizontally
    borderWidth: 3,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    borderColor: "grey",
  },
  settingItem: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  settingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20, // Consider adjusting if alignment seems off
    flex: 1, // Ensures text fills available space, pushing the icon to the edge
  },
  icon: {
    // Ensure icons are suitably styled if they are a significant part of the layout
  },
  boldText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.primary,
    marginBottom: 10, // Reduced to decrease gap between elements
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10, // Reducing vertical margin to remove unnecessary gaps
    marginBottom: 10, // Adjusting to balance the layout vertically
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
  },
});

const DATA = [
  {
    name: "Irbid",
    areas: ["Irbid City", "Ar Ramtha", "Bani Kinana"],
    rooms: ["1", "2", "3", "4", "5", "6+"],
    bathrooms: ["1", "2", "3", "4", "5", "6+"],
    roomstate: ["Furnished", "Unfurnished", "Partially Furnished", "d"],
    floor: [
      "Ground Floor",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
    ],
    buildingages: [
      "0 - 11 months",
      "1 - 5 Years",
      "6 -9 Years",
      "10 - 19 Years",
      "20+ Years",
    ],
    Rent_period: ["Daily", "Weekly", "Monthly", "Yearly"],
    keyFeatures: [
      "Balcony",
      "Pool",
      "Gym",
      "Parking",
      "Security",
      "Pet Friendly",
      "Elevator",
      "Garden",
      "Rooftop Access",
      "High-Speed Internet",
      "Modern Appliances",
      "Air Conditioning",
      "Furnished",
      "Waterfront View",
      "Near Public Transport",
    ],
    additionalBenefits: [
      "Elevator",
      "Garden",

      "Staircase",
      "24/7 Security",
      "Children's Play Area",
      "Fire Safety",
      "Spa Facilities",
      "Sports Facilities",
      "Guest Parking",
      "CCTV Surveillance",
      "Backup Generator",
      "Laundry Room",
      "Storage Space",
      "Waste Disposal System",
    ],
    nearbyLocations: [
      "Restaurants",
      "Schools",
      "Supermarkets",
      "Malls",
      "Hospitals",
      "Parks",
      "Gyms",
      "Banks",
      "Pharmacies",
      "Cinemas",
      "Public Transport Stations",
      "Libraries",
      "Post Offices",
      "Police Stations",
      "Universities",
    ],
    orientations: [
      "North",
      "South",
      "East",
      "West",
      "Northeast",
      "Northwest",
      "Southeast",
      "Southwest",
    ],
  },
  {
    name: "Ajloun",
    areas: ["Ajloun City", "Kufranjah", "Anjara"],
    rooms: ["1", "2", "3", "4", "5", "6+"],
    bathrooms: ["1", "2", "3", "4"],
    roomstate: ["Furnished", "Unfurnished", "Partially Furnished"],
    floor: [
      "Ground Floor",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
    ],
  },
  {
    name: "Jerash",
    areas: ["Jerash City", "Souf", "Musha"],
    rooms: ["1", "2", "3", "4", "5", "6+"],
    bathrooms: ["1", "2", "3", "4"],
    roomstate: ["Furnished", "Unfurnished", "Partially Furnished"],
    floor: [
      "Ground Floor",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
    ],
  },
  {
    name: "Mafraq",
    areas: ["Mafraq City", "Al-Sareeh", "Umm el-Jimal"],
    rooms: ["1", "2", "3", "4", "5", "6+"],
    bathrooms: ["1", "2", "3", "4"],
    roomstate: ["Furnished", "Unfurnished", "Partially Furnished"],
    floor: [
      "Ground Floor",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
    ],
  },
  {
    name: "Balqa",
    areas: ["Salt City", "Ain Al Basha", "Fuheis"],
    rooms: ["1", "2", "3", "4", "5", "6+"],
    bathrooms: ["1", "2", "3", "4"],
    roomstate: ["Furnished", "Unfurnished", "Partially Furnished"],
  },
  {
    name: "Amman",
    areas: ["Amman City", "Wadi As-Seer", "Al-Jubaiha"],
    rooms: ["1", "2", "3", "4", "5", "6+"],
    bathrooms: ["1", "2", "3", "4"],
    roomstate: ["Furnished", "Unfurnished", "Partially Furnished"],
    floor: [
      "Ground Floor",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
    ],
  },
  {
    name: "Zarqa",
    areas: ["Zarqa City", "Russeifa", "Azraq"],
    rooms: ["1", "2", "3", "4", "5", "6+"],
    bathrooms: ["1", "2", "3", "4"],
    roomstate: ["Furnished", "Unfurnished", "Partially Furnished"],
    floor: [
      "Ground Floor",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
    ],
  },
  {
    name: "Madaba",
    areas: ["Madaba City", "Ma'in", "Libb"],
    rooms: ["1", "2", "3", "4", "5", "6+"],
    bathrooms: ["1", "2", "3", "4"],
    roomstate: ["Furnished", "Unfurnished", "Partially Furnished"],
    floor: [
      "Ground Floor",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
    ],
  },
  {
    name: "Karak",
    areas: ["Al-Karak City", "Al-Mazar", "ahmed", "Mohammed"],
    rooms: ["1", "2", "3", "4", "5", "6+"],
    bathrooms: ["1", "2", "3", "4"],
    roomstate: ["Furnished", "Unfurnished", "Partially Furnished"],
    floor: [
      "Ground Floor",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
    ],
  },
  {
    name: "Tafilah",
    areas: ["Tafilah City", "Busaira", "Qadisiyah"],
    rooms: ["1", "2", "3", "4", "5", "6+"],
    bathrooms: ["1", "2", "3", "4"],
    roomstate: ["Furnished", "Unfurnished", "Partially Furnished"],
    floor: [
      "Ground Floor",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
    ],
  },
  {
    name: "Ma'an",
    areas: ["Ma'an City", "Shobak", "Petra"],
    rooms: ["1", "2", "3", "4", "5", "6+"],
    bathrooms: ["1", "2", "3", "4"],
    roomstate: ["Furnished", "Unfurnished", "Partially Furnished"],
    floor: [
      "Ground Floor",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
    ],
    buildingages: [
      "0 - 11 months",
      "1 - 5 Years",
      "6 -9 Years",
      "10 - 19 Years",
      "20+ Years",
    ],
  },
  {
    name: "Aqaba",
    areas: ["Aqaba City", "Al-Quwairah", "Wadi Rum"],
    rooms: ["1", "2", "3", "4", "5", "6+"],
    bathrooms: ["1", "2", "3", "4"],
    roomstate: ["Furnished", "Unfurnished", "Partially Furnished"],
    floor: [
      "Ground Floor",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
    ],
  },
];

const ListItem = ({
  title,
  areas,
  rooms,
  bathrooms,
  roomstate,
  navigation,
}) => (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate("AreaDetailsScreen", {
        areas,
        rooms,
        bathrooms,
        title,
        roomstate,
      })
    }
    style={styles4.item}
  >
    <AntDesign name="arrowright" size={20} color="black" />
    <Text style={styles4.title}>{title}</Text>
  </TouchableOpacity>
);

const DetailsScreen4 = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      areas={item.areas}
      rooms={item.rooms}
      bathrooms={item.bathrooms}
      roomstate={item.roomstate}
      floor={item.floor}
      navigation={navigation}
    />
  );

  return (
    <View style={styles4.container}>
      <Text style={styles4.screenTitle}>Select City</Text>
      <View style={styles4.searchSection}>
        <TextInput
          style={styles4.input}
          placeholder="Search for the area"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={DATA.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};
const styles4 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 70,
  },
  screenTitle: {
    // Style for the new title
    fontSize: 25,
    color: COLORS.primary, // Using the primary color
    textAlign: "center",
    marginBottom: 20, // Space before the search section starts
    fontWeight: "bold", // Make the title bold
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    textAlign: "center",
    backgroundColor: "#fff",
  },
});

const AreaDetailsScreen = ({ route, navigation }) => {
  const { areas, rooms, bathrooms, roomstate } = route.params; // Removed bathrooms from route params

  const [searchQuery, setSearchQuery] = useState("");

  const handleAreaPress = (area) => {
    navigation.navigate("NumberOfRoomsScreen", {
      area,
      rooms,
      roomstate,
      bathrooms,
    }); // Pass bathrooms here
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleAreaPress(item)}
      style={styles5.item}
    >
      <Text style={styles5.itemText}>{item}</Text>
      <AntDesign name="arrowright" size={20} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={styles5.container}>
      <Text style={styles5.screenTitle}>Select the Region</Text>
      <View style={styles4.searchSection}>
        <TextInput
          style={styles4.input}
          placeholder="Search for the area"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={areas.filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const styles5 = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 70,
    backgroundColor: "#fff",
  },
  screenTitle: {
    fontSize: 25,
    fontWeight: "bold", // Make the title bold
    textAlign: "center",
    color: COLORS.primary, // Set color as needed, or use COLORS.primary if defined
    marginBottom: 20, // Space before the search section starts
  },
  item: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    marginBottom: 20,
  },
  itemText: {
    fontSize: 16,
    color: "black",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    textAlign: "center",
    backgroundColor: "#fff",
  },
});

const NumberOfRoomsScreen = ({ navigation, route }) => {
  const { rooms, bathrooms, roomstate } = route.params;

  const handleRoomSelection = (numberOfRooms) => {
    navigation.navigate("NumberOfBathroomsScreen", {
      bathrooms,

      roomstate,
      rooms,
    });
  };

  const renderRoomCard = (room) => (
    <TouchableOpacity
      key={room}
      onPress={() => handleRoomSelection(room)}
      style={RoomStyle.item}
    >
      <MaterialIcons
        name="bedroom-child"
        size={20}
        color={COLORS.primary}
        style={RoomStyle.icon}
      />
      <Text style={RoomStyle.itemText}>{room} Room</Text>
      <AntDesign name="arrowright" size={20} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={RoomStyle.container}>
      <ScrollView>
        <Text style={RoomStyle.title}>The Number of Rooms</Text>
        <View style={RoomStyle.itemContainer}>
          {rooms.map((room) => renderRoomCard(room))}
        </View>
      </ScrollView>
    </View>
  );
};
const RoomStyle = StyleSheet.create({
  icon: {
    marginLeft: 1, // Adjust spacing between the icon and the text as needed
  },
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 70, // Adjusted padding at the top for more space
    backgroundColor: "#fff",
  },
  title: {
    // Style for the title
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20, // Space before the list starts\
    color: COLORS.primary, //
  },
  item: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    marginBottom: 20, // Consistent margin at the bottom of each item
  },
  itemText: {
    fontSize: 16,
    color: "black",
    marginLeft: -170, // to make the icons lefto of the text
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 30, // Adjusted margin at the top of the search section
  },
  input: {
    flex: 1,
    height: 40,
    textAlign: "center",
    backgroundColor: "#fff",
  },
});

const NumberOfBathroomsScreen = ({ navigation, route }) => {
  const { bathrooms, roomstate } = route.params;

  const handleBathroomSelection = (numberOfBathrooms) => {
    // Handle bathroom selection logic here
    navigation.navigate("RoomState", { roomstate, bathrooms });
  };

  const renderBathroomCard = (bathroom) => (
    <TouchableOpacity
      key={bathroom}
      onPress={() => handleBathroomSelection(bathroom)}
      style={bathRoomStyle.item}
    >
      <FontAwesome
        name="bathtub"
        size={20}
        color={COLORS.primary}
        style={RoomStyle.icon}
      />
      <Text style={bathRoomStyle.itemText}>{bathroom} Bathroom</Text>
      <AntDesign name="arrowright" size={20} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={bathRoomStyle.container}>
      <ScrollView>
        <Text style={bathRoomStyle.title}>Number of Bathrooms</Text>
        <View style={bathRoomStyle.itemContainer}>
          {bathrooms.map((bathroom) => renderBathroomCard(bathroom))}
        </View>
      </ScrollView>
    </View>
  );
};
const bathRoomStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 70, // Adjusted padding at the top for more space
    backgroundColor: "#fff",
  },
  title: {
    // Style for the title
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15, // Space before the list starts
    color: COLORS.primary, //
  },
  item: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    marginBottom: 20, // Consistent margin at the bottom of each item
  },
  itemText: {
    fontSize: 16,
    color: "black",
    marginLeft: -130, // to make the icons lefto of the text
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 30, // Adjusted margin at the top of the search section
  },
  input: {
    flex: 1,
    height: 40,
    textAlign: "center",
    backgroundColor: "#fff",
  },
});

const RoomState = ({ navigation, route }) => {
  const { roomstate } = route.params;

  const renderRoomStateCard = (state) => (
    <TouchableOpacity
      key={state}
      style={roomStateStyles.stateItem}
      onPress={() => navigation.navigate("BuildingArea")}
    >
      <Text style={roomStateStyles.stateText}>{state}</Text>
      <AntDesign name="arrowright" size={20} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={roomStateStyles.container}>
      <Text style={roomStateStyles.title}>Room State</Text>
      <ScrollView>
        <View style={roomStateStyles.stateContainer}>
          {roomstate.map((state) => renderRoomStateCard(state))}
        </View>
      </ScrollView>
    </View>
  );
};
const roomStateStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 70, // Adjusted padding at the top for more space
    backgroundColor: "#fff",
  },
  stateItem: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 14, // Center text
    color: COLORS.primary,
  },
  stateText: {
    fontSize: 16,
    color: "black",
  },
});

const BuildingArea = ({ navigation, route }) => {
  const [area, setArea] = useState("");
  const navigateToNextPage = () => {
    // Optionally process the area or just navigate
    navigation.navigate("ApartmentFloor");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={buildingAreaStyle.container}>
        <Text style={buildingAreaStyle.title}>Building Area</Text>
        <View style={buildingAreaStyle.inputContainer}>
          <TextInput
            style={buildingAreaStyle.input}
            placeholder="Enter the building area in meters"
            keyboardType="numeric"
            value={area}
            onChangeText={(text) => setArea(text)}
          />
        </View>
        <TouchableOpacity
          style={buildingAreaStyle.button}
          onPress={navigateToNextPage}
        >
          <Text style={buildingAreaStyle.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const buildingAreaStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#CCCCCC",
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333333",
  },
  button: {
    backgroundColor: COLORS.primary, // Adjust the color as needed, using a generic blue here.
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

const ApartmentFloor = ({ navigation }) => {
  const floors = DATA[0].floor; // Accessing the floor array from the first entry of DATA
  const [searchQuery, setSearchQuery] = useState("");
  const handleFloorSelection = (selectedFloor) => {
    // Navigate to another screen and pass the selected floor
    navigation.navigate("BuildingAge", { selectedFloor });
  };
  const filteredFloors = floors.filter((floor) =>
    floor.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderFloorCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleFloorSelection(item)}
      style={floorstyle.item}
    >
      <Text style={floorstyle.itemText}>{item}</Text>
      <AntDesign name="arrowright" size={20} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={floorstyle.container}>
      <Text style={floorstyle.title}>Select a Floor</Text>
      <View style={styles4.searchSection}>
        <TextInput
          style={styles4.input}
          placeholder="Search for the area"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={filteredFloors}
        renderItem={renderFloorCard}
        keyExtractor={(item, index) => item + index}
        style={floorstyle.input}
      />
    </View>
  );
};
const floorstyle = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 70, // Adjusted padding at the top for more space
    backgroundColor: "#fff",
  },
  title: {
    // Style for the title
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15, // Space before the list starts
    color: COLORS.primary, //
  },
  item: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    marginBottom: 20, // Consistent margin at the bottom of each item
  },
  itemText: {
    fontSize: 16,
    color: "black",
  },

  input: {
    flex: 1,
    height: 40,
    textAlign: "center",
    backgroundColor: "#fff",
  },
});

const BuildingAge = ({ navigation }) => {
  const ages = DATA[0].buildingages; // Make sure DATA and buildingages are correctly defined
  const [searchQuery, setSearchQuery] = useState("");

  const handleAgeSelection = (selectedAge) => {
    navigation.navigate("Rent_period", { selectedAge });
  };

  const filteredAges = ages.filter((age) =>
    age.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderAgeCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleAgeSelection(item)}
      style={AgeStyle.item}
    >
      <Text style={AgeStyle.itemText}>{item}</Text>
      <AntDesign name="arrowright" size={20} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={AgeStyle.container}>
      <Text style={AgeStyle.title}>Select Building Age</Text>
      <View style={AgeStyle.searchSection}>
        <TextInput
          style={AgeStyle.input}
          placeholder="Search for the age"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={filteredAges}
        renderItem={renderAgeCard}
        keyExtractor={(item, index) => `age-${index}`}
        style={AgeStyle.list}
      />
    </View>
  );
};
const AgeStyle = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 70, // Adjusted padding at the top for more space
    backgroundColor: "#fff",
  },
  title: {
    // Style for the title
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15, // Space before the list starts
    color: COLORS.primary, //
  },
  item: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    marginBottom: 20, // Consistent margin at the bottom of each item
  },
  itemText: {
    fontSize: 16,
    color: "black",
  },

  input: {
    flex: 1,
    height: 40,
    textAlign: "center",
    backgroundColor: "#fff",
  },
});

const Rent_period = ({ navigation }) => {
  const rentPeriods = DATA[0].Rent_period; // Ensure you have 'rentPeriods' in your data model
  const [searchQuery, setSearchQuery] = useState("");

  const handlePeriodSelection = (selectedPeriod) => {
    navigation.navigate("KeyFeaturesScreen ", { selectedPeriod }); // Change 'Rent_period' to an appropriate screen name
  };

  const filteredPeriods = rentPeriods.filter((period) =>
    period.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPeriodCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => handlePeriodSelection(item)}
      style={Rent_periodStyle.item}
    >
      <Text style={Rent_periodStyle.itemText}>{item}</Text>
      <AntDesign name="arrowright" size={20} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={Rent_periodStyle.container}>
      <Text style={Rent_periodStyle.title}>Select Rent Period</Text>
      <View style={Rent_periodStyle.searchSection}>
        <TextInput
          style={Rent_periodStyle.input}
          placeholder="Search for a rent period"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={filteredPeriods}
        renderItem={renderPeriodCard}
        keyExtractor={(item, index) => `period-${index}`}
      />
    </View>
  );
};
const Rent_periodStyle = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 70, // Adjusted padding at the top for more space
    backgroundColor: "#fff",
  },
  title: {
    // Style for the title
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15, // Space before the list starts
    color: COLORS.primary, //
  },
  item: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    marginBottom: 20, // Consistent margin at the bottom of each item
  },
  itemText: {
    fontSize: 16,
    color: "black",
  },

  input: {
    flex: 1,
    height: 40,
    textAlign: "center",
    backgroundColor: "#fff",
  },
});

const KeyFeaturesScreen = ({ navigation }) => {
  const [features, setFeatures] = useState(
    DATA[0].keyFeatures.map((feature) => ({ name: feature, selected: false }))
  );
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFeature = (index) => {
    const newFeatures = [...features];
    newFeatures[index].selected = !newFeatures[index].selected;
    setFeatures(newFeatures);
  };

  const filteredFeatures = features.filter((feature) =>
    feature.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateToNext = () => {
    // Filter out only selected features to pass to the next screen
    const selectedFeatures = features
      .filter((feature) => feature.selected)
      .map((feature) => feature.name);
    navigation.navigate("AdditionalBenefitsScreen", { selectedFeatures });
    console.log(selectedFeatures);
  };

  const renderFeature = ({ item, index }) => (
    <View style={featuresStyle.item}>
      <Text style={featuresStyle.itemText}>{item.name}</Text>
      <Switch
        trackColor={{ false: "#767577", true: COLORS.primary }}
        thumbColor={item.selected ? "#ffff" : "#f4f3f4"}
        onValueChange={() => toggleFeature(index)}
        value={item.selected}
      />
    </View>
  );

  return (
    <View style={featuresStyle.container}>
      <Text style={featuresStyle.title}>Select Key Features</Text>
      <View style={featuresStyle.searchSection}>
        <TextInput
          style={featuresStyle.input}
          placeholder="Search for features"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={filteredFeatures}
        renderItem={renderFeature}
        keyExtractor={(item, index) => `feature-${index}`}
      />
      <TouchableOpacity
        style={featuresStyle.bottomButton}
        onPress={navigateToNext}
      >
        <Text style={featuresStyle.bottomButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
const featuresStyle = StyleSheet.create({
  bottomButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 70, // Adjusted padding at the top for more space
    backgroundColor: "#fff",
  },
  title: {
    // Style for the title
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15, // Space before the list starts
    color: COLORS.primary, //
  },
  item: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    marginBottom: 20, // Consistent margin at the bottom of each item
  },
  itemText: {
    fontSize: 16,
    color: "black",
  },

  input: {
    flex: 1,
    height: 40,
    textAlign: "center",
    backgroundColor: "#fff",
  },
});

const AdditionalBenefitsScreen = ({ navigation }) => {
  const [benefits, setBenefits] = useState(
    DATA[0].additionalBenefits.map((benefit) => ({
      name: benefit,
      selected: false,
    }))
  );
  const [searchQuery, setSearchQuery] = useState("");

  const toggleBenefit = (index) => {
    const newBenefits = [...benefits];
    newBenefits[index].selected = !newBenefits[index].selected;
    setBenefits(newBenefits);
  };

  const filteredBenefits = benefits.filter((benefit) =>
    benefit.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateToNext = () => {
    // Filter out only selected benefits to pass to the next screen
    const selectedBenefits = benefits
      .filter((benefit) => benefit.selected)
      .map((benefit) => benefit.name);
    navigation.navigate("NearbyLocationsScreen", { selectedBenefits });
    console.log(selectedBenefits);
  };

  const renderBenefit = ({ item, index }) => (
    <View style={abStyle.item}>
      <Text style={abStyle.itemText}>{item.name}</Text>
      <Switch
        trackColor={{ false: "#767577", true: COLORS.primary }}
        thumbColor={item.selected ? "#ffff" : "#f4f3f4"}
        onValueChange={() => toggleBenefit(index)}
        value={item.selected}
      />
    </View>
  );

  return (
    <View style={abStyle.container}>
      <Text style={abStyle.title}>Select Additional Benefits</Text>
      <View style={abStyle.searchSection}>
        <TextInput
          style={abStyle.input}
          placeholder="Search for benefits"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={filteredBenefits}
        renderItem={renderBenefit}
        keyExtractor={(item, index) => `benefit-${index}`}
      />
      <TouchableOpacity
        style={featuresStyle.bottomButton}
        onPress={navigateToNext}
      >
        <Text style={featuresStyle.bottomButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const abStyle = StyleSheet.create({
  bottomButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 70, // Adjusted padding at the top for more space
    backgroundColor: "#fff",
  },
  title: {
    // Style for the title
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15, // Space before the list starts
    color: COLORS.primary, //
  },
  item: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    marginBottom: 20, // Consistent margin at the bottom of each item
  },
  itemText: {
    fontSize: 16,
    color: "black",
  },

  input: {
    flex: 1,
    height: 40,
    textAlign: "center",
    backgroundColor: "#fff",
  },
});

const NearbyLocationsScreen = ({ navigation }) => {
  const [locations, setLocations] = useState(
    DATA[0].nearbyLocations.map((location) => ({
      name: location,
      selected: false,
    }))
  );
  const [searchQuery, setSearchQuery] = useState("");

  const toggleLocation = (index) => {
    const newLocations = [...locations];
    newLocations[index].selected = !newLocations[index].selected;
    setLocations(newLocations);
  };

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateToNext = () => {
    // Filter out only selected locations to pass to the next screen
    const selectedLocations = locations
      .filter((location) => location.selected)
      .map((location) => location.name);
    navigation.navigate("ApartmentOrientationScreen", { selectedLocations });
  };

  const renderLocation = ({ item, index }) => (
    <View style={abStyle.item}>
      <Text style={abStyle.itemText}>{item.name}</Text>
      <Switch
        trackColor={{ false: "#767577", true: COLORS.primary }}
        thumbColor={item.selected ? "#ffff" : "#f4f3f4"}
        onValueChange={() => toggleLocation(index)}
        value={item.selected}
      />
    </View>
  );

  return (
    <View style={abStyle.container}>
      <Text style={abStyle.title}>Select Nearby Locations</Text>
      <View style={abStyle.searchSection}>
        <TextInput
          style={abStyle.input}
          placeholder="Search for locations"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={filteredLocations}
        renderItem={renderLocation}
        keyExtractor={(item, index) => `location-${index}`}
      />
      <TouchableOpacity style={abStyle.bottomButton} onPress={navigateToNext}>
        <Text style={abStyle.bottomButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
const ApartmentOrientationScreen = ({ navigation }) => {
  const [orientations, setOrientations] = useState(
    DATA[0].orientations.map((orientation) => ({
      name: orientation,
      selected: false,
    }))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [allDisabled, setAllDisabled] = useState(false);

  const toggleOrientation = (index) => {
    const newOrientations = [...orientations];
    newOrientations[index].selected = !newOrientations[index].selected;
    if (newOrientations[index].selected) {
      newOrientations.forEach((orientation, i) => {
        if (i !== index) {
          orientation.selected = false;
        }
      });
    }
    setOrientations(newOrientations);
    setAllDisabled(newOrientations.some((orientation) => orientation.selected));
  };

  const navigateToNext = () => {
    // Filter out only selected orientations to pass to the next screen
    const selectedOrientations = orientations
      .filter((orientation) => orientation.selected)
      .map((orientation) => orientation.name);
    navigation.navigate("AdvertisementDetailsScreen", { selectedOrientations });
  };

  const renderOrientation = ({ item, index }) => (
    <View style={abStyle.item}>
      <Text style={abStyle.itemText}>{item.name}</Text>
      <Switch
        trackColor={{ false: "#767577", true: COLORS.primary }}
        thumbColor={item.selected ? "#ffff" : "#f4f3f4"}
        onValueChange={() => toggleOrientation(index)}
        value={item.selected}
        disabled={allDisabled && !item.selected}
      />
    </View>
  );

  const filteredOrientations = orientations.filter((orientation) =>
    orientation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={abStyle.container}>
      <Text style={abStyle.title}>Select Apartment Orientations</Text>
      <View style={abStyle.searchSection}>
        <TextInput
          style={abStyle.input}
          placeholder="Search for orientations"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={filteredOrientations}
        renderItem={renderOrientation}
        keyExtractor={(item, index) => `orientation-${index}`}
      />
      <TouchableOpacity style={abStyle.bottomButton} onPress={navigateToNext}>
        <Text style={abStyle.bottomButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
const AdvertisementDetailsScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigateToNext = () => {
    navigation.navigate("WhatPriceScreen", { title, description });
    console.log("title : ", title);
    console.log("description : ", description);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={styles11.container}>
          <Text style={styles11.title}>
            What are the details of the advertisement?
          </Text>
          <Text style={styles11.subtitle}>
            Details increase your chance of getting a suitable tenant
          </Text>

          <View style={styles11.inputContainer}>
            <Text style={styles11.label}>Title:</Text>
            <TextInput
              style={styles11.input}
              placeholder="Example (Furnished Apartment)"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles11.inputContainer}>
            <Text style={styles11.label}>Description:</Text>
            <TextInput
              style={[styles11.input, { height: 150 }]}
              placeholder="Enter your advertisement description"
              multiline={true}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <TouchableOpacity
            style={styles11.bottomButton}
            onPress={navigateToNext}
          >
            <Text style={styles11.bottomButtonText}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
const styles11 = {
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.primary,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "gray",
    marginLeft: 10,
    marginBottom: 20,
  },

  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  bottomButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: 18,
  },
};

const WhatPriceScreen = ({ navigation }) => {
  const [price, setPrice] = React.useState("");

  const navigateToNext = () => {
    // Navigate to the next screen or perform any other action
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles12.container}>
        <Text style={styles12.title}>What Price?</Text>

        <View style={styles12.subtitleContainer}>
          <AntDesign
            name="checkcircleo"
            size={24}
            color={COLORS.primary}
            style={styles12.icon}
          />
          <Text style={[styles12.subtitle, { color: "black" }]}>
            Add a realistic price to get more views
          </Text>
        </View>

        <View style={styles12.subtitleContainer}>
          <AntDesign
            name="checkcircleo"
            size={24}
            color={COLORS.primary}
            style={styles12.icon}
          />
          <Text style={[styles12.subtitle, { color: "black" }]}>
            Make sure to add the full price (example: 100,000)
          </Text>
        </View>

        <View style={styles12.subtitleContainer}>
          <AntDesign
            name="checkcircleo"
            size={24}
            color={COLORS.primary}
            style={styles12.icon}
          />
          <Text style={[styles12.subtitle, { color: "black" }]}>
            Make sure you do not enter the down payment as the price
          </Text>
        </View>

        <Text style={[styles12.label, { marginTop: 20 }]}>Price:</Text>
        <TextInput
          style={styles12.input}
          placeholder="Add the right price"
          keyboardType="numeric"
          onChangeText={(text) => setPrice(text)}
          value={price}
        />

        <TouchableOpacity
          style={styles12.bottomButton}
          onPress={navigateToNext}
        >
          <Text style={styles12.bottomButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles12 = {
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: COLORS.primary,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  bottomButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: 18,
  },
};

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
                options={{ headerShown: false }}
              />
              <SettingsStack.Screen
                name="Detail1"
                component={DetailsScreen1}
                options={{ headerShown: false }}
              />
              <SettingsStack.Screen
                name="Detail2"
                component={DetailsScreen2}
                options={{ headerShown: false }}
              />
              <SettingsStack.Screen
                name="Detail3"
                component={DetailsScreen3}
                options={{ headerShown: false }}
              />
              <SettingsStack.Screen
                name="Details4"
                component={DetailsScreen4}
                options={{ headerShown: false }}
              />
              <SettingsStack.Screen
                name="AreaDetailsScreen"
                component={AreaDetailsScreen}
                options={{ headerShown: false }}
              />
              <SettingsStack.Screen
                name="NumberOfRoomsScreen"
                component={NumberOfRoomsScreen}
                options={{ headerShown: false }}
              />
              <SettingsStack.Screen
                name="NumberOfBathroomsScreen"
                component={NumberOfBathroomsScreen}
                options={{ headerShown: false }}
              />
              <SettingsStack.Screen
                name="RoomState"
                component={RoomState}
                options={{ headerShown: false }}
              />
              <SettingsStack.Screen
                name="BuildingArea"
                component={BuildingArea}
                options={{ headerShown: false }}
              />
              <SettingsStack.Screen
                name="ApartmentFloor"
                component={ApartmentFloor}
                options={{ headerShown: false }}
              />
              <SettingsStack.Screen
                name="BuildingAge"
                component={BuildingAge}
                options={{ headerShown: false }}
              />
              <SettingsStack.Screen
                name="Rent_period"
                component={Rent_period}
                options={{ headerShown: false }}
              />
              <SettingsStack.Screen
                name="KeyFeaturesScreen "
                component={KeyFeaturesScreen}
                options={{ headerShown: false }}
              />
              <SettingsStack.Screen
                name="AdditionalBenefitsScreen"
                component={AdditionalBenefitsScreen}
                options={{ headerShown: false }}
              />
              <SettingsStack.Screen
                name="NearbyLocationsScreen"
                component={NearbyLocationsScreen}
                options={{ headerShown: false }}
              />
              <SettingsStack.Screen
                name="ApartmentOrientationScreen"
                component={ApartmentOrientationScreen}
                options={{ headerShown: false }}
              />
              <SettingsStack.Screen
                name="AdvertisementDetailsScreen"
                component={AdvertisementDetailsScreen}
                options={{ headerShown: false }}
              />
              <SettingsStack.Screen
                name="WhatPriceScreen"
                component={WhatPriceScreen}
                options={{ headerShown: false }}
              />
            </SettingsStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
