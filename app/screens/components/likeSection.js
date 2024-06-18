import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from "react-native";
import { urlPath, getValueFor } from "../../lib";
import axios from "axios";
import COLORS from "../../../assets/Colors/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const LikeSection = ({ p, price, userid }) => {
  const [liked, setLiked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(null);
  useEffect(() => {
    const fetchFavouriteIdData = async () => {
      setLoading(true);
      const url1 = urlPath + "/user/profile/" + userid;
      let config1 = {
        method: "get",
        maxBodyLength: Infinity,
        url: url1,
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      console.log(config1);
      await axios
        .request(config1)
        .then((response) => {
          console.log(
            "ddddddddddddddddddddddddd",
            JSON.stringify(response.data.phoneNumber)
          );
          setNumber(response.data.phoneNumber);
          console.log(number);
        })
        .catch((error) => {
          console.log(error.message);
        });
      console.log("fetch fav id for Like Section");
      const url = urlPath + "/user/favourite";
      const token = await getValueFor("token");
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      await axios
        .request(config)
        .then((response) => {
          const favId = response.data;
          setLiked(favId.includes(p.id));
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchFavouriteIdData();
  }, [p.id]);

  const handleLikePress = async () => {
    setLoading(true);
    const url = urlPath + "/user/favourite?id=" + p.id;
    const token = await getValueFor("token");

    const config = {
      method: liked ? "delete" : "post",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    await axios
      .request(config)
      .then((response) => {
        setLiked(!liked);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleContactPress = () => {
    const phoneNumber = number;
    Linking.openURL(`tel:${phoneNumber}`).catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.priceText}>
        <FontAwesome name="dollar" size={20} color={COLORS.primary} /> {price}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleContactPress}>
        <Text style={styles.buttonText}>Contact Owner</Text>
      </TouchableOpacity>
      <View style={styles.buttonWrapper}>
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <TouchableOpacity onPress={handleLikePress} style={styles.icons}>
            <FontAwesome
              name="heart"
              size={30}
              color={liked ? "#CD1818" : "white"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    paddingHorizontal: 20, // Adjust button width here
    margin: 5,
    borderRadius: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 20,
    color: COLORS.primary,
    marginRight: 10,
    marginLeft: 15,
  },
  buttonWrapper: {
    marginRight: 20,
  },
});

export default LikeSection;
