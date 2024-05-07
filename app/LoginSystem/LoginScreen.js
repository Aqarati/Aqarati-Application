import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import COLORS from "../../assets/Colors/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import { CommonActions } from "@react-navigation/native";

import Toast from "react-native-toast-message";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert("No values stored under that key.");
  }
}

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [hasTriedToSubmit, setHasTriedToSubmit] = useState(false); // New state to track submission attempts

  useEffect(() => {
    const isValid = validateForm();
    setIsFormValid(isValid);
    if (hasTriedToSubmit) {
      validateForm();
    }
  }, [email, password, hasTriedToSubmit]);

  const validateForm = () => {
    // this function will check the field if empty or the email is valid
    let newErrors = {};
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
      isValid = false;
    }
    if (password.length === 0) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    checkForBiometrics();
  }, []);

  const checkForBiometrics = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      console.error("Biometric authentication not available");
      return;
    }

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      console.error("No biometrics enrolled");
      return;
    }

    authenticate();
  };

  const authenticate = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate using Face ID",
    });

    if (result.success) {
      console.log("Authentication successful");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Tabs" }],
        })
      );

      // Handle successful authentication
    } else {
      console.log("Authentication failed");
      // Handle authentication failure
    }
  };

  const SucessMessage = () => {
    Toast.show({
      type: "success",
      text1: "Login Message",
      text2: "Login Successfully",
      autoHide: false,
      visibilityTime: 3000,
      position: "top",
    });
  };

  const NonSuccessMessage = () => {
    Toast.show({
      type: "error",
      text1: "Warning Message",
      text2: "Username or password incorrect!",
      autoHide: true,
      visibilityTime: 3000,
      position: "top",
    });
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleSubmit = async () => {
    setHasTriedToSubmit(true); // Update the submission attempt state
    const isValid = validateForm();

    if (!isValid) {
      return; // Stops the function if the form is not valid
    }

    const url = "http://192.168.100.13:32773/auth/signin";
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(url, data);
      console.log(response.data);
      SucessMessage(); // Call the function to show the success message
      console.log(response.data.token);
      await save("token", response.data.token); // Make sure these saves are awaited
      await save("email", data.email);
      await save("password", data.password); // Fixed typo from "passwrod" to "password"

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: "Tabs" }, // Navigate to the main screen
          ],
        })
      );
    } catch (error) {
      NonSuccessMessage();
      // console.error("Login Error:", error);
      // Handle the login error here, such as showing an error message
    }
  };

  const showError = (errorKey) => hasTriedToSubmit && errors[errorKey];
  const formIsValid =
    email.trim() && password.trim() && Object.keys(errors).length === 0;
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjusting behavior based on platform
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          source={require("../../assets/images/img1.jpg")}
          style={styles.image}
        >
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />

          <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <View style={styles.inputContainer}>
              <FontAwesome name="envelope" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={COLORS.lightGray}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            {showError("email") && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <View style={styles.inputContainer}>
              <FontAwesome name="lock" style={styles.icon} />
              <TextInput
                style={{ flex: 1, height: 50, padding: 10 }}
                placeholder="Password"
                placeholderTextColor={COLORS.lightGray}
                secureTextEntry={passwordVisibility}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisibility(!passwordVisibility)}
              >
                <FontAwesome
                  name={passwordVisibility ? "eye-slash" : "eye"}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            {showError("password") && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity
              style={formIsValid ? styles.buttonActive : styles.buttonDisabled}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              <Text style={styles.formFooter}>
                Don't have an account?{" "}
                <Text style={{ textDecorationLine: "underline" }}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
      <Toast></Toast>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formFooter: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
    paddingRight: 10,
  },
  icon: {
    padding: 10,
    color: COLORS.darkGray,
    fontSize: 20,
  },

  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.dark,
    alignSelf: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
  },
  icon: {
    padding: 10,
    color: COLORS.darkGray,
    fontSize: 20,
  },
  input: {
    flex: 1,
    height: 50,
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  buttonActive: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: 420,
    height: 100,
  },
});

export default LoginScreen;
