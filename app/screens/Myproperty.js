import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

import Toast from "react-native-toast-message";
import COLORS from "../../assets/Colors/colors";
import { urlPath, getValueFor } from "../lib";

import MyPropertyCards from "../components/MyPropertyCards";

export default function Myproperty({ navigation, route }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { darkMode, handleDarkModeToggle } = route.params;
  const fetchProperties = async () => {
    console.log("Fetching properties");
    const url = `${urlPath}/property/my`;
    console.log("URL: " + url);
    const token = await getValueFor("token");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log(config);
    try {
      setLoading(true);
      const response = await axios.request(config);
      setProperties(response.data);
      console.log(JSON.stringify(response.data));

      // Check if response data is empty
      if (response.data.length === 0) {
        Toast.show({
          type: "info",
          text1: "No properties found",
          visibilityTime: 3000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.log("Error fetching properties:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    fetchProperties();
  };

  // Fetch properties on initial load
  useEffect(() => {
    fetchProperties(); // Initial fetch

    const interval = setInterval(() => {
      fetchProperties(); // Fetch properties every 5 minutes
    }, 1 * 10 * 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // Fetch properties when screen is focused
  useFocusEffect(
    useCallback(() => {
      console.log("Main screen focused");
      fetchProperties();
    }, [])
  );

  useEffect(() => {
    fetchProperties(); // Initial fetch

    const interval = setInterval(() => {
      fetchProperties(); // Fetch properties every 10 seconds
    }, 10 * 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: darkMode ? COLORS.backgroundDark : COLORS.white,
      }}
    >
      <Text style={styles(darkMode).title}>My Properties</Text>
      <ScrollView
        contentContainerStyle={[
          styles(darkMode).container,
          { paddingBottom: 0 },
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <View style={styles(darkMode).loadingContainer}>
            <ActivityIndicator
              size="large"
              color={darkMode ? COLORS.primary : COLORS.primary}
            />
          </View>
        ) : (
          properties.map((property) => (
            <MyPropertyCards key={property.id} property={property} />
          ))
        )}
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}

const styles = (darkMode) =>
  StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: darkMode ? COLORS.backgroundDark : COLORS.white,
    },
    title: {
      fontSize: 33,
      fontWeight: "700",
      color: COLORS.primary,
      marginTop: 30,
      textAlign: "center",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      backgroundColor: darkMode ? COLORS.backgroundDark : COLORS.white,
    },
  });
