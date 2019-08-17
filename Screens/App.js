import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  Button,
  AsyncStorage,
  Switch
} from "react-native";
import firebase from "react-native-firebase";
import { styles } from "./styles/styles";
import { AccessToken, LoginManager } from "react-native-fbsdk";

export default class App extends Component {
  state = {
    email: "",
    password: ""
  };

  loginUser = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        alert("Good job!");
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <KeyboardAvoidingView>
          <Text style={styles.WelcomeText}> NOMinate</Text>
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            placeholder="email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            autoCapitalize="none"
            secureTextEntry
            style={styles.textInput}
            placeholder="password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />

          <TouchableOpacity
            style={styles.SubmitButtonStyle}
            activeOpacity={0.3}
            onPress={() => this.loginUser()}
          >
            <Text style={styles.TextStyle}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.SubmitButtonStyle}
            activeOpacity={0.3}
            onPress={() => this.props.navigation.navigate("SignUpForm")}
          >
            <Text style={styles.TextStyle}>Create An Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.SubmitButtonStyle}
            activeOpacity={0.3}
            onPress={() => this.loginUserFb()}
          >
            <Text style={styles.TextStyle}>Facebook</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}