import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import COLORS from "../../assets/Colors/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";

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

  const handleSubmit = async () => {
    setHasTriedToSubmit(true); // Update the submission attempt state for the required message
    const isValid = validateForm();

    const url = "http://192.168.100.37:8443/auth/signin";

    const data = {
      email: email,
      password: password,
    };

    const response = await axios
      .post(url, data)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
       navigation.replace("Mainscreen");
      })
      .catch((error) => {
        // Handle error
        //Todo :Hndle error passwrod
        console.error("Error:", error);
      });

    if (isValid) {
    
      
      setEmail("");
      setPassword("");
    } else {
      
    }
  };
  const showError = (errorKey) => hasTriedToSubmit && errors[errorKey];
  const formIsValid =
    email.trim() && password.trim() && Object.keys(errors).length === 0;
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  return (
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
      </View>
    </ImageBackground>
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
