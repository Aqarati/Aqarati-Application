import React, { useState, useRef } from "react";
import {
  View,
  Keyboard,
  Platform,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";

import { SearchBar, Icon } from "react-native-elements";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
import { getValueFor, urlPath } from "../lib";
import { getStoredBoolValue } from "../../assets/theme";
import { useFocusEffect } from "@react-navigation/native";
import { DATA } from "./data"; // Import your data
import DropDownPicker from "react-native-dropdown-picker";
import COLORS from "../../assets/Colors/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const propertyFeatures = [
  { label: "Elevator", value: "1" },
  { label: "Parking", value: "2" },
  { label: "Gym", value: "3" },
  { label: "Pool", value: "4" },
  { label: "Garden", value: "5" },
  { label: "Security", value: "6" },
  { label: "Playground", value: "7" },
  { label: "Wi-Fi", value: "8" },
];

const nearbyLocations = [
  { label: "School", value: "1" },
  { label: "Hospital", value: "2" },
  { label: "Mall", value: "3" },
  { label: "Park", value: "4" },
  { label: "Restaurant", value: "5" },
];

const SearchScreen = () => {
  const scrollViewRef = useRef(null);

  const handleFocus = (position) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToPosition(0, position, true);
    }
  };

  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState(null);
  const [selectedBathrooms, setSelectedBathrooms] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedNearbyLocations, setSelectedNearbyLocations] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  const provinceOptions = DATA.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  const roomsOptions = ["1", "2", "3", "4", "5", "6+"].map((item) => ({
    label: item,
    value: item,
  }));

  const bathroomsOptions = ["1", "2", "3", "4", "5", "6+"].map((item) => ({
    label: item,
    value: item,
  }));
  useFocusEffect(
    React.useCallback(() => {
      const result = getStoredBoolValue();
      const darkMode = result.storedBoolValue;
      setDarkMode(darkMode);
      fetchUserPropertyDatas();
    }, [])
  );

  const updateSearch = (search) => {
    setSearch(search);
  };

  const toggleFilterModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
  };

  const handleFilterApply = () => {
    fetchUserPropertyData();
    toggleFilterModal();
  };
  const fetchUserPropertyDatas = async () => {
    try {
      console.log("Fetching property data...");

      const url = `${urlPath}/property`;
      console.log("URL: " + url);

      const token = await getValueFor("token");
      console.log("Token:", token);

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response = await axios.request(config);
      console.log("Fetched data:", response.data);

      const availableProperties = response.data.filter(
        (property) => property.propertyStatus === "AVAILABLE"
      );

      // Apply additional filters based on modal inputs
      const filteredProperties = applyModalFilters(availableProperties);

      setNoResults(filteredProperties.length === 0); // Check if no results
    } catch (error) {
      console.error("Error fetching property data:", error);
      // Optionally, handle the error state in your UI
      // Example: set an error flag or display an error message
      // setError(true);
    } finally {
      setLoading(false);
      setIsFilterModalVisible(false); // Close modal after applying filters
      clearFilterStates(); // Clear filter states
    }
  };
  const fetchUserPropertyData = async () => {
    try {
      console.log("Fetching property data...");

      const url = `${urlPath}/property`;
      console.log("URL: " + url);

      const token = await getValueFor("token");
      console.log("Token:", token);

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response = await axios.request(config);
      console.log("Fetched data:", response.data);

      const availableProperties = response.data.filter(
        (property) => property.propertyStatus === "AVAILABLE"
      );

      // Apply additional filters based on modal inputs
      const filteredProperties = applyModalFilters(availableProperties);

      setProperties(filteredProperties);
      setNoResults(filteredProperties.length === 0); // Check if no results
    } catch (error) {
      console.error("Error fetching property data:", error);
      // Optionally, handle the error state in your UI
      // Example: set an error flag or display an error message
      // setError(true);
    } finally {
      setLoading(false);
      setIsFilterModalVisible(false); // Close modal after applying filters
      clearFilterStates(); // Clear filter states
    }
  };
  const applyModalFilters = (properties) => {
    let filteredProperties = properties;

    // Filter by selected province
    if (selectedProvince) {
      filteredProperties = filteredProperties.filter(
        (property) => property.province === selectedProvince
      );
    }

    // Filter by selected number of rooms
    if (selectedRooms !== null && selectedRooms !== undefined) {
      filteredProperties = filteredProperties.filter(
        (property) =>
          property.numberOfRooms &&
          property.numberOfRooms.toString() === selectedRooms
      );
    }

    // Filter by selected number of bathrooms
    if (selectedBathrooms !== null && selectedBathrooms !== undefined) {
      filteredProperties = filteredProperties.filter(
        (property) =>
          property.numberOfBathrooms &&
          property.numberOfBathrooms.toString() === selectedBathrooms
      );
    }

    // Filter by selected features
    if (selectedFeatures.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        selectedFeatures.every(
          (feature) =>
            property.propertyFeatures &&
            property.propertyFeatures.includes(feature)
        )
      );
    }

    // Filter by selected nearby locations
    if (selectedNearbyLocations.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        selectedNearbyLocations.every(
          (location) =>
            property.nearbyLocations &&
            property.nearbyLocations.includes(location)
        )
      );
    }

    // Filter by minimum price
    if (minPrice !== "") {
      filteredProperties = filteredProperties.filter(
        (property) =>
          property.price && parseFloat(property.price) >= parseFloat(minPrice)
      );
    }

    // Filter by maximum price
    if (maxPrice !== "") {
      filteredProperties = filteredProperties.filter(
        (property) =>
          property.price && parseFloat(property.price) <= parseFloat(maxPrice)
      );
    }

    return filteredProperties;
  };

  const clearFilterStates = () => {
    // Clear filter states here
    setSelectedProvince(null);
    setSelectedRooms(null);
    setSelectedBathrooms(null);
    setSelectedFeatures([]);
    setSelectedNearbyLocations([]);
    setMinPrice("");
    setMaxPrice("");
  };

  const handleSubmit = async () => {
    if (search.trim()) {
      setLoading(true); // Set loading state to true when submitting

      let url = `${urlPath}/property/search/?keyword=${encodeURIComponent(
        search
      )}`;

      // Append price range if provided
      if (minPrice) {
        url += `&minPrice=${minPrice}`;
      }
      if (maxPrice) {
        url += `&maxPrice=${maxPrice}`;
      }

      try {
        const response = await axios.get(url);

        if (response.data.length === 0) {
          setNoResults(true);
          setProperties([]);
        } else {
          setProperties(response.data);
          setNoResults(false);
        }
      } catch (error) {
        console.error("Error fetching property data:", error);
      } finally {
        setLoading(false); // Always set loading state to false after fetch completes
        setSearch(""); // Clear search input here
      }
    } else {
      // Handle case where search input is empty (optional)
      setProperties([]);
      setNoResults(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={70} // Adjust this value if necessary
      >
        <KeyboardAwareScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles(darkMode).container}>
            <SearchBar
              placeholder="Search here..."
              onChangeText={updateSearch}
              value={search}
              containerStyle={styles(darkMode).searchContainer}
              inputContainerStyle={styles(darkMode).inputContainer}
              inputStyle={styles(darkMode).input}
              leftIconContainerStyle={styles(darkMode).leftIcon}
              rightIconContainerStyle={styles(darkMode).rightIcon}
              lightTheme
            />
            <TouchableOpacity
              style={styles(darkMode).searchButton}
              onPress={handleSubmit}
            >
              <Icon name="search" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(darkMode).filterButton}
              onPress={toggleFilterModal}
            >
              <Icon name="filter-list" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            {loading ? (
              <ActivityIndicator size="large" color="#808080" />
            ) : (
              <View style={{ marginTop: 10 }}>
                {noResults ? (
                  <Text style={styles(darkMode).noResultsText}>
                    No results found
                  </Text>
                ) : (
                  properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))
                )}
              </View>
            )}
          </View>
          <Modal visible={isFilterModalVisible} animationType="slide">
            <KeyboardAwareScrollView
              contentContainerStyle={styles(darkMode).modalContainer}
            >
              <Text style={styles(darkMode).modalTitle}>Filters</Text>
              <View
                style={[styles(darkMode).dropdownWrapper, { zIndex: 6000 }]}
              >
                <Text style={styles(darkMode).modalLabel}>Province</Text>
                <DropDownPicker
                  open={openDropdown === "province"}
                  value={selectedProvince}
                  items={provinceOptions}
                  setOpen={() =>
                    setOpenDropdown(
                      openDropdown === "province" ? null : "province"
                    )
                  }
                  setValue={setSelectedProvince}
                  setItems={() => {}}
                  style={styles(darkMode).dropdown}
                  dropDownContainerStyle={styles(darkMode).dropdownContainer}
                  zIndex={6000}
                  zIndexInverse={5000}
                />
              </View>
              <View
                style={[styles(darkMode).dropdownWrapper, { zIndex: 5000 }]}
              >
                <Text style={styles(darkMode).modalLabel}>Rooms</Text>
                <DropDownPicker
                  open={openDropdown === "rooms"}
                  value={selectedRooms}
                  items={roomsOptions}
                  setOpen={() =>
                    setOpenDropdown(openDropdown === "rooms" ? null : "rooms")
                  }
                  setValue={setSelectedRooms}
                  setItems={() => {}}
                  style={styles(darkMode).dropdown}
                  dropDownContainerStyle={styles(darkMode).dropdownContainer}
                  zIndex={5000}
                  zIndexInverse={4000}
                />
              </View>
              <View
                style={[styles(darkMode).dropdownWrapper, { zIndex: 4000 }]}
              >
                <Text style={styles(darkMode).modalLabel}>Bathrooms</Text>
                <DropDownPicker
                  open={openDropdown === "bathrooms"}
                  value={selectedBathrooms}
                  items={bathroomsOptions}
                  setOpen={() =>
                    setOpenDropdown(
                      openDropdown === "bathrooms" ? null : "bathrooms"
                    )
                  }
                  setValue={setSelectedBathrooms}
                  setItems={() => {}}
                  style={styles(darkMode).dropdown}
                  dropDownContainerStyle={styles(darkMode).dropdownContainer}
                  zIndex={4000}
                  zIndexInverse={3000}
                />
              </View>
              <View
                style={[styles(darkMode).dropdownWrapper, { zIndex: 3000 }]}
              >
                <Text style={styles(darkMode).modalLabel}>Features</Text>
                <DropDownPicker
                  open={openDropdown === "features"}
                  value={selectedFeatures}
                  items={propertyFeatures}
                  setOpen={() =>
                    setOpenDropdown(
                      openDropdown === "features" ? null : "features"
                    )
                  }
                  setValue={setSelectedFeatures}
                  setItems={() => {}}
                  multiple={true}
                  mode="BADGE"
                  style={styles(darkMode).dropdown}
                  dropDownContainerStyle={styles(darkMode).dropdownContainer}
                  zIndex={3000}
                  zIndexInverse={2000}
                />
              </View>
              <View
                style={[styles(darkMode).dropdownWrapper, { zIndex: 2000 }]}
              >
                <Text style={styles(darkMode).modalLabel}>
                  Nearby Locations
                </Text>
                <DropDownPicker
                  open={openDropdown === "nearbyLocations"}
                  value={selectedNearbyLocations}
                  items={nearbyLocations}
                  setOpen={() =>
                    setOpenDropdown(
                      openDropdown === "nearbyLocations"
                        ? null
                        : "nearbyLocations"
                    )
                  }
                  setValue={setSelectedNearbyLocations}
                  setItems={() => {}}
                  multiple={true}
                  mode="BADGE"
                  style={styles(darkMode).dropdown}
                  dropDownContainerStyle={styles(darkMode).dropdownContainer}
                  zIndex={2000}
                  zIndexInverse={1000}
                />
              </View>
              <View style={styles(darkMode).priceContainer}>
                <Text style={styles(darkMode).modalLabel}>Price Range</Text>
                <View style={styles(darkMode).priceInputContainer}>
                  <TextInput
                    placeholder="Min Price"
                    value={minPrice}
                    onChangeText={setMinPrice}
                    style={styles(darkMode).priceInput}
                    keyboardType="numeric"
                  />
                  <TextInput
                    placeholder="Max Price"
                    value={maxPrice}
                    onChangeText={setMaxPrice}
                    style={styles(darkMode).priceInput}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles(darkMode).applyButton}
                onPress={handleFilterApply}
              >
                <Text style={styles(darkMode).applyButtonText}>Apply</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles(darkMode).closeButton}
                onPress={toggleFilterModal}
              >
                <Text style={styles(darkMode).closeButtonText}>Close</Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </Modal>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
