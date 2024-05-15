import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
const savedItems = [];
const LikeScreen = ({}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Render saved cards if savedItems is not empty */}
        {savedItems && savedItems.length > 0 ? (
          savedItems.map((item, index) => (
            <Card
              key={index}
              item={item}
              onPress={() => {}}
              onLikePress={() => {}}
            />
          ))
        ) : (
          <Text style={styles.emptyMessage}>No saved items</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 50,
  },
});

export default LikeScreen;
