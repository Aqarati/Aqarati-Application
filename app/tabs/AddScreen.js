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
  Alert,
} from "react-native";
import { COLORS } from "../../assets/theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();
import Octicons from "react-native-vector-icons/Octicons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { getValueFor, urlPath } from "../lib";
import Toast from "react-native-toast-message";
const selectedDATA = [
  {
    adtype: [],
    adsubtype: [],
    photos: [],
    rel: [],
    city: [],
    areas: [],
    rooms: [],
    bathrooms: [],
    roomstate: [],
    buildingarea: [],
    buildingfloor: [],
    buildingage: [],
    buildingrentperiod: [],
    buildingkeyFeatures: [],
    buildingadditionalBenefits: [],
    buildingnearbyLocations: [],
    buildingorientations: [],
    adtitle: [],
    addescription: [],
    adprice: [],
    images: [],
  },
];
const items = [
  {
    img: "https://images.pexels.com/photos/425343/pexels-photo-425343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    address: "Apartments for Rent",
  },
  {
    img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    address: "Houses for Rent",
  },
];

const DetailsScreen = ({ navigation }) => {
  const handlePress = (address) => {
    navigation.push("Detail1", { address: address }); // Pass the address as a parameter
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.title}>What would you like to advertise?</Text>
          <Text style={styles.subtitle}>
            Choose the appropriate section to add the advertisement
          </Text>
          {items.map(({ img, address }, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, index === 0 && { borderTopWidth: 2 }]}
              onPress={() => handlePress(address)}
            >
              <Image
                source={{ uri: img }}
                style={styles.cardImg}
                resizeMode="cover"
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{address}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.primary,
    marginTop: 30,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: COLORS.grey,
    textAlign: "center",
  },
  card: {
    borderRadius: 12,
    borderColor: COLORS.grey,
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 5,
  },
  cardImg: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
  },
});

const lessons = [
  {
    name: "Apartments for Rent",
    name2: "Home for rent",
  },
  {
    name: "Apartments for sale",
    name2: "Home for sale",
  },
  {
    name: "Hotel apartments and suites",
    name2: "Home suitable for rent",
  },
  {
    name: "Student apartments",
    name2: "Student Home for rent",
  },
  {
    name: "Apartments for sale",
    name2: "Home suitable for sale",
  },
];

const ListItems = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles1.item}>
    <AntDesign name="arrowright" size={20} color="black" />
    <Text style={styles1.title}>{title}</Text>
  </TouchableOpacity>
);

