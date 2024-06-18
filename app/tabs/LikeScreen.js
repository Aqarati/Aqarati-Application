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
  const [likedPropertyIds, setLikedPropertyIds] = useState([]);
  const [likedProperties, setLikedProperties] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDarkModeSetting = async () => {
      const result = await getStoredBoolValue();
      setDarkMode(result.storedBoolValue);
    };

    loadDarkModeSetting();
  }, []);

  const fetchFavouriteIdData = useCallback(async () => {
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
      const ids = response.data;
      setLikedPropertyIds(ids);
      await fetchFavouriteData(ids);
    } catch (error) {
      console.error("Error fetching favorite IDs:", error);
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const fetchFavouriteData = useCallback(async (ids) => {
    try {
      if (ids.length === 0) {
        setLikedProperties([]);
        setLoading(false);
        setRefreshing(false);
        await Toast.show({
          type: "info",
          text1: "No Liked Properties",
          text2: "You have no liked properties.",
        });
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
        await Toast.show({
          type: "info",
          text1: "No Liked Properties",
          text2: "You have no liked properties.",
        });
      }
    } catch (error) {
      console.error("Error fetching favorite properties:", error);
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFavouriteIdData();
  }, [fetchFavouriteIdData]);

  useFocusEffect(
    useCallback(() => {
      console.log("Like screen focused");
      setLoading(true);
      fetchFavouriteIdData();
    }, [fetchFavouriteIdData])
  );

  return (
    <View style={styles(darkMode).container}>
      <Text style={styles(darkMode).header}>Liked Properties</Text>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
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
      backgroundColor: darkMode ? COLORS.backgroundDark : "#fff",
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
  });

export default LikeScreen;
