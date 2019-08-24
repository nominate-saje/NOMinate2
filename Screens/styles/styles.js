import { StyleSheet }  from "react-native";

export const styles = StyleSheet.create({
  WelcomeText: {
    color: "#ff9900",
    textAlign: "center",
    flexDirection: "column",
    fontSize: 50,
    fontFamily: "AvenirNext-Heavy"
  },
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "column"
  },

  SubmitButtonStyle: {
    height: 50,
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#ff9900",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  fbButtonStyle: {
    height: 50,
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    borderWidth: 1,
  },

  TextStyle: {
    color: "#fff",
    textAlign: "center"
  },
  textInput: {
    height: 40,
    fontSize: 20,
    width: "90%",
    borderColor: "#9b9b9b",
    borderBottomWidth: 1,
    marginTop: 8,
    marginVertical: 15,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 18,
    marginRight: 30
  }
});
