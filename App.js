import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

//--this is the sidebar here
import MainTabScreen from './screens/MainTabScreen'; 
import {DrawerContent} from './screens/DrawerContent'; 
import DetailsScreen from './screens/DetailsScreen'; 
import SupportScreen from './screens/SupportScreen'; 
import BookmarkScreen from './screens/BookmarkScreen'; 
import SettingsScreen from './screens/SettingsScreen'; 
import { LogBox } from "react-native";


const Drawer = createDrawerNavigator();
LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        <Drawer.Screen name="SupportScreen" component={SupportScreen} />
        <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
        <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
      </Drawer.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
