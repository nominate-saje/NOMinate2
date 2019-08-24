import React from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  eventContainer: {
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#ffc859",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  }
})


openEvent = (event, nav) => {
  nav('EventPage', { event })
}

const EventList = (props) => {

  return (
    <ScrollView style={styles.scrollContainer}>
      {props.events.map((event, i) => (
        <TouchableOpacity onPress={() => props.navigation("EventScreen",{eventid: event.id})} style={styles.eventContainer} key={i}>
          <Text style={{ fontSize: 25, color: '#ff9900', fontFamily: "Avenir Next" }}>{event.name}</Text>
          <Text>{event.date}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}
export default EventList