const DetailsScreen1 = () => {
  const navigation = useNavigation(); // Get navigation object using useNavigation hook
  const route = useRoute(); // Get route object using useRoute hook
  const { address } = route.params; // Extract address from route params

  const handlePress = (item) => {
    const selectedName =
      address === "Apartments for Rent" ? item.name : item.name2;
    selectedDATA[0].adsubtype = selectedName;
    console.log(selectedDATA[0].adsubtype);
    navigation.navigate("AdvertisementDetailsScreen", { selectedItem: item });
  };

  const renderItem = ({ item }) => (
    <ListItems
      title={address === "Apartments for Rent" ? item.name : item.name2}
      onPress={() => handlePress(item)}
    />
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

const DetailsScreen2 = ({ navigation }) => {
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
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("ImagePicker result:", result);

    if (!result.canceled) {
      // If images are selected, update the photo array
      const newPhotos = [...photos];
      const selectedUris = result.assets.slice(0, 12).map((asset) => asset.uri);
      selectedUris.forEach((uri, idx) => {
        if (index + idx < 12) {
          newPhotos[index + idx] = uri;
        }
      });
      setPhotos(newPhotos);

      // Update selectedDATA with the selected image URIs
      selectedDATA[0].images = selectedUris;

      console.log("Updated photos:", newPhotos);
      console.log("selectedDATA:", selectedDATA);
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
          navigation.push("WhatPriceScreen", { photos: photos });
        }}
      >
        <Text style={styles2.bottomButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    color: COLORS.primary,
    textAlign: "center",
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
    width: "95%",
  },
  dashedBoxText: {
    color: "grey",
    textAlign: "left",
    fontSize: 16,
    paddingLeft: 5,
  },
  photoBox: {
    width: "25%",
    height: 80,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  addIconBox: {
    justifyContent: "center",
    alignItems: "center",
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
    width: "25%",
    height: 80,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  firstAddIconBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: "100%",
    height: "100%",
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

const AdvertisementDetailsScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigateToNext = () => {
    navigation.navigate("Detail2", { title, description });
    selectedDATA[0].adtitle = title;
    selectedDATA[0].addescription = description;
    console.log(selectedDATA[0].adtitle);
    console.log(selectedDATA[0].addescription);
    console.log(selectedDATA);
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
const makeitEmpty = (selectedDATA) => {
  selectedDATA.forEach((item) => {
    Object.keys(item).forEach((key) => {
      item[key] = [];
    });
  });

  return selectedDATA;
};
const resetToFirstScreen = (navigation) => {
  navigation.reset({
    index: 0,
    routes: [{ name: "Details" }], // Replace 'Details' with the name of your first screen
  });
};

const showToast = () => {
  Toast.show({
    type: "error",
    text1: "Warning",
    text2: "Please enter all required data before posting.",
    autoHide: true,
    visibilityTime: 2000,
  });
};

const PostedDeniedToast = () => {
  Toast.show({
    type: "error",
    text1: "Warning",
    text2: "Your post was not Uploaded !",
    autoHide: true,
    visibilityTime: 3000, // 3 seconds
  });
};
const WhatPriceScreen = ({ navigation, route }) => {
  const [price, setPrice] = useState("");
  const { photos } = route.params;
  const navigateToNext = () => {
    const makeitEmpty = (selectedDATA) => {
      selectedDATA.forEach((item) => {
        Object.keys(item).forEach((key) => {
          item[key] = [];
        });
      });

      return selectedDATA;
    };
    const resetToFirstScreen = (navigation) => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Details" }], // Replace 'Details' with the name of your first screen
      });
    };
    // Display a confirmation modal to the user
    Alert.alert(
      "Confirm",
      "Are you sure you want to share the post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            // Handle the case when the user confirms to share the post
            selectedDATA[0].adprice = price;

            const handleSavePost = async () => {
              if (
                !selectedDATA[0].adtitle ||
                !selectedDATA[0].addescription ||
                !selectedDATA[0].adprice
              ) {
                showToast();
                return;
              }
              const url = urlPath + "/property";
              const token = await getValueFor("token");
              let data = JSON.stringify({
                name: selectedDATA[0].adtitle,
                description: selectedDATA[0].addescription,
                price: selectedDATA[0].adprice,
              });

              let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: url,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                data: data,
              };
              console.log("saving Post");
              console.log(config);
              await axios
                .request(config)
                .then((response) => {
                  console.log(JSON.stringify(response.data));
                  console.log(JSON.stringify("ID For Property"));
                  console.log(JSON.stringify(response.data.id));
                  handleAddImageToPost(response.data.id);
                  makeitEmpty(selectedDATA);
                  resetToFirstScreen(navigation);
                })
                .catch((error) => {});
            };

            const handleAddImageToPost = async (propertyId) => {
              try {
                const token = await getValueFor("token");
                const url = urlPath + "/property/image/" + propertyId;
                const filteredPhotos = photos.filter((photo) => photo !== null);

                let formData = new FormData();
                filteredPhotos.forEach((uri, index) => {
                  formData.append("images", {
                    uri: uri,
                    name: `image${index}.png`,
                    type: "image/png",
                  });
                });

                let config = {
                  method: "put",
                  url: url,
                  headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data",
                  },
                  data: formData,
                };
                console.log("config", config);

                let response = await axios(config);
                // handle success response if needed
              } catch (error) {
                PostedDeniedToast();
                console.log(error);
              }
            };

            console.log("Handling Save Post");

            await handleSavePost();
          },
        },
        {
          text: "No",
          onPress: () => {
            makeitEmpty(selectedDATA);
            resetToFirstScreen(navigation);
          },
        },
      ],
      { cancelable: false }
    );
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

        {/* Post button */}
        <TouchableOpacity
          style={styles12.bottomButton}
          onPress={navigateToNext}
        >
          <Text style={styles12.bottomButtonText}>Post</Text>
        </TouchableOpacity>
        <Toast />
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
