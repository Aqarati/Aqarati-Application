import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SearchBar, Icon } from "react-native-elements";
import axios from "axios";
import { urlPath } from "../lib";

const SearchScreen = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
    console.log(search);
  };

  const handleSubmit = () => {
    if (search.trim()) {
      axios
        .post(`${urlPath}/search`, { query: search })
        .then((response) => {
          console.log("Search results:", response.data);
          // Handle the search results here
        })
        .catch((error) => {
          console.error("Error during search:", error);
          // Handle the error here
        });
    } else {
      console.log("Please enter a search query");
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search here..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        leftIconContainerStyle={styles.leftIcon}
        rightIconContainerStyle={styles.rightIcon}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSubmit}>
        <Icon name="search" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60, // Adjust for status bar height
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  input: {
    color: "#000",
  },
  leftIcon: {
    marginLeft: 10,
  },
  rightIcon: {
    marginRight: 10,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default SearchScreen;
