import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./app/screens/HomeScreen"; // Your home screen component
import LoginScreen from "./app/LoginSystem/LoginScreen";
import SignupScreen from "./app/LoginSystem/SignupScreen";
import MainScreen from "./app/screens/MainScreen";
import DetailsScreen from "./app/screens/DetailsScreen";
import AddScreen from "./app/tabs/AddScreen";
import ChatScreen from "./app/tabs/ChatScreen";
import LikeScreen from "./app/tabs/LikeScreen";
import ProfileScreen from "./app/tabs/ProfileScreen";
import SearchScreen from "./app/tabs/SearchScreen";
import Tabs from "./app/tabs/Tabs";
import EditProfile from "./app/tabs/EditProfile";
import OwnHome from "./app/CategoryScreens/OwnHome";
import OwnLand from "./app/CategoryScreens/OwnLand";
import RentApartment from "./app/CategoryScreens/RentApartment";
import RentHome from "./app/CategoryScreens/RentHome";
import Invest from "./app/CategoryScreens/Invest";
import PropertyCardDashboard from "./app/components/PropertyCardDashboard";
import "react-native-reanimated";
import PropertyDetails from "./app/screens/PropertyDetails";
import dashboard from "./app/screens/dashboard";
import PropertyDetailsDashboard from "./app/screens/PropertyDetailsDashboard";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen
          name="Mainscreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profilescreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addscreen"
          component={AddScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="chats"
          component={ChatScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="likescreen"
          component={LikeScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="searchscreen"
          component={SearchScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="editprofile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ownhome"
          component={OwnHome}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ownland"
          component={OwnLand}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="rentapartment"
          component={RentApartment}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="renthome"
          component={RentHome}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="invest"
          component={Invest}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="PropertyDetails"
          component={PropertyDetails}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="PropertyCardDashboard"
          component={PropertyCardDashboard}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="PropertyDetailsDashboard"
          component={PropertyDetailsDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="dashboard"
          component={dashboard}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
