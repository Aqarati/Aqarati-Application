import { StyleSheet } from "react-native";

import COLORS from "../../assets/Colors/colors";
const sttyles = (darkMode) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: darkMode ? COLORS.backgroundDark : "#f2f2f2",
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 50,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      color: darkMode ? COLORS.textDark : "black",
    },
    card: {
      width: "90%",
      padding: 20,
      backgroundColor: darkMode ? COLORS.lightGray : "white",
      borderRadius: 10,
      shadowColor: darkMode ? "#fff" : "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginBottom: 20,
    },
    dropdown: {
      height: 50,
      borderColor: darkMode ? COLORS.borderDark : "gray",
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginTop: 8,
    },
    placeholderStyle: {
      fontSize: 16,
      color: darkMode ? COLORS.placeholderDark : "#686D76",
    },
    selectedTextStyle: {
      fontSize: 16,
      color: darkMode ? COLORS.darkGray : "black",
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color: darkMode ? COLORS.darkGray : "black",
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    selectedStyle: {
      borderRadius: 12,
    },
    Selected: {
      height: 50,
      borderColor: darkMode ? COLORS.darkGray : "gray",
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginTop: 8,
    },
    input: {
      height: 50,
      borderColor: darkMode ? COLORS.black : "gray",
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginTop: 8,
      fontSize: 16,
      color: darkMode ? COLORS.darkGray : "black",
    },
    button: {
      backgroundColor: darkMode ? COLORS.darkGray : COLORS.primary,
      paddingVertical: 15,
      borderRadius: 8,
      marginTop: 20,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
const styles11 = (darkMode) => ({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 120,
    backgroundColor: darkMode ? COLORS.backgroundDark : "#fff",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: darkMode ? COLORS.lightGray : COLORS.primary,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: darkMode ? COLORS.lightGray : "gray",
    marginLeft: 10,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
    color: darkMode ? COLORS.lightGray : "black",
  },
  input: {
    borderWidth: 1,
    borderColor: darkMode ? COLORS.darkGray : "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    color: darkMode ? COLORS.darkGray : "black",
    backgroundColor: darkMode ? COLORS.lightGray : "white",
  },
  bottomButton: {
    backgroundColor: darkMode ? COLORS.darkGray : COLORS.primary,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
const styles12 = (darkMode) => ({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 90,
    backgroundColor: darkMode ? COLORS.backgroundDark : "#fff",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: darkMode ? COLORS.lightGray : COLORS.primary,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    color: darkMode ? COLORS.lightGray : "black",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: darkMode ? COLORS.lightGray : "black",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
    color: darkMode ? COLORS.lightGray : "black",
  },
  input: {
    borderWidth: 1,
    borderColor: darkMode ? COLORS.lightGray : "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    color: darkMode ? COLORS.lightGray : "black",
    backgroundColor: darkMode ? COLORS.lightGray : "#fff",
  },
  bottomButton: {
    backgroundColor: darkMode ? COLORS.darkGray : COLORS.primary,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
const styles2 = (darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: darkMode ? COLORS.backgroundDark : "#fff",
      paddingTop: 70,
    },
    title: {
      fontSize: 25,
      fontWeight: "bold",
      marginBottom: 10,
      color: darkMode ? COLORS.lightGray : COLORS.primary,
      textAlign: "center",
    },
    dashedBox: {
      borderWidth: 1,
      borderColor: darkMode ? COLORS.lightGray : "lightblue",
      borderRadius: 5,
      borderStyle: "dashed",
      padding: 10,
      marginBottom: 30,
      marginTop: 30,
      marginLeft: 6,
      width: "95%",
    },
    dashedBoxText: {
      color: darkMode ? COLORS.lightGray : "grey",
      textAlign: "left",
      fontSize: 16,
      paddingLeft: 5,
    },
    photoBox: {
      width: "25%",
      height: 80,
      borderColor: darkMode ? COLORS.lightGray : "grey",
      borderWidth: 1,
      borderRadius: 5,
      margin: 5,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: darkMode ? COLORS.lightGray : "#fff",
    },
    addIconBox: {
      justifyContent: "center",
      alignItems: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-around",
      flexWrap: "wrap",
    },
    bottomButton: {
      backgroundColor: darkMode ? COLORS.darkGray : COLORS.primary,
      padding: 15,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      marginBottom: 36,
    },
    bottomButtonText: {
      color: "#fff",
      fontSize: 18,
    },
    firstPhotoBox: {
      width: "25%",
      height: 80,
      borderColor: darkMode ? COLORS.lightGray : "grey",
      borderWidth: 1,
      borderRadius: 5,
      margin: 5,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: darkMode ? COLORS.lightGray : "#fff",
    },
    firstAddIconBox: {
      justifyContent: "center",
      alignItems: "center",
    },
    photo: {
      width: "100%",
      height: "100%",
    },
  });
const styles = (darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: darkMode ? COLORS.backgroundDark : "#fff",
    },
    safeArea: {
      flex: 1,
    },
    scrollViewContent: {
      paddingTop: 10, // Adjust the paddingTop if necessary
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 5,
      color: darkMode ? COLORS.textDark : COLORS.primary,
      marginTop: 30,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 18,
      marginBottom: 30,
      color: darkMode ? COLORS.lightGray : COLORS.grey,
      textAlign: "center",
    },
    card: {
      borderRadius: 12,
      borderColor: darkMode ? COLORS.borderDark : COLORS.grey,
      borderWidth: 1,
      marginBottom: 20,
      marginTop: 5,
    },
    cardImg: {
      width: "100%",
      height: 180,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    cardContent: {
      padding: 15,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: darkMode ? COLORS.textDark : COLORS.primary,
      textAlign: "center",
    },
  });
const styles1 = (darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? COLORS.backgroundDark : "#fff",
      paddingTop: 70,
    },
    screenTitle: {
      fontSize: 25,
      textAlign: "center",
      marginBottom: 20,
      fontWeight: "bold",
      color: darkMode ? COLORS.textDark : COLORS.primary,
    },
    item: {
      backgroundColor: darkMode ? COLORS.backgroundDark : "#fff",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 2,
      borderRadius: 5,
      borderColor: darkMode ? COLORS.borderDark : "grey",
      marginBottom: 20,
    },
    title: {
      fontSize: 16,
      color: darkMode ? COLORS.textDark : "#000",
    },
    searchSection: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: darkMode ? COLORS.backgroundDark : "#fff",
      borderWidth: 1,
      borderColor: darkMode ? COLORS.borderDark : "#000",
      borderRadius: 5,
      paddingHorizontal: 10,
      marginHorizontal: 10,
      marginBottom: 10,
      marginTop: 10,
    },
    input: {
      flex: 1,
      height: 40,
      textAlign: "center",
      backgroundColor: darkMode ? COLORS.backgroundDark : "#fff",
      color: darkMode ? COLORS.textDark : "#000",
    },
  });

