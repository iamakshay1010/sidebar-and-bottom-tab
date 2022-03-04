import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//-----redux and auth here
import AuthGlobal from '../Context/store/AuthGlobal';
import { logoutUser } from '../Context/actions/Auth.actions';

export function DrawerContent(props) {
  //----this is the sidebar here
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const context = useContext(AuthGlobal);
  //console.log(context.stateUser.user);
  //console.log(context.stateUser.user.name);
  //console.log(context.stateUser.user.userId);

  const logOut = () => {
    //dispatch(onLogin(email, password));
    //console.log(email);
    //console.log(password);
    logoutUser(context.dispatch);
  };
  

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {/*----main content goes here(also provides safe area)------starts---*/}
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            {/*----shows the pic and user info------starts---*/}
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: "https://api.adorable.io/avatars/50/abott@adorable.png",
                }}
                size={50}
              />

              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>Akshay here</Title>
                <Caption style={styles.caption}>@j_doe</Caption>
              </View>
            </View>
            <View style={styles.row}>
              {/*----to show follower and following-----starts--*/}
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  100
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View>
            {/*----to show follower and following-- ------ends---*/}
          </View>
          {/*----shows the pic and user info------ends-------------------------------*/}

          {/*----testing the auth and redux admin section here-----starts here*/}
          {context.stateUser.user.isAdmin == true ? (
            <Drawer.Section title="Admin section here" style={{marginTop:20}}>
              <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Create product"
              onPress={() => {
                props.navigation.navigate("createProduct");
              }}
            />
             <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Create catagory"
              onPress={() => {
                props.navigation.navigate("createCatagory");
              }}
            />
             <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="user Analytics"
              onPress={() => {
                props.navigation.navigate("userAnalytics");
              }}
            />
            </Drawer.Section>
          ) : null}

          {/*----testing the auth and redux admin section here-----ends here*/}
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem //---this is one section here----
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home" //-----Home is name here--(refer MainTabScreen[line 24])
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Login"
              onPress={() => {
                props.navigation.navigate("Login");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label="Bookmarks"
              onPress={() => {
                props.navigation.navigate("BookmarkScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="setting" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate("SettingsScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate("SupportScreen");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  {/*----switch here-----*/}
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>

          {/*----testing the auth and redux admin section here-----starts here*/}
          {context.stateUser.user.isAdmin == true ? (
            <Drawer.Section title="Admin section here">
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Text>Dark Theme</Text>
                </View>
              </View>
            </Drawer.Section>
          ) : null}

          {/*----testing the auth and redux admin section here-----ends here*/}
        </View>
      </DrawerContentScrollView>
      {/*----main content goes here------starts---*/}
      <Drawer.Section style={styles.bottomDrawerSection}>
        {/*---ths is at the bottom of the sidebar---*/}
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={logOut}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 25,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
