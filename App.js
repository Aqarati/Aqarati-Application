import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './app/screens/HomeScreen'; // Your home screen component
import WelcomeScreen from './app/LoginSystem/WelcomeScreen';
import LoginScreen from './app/LoginSystem/LoginScreen';
import SignupScreen from './app/LoginSystem/SignupScreen';
import MainScreen from './app/screens/MainScreen';
const Stack = createNativeStackNavigator();

function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component = {HomeScreen} />
        <Stack.Screen name="welcome" component = {WelcomeScreen} />
        <Stack.Screen name="Login" component = {LoginScreen} />
        <Stack.Screen name="Signup" component = {SignupScreen} />
        <Stack.Screen name="Mainscreen" component = {MainScreen} />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
