import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useCallback, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { BibleProvider } from './contexts/BibleContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SettingsScreen from './components/SettingsScreen';
import NotesScreen from './components/NotesScreen';
import SavedScreen from './components/SavedScreen';
import Ionic from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Home from './components/Home';
// import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import { Platform } from 'react-native';

const getFonts = {
  'BoldFont': require('./assets/fonts/Barlow-Bold.ttf'),
  'SemiBoldFont': require('./assets/fonts/Barlow-SemiBold.ttf'),
  'MediumFont': require('./assets/fonts/Barlow-Medium.ttf'),
  'RegularFont': require('./assets/fonts/Barlow-Regular.ttf'),
  'OldRegularFont': require('./assets/fonts/georgia.ttf'),
  'OldBoldFont': require('./assets/fonts/georgiab.ttf'),
};

export default function App() {
  const [fontsLoaded] = useFonts(getFonts);
  const Tab = createBottomTabNavigator();

  if (!fontsLoaded) {
    console.log("Fonts not loaded")
    SplashScreen.preventAutoHideAsync();
    return null;
  } else {
    console.log('App loaded.\n'+Platform.OS+' '+Platform.Version);
    SplashScreen.hideAsync();
    return (
      <BibleProvider>
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.container}>
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, size, colour }) => {
                    let iconName;
                    colour = "#BB5C04";
                    if (route.name === 'Home') {
                      iconName = focused ? 'ios-home' : 'ios-home-outline';
                    } else if (route.name === 'Notes') {
                      return <FontAwesome name={iconName = focused ? "sticky-note" : "sticky-note-o"} size={size} color={colour} />
                    } else if (route.name === 'Saved') {
                      iconName = focused ? 'heart' : 'heart-outline';
                    } else if (route.name === 'Settings') {
                      iconName = focused ? 'settings' : 'settings-outline';
                    }
                    return <Ionic name={iconName} size={size} color={colour} />
                  },
                })}>
                <Tab.Screen name="Home" options={{ headerShown: false }} component={Home} />
                <Tab.Screen options={{ headerShown: false }} name="Notes" component={NotesScreen} />
                <Tab.Screen name="Saved" component={SavedScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
              </Tab.Navigator>
            </NavigationContainer>
          </View>
        </SafeAreaView>
      </BibleProvider>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  }
});
