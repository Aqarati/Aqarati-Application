import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const initialItems = [
  {
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    name: 'Marbella, Spain',
    price: 200,
    stars: 4.45,
    reviews: 124,
    saved: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    name: 'Baveno, Italy',
    price: 320,
    stars: 4.81,
    reviews: 409,
    saved: false,
  },
  {
    img: 'https://cio.com/wp-content/uploads/2023/07/shutterstock_676661263.jpg?resize=1024%2C683&quality=50&strip=all',
    name: 'Marbella, Spain',
    price: 2000,
    stars: 4.45,
    reviews: 124,
    saved: false,
  },
  {
    img: 'https://i2.au.reastatic.net/1000x750-format=webp/4d352958ceb83faf067d03131d84b91ae959420f5fa892202186a0c809631646/main.jpg',
    name: 'Tucson, Arizona',
    price: 695,
    stars: 4.3,
    reviews: 72,
    saved: false,
  },
  {
    img: 'https://i2.au.reastatic.net/1000x750-format=webp/fbf8d820df00160986236a098a4f7b845ed154ab6deea187e5b7e93c9ded2592/image.jpg',
    name: 'Marbella, Spain',
    price: 200,
    stars: 4.45,
    reviews: 124,
    saved: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    name: 'Baveno, Italy',
    price: 320,
    stars: 4.81,
    reviews: 409,
    saved: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    name: 'Tucson, Arizona',
    price: 695,
    stars: 4.3,
    reviews: 72,
    saved: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    name: 'Marbella, Spain',
    price: 200,
    stars: 4.45,
    reviews: 124,
    saved: false,
  },
];

const RentApartment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState(initialItems);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    // Filter items based on search query
    const filteredItems = initialItems.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setItems(filteredItems);
  };

  const handleCardPress = (itemDetails) => {
    // Handle card press
  };

  const handleLikePress = (index) => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, saved: !item.saved };
      }
      return item;
    });
    setItems(newItems);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rent Apartment</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          value={searchQuery}
          onChangeText={handleSearchChange}
          placeholder="Search apartments..."
        />
      </View>
      <ScrollView>
        <View style={styles.cardContainer}>
          {items.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleCardPress(item)}>
              <View style={styles.card}>
                <TouchableOpacity style={styles.cardLikeWrapper} onPress={() => handleLikePress(index)}>
                  <FontAwesome name={item.saved ? "heart" : "heart-o"} size={22} color={item.saved ? '#ea266d' : '#222'} />
                </TouchableOpacity>
                <Image style={styles.cardImg} source={{ uri: item.img }} />
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardPrice}>${item.price} / night</Text>
                  <View style={styles.cardFooter}>
                    <FontAwesome name="star" size={12} color="#ea266d" />
                    <Text style={styles.cardStars}>{item.stars}</Text>
                    <Text style={styles.cardReviews}>({item.reviews} reviews)</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5, // Add horizontal padding to the card container
  },
  cardPairContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '48%', // Adjusted width to create space on the sides
  },
  card: {
    width: '100%', // Adjusted width to fill the parent container
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
    marginBottom: 10,
  },
  cardLikeWrapper: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },
  cardImg: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardBody: {
    padding: 30,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  cardPrice: {
    fontSize: 15,
    color: '#333',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  cardStars: {
    marginLeft: 5,
  },
  cardReviews: {
    marginLeft: 5,
  },
});


export default RentApartment;