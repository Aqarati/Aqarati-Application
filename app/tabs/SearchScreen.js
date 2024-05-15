import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const SearchScreen = () => {
  const [query, setQuery] = useState('');  // The search query entered by the user
  const [loading, setLoading] = useState(false);  // State to manage loading indicator
  const [properties, setProperties] = useState([]);  // State to store the properties fetched from the API
  const [errorMessage, setErrorMessage] = useState('');  // State to store any error messages

  const handleSearch = async () => {
    if (!query) return;  // If the query is empty, do nothing
    setLoading(true);
    try {
      // Making a GET request to http://localhost/property with a query parameter
      const response = await axios.get('http://localhost/property', { params: { name: query } });
      setProperties(response.data);  // Assuming the API returns an array of properties
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to fetch properties');
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Search Properties</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
        onChangeText={text => setQuery(text)}
        value={query}
        placeholder="Enter a keyword..."
      />
      <Button title="Search" onPress={handleSearch} disabled={loading} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <FlatList
        data={properties}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ padding: 10, fontSize: 18 }}>{item.name}</Text>  // Customize this based on your actual property object structure
        )}
      />
    </View>
  );
};

export default SearchScreen;
23