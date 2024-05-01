import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/theme";
const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dashedBox: {
    borderWidth: 1,
    borderColor: "lightblue",
    borderRadius: 5,
    borderStyle: "dashed",
    padding: 10,
    marginBottom: 10,
  },
  dashedBoxText: {
    color: "grey",
    textAlign: "left",
  },

  photoBox: {
    width: "30%", // this will ensure three boxes per line in a full-width container
    height: 100,
    borderColor: "grey",
    borderWidth: 3, // updated as requested
    borderRadius: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  addIconBox: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  addIconText: {
    color: COLORS.white,
    fontSize: 18,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  bottomButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  firstPhotoBox: {
    width: "30%",
    height: 100,
    borderColor: "grey",
    borderWidth: 3,
    borderRadius: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary, // This is your different color for the first box
  },
  firstAddIconBox: {
    width: 25,
    height: 25,
    // Assuming you want to keep the "+" white
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },

  // Add more styles as needed
});

const styles3 = StyleSheet.create({
  title: {
    marginLeft: 30,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,

    color: COLORS.primary,
    marginTop: 30,
  },
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center", // Centers everything vertically
  },
  addReelBox: {
    width: 300,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 20,
    alignSelf: "center",
    borderWidth: 3,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    borderColor: "grey",
    marginBottom: -5,
  },
  settingItem: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  settingText: {
    fontSize: 16,
    fontWeight: "bold",

    marginLeft: 20,
    flex: 1,
  },
  icon: {
    // Additional styling for the icon if necessary
  },
  boldText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center", // Ensures text is centered horizontally
    color: COLORS.primary,
    marginBottom: 20, // Space between the title and the first setting item
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 20,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
  },
});
const styles4 = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    marginBottom: 20,
  },
  icon: {
    // Styles for the icon if necessary
  },
  title: {
    fontSize: 16,
    // Any additional text styles
  },
  container: {
    flex: 1,
    backgroundColor: "#fff", // This ensures the background of the container is white
    // Remove marginTop and marginBottom if not needed to avoid unwanted spacing
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff", // Ensure search section also has a white background
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  searchIcon: {
    // If you have a search icon, adjust its styles here
  },
  input: {
    flex: 1,
    height: 40,
    textAlign: "center",
    // Ensure input background is also white if necessary
    backgroundColor: "#fff",
  },
});
const styles1 = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.primary2,
    marginBottom: 12,
  },
  /** Card */
  card: {
    paddingVertical: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  cardTitle: {
    fontSize: 25,
    fontWeight: "600",
    color: COLORS.primary2,
    marginBottom: 8,
  },

  cardAction: {
    marginLeft: "auto",
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 26,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 15,
  },
  /** Card */
  card: {
    borderColor: "#e3e3e3",
    marginBottom: 18,
  },
  cardImg: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginRight: 16,
  },
  cardBody: {
    paddingVertical: 15,
  },
  cardTitle: {
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 8,
    justifyContent: "center",
    textAlign: "center",
  },
});
