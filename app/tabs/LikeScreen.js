import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { urlPath, getValueFor } from "../lib";
import PropertyCard from "../components/PropertyCard";

const LikeScreen = () => {
  const [likedPropertyIdData, setLikedPropertyIdData] = useState("");
  const [likedProperty, setLikedProperty] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFavouriteIdData = async () => {
    console.log("fetch fav id for Like Screen");
    const url = urlPath + "/user/favourite";
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
        console.log("response.data :" + response.data);
        setLikedPropertyIdData(response.data);
        console.log("likedPropertyIdData : " + likedPropertyIdData);
        fetchFavouriteData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchFavouriteData = async (id) => {
    const url = urlPath + "/property/properties?PropertiesIDs=" + id;
    console.log("url:" + url);
    console.log("GeT property Data");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {},
    };

    await axios
      .request(config)
      .then((response) => {
        setLikedProperty(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchFavouriteIdData().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    console.log("Like screen use effect called");
    fetchFavouriteIdData();
    console.log("Like property id", likedPropertyIdData);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liked Properties:</Text>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {likedProperty.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff", // Background color of the container
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 45,
  },
  scrollView: {
    marginBottom: 20,
  },
});

export default LikeScreen;
