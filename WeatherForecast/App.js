import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Keyboard, Button, Input, Card, Header, Icon } from 'react-native-elements';




class Banner extends React.Component {
  render() {
    return (
      <Header
        centerComponent={{ text: 'Weather App', style: { color: '#fff', fontSize: 25 } }}
        containerStyle={{
          backgroundColor: '#5d1049',
          justifyContent: 'space-around',
        }}
      />
    )
  }
}

class Temperature extends React.Component {

  constructor(props) {
    super(props);
    this.state = { forecast: null, loaded: false, information: null, text: '' };
  }
  componentDidMount() {
    this.getLocation();

  }

  //getting data 
  async getLocation() {
    let response = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + this.state.text + '.json?access_token=pk.eyJ1IjoiYW5kcmVhYmVjZXJyYSIsImEiOiJjangzbnIzbDQwMGpwNDNteDV1MXk4ZGtjIn0.xw3oJVI694k3qG_Fjg_u-A&limit=1');
    let data = await response.text();
    let dataReady = await JSON.parse(data);
    this.setState({ forecast: dataReady, loaded: true });

    let longitude = this.state.forecast.features[0].center[1];
    let latitud = this.state.forecast.features[0].center[0];


    let forecast = await fetch('https://api.darksky.net/forecast/3e255eb7e8285ddc741a4e8cfec3aa4e/' +
      longitude +
      ',' +
      latitud +
      '?units=si');
    let dataa = await forecast.text();
    let dataaReady = await JSON.parse(dataa);
    this.setState({ information: dataaReady });
  }

  search = () => {
    if (this.state.text !== ' ') {
      this.setState({
        text: ''
      });
    }
    this.getLocation();
  }
  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Input
          placeholder='   Enter your location'
          leftIcon={{ type: 'font-awesome', name: 'map-marker' }}
          inputContainerStyle={{ width: '100%', marginTop: '5%' }}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />
        <Button
          style={styles.btn}
          buttonStyle={{ backgroundColor: '#e30425', borderRadius: 10, width: '60%' }}
          textStyle={{ textAlign: 'center' }}
          title={`Search`}
          onPress={this.search}

        />
        <ShowData forecast={this.state} />
      </View>
    )
  }
}

class ShowData extends React.Component {

  render() {
    if (this.props.forecast.forecast == null || this.props.forecast.information == null) {
      return (
        <Text style={{ fontSize: 16 }}>Loading</Text>
      )
    }

    return (
      <View style={{ alignItems: 'center', width: '100%' }}>
        <Card title={this.props.forecast.forecast.features[0].place_name}
          containerStyle={{ width: '100%', height: '20%', marginTop: '10%', backgroundColor: '#f9a825', borderRadius: 5 }}>
        </Card>
        <Card
          containerStyle={{ width: '100%', height: '20%', alignItems: 'center', backgroundColor: '#4caf50', marginTop: '0%', borderRadius: 5 }}>
          <Text style={{ fontSize: 16 }}>Temperature</Text>
          <Text style={{ fontSize: 16 }}>{this.props.forecast.information.currently.summary}</Text>
          <Text style={{ fontSize: 16 }}>{this.props.forecast.information.currently.temperature}</Text>

        </Card>
        <Card
          containerStyle={{ width: '100%', height: '20%', alignItems: 'center', backgroundColor: '#d2dbe0', marginTop: '0%', borderRadius: 5 }}>
          <Text style={{ fontSize: 16 }}>Rain Forecast</Text>
          <Text style={{ fontSize: 16 }}>{this.props.forecast.information.currently.precipProbability}% </Text>
        </Card></View>

    )
  }
}
export default function App() {
  return (
    <View >
      <Banner />
      <Temperature />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  btn: {
    marginTop: '5%',
  },
  header: {
    fontSize: 100
  }

});
