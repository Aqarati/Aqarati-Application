import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableHighlight,
  ImageBackground,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../assets/theme";
export default function SignupScreen1() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/img1.jpg")}
        style={styles.image}
      >
        <View style={styles.container}>
          <KeyboardAwareScrollView>
            <View style={styles.header}>
              <Image
                source={require("../../assets/images/Flogo.png")} // Update the path to where your logo image is located
                style={styles.logo} // Style your logo
              />
              <Text style={styles.title}>Signup</Text>

              <Text style={styles.subtitle}>
                Fill in the fields below to get started with your new account.
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Full Name</Text>

                <TextInput
                  clearButtonMode="while-editing"
                  onChangeText={(name) => setForm({ ...form, name })}
                  // placeholder="John Doe"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.name}
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Email Address</Text>

                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  keyboardType="email-address"
                  onChangeText={(email) => setForm({ ...form, email })}
                  // placeholder="john@example.com"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.email}
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Password</Text>

                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={(password) => setForm({ ...form, password })}
                  // placeholder="********"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={form.password}
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Confirm Password</Text>

                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={(confirmPassword) =>
                    setForm({ ...form, confirmPassword })
                  }
                  // placeholder="********"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={form.confirmPassword}
                />
              </View>

              <View style={styles.formAction}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                >
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Get Started</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.contentBasedOnImage}>
              <View style={styles.dividerContainer}>
                <View style={styles.line} />
                <View>
                  <Text style={styles.dividerText}>or</Text>
                </View>
                <View style={styles.line} />
              </View>
            </View>
            <View style={styles.form}>
              <View style={styles.input}>
                <TouchableHighlight
                  underlayColor={COLORS.grey} // Color that will show when the button is pressed
                  onPress={() => {
                    // handle onPress for Google sign-up
                  }}
                  style={styles.btn}
                >
                  <>
                    <MaterialCommunityIcons
                      name="google"
                      size={24}
                      color="#000"
                    />
                    <Text style={styles.btnText}> Continue with Google</Text>
                  </>
                </TouchableHighlight>
              </View>
            </View>
          </KeyboardAwareScrollView>

          <TouchableOpacity
            onPress={() => {
              // handle link
            }}
            style={{ marginTop: "auto" }}
          >
            <Text style={styles.formFooter}>
              Already have an account?{" "}
              <Text style={{ textDecorationLine: "underline" }}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -12,
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D5DB", // The color of the line
  },
  dividerText: {
    width: 30, // May need to adjust based on the font size
    textAlign: "center",
    color: "#6B7280", // The color of the "or" text
    fontSize: 16,
    paddingHorizontal: 5, // Spacing on the sides of "or" text
  },

  contentBasedOnImage: {
    paddingHorizontal: 24, // Align with your form padding
    alignItems: "center", // Center items horizontally
    marginBottom: 16, // Space before the "Already have an account?" link
  },

  logo: {
    alignSelf: "center", // Center the logo horizontally
    marginTop: -15, // Add some space at the top

    height: 150, // Set the height
    width: 350, // Set the width
  },
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 6,
    paddingBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  /** Header */
  header: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  headerBack: {
    padding: 8,
    paddingTop: 0,
    position: "relative",
    marginLeft: -16,
    marginBottom: 6,
  },
  /** Form */
  form: {
    marginBottom: 12,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 12,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },

  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    backgroundColor: "transparent",
    borderColor: "#000",
    marginBottom: 14,
  },
  btnText: {
    fontSize: 15,
    lineHeight: 28,
    fontWeight: "600",
    color: "#000",
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
