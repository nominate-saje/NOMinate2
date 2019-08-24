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
import { styles } from "../styles/styles.js";
import firebase from 'react-native-firebase'

export default class SignUpScreen extends Component {

    logout = () => {
        firebase.auth().signOut().then(() => {
          this.props.navigator.navigate('AuthNav');
    }).catch(function(error) {
      console.error(error)
    });
      }


  render() {
    return (
      <View style={styles.MainContainer}>
        
        <TouchableOpacity
          style={styles.SubmitButtonStyle}
          activeOpacity={0.3}
          onPress={() => this.logout()}
        >
          <Text style={styles.TextStyle}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}