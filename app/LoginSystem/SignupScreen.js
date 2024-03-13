import React, { useState } from "react";
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
import * as SecureStore from "expo-secure-store"; // Assuming SecureStore is used.
import Toast from "react-native-toast-message";
const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Username is required.";
      isValid = false;
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
      isValid = false;
    }

    // Password validation
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.password = "Password must contain at least one symbol.";
      isValid = false;
    }

    // RePassword validation
    if (password !== rePassword) {
      newErrors.rePassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field, value) => {
    // Update the respective state based on the field
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "rePassword") setRePassword(value);

    // Perform validation immediately after state update
    validateField(field, value);
  };

  const validateField = (field, value) => {
    let newErrors = { ...errors }; // Copy existing errors

    switch (field) {
      case "name":
        newErrors.name = !value.trim() ? "Username is required." : "";
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Email is invalid.";
        } else {
          newErrors.email = "";
        }
        break;
      case "password":
        if (value.length < 6) {
          newErrors.password = "Password must be at least 6 characters long.";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          newErrors.password = "Password must contain at least one symbol.";
        } else {
          newErrors.password = "";
        }
        break;
      case "rePassword":
        newErrors.rePassword =
          password !== value ? "Passwords do not match." : "";
        break;
      default:
        break; // No default action
    }

    setErrors(newErrors); // Update errors state
  };
  const SucessMessage = (name) => {
    Toast.show({
      type: "success",
      text1: "Registration Success",
      text2: `Welcome ${name} And Have A Nice Day!`,
      autoHide: false,
      visibilityTime: 3000,
      position: "top",
    });
  };
  const NonSucess = (error) => {
    Toast.show({
      type: "error",
      text1: "Warning Message",
      text2: `Ops Email Alerady Exists !`,
      autoHide: false,
      visibilityTime: 3000,
      position: "top",
    });
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const handleSubmit = async () => {
    if (!validateForm()) {
      console.log("Form has errors. Please correct them.");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.100.37:8443/auth/signup",
        {
          email,
          password,
        }
      );
      SucessMessage(name);
      await sleep(3000);
      console.log("Form submitted successfully!", response.data);
      await SecureStore.setItemAsync("token", response.data.token);
      await SecureStore.setItemAsync("email", email);
      await SecureStore.setItemAsync("password", password); // Consider security implications
      setEmail("");
      setName("");
      setPassword("");
      setRePassword("");
      navigation.navigate("Login");
    } catch (error) {
      NonSucess();
    }
  };

  // const formIsValid = name && email && password && rePassword && Object.keys(errors).length === 0;

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true);
  // Before your return statement
  const allFieldsFilled = name && email && password && rePassword; // Check if all fields are filled
  const noErrors = Object.values(errors).every((error) => error === ""); // Check if there are no errors

  // Check if form is valid (all fields are filled and no errors)
  const formIsValid = allFieldsFilled && noErrors;

  // Button style based on form validity
  const buttonStyle = formIsValid ? styles.buttonActive : styles.buttonDisabled;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
            <Text style={styles.title}>Sign Up</Text>

            {/* Username Field */}
            <View style={styles.inputContainer}>
              <FontAwesome name="user" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor={COLORS.lightGray}
                value={name}
                onChangeText={(value) => handleChange("name", value)}
              />
            </View>
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            {/* Email Field */}
            <View style={styles.inputContainer}>
              <FontAwesome name="envelope" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={COLORS.lightGray}
                value={email}
                onChangeText={(value) => handleChange("email", value)}
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            {/* Password Field */}
            <View style={styles.inputContainer}>
              <FontAwesome name="lock" style={styles.icon} />
              <TextInput
                style={{ flex: 1, height: 50, padding: 10 }}
                placeholder="Password"
                placeholderTextColor={COLORS.lightGray}
                secureTextEntry={passwordVisibility}
                value={password}
                onChangeText={(value) => handleChange("password", value)}
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
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Confirm Password Field */}
            <View style={styles.inputContainer}>
              <FontAwesome name="lock" style={styles.icon} />
              <TextInput
                style={{ flex: 1, height: 50, padding: 10 }}
                placeholder="Confirm Password"
                placeholderTextColor={COLORS.lightGray}
                secureTextEntry={confirmPasswordVisibility}
                value={rePassword}
                onChangeText={(value) => handleChange("rePassword", value)}
              />
              <TouchableOpacity
                onPress={() =>
                  setConfirmPasswordVisibility(!confirmPasswordVisibility)
                }
              >
                <FontAwesome
                  name={confirmPasswordVisibility ? "eye-slash" : "eye"}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            {errors.rePassword && (
              <Text style={styles.errorText}>{errors.rePassword}</Text>
            )}

            {/* Submit Button */}
            {/* Submit Button */}
            <TouchableOpacity
              style={buttonStyle}
              onPress={handleSubmit}
              disabled={!formIsValid} // Disable the button if the form is not valid
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
      <Toast></Toast>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
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
  successMessageContainer: {
    padding: 10,
    marginTop: 20,
    backgroundColor: "green",
    borderRadius: 5,
  },
  successMessageText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
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
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.darkGray,
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
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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

export default SignupScreen;
