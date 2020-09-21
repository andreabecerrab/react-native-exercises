import React, { Fragment } from "react";
import { StyleSheet, Text, Image, TouchableHighlight, View, ScrollView, StatusBar, SafeAreaView } from "react-native";
//import for xml parse
import { parser } from "react-native-xml2js";

//class for Show list
class ShowsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { shows: null };
  }

  componentDidMount() {
    this.getShows();
  }

  async getShows() {
    let response = await fetch("https://www.finnkino.fi/xml/Schedule/?area=1015&dt=07.09.2019");
    let data = await response.text();

    //setting shows
    parser(
      data,
      function (err, result) {
        this.setState({ shows: result.Schedule.Shows[0] });
      }.bind(this)
    );
  }

  //action for displaying MovieDetailScreen component
  itemPressed = (index) => {
    this.props.navigation.navigate("MovieDetail", { show: this.state.shows.Show[index] });
  };

  render() {
    if (this.state.shows == null) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <Text>Loading, please wait...</Text>
        </View>
      );
    } else if (this.state.shows != null) {
      console.log(this.state.shows);
      //getting the shows
      var items = this.state.shows.Show.map(
        function (show, index) {
          return (
            //Touch for displaying the component of each Item
            //showlistITem displayed from class ShowListItem
            <TouchableHighlight onPress={(_) => this.itemPressed(index)} underlayColor='lightgray' key={index}>
              <ShowListItem show={show} />
            </TouchableHighlight>
          );
        }.bind(this)
      );

      //display each show
      return <ScrollView>{items}</ScrollView>;
    }
  }
}

//class for each Show
class ShowListItem extends React.Component {
  render() {
    //getting information form each show
    let imageurl = this.props.show.Images[0].EventSmallImagePortrait[0];

    return (
      //adding image, title, lengh, theatre, presentation method, rating
      <View style={styles.showItem}>
        <View style={styles.showItemImage}>
          <Image source={{ uri: imageurl }} style={{ width: 90, height: 130 }} />
        </View>

        <View style={styles.showItemTexts}>
          <Text style={styles.showItemTitle}>{this.props.show.Title}</Text>
          <Text style={styles.showItemText}>Length: {this.props.show.LengthInMinutes} mins</Text>
          <Text style={styles.showItemText}>Theatre: {this.props.show.TheatreAndAuditorium}</Text>
          <Text style={styles.showItemText}>PresentationMethod: {this.props.show.PresentationMethod}</Text>
          <Text style={styles.showItemText}>Rating: {this.props.show.Rating}</Text>

          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1, flexWrap: "wrap" }}>Genres: {this.props.show.Genres}</Text>
          </View>
        </View>
      </View>
    );
  }
}

//main rendering
class MovieListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: `MovieList`,
    };
  };
  render() {
    return (
      <Fragment>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView>
          <ShowsList navigation={this.props.navigation} />
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default MovieListScreen;

//styles for app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    margin: 0,
  },
  scrollView: {
    backgroundColor: "#edf2f5",
  },
  showItem: {
    margin: 5,
    flex: 1,
    flexDirection: "row",
  },
  showItemImage: {
    marginRight: 5,
  },
  showItemTitle: {
    fontWeight: "bold",
  },
  showItemText: {
    flexWrap: "wrap",
  },
});
