import React, { Component } from "react";
import LogInScreen from "./Authorization/LogInScreen.js";
import SignUpScreen from "./Authorization/SignUpScreen";
import HomePageScreen from "./HomePage/HomePageScreen.js";
import CreateEventScreen from "./HomePage/CreateEventScreen";
import EventScreen from "./EventPage/EventScreen.js";
import SearchOrFilterScreen from "./EventPage/SearchOrFilterScreen.js";
import SearchResults from "./EventPage/SearchResults.js"
import EventList from "./HomePage/EventList.js"
import Nomination from "./EventPage/Nomination.js"
import Filter from "./EventPage/Filter.js"
import Settings from "./Authorization/Settings.js"
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";







const AuthNav = createSwitchNavigator(
  {
    LogInScreen,
    SignUpScreen
  },
  {
    initialRouteName: "LogInScreen"
  }
)

const BottomTab = createBottomTabNavigator(
  {
    Home: {
      screen: HomePageScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={20} color="black" />
        )
      }
    },
    AddEvent: {
      screen: CreateEventScreen,
      navigationOptions: {
        tabBarLabel: "Create Event",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="plus" size={20} color="black" />
        )
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: "Settings",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="logout" size={20} color="black" />
        )
      }
    },
  },
  {
    hideStatusBar: true,
    drawerBackgroundColor: "rgba(255,255,255,.9)",
    overlayColor: "#6b52ae",
    contentOptions: {
      activeTintColor: "#fff",
      activeBackgroundColor: "#6b52ae"
    }
  }
);









const AppNavigator = createSwitchNavigator(
  {
    AuthNav,
    BottomTab,
    EventScreen
  },
  {
    initialRouteName: "AuthNav"
  }
)

// const AppNavigator = createSwitchNavigator(
//   {
//     LogInScreen,
//     SignUpScreen,
//     BottomTab,
//   },
//   {
//     initialRouteName: "LogInScreen"
//   }
// );

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}