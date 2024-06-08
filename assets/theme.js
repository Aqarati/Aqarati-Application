import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

export const COLORS = {
  primary: "#7C9A92",
  primary1: "#FFBF00",
  white: "#FFFFFF",
  background: "#253334",
  grey: "#BEC2C2",
  primary2: "#344955",
  box: "#6499E9",
};
let storedBoolValue = false; // Initialize stored boolean value

const storeBoolValue = (boolValue) => {
  // Validate if the passed parameter is a boolean
  if (typeof boolValue !== "boolean") {
    console.error("Parameter must be a boolean");
    return;
  }

  // Store the boolean value
  storedBoolValue = boolValue;
};

const getStoredBoolValue = () => {
  // Return an object containing the stored boolean value
  return { storedBoolValue };
};

export { storeBoolValue, getStoredBoolValue };
