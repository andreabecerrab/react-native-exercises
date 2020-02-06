import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Button } from 'react-native-elements';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';


class Ads extends React.Component {

  constructor(props) {
    super(props);
    this.state = { points: 0 };
  }


  showInterstitial = async () => {
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();


  }



  showRewarded = async () => {


    AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917'); // Test ID, Replace with your-admob-unit-id
    AdMobRewarded.setTestDeviceID('EMULATOR');
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();

    AdMobRewarded.addEventListener('rewardedVideoDidStart', () => this.setState({ points: this.state.points + 10 }))
  }
  render() {
    return (
      <View>
        <Header
          centerComponent={{ text: 'Adds App', style: { color: '#fff', fontSize: 20, fontWeight: "bold" } }}
        />
        <Button
          onPress={this.showInterstitial}
          buttonStyle={{ backgroundColor: "#f194ff" }}
          style={{ width: 150, marginLeft: 120, marginTop: 110 }}
          title="Add-1"
        />
        <Button
          onPress={this.showRewarded}
          buttonStyle={{ backgroundColor: "#DAE362" }}
          style={{ width: 150, marginLeft: 120, marginTop: 50, marginBottom: 20 }}
          title="Add-2"
        />

        <Text style={{ marginBottom: 340, marginLeft: 120, fontSize: 15 }}>Rewarded points:  {this.state.points}</Text>


        <AdMobBanner
          style={{ marginLeft: 28 }}
          bannerSize="banner"
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
          testDeviceID="EMULATOR"
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={this.bannerError} />
      </View >
    );
  }
}
export default function App() {
  return (
    <Ads />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
