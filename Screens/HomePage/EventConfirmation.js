import React from 'react';
import { View, Text, Clipboard, TouchableOpacity, StyleSheet } from 'react-native';

const EventConfirmation = (props) => {
  const copyToClipboard = (string) => {
    Clipboard.setString(string);
    alert("Copied to clipboard!")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.congrats}>You've successfully created an event!</Text>
      <Text style={styles.eventcode}>Your event code is: </Text>
      <Text style={styles.code}>{props.code}</Text>
      <Text style={styles.message}>{"Copy/paste this code to your friends, \n and they can use it to join your event!"}</Text>
      <TouchableOpacity>
        <Text onPress={() => copyToClipboard(props.code)} style={styles.copy}>Copy to clipboard 📋</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#a3fff4",
    height: 225,
    width: 355,
    alignSelf: "center",
    marginTop: 20
  },
  congrats: {
    fontFamily: "Avenir Next",
    fontSize: 20,
    fontWeight: "500",
    marginVertical: 10
  },
  code: {
    backgroundColor: "white",
    padding: 10,
    borderColor: "grey",
    borderWidth: 1,
    fontSize: 24,
    fontWeight: "400"
  }, 
  eventcode: {
    fontFamily: "Avenir Next",
    fontSize: 18,
    paddingVertical: 4
  },
  message: {
    paddingVertical: 10
  },
  copy: {
    fontFamily: "Avenir Next",
    fontSize: 17,
    fontWeight: "600"
  }
});
export default EventConfirmation;