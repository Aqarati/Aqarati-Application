import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  Modal,
  TextInput,
} from "react-native";
import { SearchBar, Icon } from "react-native-elements";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
import { urlPath } from "../lib";
import { getStoredBoolValue } from "../../assets/theme";
import { useFocusEffect } from "@react-navigation/native";
import { DATA } from "./data"; // Import your data
import DropDownPicker from "react-native-dropdown-picker";
import COLORS from "../../assets/Colors/colors";



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

  const bathroomsOptions = ["1", "2", "3", "4"].map((item) => ({
    label: item,
    value: item,
  }));

  useFocusEffect(
    React.useCallback(() => {
      const result = getStoredBoolValue();
      const darkMode = result.storedBoolValue;
      setDarkMode(darkMode);
    }, [])
  );

  const updateSearch = (search) => {
    setSearch(search);
  };

  const toggleFilterModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
  };

  const handleFilterApply = () => {
    // Apply filter logic here
    toggleFilterModal();
  };

  const handleSubmit = async () => {
    if (search.trim()) {
      setLoading(true);
      setNoResults(false);
      setProperties([]);

      let url1 = `${urlPath}/property/search/?keyword=${search}`;
      
      // Append price range if provided
      if (minPrice) {
        url1 += `&minPrice=${minPrice}`;
      }
      if (maxPrice) {
        url1 += `&maxPrice=${maxPrice}`;
      }

      const url2 = `${urlPath}/property`;
      let config1 = {
        method: "get",
        maxBodyLength: Infinity,
        url: url1,
        headers: {},
      };

      try {
        const response1 = await axios.request(config1);
        const ids = response1.data.map((item) => item.id);

        if (response1.data.length === 0) {
          setNoResults(true);
        } else {
          setProperties(response1.data);
        }

        let data = JSON.stringify(ids);

        let config2 = {
          method: "get",
          maxBodyLength: Infinity,
          url: url2,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
        const response2 = await axios.get(url2);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
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
          <ScrollView style={{ marginTop: 10 }}>
            {noResults ? (
              <Text style={styles(darkMode).noResultsText}>No results found</Text>
            ) : (
              properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            )}
          </ScrollView>
        )}
      </View>
      <Modal visible={isFilterModalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles(darkMode).modalContainer}>
          <Text style={styles(darkMode).modalTitle}>Filters</Text>
          <View style={[styles(darkMode).dropdownWrapper, { zIndex: 6000 }]}>
            <Text style={styles(darkMode).modalLabel}>Province</Text>
            <DropDownPicker
              open={openDropdown === "province"}
              value={selectedProvince}
              items={provinceOptions}
              setOpen={() => setOpenDropdown(openDropdown === "province" ? null : "province")}
              setValue={setSelectedProvince}
              setItems={() => {}}
              style={styles(darkMode).dropdown}
              dropDownContainerStyle={styles(darkMode).dropdownContainer}
              zIndex={6000}
              zIndexInverse={5000}
            />
          </View>
          <View style={[styles(darkMode).dropdownWrapper, { zIndex: 5000 }]}>
            <Text style={styles(darkMode).modalLabel}>Rooms</Text>
            <DropDownPicker
              open={openDropdown === "rooms"}
              value={selectedRooms}
              items={roomsOptions}
              setOpen={() => setOpenDropdown(openDropdown === "rooms" ? null : "rooms")}
              setValue={setSelectedRooms}
              setItems={() => {}}
              style={styles(darkMode).dropdown}
              dropDownContainerStyle={styles(darkMode).dropdownContainer}
              zIndex={5000}
              zIndexInverse={4000}
            />
          </View>
          <View style={[styles(darkMode).dropdownWrapper, { zIndex: 4000 }]}>
            <Text style={styles(darkMode).modalLabel}>Bathrooms</Text>
            <DropDownPicker
              open={openDropdown === "bathrooms"}
              value={selectedBathrooms}
              items={bathroomsOptions}
              setOpen={() => setOpenDropdown(openDropdown === "bathrooms" ? null : "bathrooms")}
              setValue={setSelectedBathrooms}
              setItems={() => {}}
              style={styles(darkMode).dropdown}
              dropDownContainerStyle={styles(darkMode).dropdownContainer}
              zIndex={4000}
              zIndexInverse={3000}
            />
          </View>
          <View style={[styles(darkMode).dropdownWrapper, { zIndex: 3000 }]}>
            <Text style={styles(darkMode).modalLabel}>Property Features</Text>
            <DropDownPicker
              open={openDropdown === "features"}
              value={selectedFeatures}
              items={propertyFeatures}
              setOpen={() => setOpenDropdown(openDropdown === "features" ? null : "features")}
              setValue={setSelectedFeatures}
              setItems={() => {}}
              multiple={true}
              multipleText="items have been selected."
              min={0}
              max={8}
              style={styles(darkMode).dropdown}
              dropDownContainerStyle={styles(darkMode).dropdownContainer}
              zIndex={3000}
              zIndexInverse={2000}
            />
          </View>
          <View style={[styles(darkMode).dropdownWrapper, { zIndex: 2000 }]}>
            <Text style={styles(darkMode).modalLabel}>Nearby Locations</Text>
            <DropDownPicker
              open={openDropdown === "nearbyLocations"}
              value={selectedNearbyLocations}
              items={nearbyLocations}
              setOpen={() => setOpenDropdown(openDropdown === "nearbyLocations" ? null : "nearbyLocations")}
              setValue={setSelectedNearbyLocations}
              setItems={() => {}}
              multiple={true}
              multipleText="items have been selected."
              min={0}
              max={5}
              style={styles(darkMode).dropdown}
              dropDownContainerStyle={styles(darkMode).dropdownContainer}
              zIndex={2000}
              zIndexInverse={1000}
              dropDownDirection="BOTTOM"
            />
          </View>
          <View style={[styles(darkMode).inputWrapper]}>
            <Text style={styles(darkMode).modalLabel}>Price Range</Text>
            <View style={styles(darkMode).priceRangeContainer}>
              <TextInput
                style={styles(darkMode).priceInput}
                placeholder="Min"
                keyboardType="numeric"
                value={minPrice}
                onChangeText={(value) => setMinPrice(value)}
              />
              <Text style={styles(darkMode).priceSeparator}>-</Text>
              <TextInput
                style={styles(darkMode).priceInput}
                placeholder="Max"
                keyboardType="numeric"
                value={maxPrice}
                onChangeText={(value) => setMaxPrice(value)}
              />
            </View>
          </View>
          <View style={styles(darkMode).buttonContainer}>
            <TouchableOpacity
              style={[styles(darkMode).modalButton, { backgroundColor: COLORS.primary }]}
              onPress={handleFilterApply}
            >
              <Text style={styles(darkMode).buttonText}>Apply Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles(darkMode).modalButton, { backgroundColor: COLORS.primary }]}
              onPress={toggleFilterModal}
            >
              <Text style={styles(darkMode).buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

const styles = (darkMode) =>
  StyleSheet.create({
    container: {
      backgroundColor: darkMode ? "#333" : "#fff",
      paddingTop: 70,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: darkMode ? "#555" : "#ccc",
    },
    searchContainer: {
      flex: 1,
      backgroundColor: darkMode ? "#444" : "#f0f0f0",
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
    inputContainer: {
      backgroundColor: darkMode ? "#555" : "#fff",
      borderRadius: 10,
    },
    input: {
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
      backgroundColor: darkMode ? "#444" : "#f0f0f0",
      borderRadius: 10,
      padding: 10,
      shadowColor: darkMode ? "#000" : "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
    filterButton: {
      marginLeft: 10,
      backgroundColor: darkMode ? "#444" : "#f0f0f0",
      borderRadius: 10,
      padding: 10,
      shadowColor: darkMode ? "#000" : "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
    noResultsText: {
      textAlign: "center",
      marginTop: 20,
      fontSize: 16,
      color: darkMode ? "#ccc" : "#999",
    },
    modalContainer: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: darkMode ? "#333" : "#fff",
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: darkMode ? "#fff" : "#000",
    },
    modalLabel: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 10,
      color: darkMode ? "#fff" : "#000",
    },
    dropdownWrapper: {
      marginBottom: 20,
      position: "relative",
    },
    dropdown: {
      backgroundColor: darkMode ? "#444" : "#f0f0f0",
    },
    dropdownContainer: {
      backgroundColor: darkMode ? "#555" : "#fff",
    },
    inputWrapper: {
      marginBottom: 20,
    },
    priceRangeContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    priceInput: {
      flex: 1,
      backgroundColor: darkMode ? "#555" : "#fff",
      padding: 10,
      borderRadius: 10,
      textAlign: "center",
    },
    priceSeparator: {
      marginHorizontal: 10,
      fontSize: 18,
      color: darkMode ? "#fff" : "#000",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      
    },
    modalButton: {
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      flex: 1,
      marginHorizontal: 5,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

export default SearchScreen;
