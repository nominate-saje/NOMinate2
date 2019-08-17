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
  DatePickerIOS
} from "react-native";
import { styles } from "./styles/styles";

export default class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  createUser = () => {
    let { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log(auth().currentUser.uid);
        fetch("https://us-central1-nominate-hr.cloudfunctions.net/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: auth().currentUser.uid,
            firstName: "test",
            lastName: "User"
          })
        });
      })
      .then(() => {
        alert("user added");
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.WelcomeText}>Please fill out:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="email"
          autoCapitalize="none"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={styles.textInput}
          placeholder="password"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity
          style={styles.SubmitButtonStyle}
          activeOpacity={0.3}
          onPress={() => this.createUser()}
        >
          <Text style={styles.TextStyle}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
