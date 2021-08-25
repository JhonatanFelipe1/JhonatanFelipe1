import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../stacks/screens/Home';
import Search from '../stacks/screens/Search';
import AddPet from '../stacks/screens/AddPet';
import Favorites from '../stacks/screens/Favorites';
import Profile from './screens/Profile';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
    <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="AddPet"
      component={AddPet}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Favorites"
      component={Favorites}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{headerShown: false}}
    />
  </Tab.Navigator>
);
