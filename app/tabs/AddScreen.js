import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LogBox } from "react-native";
import * as ImageManipulator from 'expo-image-manipulator';

import {
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
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { COLORS, getStoredBoolValue } from "../../assets/theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();
import Octicons from "react-native-vector-icons/Octicons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { getValueFor, urlPath } from "../lib";
import Toast from "react-native-toast-message";

import {
  sttyles,
  styles11,
  styles12,
  styles2,
  styles,
  styles1,
} from "./AddScreenStyles";
import {
  lessons,
  nearbyLocations,
  propertyFeatures,
  provinces,
  regions,
  items,
} from "./data";
import { useFocusEffect } from "@react-navigation/native";

LogBox.ignoreAllLogs();
const SelectedValues = [
  {
    images: [],
    adsubtype: [],
    addescription: [],
    adtitle: [],
    adprice: [],
    Province: [],
    Region: [],
    FeatureLabels: [],
    NearbyLocationLabels: [],
    floor: [],
    numberOfRooms: [],
    numberOfBathrooms: [],
    buildingAge: [],
    PropertyArea: [],
  },
];

const DetailsScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  console.log(SelectedValues[0].adtitle);
  useFocusEffect(
    React.useCallback(() => {
      const result = getStoredBoolValue();
      const darkMode = result.storedBoolValue;
      setDarkMode(darkMode);
    }, [])
  );
  const handlePress = (address) => {
    navigation.push("Detail1", { address: address }); // Pass the address as a parameter
  };

  return (
    <View style={styles(darkMode).container}>
      <SafeAreaView style={styles(darkMode).safeArea}>
        <ScrollView contentContainerStyle={styles(darkMode).scrollViewContent}>
          <Text style={styles(darkMode).title}>
            What would you like to advertise?
          </Text>
          <Text style={styles(darkMode).subtitle}>
            Choose the appropriate section to add the advertisement
          </Text>
          {items.map(({ img, address }, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles(darkMode).card,
                index === 0 && { borderTopWidth: 2 },
              ]}
              onPress={() => handlePress(address)}
            >
              <Image
                source={{ uri: img }}
                style={styles(darkMode).cardImg}
                resizeMode="cover"
              />
              <View style={styles(darkMode).cardContent}>
                <Text style={styles(darkMode).cardTitle}>{address}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const ListItems = ({ title, onPress, darkMode }) => (
  <TouchableOpacity onPress={onPress} style={styles1(darkMode).item}>
    <AntDesign
      name="arrowright"
      size={20}
      color={darkMode ? COLORS.textDark : "black"}
    />
    <Text style={styles1(darkMode).title}>{title}</Text>
  </TouchableOpacity>
);
const DetailsScreen1 = () => {
  const [darkMode, setDarkMode] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const result = getStoredBoolValue();
      const darkMode = result.storedBoolValue;
      setDarkMode(darkMode);
    }, [])
  );
  const navigation = useNavigation();
  const route = useRoute();
  const { address } = route.params;

  const handlePress = (item) => {
    const selectedName =
      address === "Apartments for Rent" ? item.name : item.name2;
    SelectedValues[0].adsubtype = selectedName;

    navigation.navigate("detaillscreen");
  };

  const renderItem = ({ item }) => (
    <ListItems
      title={address === "Apartments for Rent" ? item.name : item.name2}
      onPress={() => handlePress(item)}
    />
  );

  return (
    <View style={styles1(darkMode).container}>
      <Text style={styles1(darkMode).screenTitle}>Choose the ad type</Text>
      <FlatList
        data={lessons}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const Detailss = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const result = getStoredBoolValue();
      const darkMode = result.storedBoolValue;
      setDarkMode(darkMode);
    }, [])
  );
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedNearbyLocations, setSelectedNearbyLocations] = useState([]);
  const [province, setProvince] = useState(null);
  const [region, setRegion] = useState(null);
  const [isProvinceFocus, setIsProvinceFocus] = useState(false);
  const [isRegionFocus, setIsRegionFocus] = useState(false);
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [numberOfBathrooms, setNumberOfBathrooms] = useState("");
  const [buildingAge, setBuildingAge] = useState("");
  const [floor, setFloor] = useState("");
  const [PropertyArea, setPropertyArea] = useState("");

  const handleNumberOfRooms = (input = "") => {
    const numericValue = input.replace(/[^0-9]/g, "");
    setNumberOfRooms(numericValue);
  };
  const handlePropertyArea = (input = "") => {
    const numericValue = input.replace(/[^0-9]/g, "");
    setPropertyArea(numericValue);
  };
  const handleFloor = (input = "") => {
    const numericValue = input.replace(/[^0-9]/g, "");
    setFloor(numericValue);
  };
  const handleBuildingAge = (input = "") => {
    const numericValue = input.replace(/[^0-9]/g, "");
    setBuildingAge(numericValue);
  };
  const handleNumberOfBathrooms = (input = "") => {
    const numericValue = input.replace(/[^0-9]/g, "");
    setNumberOfBathrooms(numericValue);
  };

  const handleNext = () => {
    if (
      !province ||
      !region ||
      selectedFeatures.length === 0 ||
      selectedNearbyLocations.length === 0 ||
      floor == 0 ||
      numberOfBathrooms == 0 ||
      numberOfRooms == 0 ||
      buildingAge == 0 ||
      PropertyArea == 0
    ) {
      Alert.alert(
        "Error",
        "Please select a province, a region, at least one property feature, and at least one nearby location."
      );
      return;
    }

    const selectedProvince = provinces.find(
      (item) => item.value === province
    ).label;
    const selectedRegion = regions[province].find(
      (item) => item.value === region
    ).label;
    const selectedFeatureLabels = selectedFeatures
      .map(
        (item) =>
          propertyFeatures.find((feature) => feature.value === item).label
      )
      .join(", ");
    const selectedNearbyLocationLabels = selectedNearbyLocations
      .map(
        (item) =>
          nearbyLocations.find((location) => location.value === item).label
      )
      .join(", ");

    SelectedValues[0].Province = selectedProvince;
    SelectedValues[0].PropertyArea = PropertyArea;
    SelectedValues[0].Region = selectedRegion;
    SelectedValues[0].numberOfRooms = numberOfRooms;
    SelectedValues[0].numberOfBathrooms = numberOfBathrooms;
    SelectedValues[0].buildingAge = buildingAge;
    SelectedValues[0].floor = floor;
    SelectedValues[0].FeatureLabels = selectedFeatureLabels;
    SelectedValues[0].NearbyLocationLabels = selectedNearbyLocationLabels;
    navigation.navigate("AdvertisementDetailsScreen");
  };

  return (
    <TouchableWithoutFeedback onPress={sttyles(darkMode).dismiss}>
      <KeyboardAwareScrollView
        contentContainerStyle={sttyles(darkMode).container}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar barStyle={"ligh-content"} />
        <Text style={sttyles(darkMode).title}>Property Selection</Text>
        <View style={sttyles(darkMode).card}>
          <Dropdown
            style={[
              sttyles(darkMode).dropdown,
              isProvinceFocus && { borderColor: "gray" },
            ]}
            placeholderStyle={sttyles(darkMode).placeholderStyle}
            selectedTextStyle={sttyles(darkMode).selectedTextStyle}
            inputSearchStyle={sttyles(darkMode).inputSearchStyle}
            data={provinces}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isProvinceFocus ? "Select Province" : "..."}
            searchPlaceholder="Search..."
            value={province}
            onFocus={() => setIsProvinceFocus(true)}
            onBlur={() => setIsProvinceFocus(false)}
            onChange={(item) => {
              setProvince(item.value);
              setRegion(null);
              setIsProvinceFocus(false);
            }}
          />
          {province && (
            <Dropdown
              style={[
                sttyles(darkMode).dropdown,
                isRegionFocus && { borderColor: "gray" },
              ]}
              placeholderStyle={sttyles(darkMode).placeholderStyle}
              selectedTextStyle={sttyles(darkMode).selectedTextStyle}
              inputSearchStyle={sttyles(darkMode).inputSearchStyle}
              iconStyle={sttyles(darkMode).iconStyle}
              data={regions[province]}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isRegionFocus ? "Select Region" : "..."}
              searchPlaceholder="Search..."
              value={region}
              onFocus={() => setIsRegionFocus(true)}
              onBlur={() => setIsRegionFocus(false)}
              onChange={(item) => {
                setRegion(item.value);
                setIsRegionFocus(false);
              }}
            />
          )}

          {region && (
            <MultiSelect
              style={sttyles(darkMode).Selected}
              placeholderStyle={sttyles(darkMode).placeholderStyle}
              selectedTextStyle={sttyles(darkMode).selectedTextStyle}
              inputSearchStyle={sttyles(darkMode).inputSearchStyle}
              iconStyle={sttyles(darkMode).iconStyle}
              search
              data={propertyFeatures}
              labelField="label"
              valueField="value"
              placeholder="Property Features"
              searchPlaceholder="Search..."
              value={selectedFeatures}
              onChange={(item) => {
                setSelectedFeatures(item);
              }}
              selectedStyle={sttyles(darkMode).selectedStyle}
            />
          )}
          {region && (
            <MultiSelect
              style={sttyles(darkMode).Selected}
              placeholderStyle={sttyles(darkMode).placeholderStyle}
              selectedTextStyle={sttyles(darkMode).selectedTextStyle}
              inputSearchStyle={sttyles(darkMode).inputSearchStyle}
              iconStyle={sttyles(darkMode).iconStyle}
              search
              data={nearbyLocations}
              labelField="label"
              valueField="value"
              placeholder="Nearby Locations"
              searchPlaceholder="Search..."
              value={selectedNearbyLocations}
              onChange={(item) => {
                setSelectedNearbyLocations(item);
              }}
              selectedStyle={sttyles.selectedStyle}
            />
          )}
          <TextInput
            style={sttyles(darkMode).input}
            value={floor}
            onChangeText={(input = "") => handleFloor(input)}
            keyboardType="numeric"
            maxLength={3}
            placeholder="Floor"
            placeholderTextColor="#686D76"
          />
          <TextInput
            style={sttyles(darkMode).input}
            value={numberOfRooms}
            onChangeText={(input = "") => handleNumberOfRooms(input)}
            keyboardType="numeric"
            maxLength={2}
            placeholder="Number of Rooms"
            placeholderTextColor="#686D76"
          />
          <TextInput
            style={sttyles(darkMode).input}
            value={numberOfBathrooms}
            onChangeText={(input = "") => handleNumberOfBathrooms(input)}
            keyboardType="numeric"
            maxLength={3}
            placeholder="Number of Bathrooms"
            placeholderTextColor="#686D76"
          />
          <TextInput
            style={sttyles(darkMode).input}
            value={buildingAge}
            onChangeText={(input = "") => handleBuildingAge(input)}
            keyboardType="numeric"
            maxLength={3}
            placeholder="Property Age ( Years )"
            placeholderTextColor="#686D76"
          />
          <TextInput
            style={sttyles(darkMode).input}
            value={PropertyArea}
            onChangeText={(input = "") => handlePropertyArea(input)}
            keyboardType="numeric"
            maxLength={3}
            placeholder="Property Area ( m² )"
            placeholderTextColor="#686D76"
          />
          <TouchableOpacity
            style={sttyles(darkMode).button}
            onPress={handleNext}
          >
            <Text style={sttyles(darkMode).buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const DetailsScreen2 = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const result = getStoredBoolValue();
      const darkMode = result.storedBoolValue;
      setDarkMode(darkMode);
    }, [])
  );

  const initialPhotos = new Array(12).fill(null);
  const [photos, setPhotos] = useState(initialPhotos);

  useEffect(() => {
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
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    console.log("ImagePicker result:", result);
  
    if (!result.cancelled) {
      // If images are selected, update the photo array
      const newPhotos = [...photos];
      const selectedAssets = result.assets.slice(0, 12);
  
      for (let i = 0; i < selectedAssets.length; i++) {
        const asset = selectedAssets[i];
        let resizedUri = asset.uri;
  
        try {
          const manipResult = await ImageManipulator.manipulateAsync(
            asset.uri,
            [], 
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
          );
        
          resizedUri = manipResult.uri;
        } catch (e) {
          console.log("Image resizing error:", e);
        }
        
  
        if (index + i < 12) {
          newPhotos[index + i] = resizedUri;
        }
      }
  
      setPhotos(newPhotos);
  
    
      const selectedUris = selectedAssets.map((asset) => asset.uri);
      SelectedValues[0].images = selectedUris;
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={
        index === 0
          ? styles2(darkMode).firstPhotoBox
          : styles2(darkMode).photoBox
      }
      onPress={() => handleImagePress(index)}
    >
      {item ? (
        <Image
          source={{ uri: item }}
          style={[styles2(darkMode).photo, { resizeMode: "cover" }]}
        />
      ) : (
        <View
          style={
            index === 0
              ? styles2(darkMode).firstAddIconBox
              : styles2(darkMode).addIconBox
          }
        >
          <AntDesign name="pluscircleo" size={24} color={COLORS.primary2} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles2(darkMode).container}>
      <Text style={styles2(darkMode).title}>Add pictures to the advertise</Text>
      <View style={styles2(darkMode).dashedBox}>
        <Text style={styles2(darkMode).dashedBoxText}>
          <Octicons name="dot-fill" size={14} color={COLORS.primary} /> Up to 12
          photos can be added
        </Text>
        <Text style={styles2(darkMode).dashedBoxText}>
          <Octicons name="dot-fill" size={14} color={COLORS.primary} /> Pictures
          increase the number of views
        </Text>
        <Text style={styles2(darkMode).dashedBoxText}>
          <Octicons name="dot-fill" size={14} color={COLORS.primary} /> Hint:
          You can rearrange photos by dragging them from one place to another
        </Text>
      </View>

      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        columnWrapperStyle={styles2(darkMode).row}
      />

      <TouchableOpacity
        style={styles2(darkMode).bottomButton}
        onPress={() => {
          navigation.push("WhatPriceScreen", { photos: photos });
        }}
      >
        <Text style={styles2(darkMode).bottomButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const AdvertisementDetailsScreen = ({ navigation }) => {
  const result = getStoredBoolValue();
  const darkMode = result.storedBoolValue;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigateToNext = () => {
    navigation.navigate("Detail2", {
      title,
      description,
    });
    SelectedValues[0].adtitle = title;
    SelectedValues[0].addescription = description;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={styles11(darkMode).container}>
          <Text style={styles11(darkMode).title}>
            What are the details of the advertisement?
          </Text>
          <Text style={styles11(darkMode).subtitle}>
            Details increase your chance of getting a suitable tenant
          </Text>
          <View style={styles11(darkMode).inputContainer}>
            <Text style={styles11(darkMode).label}>Title:</Text>
            <TextInput
              style={styles11(darkMode).input}
              placeholder="Example (Furnished Apartment)"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles11(darkMode).inputContainer}>
            <Text style={styles11(darkMode).label}>Description:</Text>
            <TextInput
              style={[styles11(darkMode).input, { height: 150 }]}
              placeholder="Enter your advertisement description"
              multiline={true}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <TouchableOpacity
            style={styles11(darkMode).bottomButton}
            onPress={navigateToNext}
          >
            <Text style={styles11(darkMode).bottomButtonText}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const showToast = () => {
  Toast.show({
    type: "error",
    text1: "Warning",
    text2: "Please enter all required data before posting.",
    autoHide: true,
    visibilityTime: 1000,
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
  const result = getStoredBoolValue();
  const darkMode = result.storedBoolValue;
  const [price, setPrice] = useState("");
  const { photos } = route.params;

  const navigateToNext = () => {
    const makeitEmpty = (SelectedValues) => {
      if (Array.isArray(SelectedValues) && SelectedValues.length > 0) {
        const obj = SelectedValues[0];
        for (const key in obj) {
          if (Array.isArray(obj[key])) {
            obj[key] = [];
          }
        }
      }
    };
    const resetToFirstScreen = (navigation) => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Details" }], // Replace 'Details' with the name of your first screen
      });
    };

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
            console.log("---", typeof SelectedValues[0].NearbyLocationLabels);
            console.log(SelectedValues[0].NearbyLocationLabels);
            var nearbyLocationLabels = SelectedValues[0].NearbyLocationLabels;
            var nearbylocation = nearbyLocationLabels
              .split(/,\s+/)
              .map(function (label) {
                return label.trim();
              });
            console.log(nearbylocation);
            var FeatureLabels = SelectedValues[0].FeatureLabels;
            var FeatureLabelss = FeatureLabels.split(/,\s+/).map(function (
              label
            ) {
              return label.trim();
            });

            SelectedValues[0].adprice = price;
            const handleSavePost = async () => {
              console.log(
                SelectedValues[0].NearbyLocationLabels,
                SelectedValues[0].Province,
                SelectedValues[0].PropertyArea,
                SelectedValues[0].Region,
                SelectedValues[0].numberOfRooms,
                SelectedValues[0].numberOfBathrooms,
                SelectedValues[0].buildingAge,
                SelectedValues[0].floor,
                SelectedValues[0].FeatureLabels
              );
              if (
                !SelectedValues[0].adtitle //&&
                // !SelectedValues[0].addescription &&
                // !SelectedValues[0].adprice &&
                // !SelectedValues[0].NearbyLocationLabels &&
                // !SelectedValues[0].Province &&
                // !SelectedValues[0].PropertyArea &&
                // !SelectedValues[0].Region &&
                // !SelectedValues[0].numberOfRooms &&
                // !SelectedValues[0].numberOfBathrooms &&
                // !SelectedValues[0].buildingAge &&
                // !SelectedValues[0].floor &&
                // !SelectedValues[0].FeatureLabels
              ) {
                showToast();
                return;
              }
              const url = urlPath + "/property";
              const token = await getValueFor("token");

              let data = JSON.stringify({
                name: SelectedValues[0].adtitle,
                description: SelectedValues[0].addescription,
                price: SelectedValues[0].adprice,
                features: FeatureLabelss,
                nearbyLocations: nearbylocation,
                province: SelectedValues[0].Province,
                region: SelectedValues[0].Region,
                numberOfRooms: SelectedValues[0].numberOfRooms,
                numberOfBathrooms: SelectedValues[0].numberOfBathrooms,
                buildingAge: SelectedValues[0].buildingAge,
                floor: SelectedValues[0].floor,
                propertyArea: SelectedValues[0].PropertyArea,
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
              console.log("fffffffffffffffffffffffffff", data);
              await axios
                .request(config)
                .then((response) => {
                  console.log(JSON.stringify(response.data));
                  console.log(JSON.stringify("ID For Property"));
                  console.log(JSON.stringify(response.data.id));
                  handleAddImageToPost(response.data.id);
                  makeitEmpty(SelectedValues);
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
            makeitEmpty();
            resetToFirstScreen(navigation);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles12(darkMode).container}>
        <Text style={styles12(darkMode).title}>What Price?</Text>

        <View style={styles12(darkMode).subtitleContainer}>
          <AntDesign
            name="checkcircleo"
            size={24}
            color={COLORS.primary}
            style={styles12(darkMode).icon}
          />
          <Text style={styles12(darkMode).subtitle}>
            Add a realistic price to get more views
          </Text>
        </View>

        <View style={styles12(darkMode).subtitleContainer}>
          <AntDesign
            name="checkcircleo"
            size={24}
            color={COLORS.primary}
            style={styles12(darkMode).icon}
          />
          <Text style={styles12(darkMode).subtitle}>
            Make sure to add the full price (example: 100,000)
          </Text>
        </View>

        <View style={styles12(darkMode).subtitleContainer}>
          <AntDesign
            name="checkcircleo"
            size={24}
            color={COLORS.primary}
            style={styles12(darkMode).icon}
          />
          <Text style={styles12(darkMode).subtitle}>
            Make sure you do not enter the down payment as the price
          </Text>
        </View>

        <Text style={[styles12(darkMode).label, { marginTop: 20 }]}>
          Price:
        </Text>
        <TextInput
          style={styles12(darkMode).input}
          placeholder="Add the right price"
          keyboardType="numeric"
          onChangeText={(text) => setPrice(text)}
          value={price}
        />

        {/* Post button */}
        <TouchableOpacity
          style={styles12(darkMode).bottomButton}
          onPress={navigateToNext}
        >
          <Text style={styles12(darkMode).bottomButtonText}>Post</Text>
        </TouchableOpacity>
        <Toast />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function Add() {
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

              <SettingsStack.Screen
                name="detaillscreen"
                component={Detailss}
                options={{ headerShown: false }}
              />
            </SettingsStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
