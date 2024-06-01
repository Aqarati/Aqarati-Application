import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, Image } from "react-native-elements";
import { View, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { urlPath, getValueFor } from "../lib";
const DocumentPage = () => {
  const route = useRoute();
  const { propertyId } = route.params;
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = urlPath + "/document/" + propertyId;

  useEffect(() => {
    const fetchDocuments = async () => {
      let token = await getValueFor("token");

      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          Authorization: "Bearer  " + token,
        },
      };

      try {
        const response = await axios.request(config);
        setDocuments(response.data);
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
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text h4>Documents for Property ID: {propertyId}</Text>
      <FlatList
        data={documents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imgUrl }} style={styles.image} />
            <Text>ID: {item.id}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
});

export default DocumentPage;
