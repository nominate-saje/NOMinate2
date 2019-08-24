import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Linking, TouchableOpacity, Button } from "react-native";
import { Badge } from "react-native-elements"
// import firebase from 'react-native-firebase'; // todo: UNCOMMENT THIS
const api = "https://us-central1-nominate-hr.cloudfunctions.net/api";

import {YELP_API_KEY} from "./config.js"; // todo: delete this line
// import YELP_API_KEY from "" // todo: fill in jj's config file path

const sampleUser = "f2rTyh"; // TODO: delete this line

export default class Nomination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      vote: this.props.nom.votes[sampleUser], // TODO sampleUser => firebase.auth().currentUser.uid
      image_url: "",
      name: "",
      url: "",
      categories: "",
      rating: "",
      price: "",
      review_count: ""
    };
    this.getRestaurantInfo = this.getRestaurantInfo.bind(this);
    this.calcVoteTotal = this.calcVoteTotal.bind(this);
    this.makeVote = this.makeVote.bind(this);
    this.renderStarRating = this.renderStarRating.bind(this);
    this.deleteNomination = this.deleteNomination.bind(this);
  }
  
  getRestaurantInfo(cb) {
    fetch(`https://api.yelp.com/v3/businesses/${this.props.nom.yelpId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`
      }
    })
    .then(res => res.json())
    .then(response => {
      let { name, image_url, url, rating, price, categories, review_count } = response;
      let foodTypes = (() => {
        let str = "";
        for (let i = 0; i < categories.length; i++) {
          (i === 0) ? (str += categories[i].title) : (str += `, ${categories[i].title}`);
        }
        return str;
      })();
      this.setState({
        isLoaded: true,
        foodTypes: foodTypes || 'No categories listed',
        price: price || '$$',
        name,
        image_url,
        url,
        rating,
        review_count
      });
    })
    .then(cb())
    .catch(err => console.error("Error with fetching data:", err));
  }
  
  componentDidMount() {
    this.getRestaurantInfo(this.calcVoteTotal);
  }

  calcVoteTotal() {
    let votes = this.props.nom.votes;
    let obj = {};
    for (var key in votes) {
      !obj[votes[key]] ? obj[votes[key]] = 1 : obj[votes[key]]++
    }
    this.setState({
      posVotes: obj["2"],
      neutVotes: obj["1"],
      negVotes: obj["-1"]
    })
  }

  makeVote(value) {
    this.setState({
      vote: value
    })
    fetch(`${api}/events/${this.props.eventId}/restaurants/${this.props.index}`, {
      method: "POST",
      body: JSON.stringify({
        id: sampleUser, // // TODO sampleUser => firebase.auth().currentUser.uid
        image_url: "",
        value
      }),
      headers: { "Content-Type": "application/json" }
    })
    .then(() => {
      this.props.update(() => {
        this.calcVoteTotal();
    })
    }).catch(err => console.error("Error in makeVote: ", err));
  }

  deleteNomination() {
    fetch(`${api}/events/${this.props.eventId}/restaurants/${this.props.index}`, {
      method: "DELETE",
      body: JSON.stringify({
        eventId: this.props.eventId,
        index: this.props.index
      }),
      headers: { "Content-Type": "application/json" }
    })
    .then(this.props.update(() => { this.setState({}) }))
    .catch(err => console.error("Error deleting nomination:", err))
  }

  renderStarRating() {
    let { rating } = this.state;
    if (rating === 0) {
      return (<Image style={{height: 25, width: 150}} source ={require("./yelp_stars/0-star.png")}></Image>)
    } else if (rating === 1) {
      return (<Image style={{height: 25, width: 150}} source ={require("./yelp_stars/1-star.png")}></Image>)
    } else if (rating === 1.5) {
      return (<Image style={{height: 25, width: 150}} source ={require("./yelp_stars/1.5-star.png")}></Image>)
    } else if (rating === 2) {
      return (<Image style={{height: 25, width: 150}} source ={require("./yelp_stars/2-star.png")}></Image>)
    } else if (rating === 2.5) {
      return (<Image style={{height: 25, width: 150}} source ={require("./yelp_stars/2.5-star.png")}></Image>)
    } else if (rating === 3) {
      return (<Image style={{height: 25, width: 150}} source ={require("./yelp_stars/3-star.png")}></Image>)
    } else if (rating === 3.5) {
      return (<Image style={{height: 25, width: 150}} source ={require("./yelp_stars/3.5-star.png")}></Image>)
    } else if (rating === 4) {
      return (<Image style={{height: 25, width: 150}} source ={require("./yelp_stars/4-star.png")}></Image>)
    } else if (rating === 4.5) {
      return (<Image style={{height: 25, width: 150}} source ={require("./yelp_stars/4.5-star.png")}></Image>)
    } else if (rating === 5) {
      return (<Image style={{height: 25, width: 150}} source ={require("./yelp_stars/5-star.png")}></Image>)
    };
  }

  render() {
    let { name, foodTypes, image_url, url, price, review_count } = this.state;
    return(
      (this.state.isLoaded) ? (
        <View style={styles.container}>
          <Image source={{ uri: image_url }} style={{width: 340, height: 190, borderRadius: 20}}/>
          <Text style={styles.title} onPress={() => Linking.openURL(url)}>{name}</Text>
          <View style={styles.row}>
            {this.renderStarRating()}
            <Text style={styles.text}>{`  ${review_count} reviews`}</Text>
          </View>
          <Text style={styles.text}>{`${price} - ${foodTypes}`}</Text>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => this.makeVote(2)}>
              <Text style={this.state.vote === 2 ? styles.selected : styles.notSelected}>
                👍
              </Text>
              <Badge status="success" value={this.state.posVotes} containerStyle={{ position: "absolute", top: 6, right: 6 }}></Badge>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.makeVote(1)}>
              <Text style={this.state.vote === 1 ? styles.selected : styles.notSelected}>
                👌
              </Text>
              <Badge status="warning" value={this.state.neutVotes} containerStyle={{ position: "absolute", top: 6, right: 6 }}></Badge>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.makeVote(-1)}>
              <Text style={this.state.vote === -1 ? styles.selected : styles.notSelected}>
                👎
            </Text>
            <Badge status="error" value={this.state.negVotes} containerStyle={{ position: "absolute", top: 6, right: 6 }}></Badge>
            </TouchableOpacity>
          </View>
            {(() => { 
              if (this.props.nom.nominator === sampleUser) {
                return(<Button title="Remove my nomination" onPress={this.deleteNomination} color="red"></Button>)
              } else { return null; }
            })()}
        </View>
      ) : (
        <Image source={{uri: "https://media.giphy.com/media/L13CP4bQy0DgB1Zy2N/giphy.gif"}} style={styles.spinner}></Image>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
    marginVertical: 8,
    padding: 7,
    borderColor: "#ff9900",
    borderWidth: 3,
    borderRadius: 20
  },
  title: {
    fontFamily: "Avenir Next",
    fontSize: 30,
    textDecorationLine: "underline",
    fontWeight: "bold",
    color: "#ff9900"
  },
  text: {
    fontFamily: "Avenir Next",
    fontSize: 15,
    alignSelf: "center",
  },
  selected: {
    borderColor: "black",
    backgroundColor: "#fff1e0",
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 35,
    padding: 5,
    margin: 10,
  },
  notSelected: {
    borderColor: "#dddddd",
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 35,
    padding: 5,
    margin: 10
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  button: {
    borderColor: "black",
    borderWidth: 1
  },
  spinner: {
    height: 20,
    width: 20,
    alignSelf: "center",
    marginVertical: 50
  }
});