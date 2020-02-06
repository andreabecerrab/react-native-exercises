import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import { Button, Header } from 'react-native-elements';
import { Dialog } from 'react-native-simple-dialogs';
import * as Location from 'expo-location';
import { AsyncStorage } from 'react-native';



class Mapy extends React.Component {

  constructor(props) {
    super(props);
    this.state = { dialogVisible: false, markers: [], place: '', text: '' }
  }


  // _storeData = async () => {
  //   try {
  //     await AsyncStorage.setItem('@MySuperStore:key', this.state.markers);
  //   } catch (error) {
  //     // Error saving data
  //   }
  // };

  __retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null) {
        // We have data!!
        console.log(value);
        this.setState.markers = value;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  __getLocationAsync = async () => {
    let coordinates = await Location.geocodeAsync(this.state.place);
    this.state.markers.push({ lat: coordinates[0].latitude, long: coordinates[0].longitude, place: this.state.place, text: this.state.text });

  }
  render() {

    return (
      <View style={styles.container}>
        <Header
          containerStyle={{ height: 140 }}
          centerComponent={{ text: 'My Places', style: { color: '#fff', fontSize: 20, marginTop: 70 } }}
        />
        <Dialog
          visible={this.state.dialogVisible}
          title="Add a new MyPlace">
          <View>
            <Text style={{ fontSize: 18 }}>City </Text>
            <TextInput onChangeText={(e) => this.setState({ place: e })} style={{ borderColor: '#acb5bf', lineHeight: 23, height: 30, borderBottomWidth: 1 }}>  </TextInput>
            <Text style={{ fontSize: 18, marginTop: 10 }}>Text </Text>
            <TextInput onChangeText={(e) => this.setState({ text: e })} style={{ borderColor: '#acb5bf', lineHeight: 23, height: 30, borderBottomWidth: 1 }}>  </TextInput>
            <Button style={{ marginTop: 20 }}
              title='Add  ' onPress={() => this.setState({ dialogVisible: false }, () => this.__getLocationAsync())} />
          </View>
        </Dialog>
        <MapView style={styles.mapStyle}
        >
          {this.state.markers.map(marker => (
            <Marker
              coordinate={{ latitude: marker.lat, longitude: marker.long }}
              title={marker.place}
              description={marker.text}
            />
          ))}
        </MapView>


        <Button style={{ position: 'absolute', bottom: 90, left: 110, borderRadius: 50 }}
          title='Add  ' onPress={() => this.setState({ dialogVisible: true })} />
      </View>
    )
  }
}



export default class App extends React.Component {

  render() {
    return (
      <Mapy />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,

  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

});
