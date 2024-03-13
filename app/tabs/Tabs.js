import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
// Import your screens here
import AddScreen from './AddScreen';
import ChatScreen from './ChatScreen';
import LikeScreen from './LikeScreen';
import SearchScreen from './SearchScreen';

// Import your COLORS constant
import COLORS from '../../assets/Colors/colors';
import { Platform } from 'react-native';
import MainScreen from '../screens/MainScreen';

const Tab = createBottomTabNavigator();

function Tabs() {
  const screenComponents = {
    Main:MainScreen,
    Favorite: LikeScreen,
    Post: AddScreen,
    chat: ChatScreen,
    search: SearchScreen,

    
  };
  return (
    <Tab.Navigator
    initialRouteName="main"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Post':
              size =45;
              iconName = 'plus-circle';
              break;
            case 'chat':
              iconName = 'comments';
              break;
              case 'Main':
            
                iconName = 'home';
                break;
            case 'Favorite':
              iconName = 'heart';
              break;
            case 'search':
              iconName = 'search';
              break;
            default:
              iconName = 'user'; // Assuming default for 'profile'
              break;
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        headerShown:true,
      
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          paddingBottom: Platform.OS === 'ios' ? 25 : 5,
          height: 80,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          position: 'absolute',

          borderRadius:20,
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
          marginTop:10,
        },
      })}
    >
      {Object.keys(screenComponents).map((screen) => (
        <Tab.Screen
          key={screen}
          name={screen}
          component={screenComponents[screen]}
          listeners={({ navigation }) => ({
            tabPress: e => {
              e.preventDefault(); // Prevent default action
              navigation.navigate(screen); // Navigate to the screen that matches the tab
            }
          })}
        />
      ))}
    </Tab.Navigator>
  );
}

export default Tabs;