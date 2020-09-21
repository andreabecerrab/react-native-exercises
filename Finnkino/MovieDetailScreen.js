import React from "react";
import { Text, View, Image } from "react-native";
import { parser } from "react-native-xml2js";

class MovieDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: `Movie Detail`,
    };
  };

  // set synopsis state empty, we will load synopsis later
  constructor(props) {
    super(props);
    this.state = { synopsis: "" };
  }

  // load synopsis for the show selected
  async loadSynopsis() {
    const { navigation } = this.props;
    const show = navigation.getParam("show", null);

    let response = await fetch("https://www.finnkino.fi/xml/Events/?eventId=" + show.EventID[0]);
    let data = await response.text();

    parser(
      data,
      function (err, result) {
        this.setState({ synopsis: result.Events.Event[0].ShortSynopsis });
      }.bind(this)
    );
  }

  // start loading synopsis when component is mounted
  componentDidMount() {
    this.loadSynopsis();
  }

  static navigationOption = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: "Movie Detail",
    };
  };

  render() {
    const { navigation } = this.props;
    const show = navigation.getParam("show", null);
    let imageurl = show.Images[0].EventSmallImageLandscape[0];
    return (
      <View>
        <Image source={{ uri: imageurl }} style={{ aspectRatio: 570 / 300 }} />
        <Text>{show.Title}</Text>
        <Text>Length: {show.LengthInMinutes} mins</Text>
        <Text>Theatre: {show.TheatreAndAuditorium}</Text>
        <Text>PresentationMethod: {show.PresentationMethod}</Text>
        <Text>Rating: {show.Rating}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ flex: 1, flexWrap: "wrap" }}>Genres: {show.Genres}</Text>
        </View>
        <Text>Synopsis: {this.state.synopsis}</Text>
      </View>
    );
  }
}

export default MovieDetailScreen;