const styles = (darkMode) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 50,
      paddingHorizontal: 10,
      backgroundColor: darkMode ? "#333" : "#fff",
    },
    searchContainer: {
      flex: 1,
      backgroundColor: "transparent",
      borderTopWidth: 0,
      borderBottomWidth: 0,
      paddingHorizontal: 10,
    },
    inputContainer: {
      backgroundColor: darkMode ? "#444" : "#f1f1f1",
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    input: {
      backgroundColor: darkMode ? "#444" : "#f1f1f1",
      color: darkMode ? "#fff" : "#000",
    },
    leftIcon: {
      marginLeft: 10,
    },
    rightIcon: {
      marginRight: 10,
    },
    searchButton: {
      marginLeft: 10,
      backgroundColor: darkMode ? "#444" : "#f1f1f1",
      padding: 10,
      borderRadius: 10,
    },
    filterButton: {
      marginLeft: 10,
      backgroundColor: darkMode ? "#444" : "#f1f1f1",
      padding: 10,
      borderRadius: 10,
    },
    noResultsText: {
      textAlign: "center",
      marginTop: 20,
      fontSize: 16,
      color: darkMode ? "#fff" : "#000",
    },
    modalContainer: {
      flexGrow: 1,
      backgroundColor: darkMode ? "#333" : "#fff",
      padding: 20,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: darkMode ? "#fff" : "#000",
    },
    modalLabel: {
      fontSize: 16,
      marginBottom: 10,
      color: darkMode ? "#fff" : "#000",
    },
    dropdownWrapper: {
      marginBottom: 20,
    },
    dropdown: {
      backgroundColor: darkMode ? "#444" : "#f1f1f1",
      borderColor: darkMode ? "#444" : "#ddd",
    },
    dropdownContainer: {
      backgroundColor: darkMode ? "#444" : "#f1f1f1",
      borderColor: darkMode ? "#444" : "#ddd",
    },
    priceContainer: {
      marginBottom: 20,
    },
    priceInputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    priceInput: {
      flex: 1,
      backgroundColor: darkMode ? "#444" : "#f1f1f1",
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 5,
      color: darkMode ? "#fff" : "#000",
    },
    applyButton: {
      backgroundColor: COLORS.primary,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginBottom: 10,
    },
    applyButtonText: {
      color: "#fff",
      fontSize: 16,
    },
    closeButton: {
      backgroundColor: COLORS.darkGray,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    closeButtonText: {
      color: "#fff",
      fontSize: 16,
    },
  });
export default SearchScreen;
