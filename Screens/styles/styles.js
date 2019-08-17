import { StyleSheet }  from "react-native";

export const styles = StyleSheet.create({
  WelcomeText: {
    color: "white",
    textAlign: "center",
    flexDirection: "column",
    fontSize: 50
  },
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#6D54A9",
    flexDirection: "column"
  },

  SubmitButtonStyle: {
    height: 50,
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
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
