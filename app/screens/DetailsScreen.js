import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Linking,
  TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import COLORS from '../../assets/Colors/colors'
import Mapviews from '../Mapview';
const screenWidth = Dimensions.get('window').width;

function DetailsScreen({ route }) {
  
  const { itemDetails } = route.params;

  // Example phone number - replace with dynamic data as needed
  const phoneNumber = "+971506003145";

  // Function to handle phone calls
  const makeCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <ScrollView style={styles.container}>
    <View style={styles.imageWrapper}>
      <Image source={{ uri: itemDetails.img }} style={styles.image} />
    </View>
        <Text style={styles.title}>{itemDetails.name}</Text>
        <Text style={styles.price}>${itemDetails.price} / night</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" solid size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{itemDetails.stars} ({itemDetails.reviews} reviews)</Text>
        </View>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          Experience unparalleled comfort and luxury at our stunning location in {itemDetails.name}. With top-of-the-line amenities and breathtaking views, your stay is guaranteed to be unforgettable.
        </Text>
        {/* Add more sections as needed */}
        <Text style={styles.sectionTitle}>Amenities</Text>
        <Text style={styles.description}>
          - Free Wi-Fi{'\n'}
          - Airport pickup{'\n'}
          - Complimentary breakfast{'\n'}
          - Swimming pool{'\n'}
          
          {/* Add more amenities as needed */}
        </Text>
      
          
      
        <TouchableOpacity onPress={makeCall} style={styles.callButton}>
          <Text style={styles.callButtonText}>Call Now</Text>
        </TouchableOpacity>
     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
      },
      callButton: {
        marginTop: 10,
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
      },
      callButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
  container: {
    flex: 1,
    padding: 15
  },
  imageWrapper: {
    marginHorizontal: 5, // Center the image by adding horizontal margin
    marginTop: 50, // Add some margin at the top
    borderRadius: 20, // Round the corners of the wrapper
    overflow: 'hidden', // Ensures the child image respects the wrapper's borderRadius
    elevation: 5, // Adds shadow for Android
    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: screenWidth - 40, // Adjust width to fit within the wrapper
    height: (screenWidth - 40) * 0.75, // Adjust height to maintain the aspect ratio
    resizeMode: 'cover',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 18,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default DetailsScreen;
