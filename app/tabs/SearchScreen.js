import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SearchBar, Icon } from "react-native-elements";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
import { urlPath } from "../lib";

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const updateSearch = (search) => {
    setSearch(search);
    console.log(search);
  };

  const handleSubmit = async () => {
    if (search.trim()) {
      setLoading(true);
      setNoResults(false);
      setProperties([]);

      const url1 = urlPath + "/property/search/?keyword=" + search;
      const url2 = urlPath + "/property";
      let config1 = {
        method: "get",
        maxBodyLength: Infinity,
        url: url1,
        headers: {},
      };

      try {
        const response1 = await axios.request(config1);
        const ids = response1.data.map((item) => item.id);
        console.log(response1);
        console.log(ids);
        console.log(JSON.stringify(response1.data));

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
        console.log(config2);
        const response2 = await axios.get(url2);
        console.log(JSON.stringify(response2.data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
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
          lightTheme
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSubmit}>
          <Icon name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={{marginTop:10}} >
        {loading ? (
          <ActivityIndicator
            size="50"
            color="##808080
"
          />
        ) : (
          <ScrollView style={{marginTop:10}}>
            {noResults ? (
              <Text style={styles.noResultsText}>No results found</Text>
            ) : (
              properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            )}
          </ScrollView>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 70, // Adjust for status bar height
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
});

export default SearchScreen;
