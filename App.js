import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from "./reducers/userReducer";
import LoginScreen from './screens/LoginScreen';
import PostsScreen from './screens/PostsScreen';
import UploadScreen from './screens/UploadScreen';
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);

// redux state management
const store = configureStore({
  reducer: {
    user: userReducer,
  }
})

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
        title: "SavorHub",
        headerTintColor: "green",
        headerTitleStyle: { fontSize: 30 },
        headerStyle: { backgroundColor: "#fff" },
        headerBackVisible: false,
      }}>
        <Stack.Screen name="Login" component={LoginScreen} title="Login" />
        <Stack.Screen name="Posts" component={PostsScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppWrapper;