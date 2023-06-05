import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Props from '../screens/Notice';
import CreatePostTwo from '../screens/Conversation';
import Profile from '../screens/Profile';

const Drawer = createDrawerNavigator();

export default DrawerNavigator = () => {
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="Profile">
      <Drawer.Screen name="Props" component={Props} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Create Post" component={CreatePostTwo} />
    </Drawer.Navigator>
  );
};
