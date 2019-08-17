import React, { Component } from "react";
import LogInScreen from "./LogInScreen";
import SignUpScreen from "./SignInScreen";
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";

const AuthStack = createStackNavigator(
    {
        LogIn: {screen: LogInScreen},
        SignUp: {screen: SignUpScreen}
    },
    {
      initialRouteName: "UserAuthentication"
    }
  );
  
   
  const App = createAppContainer(AuthStack);
  export default App