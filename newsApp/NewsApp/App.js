import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./pages/SplashScreen";
import MainPage from "./pages/MainPage";
import SettingsPage from "./pages/SettingsPage";
import SavedArticlesPage from "./pages/SavedArticlesPage";
import ShareNewsPage from "./pages/ShareNewsPage";
import AboutAppPage from "./pages/AboutAppPage";
import RateUsPage from "./pages/RateUsPage";
import { AppProvider } from "./context/AppContext";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false, // Hide default headers for Main page
          }}
        >
          {/* Splash screen first */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen 
            name="Main" 
            component={MainPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsPage}
            options={{
              headerShown: true,
              headerTitle: "Settings",
              headerStyle: {
                backgroundColor: '#4287f5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen 
            name="SavedArticles" 
            component={SavedArticlesPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="ShareNews" 
            component={ShareNewsPage}
            options={{
              headerShown: true,
              headerTitle: "Share News",
              headerStyle: {
                backgroundColor: '#4287f5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen 
            name="AboutApp" 
            component={AboutAppPage}
            options={{
              headerShown: true,
              headerTitle: "About App",
              headerStyle: {
                backgroundColor: '#4287f5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen 
            name="RateUs" 
            component={RateUsPage}
            options={{
              headerShown: true,
              headerTitle: "Rate Us",
              headerStyle: {
                backgroundColor: '#4287f5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
