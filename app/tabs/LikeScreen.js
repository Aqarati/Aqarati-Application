import { View, Text } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { urlPath, getValueFor } from "../lib";
import React from "react";

const LikeScreen = () => {
  const [likedPropertyIdData, setLikedPropertyIdData] = useState([]);
  const [likedProperty, setLikedProperty] = useState([]);
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
        setLikedPropertyIdData(JSON.stringify(response.data));
        console.log(likedPropertyIdData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("Like screen use effect called");
    console.log("Like property id", likedPropertyIdData);
    fetchFavouriteIdData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{likedPropertyIdData}</Text>
    </View>
  );
};

export default LikeScreen;
