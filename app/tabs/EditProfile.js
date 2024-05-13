import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../assets/theme";
import { MaterialIcons } from "@expo/vector-icons";
// Sample data
const DATA = [
  {
    firstName: "alex deman",
    LastName: "alex deman",
  },
];

// MyAccountItem component
const MyAccountItem = ({ title, value, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.label}>{title}</Text>
    <Text numberOfLines={1} style={styles.value}>
      {value}
    </Text>
    <AntDesign
      name="edit"
      size={20}
      color={COLORS.primary}
      style={styles.editIcon}
    />
  </TouchableOpacity>
);

// EditFieldModal component
const EditFieldModal = ({ visible, onClose, title, value, onSave }) => {
  const [newValue, setNewValue] = useState(value);

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(newValue);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit {title}</Text>
          <TextInput
            style={styles.input}
            value={newValue}
            onChangeText={setNewValue}
            placeholder={`Enter new ${title}`}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <MaterialIcons name="cancel" size={26} color="#fff" />
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <AntDesign name="edit" size={26} color="#fff" />
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// MyAccountScreen component
const MyAccountScreen = () => {
  const [editingField, setEditingField] = useState(null);
  const [data, setData] = useState(DATA);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = (newValue) => {
    if (editingField) {
      const newData = data.map((item) => {
        if (item.hasOwnProperty(editingField)) {
          return { ...item, [editingField]: newValue };
        }
        return item;
      });
      setData(newData);
      console.log(`Saving new value for ${editingField}: ${newValue}`);
    } else {
      console.error("Editing field is undefined");
    }
  };

  const handleCloseModal = () => {
    setEditingField(null);
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setBackgroundImage(result.uri);
    }
  };

  const fieldValue = editingField ? data[0][editingField] : "";

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={selectImage}>
        <View style={styles.photoWrapper}>
          <AntDesign name="user" size={90} color={COLORS.primary} />
        </View>
      </TouchableOpacity>
      <Text style={styles.screenTitle}>MY ACCOUNT</Text>
      <ScrollView style={styles.listContainer}>
        {data.map((item, index) => (
          <View key={index}>
            {Object.entries(item).map(([key, value]) => (
              <MyAccountItem
                key={key}
                title={key}
                value={value}
                onPress={() => handleEdit(key)}
              />
            ))}
          </View>
        ))}
      </ScrollView>
      <EditFieldModal
        visible={!!editingField}
        onClose={handleCloseModal}
        title={editingField}
        value={fieldValue}
        onSave={handleSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    alignItems: "center",
    marginBottom: 20, // Adjust this value as needed
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
    backgroundColor: "#fff",
  },
  photoWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    // Adjust this value as needed
  },
  screenTitle: {
    fontSize: 25,
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
  item: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: "auto",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    marginBottom: 20,
    width: "100%",
    maxWidth: 600, // Fixed width for the container
  },
  label: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    width: "30%",
  },
  value: {
    fontSize: 16,
    color: "black",
    width: "62%", // Fixed width for the value field
    overflow: "hidden",
  },
  editIcon: {
    marginLeft: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.primary,
    width: "80%",
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "grey",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 10,
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: COLORS.light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    width: 120,
    height: 60,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: COLORS.light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    width: 120,
    height: 60,
  },
  cancelButtonText: {
    color: "#000",
    fontWeight: "bold",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5, // Adjust the spacing between icon and text as needed
    fontSize: 18,
  },
});

export default MyAccountScreen;