const Profilestyles = (darkMode) =>
  StyleSheet.create({
    container: {
      paddingVertical: 24,
      paddingHorizontal: 0,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      backgroundColor: darkMode ? COLORS.backgroundDark : COLORS.white,
    },
    header: {
      paddingLeft: 24,
      paddingRight: 24,
      marginBottom: 12,
    },
    title: {
      fontSize: 32,
      fontWeight: "700",
      color: darkMode ? COLORS.textDark : COLORS.primary,
      marginBottom: 6,
    },
    profile: {
      paddingTop: 12,
      paddingHorizontal: 24,
      paddingBottom: 24,
      backgroundColor: darkMode ? COLORS.backgroundDark : COLORS.white,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: darkMode ? COLORS.borderDark : COLORS.borderGray,
    },
    profileHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    profileAvatar: {
      width: 60,
      height: 60,
      borderRadius: 9999,
      borderWidth: 1,
      borderColor: darkMode ? COLORS.white : COLORS.gray,
      marginRight: 12,
    },
    profileName: {
      fontSize: 17,
      fontWeight: "600",
      color: darkMode ? COLORS.textDark : COLORS.darkGray,
    },
    profileHandle: {
      marginTop: 4,
      fontSize: 15,
      color: darkMode ? COLORS.white : COLORS.gray,
    },
    profileAction: {
      marginTop: 16,
      paddingVertical: 10,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.primary,
      borderRadius: 12,
    },
    profileActionText: {
      marginRight: 8,
      fontSize: 15,
      fontWeight: "600",
      color: COLORS.white,
    },
    section: {
      paddingHorizontal: 24,
    },
    sectionTitle: {
      paddingVertical: 12,
      fontSize: 12,
      fontWeight: "600",
      color: darkMode ? COLORS.white : COLORS.gray,
      textTransform: "uppercase",
      letterSpacing: 1.1,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      height: 50,
      backgroundColor: darkMode ? COLORS.darkGray : COLORS.lightGray,
      borderRadius: 8,
      marginBottom: 12,
      paddingLeft: 12,
      paddingRight: 12,
    },
    rowIcon: {
      width: 32,
      height: 32,
      borderRadius: 9999,
      marginRight: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    rowLabel: {
      fontSize: 17,
      fontWeight: "400",
      color: darkMode ? COLORS.white : COLORS.black,
    },
    rowSpacer: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },
  });
export { sttyles, styles11, styles12, styles2, styles, styles1, Profilestyles };
