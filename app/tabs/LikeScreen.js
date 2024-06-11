import React, { useState, useEffect, useCallback } from "react";
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
import { getStoredBoolValue } from "../../assets/theme";
import { useFocusEffect } from "@react-navigation/native";
const LikeScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const result = getStoredBoolValue();
      const darkMode = result.storedBoolValue;
      setDarkMode(darkMode);
    }, [])
  );
  const [LikedPropertyIds, setLikedPropertyIds] = useState([]);
  const [likedProperties, setLikedProperties] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchFavouriteIdData = async () => {
    try {
      console.log("Fetching favorite IDs for Like Screen");
      const url = `${urlPath}/user/favourite`;
      const token = await getValueFor("token");
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);
      setLikedPropertyIds(response.data);
      await fetchFavouriteData(response.data);
    } catch (error) {
      console.error("Error fetching favorite IDs:", error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchFavouriteData = async (ids) => {
    try {
      if (ids.length === 0) {
        setLikedProperties([]);
        setLoading(false);
        setRefreshing(false);
        return;
      }

      const idsString = ids.join(",");
      const url = `${urlPath}/property/properties?PropertiesIDs=${idsString}`;
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
      };
      const response = await axios.request(config);
      setLikedProperties(response.data);
      setLoading(false);
      setRefreshing(false);

      if (response.data.length === 0) {
        Toast.show({
          type: "info",
          text1: "No Liked Properties",
          text2: "You have no liked properties.",
        });
      }
    } catch (error) {
      console.error("Error fetching favorite properties:", error);
      console.log(error.response);
      Toast.show({
        type: "info",
        text1: "No Liked Properties",
        text2: "You have no liked properties.",
      });
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFavouriteIdData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log("Like screen focused");
      setLoading(true);
      fetchFavouriteIdData();
    }, [])
  );

  return (
    <View style={styles(darkMode).container}>
      <Text style={styles(darkMode).header}>Liked Properties</Text>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : likedProperties.length === 0 ? (
        <ScrollView
          style={styles(darkMode).scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          <View style={styles(darkMode).noProperties}></View>
        </ScrollView>
      ) : (
        <ScrollView
          style={styles(darkMode).scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {likedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </ScrollView>
      )}
      <Toast />
    </View>
  );
};
const styles = (darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: darkMode ? COLORS.backgroundDark : "#fff", // Background color of the container
    },
    header: {
      fontSize: 25,
      fontWeight: "bold",
      marginBottom: 30,
      marginTop: 60,
      textAlign: "center",
      color: darkMode ? COLORS.textDark : COLORS.primary,
    },
    scrollView: {
      marginBottom: 60,
    },
    noProperties: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    noPropertiesText: {
      fontSize: 18,
      color: darkMode ? COLORS.textDark : COLORS.primary,
    },
  });

export default LikeScreen;
