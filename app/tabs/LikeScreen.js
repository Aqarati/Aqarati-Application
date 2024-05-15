import { View, Text } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { urlPath, getValueFor } from "../lib";
import React from "react";

const LikeScreen = () => {
  const [likedPropertyIdData, setLikedPropertyIdData] = useState([]);
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
        setLikedPropertyIdData(response.data);
        console.log(likedPropertyIdData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("Like screen use effect called");
    fetchFavouriteIdData();
  }, []);

  return <Text>like</Text>;
};

export default LikeScreen;
