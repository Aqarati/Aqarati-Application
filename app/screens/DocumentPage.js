import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Text as RNText,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Image, Card, Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import { urlPath, getValueFor } from "../lib";
import COLORS from "../../assets/Colors/colors";
import HourglassLoadingIcon from "../components/HourglassLoadingIcon"; // Adjust the import path as needed
import darkColors from "react-native-elements/dist/config/colorsDark";

const DocumentPage = ({ route }) => {
  const { darkMode, handleDarkModeToggle } = route.params;

  const { propertyId } = route.params;
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = `${urlPath}/document/${propertyId}`;

  useEffect(() => {
    const fetchDocuments = async () => {
      let token = await getValueFor("token");

      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      try {
        const response = await axios.request(config);
        const sortedDocuments = response.data.sort((a, b) => {
          const statusOrder = { APPROVED: 1, PENDING: 2, REJECTED: 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
        setDocuments(sortedDocuments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [propertyId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <RNText>Loading...</RNText>
      </View>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "APPROVED":
        return <Icon name="check-circle" size={24} color={COLORS.approved} />;
      case "PENDING":
        return <HourglassLoadingIcon size={24} color={COLORS.pending} />;
      case "REJECTED":
        return <Icon name="cancel" size={24} color={COLORS.rejected} />;
      default:
        return <Icon name="help" size={24} color={COLORS.default} />;
    }
  };

  return (
    <View style={styles(darkMode).container}>
      <RNText style={styles(darkMode).header}>
        Documents for Property ID {propertyId}
      </RNText>
      <FlatList
        data={documents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card containerStyle={styles(darkMode).card}>
            <Image
              source={{ uri: item.imgUrl }}
              style={styles(darkMode).image}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={styles(darkMode).cardContent}>
              <RNText style={styles(darkMode).documentId}>
                Document ID: {item.id}
              </RNText>
              <View style={styles(darkMode).statusContainer}>
                {getStatusIcon(item.status)}
                <RNText
                  style={{
                    ...styles.statusText,
                    color: getStatusIcon(item.status).props.color,
                  }}
                >
                  {item.status}
                </RNText>
              </View>
            </View>
          </Card>
        )}
      />
    </View>
  );
};

const styles = (darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: darkMode ? COLORS.darkGray : COLORS.lightBackground,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      textAlign: "center",
      marginBottom: 16,
      color: COLORS.primary,
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 30,
    },
    card: {
      borderRadius: 8,
      padding: 0,
      backgroundColor: darkMode
        ? COLORS.darkCardBackground
        : COLORS.lightCardBackground,
    },
    cardContent: {
      padding: 16,
    },
    image: {
      width: "100%",
      height: 200,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    documentId: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
      color: darkMode ? COLORS.darkText : COLORS.lightText,
    },
    statusContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    statusText: {
      fontSize: 16,
      fontWeight: "600",
      marginLeft: 8,
      color: darkMode ? COLORS.darkText : COLORS.lightText,
    },
  });

export default DocumentPage;
