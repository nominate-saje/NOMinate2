import React, { Component } from "react";
import { StyleSheet, Image, ScrollView, View, Text, TouchableOpacity } from "react-native";
import Nomination from "./Nomination.js";
import {Header} from "react-native-elements"




export default class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      name: "",
      date: "",
      users: [],
      restaurants: []
    }
    this.getEventData = this.getEventData.bind(this);
    
  }
  
  getEventData(cb = () => {}) {
    const sampleEventId = "MYUYf0g9xJbYiXmc92M5";
    fetch(`https://us-central1-nominate-hr.cloudfunctions.net/api/events/MYUYf0g9xJbYiXmc92M5`, { // TODO sampleEventId => this.props.navigation.geparam?? ?? ? ?
      method: "GET"
    }).then(res => res.json())
    .then(response => {
      let { name, date, users, restaurants } = response;
      this.setState({
        isLoaded: true,
        name,
        date,
        users,
        restaurants
      }, () => {cb()})
    })
    .catch(err => console.error("Error with getting event data:", err))
  }
  
  componentDidMount() {
    this.getEventData();
  }

  render() {
    return(
      (this.state.isLoaded) ? (
        <View style={styles.container}>
         <Header
          centerComponent={{ text: 'NOMinate', style: { color: "white",fontFamily: "AvenirNext-Heavy",fontSize: 30 } }}
          containerStyle={{
            backgroundColor: '#ffaa00',
          }}
        />
          <ScrollView style={styles.events} bounces="false">
            <View style={styles.titleDate}>
              <View style={{flexDirection: "column", paddingBottom: 12}}>
                <Text style={styles.title}>{this.state.name}</Text>
                <Text style={styles.date}>{(this.state.date).toLocaleString()}</Text>
              </View>
              <View style={{paddingVertical: 8}}>
                {this.state.users.map((user, i) => (<Text key={i}>{`•  ${user}`}</Text>))}
              </View>
            </View>
            <View style={styles.ihatethis}>
              {this.state.restaurants.map((nom, i) => (
                <Nomination nom={nom} eventId={"MYUYf0g9xJbYiXmc92M5"} update={this.getEventData} index={i} key={i}/>
              ))} 
            </View>
            <View style={styles.button}>
              <TouchableOpacity style={styles.nominateButton} onPress={() => this.props.navigation.navigate("EventNav", {eventid: this.props.navigation.state.params.eventid})}>
                <Text style={{fontSize: 25, fontFamily: "Avenir Next", alignSelf: "center"}}>Nominate a Restaurant</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      ) : (
        <Image source={{uri: "https://media.giphy.com/media/L13CP4bQy0DgB1Zy2N/giphy.gif"}}></Image>
      )
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 25,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    alignSelf: "center",
    paddingTop: 10,
  },
  date: {
    fontSize: 18,
    paddingBottom: 5,
    alignSelf: "center"
  },
  topBar: {
    backgroundColor: "#ff9900",
    alignSelf: "stretch",
    alignItems: "center",
    paddingTop: 30
  },
  events: {
    backgroundColor: "white",
    marginBottom: 100
  },
  nominate: {
    fontFamily: "AvenirNext-Heavy",
    fontSize: 35,
    alignSelf: "center",
    color: "white"
  },
  titleDate: {
    backgroundColor: "#ffaa00",
    width: 375,
    borderBottomColor: "#e87700",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  button: {
    marginBottom: 80
  },
  ihatethis: {
    width: 360,
    alignSelf: "center"
  },
  nominateButton: {
    width: 300,
    backgroundColor: "#ff9900",
    borderRadius: 7,
    alignSelf: "center",
    padding: 15,
    marginVertical: 20
  }
})