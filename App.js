import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

//--this is the sidebar here
import MainTabScreen from "./screens/MainTabScreen";
import { DrawerContent } from "./screens/DrawerContent";
import DetailsScreen from "./screens/DetailsScreen";
import SupportScreen from "./screens/SupportScreen";
import BookmarkScreen from "./screens/BookmarkScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CreateProduct from "./screens/CreateProduct";
import { LogBox } from "react-native";
import Login from "./screens/Login";
import Register from "./screens/Register";
import createcatagory from "./screens/createCatagory";
import ExploreScreen from "./screens/ExploreScreen";
import UpdateUser from "./screens/UpdateUser";

import { Provider } from "react-redux";



// Context API
import Auth from "./Context/store/Auth";

const Drawer = createDrawerNavigator();
LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Drawer.Screen name="Ecom App" component={MainTabScreen} />
            <Drawer.Screen name="SupportScreen" component={SupportScreen} />
            <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
            <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Register" component={Register} />
            <Drawer.Screen name="Details" component={DetailsScreen} />
            <Drawer.Screen name="createProduct" component={CreateProduct} />
            <Drawer.Screen name="createCatagory" component={createcatagory} />
            <Drawer.Screen name="userAnalytics" component={ExploreScreen} /> 
            <Drawer.Screen name="UpdateUser" component={UpdateUser} /> 
          </Drawer.Navigator>
        </NavigationContainer>
    </Auth>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
