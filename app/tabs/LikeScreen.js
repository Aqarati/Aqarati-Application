import React, { useState, useEffect,useCallback  } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { urlPath, getValueFor } from "../lib";
import PropertyCard from "../components/PropertyCard";
import COLORS from "../../assets/Colors/colors";
import Toast from "react-native-toast-message";
const LikeScreen = () => {
  const [likedPropertyIdData, setLikedPropertyIdData] = useState("");
  const [likedProperty, setLikedProperty] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

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
        Authorization: "Bearer " + token,
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
        setLoading(false);
      });
  };

  const fetchFavouriteData = async (id) => {
    const url = urlPath + "/property/properties?PropertiesIDs=" + id;
    console.log("url:" + url);
    console.log("Get property Data");
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
        setLoading(false);
        if (response.data.length === 0) {
          Toast.show({
            type: 'info',
            text1: 'No Liked Properties',
            text2: 'You have no liked properties.',
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const onRefresh = useCallback(() => {
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
      <Text style={styles.header}>Liked Properties</Text>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : likedProperty.length === 0 ? (
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
         
        </ScrollView>
      ) : (
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
      )}
      <Toast />
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
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 60,
    textAlign: "center",
    color:COLORS.primary
  },
  scrollView: {
    marginBottom: 20,
  },

});

export default LikeScreen;
