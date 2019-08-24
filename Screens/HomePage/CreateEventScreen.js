import React, { Component } from "react";
import { TextInput, DatePickerIOS, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import EventConfirmation from "./EventConfirmation.js";
import firebase from 'react-native-firebase'; // todo: UNCOMMENT THIS
const sampleUser = "9fghXhri1NNdKXNCuOWnGpuadQf2"; // TODO: delete this line

export default class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      name: "",
      confirmation: { show: false, code: "" },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(value) {
    this.setState({
      vote: value,
    });
    fetch("https://us-central1-nominate-hr.cloudfunctions.net/api/events", {
      method: "POST",
      body: JSON.stringify({
        userId: sampleUser, // // TODO sampleUser => firebase.auth().currentUser.uid
        image_url: "",
        user: "9fghXhri1NNdKXNCuOWnGpuadQf2", // todo: firebase.auth.... .display name???
        name: this.state.name,
        date: this.state.date
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.text())
      .then(response => {
        this.setState({
          confirmation: { show: true, code: response }
        });
      })
      .catch(err => console.error("Error: ", err));
  }

  render() {
    let { confirmation } = this.state;
    return (
      <View>
        <View style={styles.topBar}>
          <Text style={styles.nominate}>NOMinate</Text>
        </View>
        <View style={[styles.form, styles.orangeBorder]}>
          {confirmation.show ? (
            <View style={styles.confirmation}>
              <EventConfirmation code={confirmation.code}/>
            </View>
          ) : (
            <View>
              <Text style={styles.title}>Create your event:</Text>
              <View style={{ backgroundColor: "#ffd391", height: 2000 }}>
                <TextInput
                  style={[styles.input, styles.orangeBorder]}
                  onChangeText={name => this.setState({ name })}
                  placeholder={"    Name your event here!"}
                />
                <DatePickerIOS
                  date={this.state.date}
                  minimumDate={new Date()}
                  onDateChange={date => this.setState({ date })}
                  minuteInterval={15}
                  style={[{ backgroundColor: "white" }, styles.orangeBorder]}
                />
                <TouchableOpacity
                  onPress={this.handleSubmit}
                  style={styles.submit}
                >
                  <Text style={styles.text}>Let's go!</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#ff9900",
    alignSelf: "stretch",
    alignItems: "center",
    paddingTop: 30
  },
  nominate: {
    fontFamily: "AvenirNext-Heavy",
    fontSize: 35,
    alignSelf: "center",
    color: "white"
  },
  form: {
    backgroundColor: "#ffaa00",
    height: 300
  },
  input: {
    backgroundColor: "white",
    height: 35,
    alignSelf: "stretch",
    marginVertical: 20
  },
  title: {
    fontSize: 30,
    fontFamily: "Avenir Next",
    alignSelf: "center",
    fontWeight: "500",
    marginVertical: 15
  },
  submit: {
    backgroundColor: "white",
    borderRadius: 6,
    borderColor: "#ff9900",
    borderWidth: 2,
    width: 120,
    alignSelf: "center",
    marginVertical: 20
  },
  orangeBorder: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: "#ff9900",
    borderBottomColor: "#ff9900"
  },
  text: {
    fontFamily: "Avenir Next",
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "500"
  },
  confirmation: {
    backgroundColor: "#ffd391",
    height: 3000
  }
});