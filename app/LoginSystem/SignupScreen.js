import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Modal,
  Pressable,
} from "react-native";
import COLORS from "../../assets/Colors/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  useEffect(() => {
    // validateForm();
    if (attemptedSubmit) {
      const isValid = validateForm();
      setIsFormValid(isValid);
    }
  }, [name, email, password, rePassword, attemptedSubmit]);

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Username is required.";
      isValid = false;
    } else {
      delete newErrors.name;
      isValid = true;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
      isValid = false;
    } else {
      delete newErrors.email;
    }

    if (!rePassword.trim()) {
      newErrors.rePassword = "Confirm password is required.";
      isValid = false;
    } else if (password !== rePassword) {
      newErrors.rePassword = "Passwords do not match.";
      isValid = false;
    } else {
      delete newErrors.rePassword;
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.password = "Password must contain at least one symbol.";
      isValid = false;
    } else {
      delete newErrors.password;
    }

    setErrors(newErrors);
    // setIsFormValid(isValid);
    return isValid;
  };

  const handleSubmit = async () => {
    let newErrors = {};
    let formIsValid = true;
    setAttemptedSubmit(true);

    if (!name.trim()) {
      newErrors.name = "Username is required.";
      formIsValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
      formIsValid = false;
    }

    if (!rePassword.trim()) {
      newErrors.rePassword = "Confirm password is required.";
      formIsValid = false;
    } else if (password !== rePassword) {
      newErrors.rePassword = "Passwords do not match.";
      formIsValid = false;
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      formIsValid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.password = "Password must contain at least one symbol.";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      const url = "http://192.168.100.70:8443/auth/signup";

      const data = {
        email: email,
        password: password,
      };

      const response = await axios
        .post(url, data)
        .then((response) => {
          // Handle successful response
          console.log(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error:", error);
        });

      console.log("Form submitted successfully!");
      console.log(`Username: ${name}, Email: ${email}, Password: ${password}`);

      setName("");
      setEmail("");
      setPassword("");
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        navigation.navigate("Login");
      }, 3000);
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };
  const allFieldsFilled =
    name.trim() && email.trim() && password.trim() && rePassword.trim(); // Include rePassword

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true);

  const formIsValid = allFieldsFilled && Object.keys(errors).length === 0;
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
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" style={styles.icon} />

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={COLORS.lightGray}
            value={name}
            onChangeText={(text) => {
              setName(text);
              // validateForm();
            }}
          />
        </View>
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={COLORS.lightGray}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              // validateForm();
            }}
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

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
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" style={styles.icon} />
          <TextInput
            style={{ flex: 1, height: 50, padding: 10 }}
            placeholder="Confirm Password"
            placeholderTextColor={COLORS.lightGray}
            secureTextEntry={confirmPasswordVisibility}
            value={rePassword}
            onChangeText={setRePassword}
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
        <TouchableOpacity
          style={formIsValid ? styles.buttonActive : styles.buttonDisabled}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        {showSuccessMessage && (
          <View style={styles.successMessageContainer}>
            <Text style={styles.successMessageText}>
              Registration Successful!
            </Text>
          </View>
        )}
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
