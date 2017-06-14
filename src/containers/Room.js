import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Platform,
  View,
  StatusBar,
  Text,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { MKButton, MKColor } from 'react-native-material-kit';

import * as config from '../config';
import DeviceList from '../containers/DeviceList';

const isAndroid = Platform.OS === 'android'; // bool

const MainButton = MKButton.coloredButton()
  .withBackgroundColor(MKColor.Amber)
  .withStyle({
    width: 200,
    height: 70,
    borderRadius: 5,
    margin: 10
  })
  .build();

const AccentButton = MKButton.accentColoredButton()
  .withBackgroundColor(MKColor.LightGreen)
  .withStyle({
    width: 200,
    height: 70,
    borderRadius: 5,
    margin: 10
  })
  .build();

export default class Room extends Component {
  // TODO: implement
  _preset() {
    console.info('_preset()');
    Alert.alert(
      'Preset',
      'この部屋のプリセットを適用しますか？',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )
  }

  // TODO: implement
  _allOff() {
    console.info('_allOff()');
    Alert.alert(
      'All OFF',
      'この部屋の全てのエアコンと電気の電源をオフにしますか？',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFA000" />
        <AccentButton onPress={() => this._preset()}>
          <Text style={styles.btn_txt}>Preset</Text>
        </AccentButton>
        <AccentButton onPress={() => this._allOff()}>
          <Text style={styles.btn_txt}>All OFF</Text>
        </AccentButton>
        <MainButton onPress={() => Actions.device_list({title: 'Air Conditioner', room: this.props.title})}>
          <Text style={styles.btn_txt}>Air Conditioner</Text>
        </MainButton>
        <MainButton onPress={() => Actions.device_list({title: 'Light', room: this.props.title})}>
          <Text style={styles.btn_txt}>Light</Text>
        </MainButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFECB3',
    marginTop: (isAndroid ? 54 : 64)
  },
  btn_txt: {
    fontWeight: 'bold'
  }
});
