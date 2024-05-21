import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Linking } from "react-native";
import { urlPath } from "../../lib";
import { getValueFor } from "../../lib";
import axios from "axios";
import COLORS from "../../../assets/Colors/colors";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const LikeSection = ({ p }) => {
  const [liked, setLiked] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading indicator

  useEffect(() => {
    const fetchFavouriteIdData = async () => {
      setLoading(true); // Show loading indicator
      console.log("fetch fav id for Like Section");
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
          var favId = response.data;
          console.log(favId);
          console.log(favId.includes(p.id));
          setLiked(favId.includes(p.id));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false); // Hide loading indicator
        });
    };

    fetchFavouriteIdData();
  }, [p.id]);

  const handleLikePress = async () => {
    setLoading(true); // Show loading indicator
    const url = urlPath + "/user/favourite?id=" + p.id;
    const token = await getValueFor("token");

    let config = {
      method: liked ? "delete" : "post", // Toggle between post and delete
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    await axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLiked(!liked);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // Hide loading indicator
      });
  };

  const handleContactPress = () => {
    const phoneNumber = "1234567890";
    Linking.openURL(`tel:${phoneNumber}`).catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleContactPress}>
        <Text style={styles.buttonText}>Contact Owner</Text>
      </TouchableOpacity>
      <View style={styles.buttonWrapper}>
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <TouchableOpacity onPress={handleLikePress}style={styles.icons}>
            <FontAwesome name="heart" size={30} color={liked ? '#CD1818' : 'white'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icons:{
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:20
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    paddingHorizontal: 80,
    margin: 5,
    borderRadius: 5,
    borderRadius:40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
   
  },
  buttonWrapper: {
    marginRight: 20,
    
  },
});

export default LikeSection;
